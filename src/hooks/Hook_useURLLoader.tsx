import { useState, useEffect } from 'react'
import axios from 'axios'

const useURLLoader = (url: string, deps: any[] = []) => {
  const [data, setData] = useState<any>(null)
	const [loading, setLoading] = useState(false)

	// hook中用`useEffect(cb,[like])`**（第二个参数是监听条件,如果只想在挂载和卸载的时候,使用[])
  useEffect(() => {
    setLoading(true)
    // axios.get(url).then(result => {
    //   setData(result.data)
    //   setLoading(false)
		// })
		
		// Mock
		setTimeout(() => {
			setData( {
				message:'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1820154701,1076679668&fm=5',
				status:'1233'
			})
			setLoading(false)
		}, 1000)

  }, deps)
  return [data, loading]
}

export default useURLLoader