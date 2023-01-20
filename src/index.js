import React from "react";
import  { createRoot } from "react-dom/client";
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import rootReducer from './Redux/Reducers'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import TimerMiddleware from './Utils/TimerMiddleware';
import 'semantic-ui-css/semantic.min.css'
import AuthProvider from "./Provider/AuthProvider";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, TimerMiddleware)))

/* setInterval(function () {
  store.dispatch({
    type: 'INCREMENT_TIMER'
  })
}, 1000) */

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<AuthProvider>
  <Provider store={store}>
    <BrowserRouter >
      <App />
    </BrowserRouter>
  </Provider>
</AuthProvider>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
