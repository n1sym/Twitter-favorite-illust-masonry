import ImageTable from './Components/ImageTable'
import React from "react";
import {Helmet} from "react-helmet";
import './App.css';

class App extends React.Component {
  render () {
  return (
    <div className="container mx-auto">
      <div className="application">
      <Helmet title="iineum"/>
        </div>
      <header className="App-header">
        iineum
      </header>
      <ImageTable/>
    </div>
  );
  }
}

export default App;
