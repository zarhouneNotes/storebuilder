import React from 'react'
import Store from '../Store/Store'
import {BsPhone , BsLaptop} from 'react-icons/bs'

function QuickView() {
  return (
    <div className='quickview h-100 bg-inf  column borde border-secondary'>
      <div className="icons-res-con d-flex border-botto border-secondary ">
        <div className="res-icons mx-4 d-flex gap-2 py-2 ">
          <div>
            <BsPhone fontSize="25px" />
          </div>
          <div>
            <BsLaptop fontSize="25px" />
          </div>
        </div>
      </div>
      <div className="border store h-100 bg- mb-3 mx-3">
        <Store />
      </div>
      
    </div>
  )
}

export default QuickView