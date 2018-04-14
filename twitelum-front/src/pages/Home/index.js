import React, { Component, Fragment } from "react";
import Cabecalho from "../../components/Cabecalho";
import NavMenu from "../../components/NavMenu";
import Dashboard from "../../components/Dashboard";
import Widget from "../../components/Widget";
import TrendsArea from "../../components/TrendsArea";
import Tweet from "../../components/Tweet";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      novoTweet: "",
      tweets: []
    };
    //bind
    this.adicionaTweet = this.adicionaTweet.bind(this);
  }

  componentDidMount() {
    console.log("DidMount");
    fetch(
      `http://localhost:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem(
        "TOKEN"
      )}`
    )
      .then(respostaServidor => respostaServidor.json())
      .then(tweetsServidor => {
        this.setState({
          tweets: tweetsServidor
        });
      });
  }

  adicionaTweet(e) {
    e.preventDefault();
    const novoTweet = this.state.novoTweet;
    const token = localStorage.getItem("TOKEN");
    if (novoTweet) {
      fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${token}`, {
        method: "POST",
        body: JSON.stringify({ conteudo: novoTweet })
      })
        .then(respostaServidor => {
          return respostaServidor.json();
        })
        .then(tweetProntoServidor => {
          console.log(tweetProntoServidor);
          this.setState({
            tweets: [tweetProntoServidor, ...this.state.tweets],
            novoTweet: ""
          });
        });
    }
  }

  removeTweet = idTweet => {
    //setState
    console.log('ID do tweet: ' + idTweet);

    fetch(`http://localhost:3001/tweets/${idTweet}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,
    {method: 'DELETE'})
    .then((respostaServidor) => respostaServidor.json())
    .then((respostaServidor) => {
      const tweetsAtualizados = this.state.tweets.filter(tweetAtual => tweetAtual._id !== idTweet);
  
      this.setState({
        tweets: tweetsAtualizados
      });
    })
  };

  render() {
    return (
      <Fragment>
        <Cabecalho>
          <NavMenu usuario={localStorage.getItem("USUARIO")} />
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
                  className="novoTweet__envia"
                  disabled={this.state.novoTweet.length > 140 ? true : false}
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
                {this.state.tweets.length === 0
                  ? "Escreva alguma coisa..."
                  : ""}
                {this.state.tweets.map(
                  tweetInfo => (
                    <Tweet
                      key={tweetInfo._id}
                      removeHandler={() => this.removeTweet(tweetInfo._id)}
                      texto={tweetInfo.conteudo}
                      tweetInfo={tweetInfo}
                    />
                  )
                  /*key = 'id' de mapeamento do array*/
                )}
              </div>
            </Widget>
          </Dashboard>
        </div>
      </Fragment>
    );
  }
}

export default App;
