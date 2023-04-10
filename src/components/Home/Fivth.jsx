import React from 'react'

function Fivth() {
    const url  = 'https://img.freepik.com/vecteurs-libre/commander-illustration-concept-nourriture_114360-6860.jpg'
  return (
    <div className='third-sec bg-light horiz-centerd vertcally-centerd around'>
        <div className=" third-sec-img-con">
        <img className='third-sec-img'  src={url} alt="" />
        </div>
        <div className="third-sec-text px-4 py-2 lightblue bg-daner my-auto">
        Convenience: One of the biggest benefits of shopping online is <br />the convenience it provides. You can shop from the comfort <br />of your own home or anywhere with an internet connection,<br /> and you don't need to travel to physical stores, deal with <br /> parking or wait in lines. Online shopping allows you to shop at any<br /> time of the day or night, making it ideal for busy individuals.
        </div>
    </div>
  )
}

export default Fivth