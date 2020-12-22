import React from 'react';
import ImageList from './ImageList'
type typeWindowWidthState = {
  width: number
}
class WindowWidth extends React.Component<{}, typeWindowWidthState> {
  constructor(props: any) {
    super(props);
    this.state = {width: window.innerWidth};
  }
  componentWillMount () {
    window.addEventListener('resize', () => {
      this.setState({width: window.innerWidth})
    })
  }
  render() {
    return (
      <div>
        {this.state.width / 300}
        <ImageList width={this.state.width}/>
      </div>
    );
  }
}
export default WindowWidth