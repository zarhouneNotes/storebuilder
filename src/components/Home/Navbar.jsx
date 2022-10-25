import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='nav'>
        <div className="logo vertcally-centerd">
         <img className='my-auto' src="https://img.icons8.com/bubbles/50/000000/support.png"/>
         <h2>
             SHUILDER
          </h2>
        </div>
        <div className="btns">
          <Link to='/signup'>
            <Button  className='my-btn btn mx-1 px-4' >Become a seller</Button>
          </Link>
          <Link to='/login'>
           <Button className=' mx-1 btn my-outlined-btn'>Log In</Button>
          </Link>
          
        </div>
    </div>
  )
}

export default Navbar