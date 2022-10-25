import React from 'react'
import {BsCart3} from 'react-icons/bs'

function StoreNav({store , load }) {
 
    
  return load ?
  <div className="py-4 mx-5 text-light text-center bg-light">Loading..</div>
   : (
    <div className='vertcally-centerd horiz-centerd py-4 mx-5 '>
        <div className=" fs-3">{store?.store_name}</div>
        <div className="menu  vertcally-centerd gap-5">
            {store?.categories?.map((cat)=>{
                return <div>{cat}</div>
            })}
        </div>
        <div>
             <BsCart3 fontSize="24px"  />
        </div>


  </div>
  )
}

export default StoreNav