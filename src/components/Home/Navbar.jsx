import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {useAuth} from '../../Firebase'
import { BsArrowRight } from 'react-icons/bs'

function Navbar() {
  const cs  = useAuth()
  // console.log(cs)
  
  return (
    <div className='nav'>
        <div className="logo vertcally-centerd">
         <img className='my-auto' src="https://img.icons8.com/bubbles/50/000000/support.png"/>
         <h2>
             SHUILDER
          </h2>
        </div>
       { cs ? 
       <Link className="mylink" to='/dashboard'>
        <div className="orange-color px-2">
         <BsArrowRight className='my-auto mx-1' /> 
          Dashboard
        </div>  
       </Link>
         :
          <div className="btns">
          <Link to='/signup'>
            <Button  size='sm' className='my-btn btn mx-1 px-4' >Become a seller</Button>
          </Link>
          <Link to='/login'>
           <Button size='sm' className=' mx-1 btn my-outlined-btn'>Log In</Button>
          </Link>
          
        </div>}
    </div>
  )
}

export default Navbar