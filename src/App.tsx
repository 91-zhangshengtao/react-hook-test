import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import LikeButton from './components/likeButton'
import Test from './test_iantd'


// userContext
interface IThemeProps {
  [key: string]: {color: string; background: string;}
}
const themes: IThemeProps = {
 'light': {
   color: '#000',
   background: '#eee',
 },
 'dark': {
    color: '#fff',
    background: '#222',
  }
}
export const ThemeContext = React.createContext(themes.light)

const App: React.FC = () => {
  const [ show, setShow ] = useState(true)
  return (
    <div className="App">
      <Test />
      <ThemeContext.Provider value={themes.dark}>
          <h2>dog show: {`xxx`}</h2>
          <img src={`https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1820154701,1076679668&fm=5`} alt={`图${`xxx`}`}/>
          <LikeButton></LikeButton>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
