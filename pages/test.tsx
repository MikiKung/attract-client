import React, { useEffect, useState } from 'react'
import axios from 'axios'

const test = () => {
  const [data, setData] = useState([])
  const [data1, setData1] = useState([])
  useEffect(() => {
    axios.get(`http://localhost:3001/category`).then((res) => {
      // console.log(res.data);
      setData(res.data)
    })
  },[])


  function test1(){
    axios.get(`http://localhost:3001/comment`).then((res)=>{
      setData1(res.data)
    })
  }
  return (
    <div>
      {data.map((e: any) => {
        return <div>{e.name}</div>
      })}
      <div onClick={test1}>testttttt</div>

      {data1.map((e: any) => {
        return <div>{e.commentText}</div>
      })}

    </div>
  )
}

export default test
