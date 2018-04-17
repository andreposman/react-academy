//npm install redux

import { createStore } from "redux";

function tweetsReducer(estadoInicial = [], action = {}) {
    if (action.type === 'CARREGA_TWEETS') {
        const novoEstado = action.tweets
        return novoEstado
    }
  return estadoInicial;
}

const store = createStore(tweetsReducer);

window.store = store;

export default store