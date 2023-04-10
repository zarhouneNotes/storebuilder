import React from 'react'
import mored from './images/more.jpg'

function ThirdSec() {
  return (
    <div className='third-sec bg-light horiz-centerd vertcally-centerd around'>
      <div className=" third-sec-img-con">
        <img className='third-sec-img'  src={mored} alt="" />
      </div>
      <div className="third-sec-text px-4 py-2 lightblue bg-daner my-auto">
      Shuilder makes it easy to sell your ebooks, courses,  designs <br /> or  any digital assets online. We're trusted by over 130,000 <br />sellers globally. We help sellers grow  their business. Check  <br />Blog. Sign Up For Free. View Pricing. Highlights: Sign-Up<br />  For Free, Easy Setup.
      </div>
    </div>
  )
}

export default ThirdSec