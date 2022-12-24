import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import './index.css';
import App from './component/App';
import reportWebVitals from './reportWebVitals';
import reducers from './module';


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={
    createStoreWithMiddleware(
      reducers,
      window.__REDUX_DEVTOOLS_EXTENSION__
      && window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
    >
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
