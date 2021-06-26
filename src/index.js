import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import store from './store';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBye-dOZiXn3XqAUv7ztHvoEssL6dCpV6o",
  authDomain: "chat1-6a9b9.firebaseapp.com",
  databaseURL: "https://chat1-6a9b9-default-rtdb.firebaseio.com",
  projectId: "chat1-6a9b9",
  storageBucket: "chat1-6a9b9.appspot.com",
  messagingSenderId: "945902881898",
  appId: "1:945902881898:web:edef5e357d4e34b9df4e13",
  measurementId: "G-860VB7J728"
};


firebase.initializeApp(firebaseConfig);

window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
