import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { BsCheckCircleFill } from 'react-icons/bs'
import {MdClose} from 'react-icons/md'

function Mail({details , showContent, setShowContent}) {
    const mailTime = new Date(details?.time.seconds * 1000 + details?.time.nanoseconds/1000000)
    
    // const [showContent , setShowContent] = useState('')   
  return (
   <div className="bg-light mail"  style={{border : (showContent== details?.email  )? '1px grey solid' : 'none'}} >
     <div 
     
     onClick={()=>{setShowContent(details?.email)}}
     className='vertcally-centerd  gap-2 col-lg-11 mx-auto py-2 my-1 horiz-centerd bg-light'>
        <div className="text-secondary"><small>{mailTime.toLocaleDateString()}</small></div>
        <div className="">{details?.user}</div>
        <small className="cut-text text-secondary w-75">{details?.message}</small>
        <div><BsCheckCircleFill className='darkblue' /></div>

    </div>

   
        
        {showContent== details?.email && <div className="bg-inf col-11 col-lg-6 mail-content showmailcontent  py-3 mx-auto">
            <hr />
            <div className='text-secondary horiz-centerd' > <small>From : {details?.email}</small> <MdClose   onClick={()=>{setShowContent()}} /></div>
            <div className='text-secondary' ><small>full name :  {details?.user}</small></div>

            <div className=' col-8 mx-aut my-3 text-left bg-prmary '>
            {details?.message}
            </div>
            <div className="text-secondary"><small>{mailTime.toLocaleString()}</small></div>
            {/* <Form className='bg-drk text-center'>
                <textarea className='input w-100' placeholder='reply..' rows='3'  />
                <Button className='btn w-50 mx-auto border-0 bg-darkblue'>Send</Button>
            </Form> */}
        </div>}
 
   </div>
  )
}

export default Mail