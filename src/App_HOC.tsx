import React from 'react';
import './App.css';
import Hocwithloader from './components/HOC_withLoader'

// HOC
interface IShowResult {
  message: string;
  status: string;
}
const Dogshow: React.FC<{data: IShowResult}> = ({data}) =>{
  console.log('data:',data);
  
  return(
    <div>
      <h2>dog show: {data.status}</h2>
      <img src={data.message} alt={`图${data.message}`}/>
    </div>
  )
}

const App: React.FC = () => {
  // 高阶组件就是一个函数，接收一个组件作为参数，返回一个新的组件
  const WrapperDogshow = Hocwithloader(Dogshow,'url')
  return (
    <div className="App">
       <WrapperDogshow />
    </div>
  );
}

export default App;
