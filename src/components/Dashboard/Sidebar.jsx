import React from 'react'
import {IoSettingsSharp} from 'react-icons/io5'
import {BiStoreAlt} from 'react-icons/bi'
import {AiFillEye} from 'react-icons/ai'
import {HiShoppingCart} from 'react-icons/hi'
import {RiTodoFill ,RiLogoutBoxRLine} from 'react-icons/ri'
import {FiLogOut} from 'react-icons/fi' 
import { useState } from 'react'
import Loader from '../AuthComponents/Loader'
import { LogOut, useAuth } from '../../Firebase'
import { Link,  } from 'react-router-dom'
import { useMediaQuery } from 'usehooks-ts'



function Sidebar({storeName}) {
  const cs = useAuth()
  const isMobile = useMediaQuery("(max-width: 700px)")
    const [load , setLoad] = useState(null)
    const logouthandel = (e)=>{
             setLoad(true)
            e.preventDefault()
            LogOut().finally(()=>{
                
                setLoad(false)
            })
            
    }
  return (
    <>
   {isMobile &&  <div className="mobile-console horiz-centerd bg-darkblue py-3 vertcally-centerd position-absolute">
         <div className='fs-5'>{storeName}</div>
         <div className='vertcally-centerd gap-3'>
         <Link  className='link' to={`/storeId=${cs?.uid}`}>
            <div className=' bg-darkblue '>  
              <BiStoreAlt className='fs-3 ' />
            </div>
        </Link>
         <Link className='text-white' to="/dashboard/settings" >
           <IoSettingsSharp className='fs-3 ' />
         </Link> 
         
           
          <div className='bg-anger text-center' onClick={logouthandel} >
           { !load ? <FiLogOut className='fs-3' /> :
            <Loader />}
          </div>
          
            
         
         </div>
      </div> }
    <div className='horiz-centerd column sidebar  '>
        <div className='horiz-centerd column mobile-dash'>
       {!isMobile && <Link className='link' to='/dashboard/store'>
            <div className=' py-3 border-bottom sidebar-link bg-darkblue text-cenetr'>
              <BiStoreAlt className='fs-4 mx-2' />{storeName}
            </div>
         </Link>}       
           
        {!isMobile && 
        <Link className='link'to={`/dashboard/storeId=${cs?.uid}&dev`}>
            <div className='py-3  sidebar-link bg-darkblue'>
               <AiFillEye className='fs-4 mx-2' />  How it looks
            </div>
         </Link>}



         <Link className='link'to='/dashboard/products'>
            <div className='py-3  sidebar-link bg-darkblue'>
               <><HiShoppingCart className='fs-4 mx-2' />Products</>
            </div>
          </Link>

          <Link className='link' to='/dashboard/orders'>
            <div className=' py-3 sidebar-link bg-darkblue'>
              <><RiTodoFill className='fs-4 mx-2' />  Orders</>
            </div>
          </Link>



      {!isMobile &&  <Link className='link' to="/dashboard/settings">
            <div className=' py-3 sidebar-link bg-darkblue'>
              <IoSettingsSharp className='fs-4 mx-2' />  Settings
            </div>
          </Link>}

        </div>
       {!isMobile && <div>
        <Link  className='link' to={`/storeId=${cs?.uid}`}>
            <div className=' py-3 sidebar-link bg-darkblue px-2 horiz-centerd'> 
              <span>View store</span> 
              <RiLogoutBoxRLine className='fs-4 mx-2' /> 
            </div>
        </Link>
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