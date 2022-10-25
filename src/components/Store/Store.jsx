import React, { useEffect, useState } from 'react'
import './store.css'
import StoreNav from './StoreNav'
import {db} from '../../Firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import { Route, Routes, useParams } from 'react-router-dom'
import Collection from './Collection'
import StoreHome from './StoreHome'
// import 

function Store() {
  const params = useParams()
  const [storeInfo , setStoreInfo] = useState()
  const [load , setLoad] = useState(false)

  useEffect(()=>{
    let fetch = true
    if(fetch && params){
      setLoad(true)
      onSnapshot(doc(db , 'stores' , params?.id),(res)=>{
        setStoreInfo(res?.data())
        setLoad(false)
      })
    }
    return()=>{
      fetch = false
    }
  },[])


  return (
     <div>
      <StoreNav store={storeInfo} load={load} />
      <Routes>
        <Route path='/'  element={<StoreHome store={storeInfo}    />} />
        <Route path='/col=:col'  element={<Collection />}  />
      </Routes>
      
     </div>
  )
}

export default Store