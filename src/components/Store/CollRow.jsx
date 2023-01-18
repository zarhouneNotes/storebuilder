import React, { useEffect } from 'react'
import {BsArrowRight} from 'react-icons/bs'
import StoreProduct from './StoreProduct'
import {useMediaQuery } from 'usehooks-ts'
import { useParams } from 'react-router-dom'


function CollRow({name , sl3a , mobileMode}) {
    
    // useEffect(()=>{
    //     console.log(devMode)
    // },[])
    
    const show =()=> {
        var v = 0
        sl3a?.map((pro)=>{
        
                if (pro?.categories?.includes(name)) {
                    v  = v +1
                }
            })
           return v>0
            }
  return (
    <div className={`coll-head  mx-auto  ${  'col-md-11 col-lg-10 col-sm-11 '}   ` } >
       {show()&&  <div className='horiz-centerd vertcally-centerd mt-4 mb-2 mx-2' >
            <div className="fs-3">{name}</div>
            <div>
                
                <BsArrowRight  fontSize="24px" />
            </div>
       </div>}

        <div className='d-flex flex-wrap'>
            {sl3a?.map((pro)=> {
                return pro?.categories?.includes(name) ? (
                 <div className={`item  col-6 col-lg-3`}>
                    <StoreProduct   product={pro}/>
                 </div>
            ) : <></>
            })}
        </div>
    </div>
  )
}

export default CollRow