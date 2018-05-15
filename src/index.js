import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducer'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';



// console.log(typeof(reducer));
const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

ReactDOM.render(<App  store={store}/>, document.getElementById('root'));
registerServiceWorker();
