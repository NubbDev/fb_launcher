import React from 'react';
import {createRoot} from 'react-dom/client'
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux'
import store from './store'

const win = nw.Window.get();
win.showDevTools();

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store.store}>
    <App />
    </Provider>
  </React.StrictMode>,
);
