import React from 'react'
import { IoListCircle } from 'react-icons/io5'

function CartPageHeader() {
    return (
    <div>
        <div className="py-3 bg-darkblue ">    
          <div className="col-lg-8 mx-auto bg-dange fs-5 vertcally-centerd  gap-2">
            <div className='my-auto'> Shopping list</div> 
            <IoListCircle  />
           </div>
        </div>
    </div>
    )
}
export default CartPageHeader