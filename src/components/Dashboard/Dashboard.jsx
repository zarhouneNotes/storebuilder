import React, { useEffect, useState } from 'react'
import '../Home/home.css'
import './dashboard.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { db, LogOut, useAuth } from '../../Firebase'
import Sidebar from './Sidebar'
import Settings from './Settings'
import Products from '../products/Products'
import AddProduct from '../products/AddProduct'
import VEProduct from '../products/VEProduct'
import QuickView from './QuickView'
import { doc, onSnapshot } from 'firebase/firestore'

function Dashboard() {
    const currentUser =useAuth()
    const navigate = useNavigate()
    
    const [storeName , setStoreName] = useState('')
    useEffect(()=>{
      let fetch = true
      if(fetch && currentUser){
          onSnapshot(doc(db , 'stores' , currentUser?.uid), (res)=>{
              const d = res.data()
             setStoreName(d?.store_name)
              
          })
      }
      return ()=>{
          fetch = false
      }
  },[currentUser])
    
    if (!currentUser) {
        navigate('/login')
      }
    


  return (
    <div className='dashboard'>
        <Sidebar storeName={storeName} />
        <Routes>
          <Route path='/orders' element={<h1>ORDERS</h1>} />
          <Route path='/products' element={<Products />} />
          <Route path='/settings' element={<Settings  />} />
          <Route  path='/add-product' element={<AddProduct  />} />
          <Route  path='/edit-product=:id&edit=:edit' element={<VEProduct />} />
          <Route path='/storeId=:id&:dev' element={<QuickView />} />
        </Routes>
    </div>
    
    
  )
}

export default Dashboard