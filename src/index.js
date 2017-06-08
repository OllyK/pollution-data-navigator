import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';

import App from './App';
import './index.css';

const store = configureStore(); // You can also pass in an initialState here

ReactDOM.render(
                <Provider store={store}>
                    <App />
                </Provider>,
                document.getElementById('root')
                );
registerServiceWorker();

