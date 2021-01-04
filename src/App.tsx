import ImageTable from './Components/ImageTable'
import React from "react";
import {Helmet} from "react-helmet";

class App extends React.Component {
  render () {
  return (
    <div className="container mx-auto">
      <div className="application">
      <Helmet title="twi-iine-museum"/>
        </div>
      <header className="App-header">
        Twi-Image-Museum
      </header>
      <ImageTable/>
    </div>
  );
  }
}

export default App;
