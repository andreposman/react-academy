import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Cabecalho from './componentes/Cabecalho/';
import Menu from './componentes/Menu/';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Cabecalho>
          <Menu usuario="andreposman" />
        </Cabecalho>
      </div>
    );
  }
}

export default App;
