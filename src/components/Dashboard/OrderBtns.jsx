import { doc, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import MoonLoader from 'react-spinners/MoonLoader'
import { db } from '../../Firebase'
import { DoSt } from './Orders'

function OrderBtns({order , getOrders}) {
  const [load , setLoad] = useState(false)
  const readHandel = ()=>{
    setLoad(true)
    updateDoc(doc(db, 'orders' , order?.order_id) , 
    {
      status : 'read'
    } )
    .then(()=>{
      setLoad(false)
      getOrders()
      
    })
  }


  const ShipHandel = ()=>{
    setLoad(true)
    updateDoc(doc(db, 'orders' , order?.order_id) , 
    {
      status : 'shipped',
      isPaid : true
    } )
    .then(()=>{
      setLoad(false)
      getOrders()
      
    })
  }
  const cancelHandel = ()=>{
    setLoad(true)
    updateDoc(doc(db, 'orders' , order?.order_id) , 
    {
      status : 'canceled'
    } )
    .then(()=>{
      setLoad(false)
      getOrders()
      
    })
  }
  return (
    <div className="d-flex gap-1 align-self-center position-relative">
      {/* <Button onClick={()=>{DoSt('hello samir')}} >Temp</Button> */}
      { load && 
      <div className='bg-sucess  position-absolute d-flex bg-light mx-auto w-100 h-100 '>
        <MoonLoader color="#000" className=' mx-auto align-self-center' size="20px" />
       </div> 
      }
      
        <Button 
            onClick={readHandel}
            size='sm' variant={ order?.status === 'read' ?  'dark' : 'outline-dark'} >Read</Button>
        <Button
            onClick={ShipHandel}
            size='sm' variant={ order?.status === 'shipped' ?  'success' : 'outline-success'} >
          Shipped 
         </Button>
        <Button 
            onClick={cancelHandel}
            size='sm' variant={ order?.status === 'canceled' ?  'danger' : 'outline-danger'}  >Canceled</Button>
      
        
        </div>
  )
}

export default OrderBtns