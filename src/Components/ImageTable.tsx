
import React from 'react';
import ImageList from './ImageList'
import axios from 'axios';

type typeImageTableState = {
  raneItems: any[]
  loading: string
  screen_name: string
  max_id: string
}

let items: any = {}
const imageHeightList: { url: string; height: number; source: string;}[] = []
const RaneItems: any[] = []

class ImageTable extends React.Component<{}, typeImageTableState> {
  constructor(props: any) {
    super(props);
    this.state = {
      raneItems: [],
      loading: '',
      screen_name: '',
      max_id: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: { target: any; }) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    let partialState: any = {};
    partialState[name] = value;
    this.setState(partialState);
  }

  handleSubmit(event: any) {
    this.setState({loading: 'loading...'});
    console.log(this.state)
    this.getiine()
    event.preventDefault();
  }

  async componentDidMount () {
    let queue: NodeJS.Timeout
    window.addEventListener('resize', () => {
      clearTimeout(queue);
      queue = setTimeout(()=>{
        this.setState({raneItems: createRaneItems(Math.floor(window.innerWidth/300))})
      },500)
    })
  }
  getiine = async() => {
    const images = await apitest(this.state.screen_name, this.state.max_id)
    console.log(images)
    items = images
    this.setState({raneItems: createRaneItems(Math.floor(window.innerWidth/300)), max_id: items.max_id})
  }
  render() {
    return (
      <div>
        <ImageList raneItems={this.state.raneItems}/>
        <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" name="screen_name" value={this.state.screen_name} onChange={this.handleChange} />
        </label>
        <label>
          Max_id:
          <input type="text" name="max_id" value={this.state.max_id} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
        </form>
        {this.state.loading}
      </div>
    );
  }
}
export default ImageTable

function searchMinHeightIndex(array: number[]){
  let minIndex=0;
  let minHeight=100000;
  array.forEach((item, index)=>{
    if(minHeight > item){
      minIndex = index
      minHeight = item
    }
  })
  return minIndex
}

function createRaneItems(rane_num: number){
  RaneItems.length = 0
  imageHeightList.length = 0
  for (let i=0; i<rane_num; i++){
    RaneItems.push([])
  }
  const RaneHeights = Array(rane_num).fill(0)
  items.url.forEach((item: any, index: number)=>{
    const minHeightIndex = searchMinHeightIndex(RaneHeights)
    RaneHeights[minHeightIndex] += items.height[index]
    RaneItems[minHeightIndex].push({url: item, source: items.source[index]})
  })
  console.log(RaneHeights)
  return RaneItems
}

async function apitest(screen_name: string, max_id: string){
  const res = await axios.get(
    `${'https://hr4ck7ers2.execute-api.ap-northeast-1.amazonaws.com/production/fav'}/${screen_name}`
  );
    if (res.data) {
      return res.data;
    } else {
      throw new Error("Unsuccessful request");
    }
}



