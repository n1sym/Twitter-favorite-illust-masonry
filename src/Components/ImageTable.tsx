
import React from 'react';
import ImageList from './ImageList'

type typeImageTableState = {
  raneItems: any[]
}

let items: any[] = []
const imageHeightList: { url: string; height: number; }[] = []
const RaneItems: any[] = []

class ImageTable extends React.Component<{}, typeImageTableState> {
  constructor(props: any) {
    super(props);
    this.state = {raneItems: []};
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
    const images = await apitest()
    items = images
    this.setState({raneItems: createRaneItems(Math.floor(window.innerWidth/300))})
    setTimeout(()=>{
      this.setState({raneItems: createRaneItems(Math.floor(window.innerWidth/300))})
    },500)
  }
  render() {
    return (
      <div>
        <button  onClick={this.getiine}>
          get
        </button>
        <ImageList raneItems={this.state.raneItems}/>
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
  items.forEach((item) => {
    const img = new Image();
    img.src = item;
    imageHeightList.push({url: item, height: img.height / img.width})
  });
  console.log(imageHeightList)
  imageHeightList.forEach((item)=>{
    const minHeightIndex = searchMinHeightIndex(RaneHeights)
    RaneHeights[minHeightIndex] += item.height
    RaneItems[minHeightIndex].push({url: item.url})
  })
  console.log(RaneHeights)
  return RaneItems
}

async function apitest(){
  const needle = require("needle");
  const endpointURL =
    "https://script.google.com/macros/s/AKfycbw98DaYWPjHs7L7YREK4rs12inXiM-y-G9dTU1uGWMChqLaXlhX/exec";
  const res = await needle("get", endpointURL);
    if (res.body) {
      return res.body.message;
    } else {
      throw new Error("Unsuccessful request");
    }
}



