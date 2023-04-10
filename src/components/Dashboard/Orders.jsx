import { useMediaQuery } from "usehooks-ts";
import OrderDetails from "./OrderDetails";
import OrderItem from './OrderItem'
import { Button, Form } from "react-bootstrap";
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db, useAuth } from '../../Firebase'
import { IoClose, IoLockClosedSharp } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { Select } from "@mui/material";


// export const DoSt = (msg)=>{
//         console.log(msg)
// }


export var orderLength ; 
function Orders ({setOrderBadge}){
    const isMobile = useMediaQuery("(max-width : 460px)")
    const currentStore = useAuth()
    const [ordersList , setOrdersList] = useState()
    const [load , setLoad] = useState(false)
    const [focusedOrder , setFocusedOrder] = useState()
    const [showMobileOrder , setShowMobileOrder ] = useState(false)
    const [SearchedOrder , setSearchedOrder] = useState('')
    const [originalOrderList , setOriginalOrdersList] = useState()

    

    const getOrders  = ()=>{
        onSnapshot(query(collection(db , 'orders') , where('store_id' , '==' , currentStore?.uid )),
        (res)=>{
            const arr = []
            setLoad(true)
            res?.docs.forEach((doc)=>{
               arr.push(doc.data())
           })

           setOrdersList(arr)
           setOriginalOrdersList(arr)
           setOrderBadge(res?.docs.length)
           setLoad(false)
       }

        )
    }

    useEffect(()=>{
        let fetch = true
        
        if ( currentStore ) {
           getOrders() 
           
        }  
        
        return ()=>{
            fetch = false
        }

    },[currentStore])

    const findOrder = ()=>{
        const arr = ordersList
      
            const findedOrder = arr?.filter((order)=>{
                return order?.order_id.includes(SearchedOrder) 
            })
           setOrdersList(findedOrder)
       
    }




    return (
        <div className="add-product   orders bg-ino position-relative">
         {!isMobile &&   <h4>Orders</h4>}
            <div className="p-2 d-flex gap-1">
                <Form.Control
                aria-required
                onChange={(e)=>{
                    const vl = e.target.value
      
                    const findedOrder = originalOrderList?.filter((order)=>{
                        return order?.order_id.includes(vl) || order?.client?.fullname?.toLowerCase().includes(vl.toLowerCase())
                    })
                   setOrdersList(findedOrder)

                   
                   if( !vl ) {setOrdersList(originalOrderList)} 

                }}

                size={isMobile ? "sm" : ""}

                //  value={SearchedOrder}
                  className="input"  placeholder='search on order by ID..' />
                {SearchedOrder &&  <Button 
                size="sm"
                variant="outline-dark"
                onClick={()=>{setOrdersList(originalOrderList) ; setSearchedOrder('')}}
                className="  border "><MdClose />
                </Button>}
                 {/* <Button > */}
                 <Form.Select 
                                size='sm'
                                className=' w-25 input'
                                defaultValue=''
                                onChange={(e)=>{
                                    const newList = originalOrderList?.filter((item)=>{
                                        return e.target.value !== "all" ?  item?.status == e.target.value : true
                                    })
                                    setOrdersList(newList)
                                }}
                            
                            >
                                <option  value="all"  >All</option>
                                <option value="shipped"  >Shipped</option>
                                <option value="canceled"  >Canceled</option>
                                <option value="read"  >Read</option>

                                
                                
                            
                </Form.Select>
                 {/* </Button> */}
                {/* <Button 
                size="sm"
                onClick={findOrder}
                className="bg-darkblue px- border-0">Apply</Button> */}

            </div>
            
            
            <div className=' my-2 around bg-ino  m- ' >
                {load ? 'loadingg..' : 
                <div className="orders-container bg-inf col-12 mx-auto col-lg-8  "> 
                    {ordersList?.map((orderdet)=>{
                        return <OrderItem getOrders={getOrders} setShowMobileOrder={setShowMobileOrder}  focOrder={focusedOrder} setFocusedOrder={setFocusedOrder} key={orderdet.order_id} order={orderdet}  />
                    })}
                 
                   
                </div>}
                
               {!isMobile ? <OrderDetails order={focusedOrder} />  
               : 
                <div className={`bg-light position-absolute order-mobile h-100 ${showMobileOrder ?'show-order-mobile ' : ''}`}>
                  <IoClose 
                  onClick={()=>{setShowMobileOrder(false)}}
                  fontSize='24' className="m-3" />
                  <OrderDetails order={focusedOrder}  />
                </div>
                
               }
            </div>
        </div>
    )
}
export default Orders ;