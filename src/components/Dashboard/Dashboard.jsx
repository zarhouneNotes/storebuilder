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
import Orders from './Orders'
import Mails from '../Store/Mails'
import { MdMenu, MdOutlineClose } from 'react-icons/md'
import Reports from './Reports'


function Dashboard() {
    const currentUser =useAuth()
    const navigate = useNavigate()
    
    const [storeName , setStoreName] = useState('')
    const [orderBadge , setOrderBadge] = useState(0)
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
       
        <Sidebar storeName={storeName}  orderBadge={orderBadge}  />
       

        <Routes>
          <Route path='/orders' element={ <Orders  setOrderBadge={setOrderBadge}/>  } />
          <Route path='/support' element={ <Mails />  } />
          <Route path='/products' element={<Products />} />
          <Route path='/settings' element={<Settings  />} />
          <Route  path='/add-product' element={<AddProduct  />} />
          <Route  path='/edit-product=:id&edit=:edit' element={<VEProduct />} />
          <Route path='/' element={<Reports />} />
        </Routes>

        

        
    </div>
    
    
  )
}

export default Dashboard