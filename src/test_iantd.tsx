import React, {useState} from 'react';
import './App.css';
import 'iantd-react-my/dist/index.css';
import { Button, Upload, AutoComplete, Icon, Menu as TransMenu, Transition } from 'iantd-react-my'

const Test: React.FC = () => {
  const [ show, setShow ] = useState(false)

  // fetch
  const handleFetch = (query: string) => {
    // api 
    // return fetch(`https://api.github.com/search/users?q=${query}`)
    //   .then(res => res.json())
    //   .then(({ items }) => {
    //     console.log(items)
    //     return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))
    //   })

    // mock
    let MockData =  [
        {value: 'bradley', number: 11},
        {value: 'pope', number: 1},
        {value: 'caruso', number: 4},
        {value: 'cook', number: 2},
        {value: 'cousins', number: 15},
        {value: 'james', number: 23},
        {value: 'AD', number: 3},
        {value: 'green', number: 14},
        {value: 'howard', number: 39},
        {value: 'kuzma', number: 0},
      ]
      return MockData.slice(0, 10).filter((item: any) => item.value.indexOf(query) > -1)
  }
  return (
    <div className="App">
      <div style={{ display: "flex", justifyContent:"flex-start"}}>
        <Button btnType="danger" size="lg">按钮</Button>
        <Button btnType="default" size="sm">按钮</Button>
        <Button disabled size="sm">按钮</Button>
      </div>
      <div style={{ display: "flex", justifyContent:"flex-start",marginTop:"20px"}}>
          <Upload
            // headers={{'Content-Type': 'multipart/form-data'}}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onChange={file=>console.log('onChange:',file)}
            onSuccess={(data,file)=>console.log('onSuccess:', data, file)}
            onError={(error,file)=>console.log('onError:', error, file)}
            onRemove={file=>console.log('onRemove:',file)}
            // beforeUpload={checkFileSize} // checkFileSize / filePromise
            name="fileName112233"
            multiple
            // accept="image/*"
            // drag
          >
              <Button btnType="primary" size="sm">上传文件</Button>
          </Upload>

          <Upload
            // headers={{'Content-Type': 'multipart/form-data'}}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onChange={file=>console.log('onChange:',file)}
            onSuccess={(data,file)=>console.log('onSuccess:', data, file)}
            onError={(error,file)=>console.log('onError:', error, file)}
            onRemove={file=>console.log('onRemove:',file)}
            // beforeUpload={checkFileSize} // checkFileSize / filePromise
            name="fileName112233"
            multiple
            // accept="image/*"
            drag
          >
            <Icon icon="upload" size="5x" theme="secondary" />
            <br/>
            <p>Drag file over to upload</p>
          </Upload>
      </div>
      <div style={{ display: "flex", justifyContent:"flex-start",marginTop:"20px"}}>
         AutoComplete:
        <AutoComplete 
          style={{width:"300px"}}
          fetchSuggestions={handleFetch}
          onSelect={e => alert(`${e.value}  selected`)}
        />
      </div>

      <div style={{ display: "flex", justifyContent:"flex-start",marginTop:"20px"}}>
        <TransMenu
          defaultIndex="0"
          defaultOpenSubMenus={[]}
          mode="horizontal"
          onSelect={function(index){console.log(index)}}
        >
          <TransMenu.Item>
            cool link
          </TransMenu.Item>
          <TransMenu.Item>
            cool link 2
          </TransMenu.Item>
          <TransMenu.Item disabled>
            disabled
          </TransMenu.Item>
          <TransMenu.SubMenu title="下拉选项">
            <TransMenu.Item>
              下拉选项一
            </TransMenu.Item>
            <TransMenu.Item>
              下拉选项二
            </TransMenu.Item>
          </TransMenu.SubMenu>
      </TransMenu>
    </div>
    <div style={{ display: "flex", justifyContent:"flex-start",marginTop:"20px"}}>
      <div>
        <Button btnType="default" size="lg" onClick={ () => { setShow(!show) } }>Toggle</Button>
      </div>
      <Transition
        in={show}
        timeout={5000}
        animation="zoom-in-top"
        wrapper={false}
      >  
         <ul>
           <li>11111188888888888888888888888888888</li>
           <li>1111118888888888888888888888888888</li>
           <li>111111</li>
           <li>111111</li>
           <li>111111</li>
           <li>111111</li>
           <li>11111188888888888888888888888888888</li>
           <li>11111188888888888888888888888888888</li>
           <li>11111188888888888888888888888888888</li>
           <li>11111188888888888888888888888888888</li>
           <li>11111188888888888888888888888888888</li>
         </ul>
      </Transition>
      <Transition
        in={show}
        timeout={5000}
        animation="zoom-in-left"
        wrapper={true}
      >  
          <Button btnType="primary" size="lg" onClick={ () => { setShow(!show) } }> A large Button </Button>
      </Transition>
    </div>
  </div>
  )
}

export default Test;
