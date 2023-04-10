import React from 'react'
import { Form } from 'react-bootstrap'
import {FiSearch , FiPlus} from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'usehooks-ts'
import './products.css'

function Filters({filterProducts}) {
  const isMobile = useMediaQuery("max-width('460px')")
  return (
    <div className='filters horiz-centerd '>
        <div className='d-flex w-100'>
            <Form.Control 
            onChange={(e)=>{
              filterProducts(e.target.value)
            }}
               placeholder='search for product..'
               className='input' />
            <div className='vertcally-centerd px-3 bg-darkblue'>
                <FiSearch fontSize="20px" />
            </div>
        </div>
        <span className="mx-1"></span>
       <Link to='/dashboard/add-product' className='vertcally-centerd bg-darkblue' >
         <div className='vertcally-centerd px-3  mx-'>
            <FiPlus />
        </div>
       </Link>
    </div>
  )
}

export default Filters