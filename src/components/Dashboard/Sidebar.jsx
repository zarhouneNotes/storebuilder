import React, { useEffect } from 'react'
import {IoSettingsSharp} from 'react-icons/io5'
import {BiStoreAlt , BiMessageDetail} from 'react-icons/bi'
import {AiFillEye} from 'react-icons/ai'
import {HiShoppingCart} from 'react-icons/hi'
import {RiTodoFill ,RiLogoutBoxRLine} from 'react-icons/ri'
import {FiLogOut , FiMail} from 'react-icons/fi' 
import { useState } from 'react'
import Loader from '../AuthComponents/Loader'
import { db, LogOut, useAuth } from '../../Firebase'
import { Link,  } from 'react-router-dom'
import { useMediaQuery } from 'usehooks-ts'
import { orderLength } from './Orders'
import { BeatLoader, PuffLoader } from 'react-spinners'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { Button } from 'react-bootstrap'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { MenuItem, MenuList } from '@mui/material'
import { MdMenu } from 'react-icons/md'
import { VscClose } from 'react-icons/vsc'



function Sidebar({storeName }) {
  const cs = useAuth()
  const isMobile = useMediaQuery("(max-width: 700px)")
    const [load , setLoad] = useState(null)
    const [mailBadge , setMailBadge] = useState()
    const [orderBadge , setOrderBadge] = useState()
    const [mailLoad , setMailLoad] = useState(false)
    const [ordersLoad , setOrdersLoad] = useState(false)
    
    const [showSideBar , setShowSideBar] = useState(false)
    const logouthandel = (e)=>{
             setLoad(true)
            e.preventDefault()
            LogOut().finally(()=>{
                
                setLoad(false)
            })
            
    }


    useEffect(()=>{
      setMailLoad(true)
      setOrdersLoad(true)
      
      const unsubscribe1  = cs ?  onSnapshot(query(collection(db , 'mails') ,   where('store_id', '==' , cs?.uid)),(res)=>{
          setMailBadge(res.docs.length)
          setMailLoad(false)
      }) : null
      const unsubscribe2  = cs ?  onSnapshot(query(collection(db , 'orders') ,   where('store_id', '==' , cs?.uid)),(res)=>{
        setOrderBadge(res.docs.length)
        setOrdersLoad(false)
    }) : null

    // return unsubscribe1 , unsubscribe2

    },[cs])


  return (
    <>
{isMobile&& <div
        onClick={()=>{setShowSideBar(!showSideBar) }}
         className="sidebar-toggler bg-dangr border border-secondary text-secondary rounded-circle position-absolute">
            {!showSideBar ? <MdMenu fontSize='24px' className='  scale m-2' /> :  <VscClose fontSize='24px' className=' scale m-2' />}
        </div>}
    <div className={`horiz-centerd column sidebar ${showSideBar &&'show-menu'}`}>
        <div className='horiz-centerd column mobile-dash'>

       

            <Link  className='link' to={`/dashboard`}  onClick={()=>{setShowSideBar(false) }}>
              <div className=' py-3 sidebar-link bg-darkblue  '> 
              <>
              <BiStoreAlt className='fs-4 mx-2' /> 
                <span> {storeName} </span> 
                </>
              </div>
           </Link>

           
       
        <Link  className='link' to={`/storeId=${cs?.uid}`}  onClick={()=>{setShowSideBar(false) }}>
            <div className=' py-3 sidebar-link bg-darkblue  '> 
             <>
            <RiLogoutBoxRLine className='fs-4 mx-2' /> 
              <span>View store</span> 
              </>
            </div>
        </Link>



         <Link className='link'to='/dashboard/products'  onClick={()=>{setShowSideBar(false) }}>
            <div className='py-3  sidebar-link bg-darkblue '>
               <>
               <HiShoppingCart className='fs-4 mx-2' />
               <span>Products</span> 
               </>
            </div>
          </Link>

          <Link className='link' to='/dashboard/orders'  onClick={()=>{setShowSideBar(false) }}>
            <div className=' py-3 sidebar-link bg-darkblue horiz-centerd'>
              <div><RiTodoFill className='fs-4 mx-2' />   <span>Orders</span> </div>
             


              {!ordersLoad ?  
              <div style={{width : '25px' , height :'25px'}} className={`bg-light rounded-circle jus-center align-items-center ${isMobile ? 'mx-2' : 'mx-4'}`}>
                <small className={` text-dark  mx-auto my-auto`}>{orderBadge}</small>
              </div>
              :
              <div style={{width : '25px' , height :'25px'}} className={`text-light rounded-circle jus-center align-items-center ${isMobile ? 'mx-2' : 'mx-4'}`}>
                  <PuffLoader color="" size='18px' />
              </div>
              }



            </div>
          </Link>
         <Link className='link' to='/dashboard/support'  onClick={()=>{setShowSideBar(false) }}>
          
              <div className=' py-3 sidebar-link bg-darkblue horiz-centerd'>
              <div><FiMail className='fs-4 mx-2' />  Mails  </div>
             {!mailLoad ?  
              <div style={{width : '25px' , height :'25px'}} className={`bg-light rounded-circle jus-center align-items-center ${isMobile ? 'mx-2' : 'mx-4'}`}>
                 <small className={` text-dark  mx-auto my-auto`}>{mailBadge}</small>
              </div>
              :
              <div style={{width : '25px' , height :'25px'}} className={`text-light rounded-circle jus-center align-items-center ${isMobile ? 'mx-2' : 'mx-4'}`}>
                  <PuffLoader color="" size='18px' />
              </div>
              }
            </div>
            
       
          </Link>



          <Link className='link' to="/dashboard/settings"  onClick={()=>{setShowSideBar(false) }}>
            <div className=' py-3 sidebar-link bg-darkblue'>
              <IoSettingsSharp className='fs-4 mx-2' />   <span>Settings</span> 
            </div>
          </Link>
          
         {/* {
          <Button className='sidebar-link bg-darkblue' >
            <BsThreeDotsVertical />
          </Button>} */}

            


        </div>
       {<div>
       
            <div 
            onClick={logouthandel}
            className=' py-3 border-top sidebar-link bg-darkblue  px-2 horiz-centerd'> 
              <span>Log out</span> 
              {load ? <div className='my-auto mx-2'> <Loader /> </div> : <FiLogOut className='fs-4 mx-2' />} 
            </div>
        </div>}
    </div>
   
     

    </> )
}

export default Sidebar