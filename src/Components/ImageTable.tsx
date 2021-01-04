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

  handleChange(event: { target: {value: string} }) {
    this.setState({screen_name: event.target.value});
  }

  handleSubmit(event: any) {
    this.setState({loading: 'loading...', screen_name: this.state.screen_name.replace("@","").replace(" ","")});
    console.log(this.state)
    this.getiine()
    event.preventDefault();
  }

  async componentDidMount () {
    let queue: NodeJS.Timeout
    window.addEventListener('resize', () => {
      clearTimeout(queue);
      queue = setTimeout(()=>{
        const innerWidth = window.innerWidth
        const windowWidth = (innerWidth>500) ? Math.floor(innerWidth/300) : 2
        if (!!items.url){this.setState({raneItems: createRaneItems(windowWidth)})}
      },500)
    })
    let scqueue: NodeJS.Timeout
    window.addEventListener('scroll', () => {
      clearTimeout(scqueue);
      scqueue = setTimeout(()=>{
        const scroll_Y = document.documentElement.scrollTop + window.innerHeight
        const offsetHeight = document.documentElement.offsetHeight
        if (offsetHeight - scroll_Y <= 200 && this.state.loading !== 'loading...' && offsetHeight > 1500){
          this.setState({loading: 'loading...'})
          this.getiine()
        }
      },500)
    })
  }
  getiine = async() => {
    const images = await apitest(this.state.screen_name, this.state.max_id)
    console.log(images)
    if (items.url) {
      items.url = items.url.concat(images.url)
      items.height = items.height.concat(images.height)
      items.source = items.source.concat(images.source)
    } else {
      items = images
    }
    const innerWidth = window.innerWidth
    const windowWidth = (innerWidth>500) ? Math.floor(innerWidth/300) : 2
    this.setState({raneItems: createRaneItems(windowWidth), max_id: images.max_id, loading: ''})
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <div className="flex justify-center mb-5 mx-5">
          <p>twitterのスクリーンネームを入力してください (例：@hukurouo) </p>
        </div>
        <div className="flex justify-center mb-5 mx-auto max-w-xs">
                  <span className="inline-flex bg-gray-100 items-center px-2 rounded-l-md bg-gray-50 text-gray-500 text-sm">
                    @
                  </span>
          <input type="text"
                 inputMode="email"
                 autoCapitalize="off"
                 name="screen_name"
                 placeholder="hukurouo" 
                 value={this.state.screen_name} 
                 onChange={this.handleChange} 
                 className="bg-white focus:outline-none focus:shadow-outline rounded-r-md py-2 px-2"
          />
        </div>
        <input type="submit" value="取得" disabled={this.state.screen_name === ''} className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-r w-20 mx-auto" />
        </form>

        <ImageList raneItems={this.state.raneItems}/>
        <div className="box h-64 text-center m-5 p-4 ...">
          {this.state.loading}
        </div>
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
  let endpoint = 'https://hr4ck7ers2.execute-api.ap-northeast-1.amazonaws.com/production/fav/' + screen_name
  if (max_id){
    endpoint += '/' + max_id
  }
  const res = await axios.get(endpoint);
    if (res.data) {
      return res.data;
    } else {
      throw new Error("Unsuccessful request");
    }
}



