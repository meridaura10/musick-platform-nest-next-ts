import axios from 'axios'
import React, { useEffect, useState } from 'react'

const index = () => {
  const [t, setT] = useState<any[]>([])
  const [p, setP] = useState<any[]>([])


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/tracks`).then((data: any) => {
      console.log(data);
      
      // setT(data.data)
    }).catch(e => {
      console.log('error Tracks:', e);

    })
  }, [])
  useEffect(() => {
    axios.get('https://mern-blog-b.vercel.app/posts').then((data: any) => {
      // console.log(data);
      
      setP(data.data)
    }).catch(e => {
      console.log('error Post: ', e);

    })
  }, [])
  return (
    <div>
      {p.map(e =>{
        return <div key={e._id}>
          {e.text}
        </div>
      })}
    </div>
  )
}

export default index