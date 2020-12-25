import ImageTable from './Components/ImageTable'
import React from "react";
import {Helmet} from "react-helmet";

class App extends React.Component {
  render () {
  return (
    <div className="container mx-auto">
      <div className="application">
      <Helmet
      title="twi-iine-museum"
      meta={[
        {
          name: `description`,
          content: "いいねした画像を並べるやつ",
        },
        {
          property: `og:title`,
          content: "twi-iine-museum",
        },
        {
          property: `og:description`,
          content: "いいねした画像を並べるやつ",
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: "hukurouo",
        },
        {
          name: `twitter:title`,
          content: "twi-iine-museum",
        },
        {
          name: `twitter:description`,
          content: "いいねした画像を並べるやつ",
        },
      ]}
    />
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
