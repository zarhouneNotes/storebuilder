import React from 'react'
import { IoListCircle } from 'react-icons/io5'

function CartPageHeader() {
    return (
    <div>
        <div className="py-4 bg-darkblue ">    
          <div className="col-lg-8 mx-auto bg-dange fs-4 vertcally-centerd gap-2">
            <span className='my-auto'> Shopping list</span> 
            <IoListCircle  />
           </div>
        </div>
    </div>
    )
}
export default CartPageHeader