import React from 'react'
import {BsFillTelephoneFill, BsPersonCircle , BsFillInfoCircleFill} from 'react-icons/bs'
import {ImLocation} from 'react-icons/im'
import {FaMoneyCheck} from 'react-icons/fa'
import OrderBtns from './OrderBtns'

function OrderDetails({order}) {
    const orderDate = new Date(order?.time.seconds * 1000 + order?.time.nanoseconds/1000000).toLocaleString()
  return (
    <div className="col-12 col-lg-4 my-1  bg-ligt borde">
        {!order ? 
        <div className="text-center text-secondary bg-light mx-1 py-5">
            No order is selected!
        </div>
         : 
        <div className="bg-light bg-dnger mx-1 p-3 border border-dark">
            {/* <div className="text-secondary  my-2 text-enter">
                {order?.order_id}
            </div> */}
            <div className="vertcally-centerd my-1 gap-2">
                <BsPersonCircle fill='#114178'/>
                <div className="text-secondary">{order?.client?.fullname}</div>
            </div>
            <div className="vertcally-centerd my-1 gap-2">
                <BsFillTelephoneFill fill='#0d9445' />
                <div className="text-secondary">{order?.client?.phone}</div>
            </div>
            <div className="vertcally-centerd my-1 gap-2">
                <div className="align-self-start">
                    <ImLocation fill='#940d19' />
                </div>
                <div>
                    <div className="text-secondary">
                        {order?.client?.address}
                    </div>
                    <div className="text-secondary">
                        {order?.client?.address_two} 
                    </div>
                </div>
            </div>
            <div className="vertcally-centerd my-1 mb- gap-2">
                <FaMoneyCheck  fill='#04cc90' />
                <div className="text-secondary">{order?.isPaid ? 'Paid' : 'Not Paid' }</div>
            </div>
            <div className="vertcally-centerd text-primary my-1 mb-3 gap-2">
                <BsFillInfoCircleFill   />
                <div className="text-secondary">{order?.status}</div>
            </div>
           {order?.cart?.map((cartItem)=>{
                return (
                    <div className="my-1 border  mb-3 fs-petit  bg-white d-flex justify-content-between vertcally-centerd ">
                        <div className='d-flex gap-1 '>
                            <img height="60px" style={{aspectRatio :'1/1'}}
                             src={cartItem?.product?.images[0]} alt="" srcset=""
                              />
                            <div className='bg-inf=o d-flex flex-column gap- justify-content-around  '>
                                <div>{cartItem?.product?.title}</div>
                                <div>{cartItem?.choices?.variant}</div>
                                {cartItem?.choices?.color && <div>{cartItem?.choices?.color}</div>}
                            </div>
                        </div>
                        <div>x3</div>
                        <div className='mx-1'>{cartItem?.product?.price*cartItem?.quantity}$</div>
                    </div>
                )
           })}        
           <hr />      
            <div className=" bg-ino d-flex justify-content-between  ">
           <small className='text-secondary'> {orderDate}</small>
           <div>{order?.total_charge}$
           </div>
            </div>


        </div>}
    </div>
  )
}

export default OrderDetails