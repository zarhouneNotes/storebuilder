import React from 'react'
import { Link } from 'react-router-dom'
import {BsFacebook ,BsTwitter , BsYoutube , BsInstagram , BsPinterest} from 'react-icons/bs'

function Footer() {
  return (
    // <div className=''>
       <div className="d-flex justify-content-around align-items-center bg- bg-darkblue  py-4">

        
        <div className="list">
        <Link to='/'className="mylink">
            <div >
            Home
            </div>
          </Link>
          <Link to='/'className="mylink">
            <div >
            About us
            </div>
          </Link>
          <Link to='/signup'className="mylink">
            <div >
           Become a Seller
            </div>
          </Link>
          <Link to='/login'className="mylink">
            <div >
            Log In 
            </div>
          </Link>
          <Link to='/signup'className="mylink">
            <div >
            Sign Up 
            </div>
          </Link>

          
        </div>

        <div className="log_social_icons gap-5 bg-in   ">
          <div className="logo vertcally-centerd">
          <img className='my-auto' src="https://img.icons8.com/bubbles/50/000000/support.png"/>
          <h4>
              SHUILDER
            </h4>
          </div>
        <div className="icons d-flex justify-content-around">
            <BsFacebook  className='footer-icon' />
            <BsTwitter className='footer-icon'/>
            <BsYoutube className='footer-icon'/>
            <BsInstagram className='footer-icon' />
            <BsPinterest className='footer-icon' />
          </div>

        </div>
        
       </div>
    // {/* </div> */}
  )
}

export default Footer