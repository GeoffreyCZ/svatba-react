import React, { Component } from 'react';
import logo from './logo.svg';

import './App.css';
import WeddingForm from './containers/WeddingForm/WeddingForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <WeddingForm />
      </div>
    );
  }
}

export default App;
