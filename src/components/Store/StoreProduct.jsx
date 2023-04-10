import { Button } from 'react-bootstrap'
import {BsCart3} from 'react-icons/bs'
import React from 'react'
import { Link, useParams } from 'react-router-dom'

function StoreProduct({product}) {
  const params = useParams()
  return (
    <Link to={`/storeId=${product?.store_id}/productId=${product?.product_id}`} className='link' >
      <div className="m-2 pr  product-card ">
            <img className=' bg-light' src={product?.images[0]} width='100%' alt="" srcset="" style={{aspectRatio : '1/1' , objectFit:'contain'}} />
            <div className=" horiz-centerd p-2 bg-ino w-100 product-title ">
              <div className='text-secondary cut-text  '>
                {product?.title} 
              </div>
              <div className='  darkblue' >
                {product?.price}$
              </div>
            </div>  
            {/* <Button  className='btn border-0 add-to-cart-btn position-absolute ' size='sm'>
              <BsCart3 fontSize="21px" className='text-secondary' />
            </Button>
            */}
      </div>
    </Link>
  )
}

export default StoreProduct