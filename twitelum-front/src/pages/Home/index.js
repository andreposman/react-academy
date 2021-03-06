import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Cabecalho from "../../components/Cabecalho";
import NavMenu from "../../components/NavMenu";
import Dashboard from "../../components/Dashboard";
import Widget from "../../components/Widget";
import TrendsArea from "../../components/TrendsArea";
import Tweet from "../../containers/TweetPadrao";
import Modal from "../../components/Modal";
import * as TweetsAPI from "../../apis/TweetsAPI";

class Home extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  constructor(props) {
    super();

    this.state = {
      novoTweet: "",
      tweets: [],
      tweetAtivo: {}
    };
    // Código triste da vida
    this.adicionaTweet = this.adicionaTweet.bind(this);
  }

  componentWillMount() {
    this.context.store.subscribe(() => {
      this.setState({
        tweets: this.context.store.getState()
      });
    });
  }

  componentDidMount() {
    this.context.store.dispatch(TweetsAPI.carrega());
  }

  // Talk: Anjana Vakil: Learning Functional Programming with JavaScript - JSUnconf 2016
  adicionaTweet(infosDoEvento) {
    infosDoEvento.preventDefault();
    // Pegar o value do input
    const novoTweet = this.state.novoTweet;

    this.context.store.dispatch(TweetsAPI.adiciona(novoTweet))

    this.setState({
      novoTweet: ''
    });
  }

  removeTweet = (idDoTweet) => {
    this.context.store.dispatch(TweetsAPI.remove(idDoTweet))

    this.setState({
      tweetAtivo: {}
    })
  };

  abreModalParaTweet = (idDoTweetQueVaiNoModal, event) => {
    console.log("idDoTweetQueVaiNoModal", idDoTweetQueVaiNoModal);
    // Fazer alguma operação no array de tweets
    const ignoraModal = event.target.closest(".ignoraModal");
    if (!ignoraModal) {
      const tweetAtivo = this.state.tweets.find(
        tweetAtual => tweetAtual._id === idDoTweetQueVaiNoModal
      );
      this.setState({
        tweetAtivo: tweetAtivo
      });
    }
  };

  fechaModal = event => {
    const isModal = event.target.classList.contains("modal");
    if (isModal) {
      this.setState({
        tweetAtivo: {}
      });
    }
  };

  render() {
    return (
      <Fragment>
        <Cabecalho>
          <NavMenu usuario="@omariosouto" />
        </Cabecalho>
        <div className="container">
          <Dashboard>
            <Widget>
              <form className="novoTweet" onSubmit={this.adicionaTweet}>
                <div className="novoTweet__editorArea">
                  <span
                    className={`novoTweet__status ${
                      this.state.novoTweet.length > 140
                        ? "novoTweet__status--invalido"
                        : ""
                    }`}
                  >
                    {this.state.novoTweet.length}/140
                  </span>
                  <textarea
                    value={this.state.novoTweet}
                    onChange={event => {
                      this.setState({ novoTweet: event.target.value });
                    }}
                    className="novoTweet__editor"
                    placeholder="O que está acontecendo?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={this.state.novoTweet.length > 140 ? true : false}
                  className="novoTweet__envia"
                >
                  Tweetar
                </button>
              </form>
            </Widget>
            <Widget>
              <TrendsArea />
            </Widget>
          </Dashboard>
          <Dashboard posicao="centro">
            <Widget>
              <div className="tweetsArea">
                {this.state.tweets.length === 0 ? (
                  <div>Mensagem avisando</div>
                ) : (
                  ""
                )}
                {Boolean(this.state.tweets.length) &&
                  this.state.tweets.map((tweet, index) => (
                    <Tweet
                      key={tweet._id}
                      removeHandler={() => this.removeTweet(tweet._id)}
                      tweetInfo={tweet}
                      handleModal={event =>
                        this.abreModalParaTweet(tweet._id, event)
                      }
                      texto={tweet.conteudo}
                    />
                  ))}
              </div>
            </Widget>
          </Dashboard>
        </div>

        <Modal
          isAberto={this.state.tweetAtivo._id}
          fechaModal={this.fechaModal}
        >
          <Widget>
            <Tweet
              removeHandler={() => this.removeTweet(this.state.tweetAtivo._id)}
              texto={this.state.tweetAtivo.conteudo || ""}
              tweetInfo={this.state.tweetAtivo}
            />
          </Widget>
        </Modal>
      </Fragment>
    );
  }
}

export default Home;
