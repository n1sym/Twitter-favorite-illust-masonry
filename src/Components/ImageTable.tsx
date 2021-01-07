import React from 'react';
import ImageList from './ImageList'
import axios from 'axios';

type typeImageTableState = {
  raneItems: typeRaneItems[][]
  loading: string
  screen_name: string
  max_id: string
}

type typeItems = {
  url: string[]
  height: number[]
  source: string[]
  max_id: string
}

type typeRaneItems = {
  url: string
  source: string
}

let items: typeItems = {url: [], height: [], source: [], max_id: ''}

class ImageTable extends React.Component<{}, typeImageTableState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      raneItems: [],
      loading: "",
      screen_name: "",
      max_id: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: { target: { value: string } }) {
    items = {url: [], height: [], source: [], max_id: ''}
    this.setState({ screen_name: event.target.value });
  }

  handleSubmit(event: any) {
    this.setState({
      loading: "loading...",
      screen_name: this.state.screen_name.replace(" ", ""),
    });
    setTimeout(() => {
      if (this.state.loading === "loading...") {
        this.setState({ loading: "取得に失敗しました。データが空か、スクリーンネームが間違っているかもしれません。" });
      }
    }, 5000);
    this.getiine();
    event.preventDefault();
  }

  async componentDidMount() {
    let queue: NodeJS.Timeout;
    window.addEventListener("resize", () => {
      clearTimeout(queue);
      queue = setTimeout(() => {
        const innerWidth = window.innerWidth;
        const windowWidth = innerWidth > 500 ? Math.floor(innerWidth / 300) : 2;
        if (!!items.url) {
          this.setState({ raneItems: createRaneItems(windowWidth) });
        }
      }, 500);
    });
    let scqueue: NodeJS.Timeout;
    window.addEventListener("scroll", () => {
      clearTimeout(scqueue);
      scqueue = setTimeout(() => {
        const scroll_Y = document.documentElement.scrollTop + window.innerHeight;
        const offsetHeight = document.documentElement.offsetHeight;
        if (
          offsetHeight - scroll_Y <= 1000 &&
          this.state.loading !== "loading..." &&
          offsetHeight > 1500
        ) {
          this.setState({ loading: "loading..." });
          this.getiine();
        }
      }, 500);
    });
  }
  getiine = () => {
    apitest(this.state.screen_name, this.state.max_id).then((res) => {
      this.setIineImages(res)
    }).catch(()=>{
      this.setState({ loading: "取得に失敗しました。データが空か、スクリーンネームが間違っているかもしれません。" });
    })
  };

  setIineImages = (images: any) => {
    console.log(images);
    if (items.url) {
      items.url = items.url.concat(images.url);
      items.height = items.height.concat(images.height);
      items.source = items.source.concat(images.source);
    } else {
      items = images;
    }
    if (items.url.length === 0) {
      this.setState({ loading: "いいねした画像がありませんでした" })
      return
    }
    const innerWidth = window.innerWidth;
    const windowWidth = innerWidth > 500 ? Math.floor(innerWidth / 300) : 2;
    this.setState({
      raneItems: createRaneItems(windowWidth),
      max_id: images.max_id,
      loading: "",
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="flex justify-center mb-5 mx-5">
            <p className="md-5">twitterのスクリーンネームを入力してください（例：@hukurouo）
            <br/><br/>
            その人がいいねした画像が良い感じに表示されます。
            </p>
          </div>
          <div className="flex mb-5 mx-auto max-w-xs">
            <div className="mt-1 relative rounded-md shadow-sm mx-5 w-11/12">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">@</span>
              </div>
              <input
                type="text"
                autoCapitalize="off"
                name="screen_name"
                value={this.state.screen_name}
                onChange={this.handleChange}
                className="bg-white focus:outline-none focus:shadow-outline py-2 px-8 rounded-md w-full"
              />
            </div>
          </div>
          <div className="flex justify-center mb-5 mx-5">
          <input
            type="submit"
            value="取得"
            disabled={this.state.screen_name === ""}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 mx-2 rounded w-20 mb-10"
          />
          </div>
        </form>
        <ImageList raneItems={this.state.raneItems} />
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

function createRaneItems(rane_num: number): typeRaneItems[][]{
  const RaneItems: typeRaneItems[][] = []
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

function apitest(screen_name: string, max_id: string){
  let endpoint = 'https://hr4ck7ers2.execute-api.ap-northeast-1.amazonaws.com/production/fav/' + screen_name
  if (max_id){
    endpoint += '/' + max_id
  }
  return new Promise((resolve, reject) => {
    axios.get(endpoint).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}