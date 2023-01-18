import React, { useState } from 'react'
import Store from '../Store/Store'
import {BsPhone , BsLaptop} from 'react-icons/bs'
import {useMediaQuery} from 'usehooks-ts'


function QuickView() {
  const isMobile = useMediaQuery('max-width("460px")')
  const [mobileMode , setMobileMode] = useState(isMobile)
  const stl = mobileMode ? 'text-primary' : ''
  return (
    <div className={` h-100 bg-inf  column borde border-secondary ${mobileMode? 'quickview-mobile ' : 'quickview'}`}>
      <div className="icons-res-con d-flex border-botto border-secondary ">
        <div className="res-icons mx-4 d-flex gap-2 py-2 ">
          <div onClick={()=>{setMobileMode(true)}} className={stl}>
            <BsPhone fontSize="25px" />
          </div>
          <div onClick={()=>{setMobileMode(false)}} className={!mobileMode ? 'text-primary' : ''}>
            <BsLaptop fontSize="25px" />
          </div>
        </div>
      </div>
      <div className="border store h-100 bg- mb-3 mx-3">
      </div>
      
    </div>
  )
}

export default QuickView