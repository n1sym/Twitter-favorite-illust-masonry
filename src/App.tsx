import ImageTable from './Components/ImageTable'
import React from "react";
import './App.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';

class App extends React.Component {
  render () {
  return (
    <HelmetProvider>
      <Helmet>
        <title>iineum</title>
      </Helmet>
      <div className="container mx-auto">
        <header className="App-header">
          iineum
        </header>
        <ImageTable/>
      </div>
    </HelmetProvider>
  );
  }
}

export default App;
