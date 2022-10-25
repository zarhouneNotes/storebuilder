import React from 'react'

function StoreProduct({product}) {
  return (
    <div className="m-2 pr  text-center text-light ">
          <img src={product?.images[0]} width='100%' alt="" srcset="" height="100%" />
          <div className="fs-5 product-display py-3 w-100 product-title position-absolute">
           {product?.title} 
          </div>  
    </div>
  )
}

export default StoreProduct