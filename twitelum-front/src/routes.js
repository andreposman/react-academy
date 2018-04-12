//roteamento
import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";

export default class Routes extends Component {
  autenticado() {
    if (localStorage.getItem("TOKEN")) 
      return true;
    else
      return false;
  }

  render() {
    return (
      <Switch>
        {/*pega a url e faz o swtich de rotas, e faz as trocas de pag. sem fazer refresh.*/}
        <Route path="/" component={Home} exact />
        <Route path="/login" component={LoginPage} />
        <Route path="*" component={() => <div> Pagina 404 </div>} />
      </Switch>
    );
  }
}

export class PrivateRoute extends Component {
  render() { 
    const Component = this.props.component
    const props = this.props
    if(autenticado())
      return( <Route render={() => <Component {...prop } />} />)
    else
    return (<Redirect to="/login" />)
  }
}
 