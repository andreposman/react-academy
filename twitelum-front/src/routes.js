//roteamento
import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";

function autenticado() {
  if (localStorage.getItem("TOKEN")) {
    return true;
  }
  return false;
}
export default class Routes extends Component {
  render() {
    return (
      <Switch>
        {/*pega a url e faz o swtich de rotas, e faz as trocas de pag. sem fazer refresh.*/}
        <PrivateRoute path="/" component={Home} exact />
        <Route path="/login" component={LoginPage} />
        <Route path="*" component={() => <div> Pagina 404 </div>} />
      </Switch>
    );
  }
}

class PrivateRoute extends Component {
  render() {
    if (autenticado()) {
      return <Route {...this.props} />;
    } else {
      return <Redirect to="/login" />;
    }
  }
}
