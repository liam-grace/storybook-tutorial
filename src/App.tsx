import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from './lib/store';
import InboxScreen from './stories/InboxScreen';

function App() {
  return (
    <Provider store={store}>
      <InboxScreen />
    </Provider>
  );
}

export default App;
