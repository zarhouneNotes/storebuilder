import React from 'react'
import east from './images/easy-to-reach.jpg'
import advanrages from './images/advantages.jpg'
import safe from './images/safe.jpg'

function WhyUs() {
  return (
  <div>
    <div className='text-center darkblue mt-5'>
      <h1>Why Us ?</h1>
    </div>

      <div className='horiz-centerd mt-5 cards  around '>
          <div className='column vertcally-centerd text-center' >
            <img src={east} alt="" width='160px' />
            <div className=' fs-4 darkblue my-1 fw600'>Easy to use</div>
            <div className='lightblue'>
              <small>
              easiest way for you to sell <br /> products to your audience <br /> on your own website
              </small>
            </div>
          </div>

          <div className='column vertcally-centerd text-center' >
            <img src={safe} alt="" width='160px' />
            <div className=' fs-4 darkblue  my-1 fw600'>Quick and Safe</div>
            <div className='lightblue'>
              <small>
              easy to sell your ebooks, <br /> courses, designs or any  <br /> digital assets online
              </small>
            </div>
          </div>


          <div className='column vertcally-centerd text-center' >
            <img src={advanrages} alt="" width='160px' />
            <div className=' fs-4 darkblue  my-1 fw600'>Free and Secure</div>
            <div className='lightblue'>
              <small>
              Everything you need to delight your <br /> customers ,No Monthly Fees. <br /> Get Paid Instantly.
              </small>
            </div>
          </div>

        

         
          
        </div>
      </div>
  )
}

export default WhyUs