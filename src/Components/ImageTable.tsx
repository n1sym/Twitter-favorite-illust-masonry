import React from 'react';
import ImageList from './ImageList'

type typeImageTableState = {
  raneItems: any[]
}

const items = [
  "https://pbs.twimg.com/media/EpunwUpUYAMm4Hb?format=jpg&name=900x900",
  "https://pbs.twimg.com/media/Epf-6xNU0AAGHmv?format=jpg&name=900x900",
  "https://pbs.twimg.com/media/Epz2A_oUcAA3si4?format=jpg&name=small",
  "https://pbs.twimg.com/media/EpmVIYqUUAYwU5G?format=jpg&name=small",
  "https://pbs.twimg.com/media/EpgxatWUYAABPoq?format=png&name=small",
  "https://pbs.twimg.com/media/Epl46eZU0AAdsFo?format=jpg&name=small",
  "https://pbs.twimg.com/media/Epk_TyXUcAESKgo?format=jpg&name=900x900",
  "https://pbs.twimg.com/media/EerIeFpVoAApYab?format=jpg&name=small",
  "https://pbs.twimg.com/media/EphoSBCVQAMErzi?format=jpg&name=900x900",
  "https://pbs.twimg.com/media/EpInyNpVQAA2t_l?format=jpg&name=medium",
  "https://pbs.twimg.com/media/EpcTo2eUYAAIshu?format=jpg&name=900x900",
  "https://pbs.twimg.com/media/EpWW0N-UwAATbKu?format=jpg&name=small",
  "https://pbs.twimg.com/media/EpX-lmzVoAECfjV?format=jpg&name=small",
  "https://pbs.twimg.com/media/EpWHEBqVQAAoVrn?format=jpg&name=small",
  "https://pbs.twimg.com/media/EpRsRJoU8AAr9ij?format=jpg&name=small",
  "https://pbs.twimg.com/media/EkS7POrVgAASBY7?format=jpg&name=900x900",
  "https://pbs.twimg.com/media/EpGzRzkVoAAdypg?format=jpg&name=small",
  "https://pbs.twimg.com/media/EpMI5CRUwAMkioJ?format=jpg&name=900x900",
  "https://pbs.twimg.com/media/EpM1cdtVoAEAakL?format=jpg&name=small"

]
const imageHeightList: { url: string; height: number; }[] = []
const RaneItems: any[] = []

class ImageTable extends React.Component<{}, typeImageTableState> {
  constructor(props: any) {
    super(props);
    this.state = {raneItems: []};
  }
  componentDidMount () {
    let queue: NodeJS.Timeout
    this.setState({raneItems: createRaneItems(Math.floor(window.innerWidth/300))})
    console.log("tst")
    window.addEventListener('resize', () => {
      clearTimeout(queue);
      queue = setTimeout(()=>{
        this.setState({raneItems: createRaneItems(Math.floor(window.innerWidth/300))})
        console.log( createRaneItems(Math.floor(window.innerWidth/300)))
      },500)
    })
  }
  render() {
    return (
      <div>
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
    imageHeightList.push({url: item, height: img.height})
  });
  imageHeightList.forEach((item)=>{
    const minHeightIndex = searchMinHeightIndex(RaneHeights)
    RaneHeights[minHeightIndex] += item.height
    RaneItems[minHeightIndex].push({url: item.url})
  })
  return RaneItems
}


