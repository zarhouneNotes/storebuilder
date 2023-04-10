import React from 'react'

function BigButton({value , label , bg , profit}) {
  return (
    <div className={`big-btn border py-2 border-light text-center ${profit ? 'col-11' : 'col-6'} col-lg-2  `} style={{backgroundColor:bg}} >
        <div className='fs-1' > {value} </div>
        <small className="text-secodary">
            {label}
        </small>
    </div>
  )
}

export default BigButton