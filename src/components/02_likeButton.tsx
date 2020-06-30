import React, { useState, useEffect, useRef, useContext } from 'react'
import { ThemeContext } from '../App'
const LikeButton: React.FC = () => {
	// userState
  const [like, setLike] = useState(0)

  //useRef(取值 .current)
  const likeRef = useRef(0) // {current: xx}
  const didMountRef = useRef(false)
  const domRef = useRef<HTMLInputElement>(null) // dom节点

  // useContext
  const theme = useContext(ThemeContext)
  console.log(theme)
  const style = {
    background: theme.background,
    color: theme.color,
  }
  
	// userEffect
  useEffect(() => {
    console.log('like变化，document title effect is running')
    document.title = `点击了${like}次`
  }, [like]) // (like变化时才会执行)
  useEffect(() => {
    console.log('didMountRef:',didMountRef)
    
    if (didMountRef.current) {
      console.log('this is updated')
    } else {
      didMountRef.current = true
    }
  })
  useEffect(() => {
    console.log('domRef:',domRef)

    if (domRef && domRef.current) {
      domRef.current.focus()
    }
  })
  function handleAlertClick() {
    console.log('likeRef:',likeRef)
    
    setTimeout(() => {
      alert('you clicked on ' + likeRef.current)
    }, 1000)
  }
  return (
    <div>
        {/* useRef dom节点 */}
        <input type="text" ref={domRef} />
        {/* useContext */}
        <button style={style} onClick={() => {setLike(like + 1); likeRef.current++}}>
          {like} 👍
        </button>
        {/* 访问dom节点 */}
        <button onClick={handleAlertClick}> Alert!
        </button>
    </div>
  )
}
export default LikeButton