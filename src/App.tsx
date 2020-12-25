import ImageTable from './Components/ImageTable'
import React from "react";
import {Helmet} from "react-helmet";

class App extends React.Component {
  render () {
  return (
    <div className="container mx-auto">
      <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>twi-iine-museum</title>
                <meta name="twitter:title" content="twi-iine-museum"/>
                <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/hukurouo.appspot.com/o/image%2Fwh.png?alt=media&token=5adfeea7-d45b-463e-b2f4-edceae1ab06e"/>
                <meta name="twitter:card" content="summary"/>
                <meta name="twitter:image" content="https://firebasestorage.googleapis.com/v0/b/hukurouo.appspot.com/o/image%2Fwh.png?alt=media&token=5adfeea7-d45b-463e-b2f4-edceae1ab06e"></meta>
            </Helmet>
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
