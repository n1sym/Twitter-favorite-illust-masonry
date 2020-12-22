import React from 'react';
type typeImageListProps = {
  width: number
}
type typeImageListState = {
  rane_num: number
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
const ImageArrays: any[][] = [[],[],[]]
const rane = {rane_num: 0}

function ListItem(props: any) {
  // Correct! There is no need to specify the key here:
  return <img src={props.url} alt=""/>;
}

class ImageList extends React.Component<typeImageListProps, typeImageListState> {
  constructor(props: any) {
    super(props);
    this.state = {rane_num: props.width / 300};
  }
  setHeight = () => {
    items.forEach((item) => {
      const img = new Image();
      img.src = item;
      imageHeightList.push({url: item, height: img.height})
    });
    //const ArrayTotalHeights = [0,0,0]
    const iremono = []
    rane.rane_num = this.props.width / 300
    imageHeightList.forEach((item, index) => {
      switch (index % 3) {
        case 1:
          ImageArrays[0].push({url: item.url})
          break;
        case 2:
          ImageArrays[1].push({url: item.url})
          break;
        case 0:
          ImageArrays[2].push({url: item.url})
          break;
      }
    })
    console.log(ImageArrays)
  }

  listItems = (itemsArrays: any) => {
    return(
      <div className="flex" >
        {itemsArrays.map((items: any) => {
          return (
            <div className="flex flex-col">
              {items.map((item: any) => {
                return (
                  <div className="w-64" >
                    <ListItem key={item.id} url={item.url}/>
                  </div>
                );
                })}
            </div>
          );
        })}
      </div>
    )
  }

  LogoutButton = () => {
    return (
      <button>
        Logout
      </button>
    );
  }

  componentWillMount () {
    this.setHeight()
  }

  render() {
    return (
      <div>
        {this.listItems(ImageArrays)}
      </div>
    );
  }
}
export default ImageList