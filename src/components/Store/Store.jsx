import React, { useEffect, useState } from 'react'
import './store.css'
import StoreNav from './StoreNav'
import {db} from '../../Firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import { Route, Routes, useParams } from 'react-router-dom'
import Collection from './Collection'
import StoreHome from './StoreHome'
import Cart from './Cart'
import ProductPage from './ProductPage'

function Store({mobileMode}) {
  const params = useParams()
  const [storeInfo , setStoreInfo] = useState()
  const [load , setLoad] = useState(false)
  const [badge  , setBadge] = useState(0)

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
  useEffect(()=>{
    const addedProducts = JSON.parse(localStorage.getItem('cart'))
    setBadge(addedProducts?.length)
  },[])


  return (
     <div className='bg-dar' style={{minHeight:'100vh'}} >
      <StoreNav store={storeInfo} load={load} badge={badge} />
      <Routes>
        <Route path='/'  element={<StoreHome store={storeInfo}   />} />
        <Route path='/col=:col'  element={<Collection  />}  />
        <Route path='/cart' element={<Cart setBadge={setBadge} />}  />
        <Route path='/cat=:coll' element={<Collection />}  />
        <Route path='/productId=:id' element={ <ProductPage  setBadge={setBadge} /> }  />
      </Routes>
      
     </div>
  )
}

export default Store 