import React from 'react';
// import logo from './logo.svg';
import './App.css';
import useHookURLLoader from './hooks/useURLLoader'

// Hook
interface IShowResult {
  message: string;
  status: string;
}
// const Dogshow: React.FC<{data: IShowResult}> = ({data}) =>{
//   console.log('data:',data);
  
//   return(
//     <div>
//       <h2>dog show: {data.status}</h2>
//       <img src={data.message} alt={`图${data.message}`}/>
//     </div>
//   )
// }

const App: React.FC = () => {
  const [data, loading] = useHookURLLoader('https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1820154701,1076679668&fm=5')
  
  const dogRes = data as IShowResult
  return (
    <div className="App">
         <h2>dog show: {dogRes.status}</h2>
         <img src={dogRes.message} alt={`图${dogRes.message}`}/>
    </div>
  );
}

export default App;
