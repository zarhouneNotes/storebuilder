import React, { useEffect, useState } from 'react'
import {BsCart3} from 'react-icons/bs'
import {HiOutlineMenu} from 'react-icons/hi'
import {useMediaQuery} from 'usehooks-ts'
import {VscClose} from 'react-icons/vsc'
import { Link, NavLink, useParams } from 'react-router-dom'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db, useAuth } from '../../Firebase'

function StoreNav({store , load , badge}) {
    
  const isMobile = useMediaQuery('max-width("460px")')
  const [showMenu , setShowMenu ]  = useState(false)
  const params = useParams()

    
  return load ?
  <div className="py-4 col-12 col-lg-12  text-light text-center bg-light">Loading..</div>
   : (
    <div className={` vertcally-centerd horiz-centerd py-4 border-bottom border-secon  position-relative   ol-11 px-2 ' : 'col-lg-10 mx-auto col-md-11 col-lg-11' }`}>
        <div className=" fs-3">
          <Link className='link text-dark' to={`/storeId=${params?.id}`}  >
            {store?.store_name}
          </Link>
        </div>
        <div className={`  vertcally-centerd ga menu-mobile menu   ${showMenu ? 'menu-mobile-slide' : ''} `}>
        <div className={`${"close-icon-mobile close-icon close-icon-mobile"}`}>
            <VscClose 
                onClick={()=>{setShowMenu(false)}}
                fontSize="24px" className=" text-dark mx-3 "
                />
        </div>
            {store?.categories?.map((cat)=>{
                return (
                  <>
                   <div className='mx-2 ' onClick={()=>{setShowMenu(false)}} >
                          <Link className='link text-secondary' to={`/storeId=${params?.id}/cat=${cat}`}  >{cat}</Link>
                    </div>
                  </>
                       )
            })}
            <div className='mx-2 ' onClick={()=>{setShowMenu(false)}} >
                          <Link className='link text-secondary' to={`/storeId=${params?.id}/contact`}  >Contact</Link>
            </div>
        </div>
        <div className='vertcally-centerd gap-2 ' >

             <NavLink to={`/storeId=${params?.id}/cart`} >
               <div className='bg-dar position-relative'>
                <BsCart3 fontSize="26px"  />
                <div className=' cart-badge bg-darkblue' >
                  <span>{badge}</span>
                </div>
               </div>
             </NavLink>
             
             <HiOutlineMenu 
             onClick={()=>{setShowMenu(true)}}
             fontSize="24px" 
             className={` mx-1  close-icon`}
             />
        </div>


  </div>
  )
}

export default StoreNav