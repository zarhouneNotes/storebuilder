import { useMediaQuery } from "usehooks-ts";
import OrderDetails from "./OrderDetails";
import OrderItem from './OrderItem'
import { Button, Form } from "react-bootstrap";
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db, useAuth } from '../../Firebase'
function Orders (){
    const isMobile = useMediaQuery("(max-width : 460px)")
    const currentStore = useAuth()
    const [ordersList , setOrdersList] = useState()
    const [load , setLoad] = useState(false)
    const [focusedOrder , setFocusedOrder] = useState()

    useEffect(()=>{
        let fetch = true
        const arr = []
        if ( currentStore &&fetch) {
            onSnapshot(query(collection(db , 'orders') , where('store_id' , '==' , currentStore?.uid )),
            (res)=>{
                setLoad(true)
                res.docs.forEach((doc)=>{
                   arr.push(doc.data())
               })
               setOrdersList(arr)
               setLoad(false)
           }
            )
            
        }  
        
        return ()=>{
            fetch = false
        }

    },[currentStore])




    return (
        <div className="add-product orders bg-daner ">
            <h4>Orders</h4>
            <div className="py-2 d-flex gap-1">
                <Form.Control  className="input"  placeholder='search on order by ID..' />
                <Button className="bg-darkblue border-0 px-4">Apply</Button>
            </div>
            
            <div className=' my-2 around bg-ino   ' >
                {load ? 'loadingg..' : 
                <div className="orders-container bg-inf col-12 mx-auto col-lg-8  "> 
                    {ordersList?.map((orderdet)=>{
                        return <OrderItem focOrder={focusedOrder} setFocusedOrder={setFocusedOrder} key={orderdet.order_id} order={orderdet}  />
                    })}
                </div>}
               {!isMobile&& <OrderDetails order={focusedOrder} />}
            </div>
        </div>
    )
}
export default Orders ;