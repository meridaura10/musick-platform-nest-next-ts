import { storage } from '@/firebase'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const index = () => {
  const [t, setT] = useState<any[]>([])
  const [p, setP] = useState<any[]>([])


  useEffect(() => {
    axios.get('https://musick-platform-nest-next-ts.vercel.app/tracks').then((data: any) => {
      setT(data.data)
    }).catch(e => {
      alert(e)
      console.log('data error', e);

    })
    console.log(storage);

  }, [])
  return (
    <div>
      {t.map(e => {
        return <div key={e._id}>
          {e.text}
        </div>
      })}
    </div>
  )
}

export default index