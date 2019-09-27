import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { createBrowserHistory } from 'history';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const history = createBrowserHistory({ basename: baseUrl });

const initialState = window.initialReduxState;
const store = configureStore(history, initialState);


const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
     <ConnectedRouter history={history}> 
      <App />
     </ConnectedRouter> 
 </Provider>,
  rootElement);

registerServiceWorker();
