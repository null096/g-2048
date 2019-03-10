import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './components/App';
import stores from './stores';
import * as serviceWorker from './serviceWorker';
import './styles/main.scss';

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
