import React from 'react'
import {BsArrowRight} from 'react-icons/bs'
import StoreProduct from './StoreProduct'

function CollRow({name , sl3a}) {
    
    const show =()=> {
        var v = 0
        sl3a?.map((pro)=>{
        
                if (pro?.categories?.includes(name)) {
                    v  = v +1
                }
            })
           return v>0
            }
    console.log(show())
  return (
    <div className='coll-head  col-10 mx-auto ' >
       {show()&&  <div className='horiz-centerd vertcally-centerd mt-4 mb-2' >
            <div className="fs-3">{name}</div>
            <div>
                
                <BsArrowRight  fontSize="24px" />
            </div>
       </div>}

        <div className='d-flex flex-wrap'>
            {sl3a?.map((pro)=> {
                return pro?.categories?.includes(name) ? (
                 <div className="item col-lg-3 col-md-4 col-sm-12 ">
                    <StoreProduct  product={pro}/>
                 </div>
            ) : <></>
            })}
        </div>
    </div>
  )
}

export default CollRow