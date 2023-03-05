import React from 'react'
import { Button } from 'react-bootstrap'

function OrderBtns({order}) {
  return (
    <div className="d-flex gap-1 align-self-center">
        
        <Button size='sm' variant='outline-dark' className='btn ' >Read</Button>
        <Button
        onClick={()=>{console.log(order?.status)}}
         size='sm' variant={ order?.status === 'shipped' ?  'success' : 'outline-success'} >Shipped</Button>
        <Button size='sm' variant={ order?.status === 'canceled' ?  'danger' : 'outline-danger'}  >Canceled</Button>
      </div>
  )
}

export default OrderBtns