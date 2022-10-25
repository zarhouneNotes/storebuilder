import React from 'react'
import { IoClose } from 'react-icons/io5'

function Category({value , deleteHandel}) {
  return (
    <div className='border position-relative'>
        <IoClose cursor='pointer' className='delete-variant' onClick={deleteHandel} />
        <div className='bg-light px-5 py-2'>
            {value}
        </div>
    </div>
  )
}

export default Category