import React, { useState } from 'react'
import { Button, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap'
import { useMediaQuery } from 'usehooks-ts'
import OrderBtns from './OrderBtns'
import {AiOutlineClockCircle} from 'react-icons/ai'
import {BsCheck2All} from 'react-icons/bs'
import {IoSadOutline} from 'react-icons/io5'

function OrderItem({order ,focOrder ,setFocusedOrder}) {
  const isMobile = useMediaQuery("(max-width : 460px)")
  // const [itemClicked , setItemClicked] = useState()
  // ${itemClicked && 'border border-dark'}
  const itemFocused = order == focOrder
 
  const orderDate = new Date(order?.time.seconds * 1000 + order?.time.nanoseconds/1000000).toLocaleString()
  return (
    <div className={`bg-light my-1 p-3 horiz-centerd vertcally-cented  ${itemFocused && 'border border-dark'}`} 
    // onClick={()=>{ console.log(itemFocused)}}
     >
        <div onClick={()=>{setFocusedOrder(order) ;}}>
          <div>{order?.client?.fullname}</div>
          <div className='text-secondary' ><small>{orderDate}</small></div>
        </div>
        <div>{order?.total_charge}$</div>
        <div>
          {order?.status === 'pending'&&
           <div className='text-secondary' >
            Pending.. <AiOutlineClockCircle />
           </div>  }
           {order?.status === 'shipped'&&
           <div className='text-success' >
            Shipped <BsCheck2All />
           </div>  }
           {order?.status === 'canceled'&&
           <div className='text-danger' >
            Canceled <IoSadOutline />
           </div>  }
        </div>
     {!isMobile ?
      <OrderBtns order={order} /> : 
       <DropdownButton
       className='align-self-center'
       as={ButtonGroup}
       variant='dark'
       size="sm"
       style={{scale  : '0.7'}}
       
     >
       <Dropdown.Item >
       <OrderBtns order={order} />
        
       </Dropdown.Item>
      
 </DropdownButton>
      }
    </div>
  )
}

export default OrderItem