import React from 'react'
import { Button } from 'react-bootstrap'
import hero from './images/hero.jpg'

function Hero() {
  return (
    <div className='hero mt-4 vertcally-centerd horiz-centerd'>
      <div className="hero-text bg-warnng">
        <h1 className='orange- darkblue hero-big-txt fw-bold'>Sell your things  Quickly through Our easy, <br /> free  and amazing Tool</h1>
        <div className='lightblue my-4'>
          
                  The easiest way for you to sell products to your audience on your own website.<br />  Get started. Everything you need to delight your customers <br /> and grow your business. . No Monthly Fees. Get Paid Instantly.
          
        </div>
        
        <Button size='lg'  className=' my-btn orange-background btn mx-1 px-4' >Get Started</Button>
      </div>
      <div className="img-con">
       <img  src={hero} alt="" srcset="" />
      </div>
    </div>
  )
}

export default Hero