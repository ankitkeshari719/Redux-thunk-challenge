import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducer'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

console.log("vale of store state inside index js",store.getState())
ReactDOM.render(
    <Provider store={store}>
      <App  store={store}/>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
