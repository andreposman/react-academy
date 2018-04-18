import Tweet from "../components/Tweet";
import { connect } from "react-redux";
import * as TweetsAPI from "../apis/TweetsAPI";
import Home from "../pages/Home";

// class TweetPadrao extends Component {
//   funcaoRemove () {store.dispatch(TweetsApi.remove())}
//   render() {
//     return <Tweet removeHandler />;
//   }
// }

const mapDispatchToProps = (dispatch, propsRecebidas) => {
  return {
    removeHandler: () => {
        dispatch(TweetsAPI.remove(propsRecebidas.tweetInfo._id))
    }
  };
};

const TweetPadraoContainer = connect(null, mapDispatchToProps)(Tweet);

export default TweetPadraoContainer;
