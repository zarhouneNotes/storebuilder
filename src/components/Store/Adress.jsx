import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {FiEdit} from 'react-icons/fi'
import {uuidv4} from '@firebase/util'
import { db, useAuth } from "../../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../AuthComponents/Loader";
import AddPtoductLoad from "../products/AddPtoductLoad";

function Address ({}){
    const cu = useAuth()
    const navigate = useNavigate()
    const params = useParams()
    const [load, setLoad] = useState(true)
    const order_id = uuidv4()
    const [paid , setPaid] = useState(false)
    const addedProducts = JSON.parse(localStorage.getItem('cart'))
    const [addressFormFilled , setAddressFormFilled] = useState(false)
    const [user , setUser] = useState({})
    const chashOnDeliveryHandel = ()=>{
       setDoc(doc(db , 'orders' , order_id) , {
        client : user ,
        cart : addedProducts ,
        isPaid : paid , 
        order_id : order_id,
        store_id :params?.id , 
        time : new Date() , 
        total_charge : calculTotalCharge() , 
        status : 'pending' ,
        isRead : false
       }).then(()=>{
        localStorage.clear()
       navigate(`/storeId=${params?.id}/thanks`)
       })
    // console.log(params.id)
    }
  
    
 
    function calculTotalCharge (){
        var bills = 0
        addedProducts?.map((cartItem)=>{
            bills= bills + cartItem?.quantity*cartItem?.product?.price
        })
        return bills.toFixed(2)
    }
    const saveHandel = (e)=>{
        e.preventDefault()
        setAddressFormFilled(true)
    }
    return   (
        <>
        {/* {load && <AddPtoductLoad /> } */}
       
        <Form className=" bg-primar adress-form" onSubmit={saveHandel}>
            <h4>Adress</h4>
            <div className="mb-2">
               <div className="horiz-centerd">
               <Form.Label>FullName*</Form.Label>
               <FiEdit onClick={()=>{setAddressFormFilled(false) }} />
               </div>
                <Form.Control 
                disabled={addressFormFilled}
                required 
                // value={fullName}
                onChange={(e)=>{setUser(user=>({
                    ...user,
                    fullname: e.target.value
                }))}}
                className="input" placeholder="first and last name " />
            </div>
            <div className="mb-2">
                <Form.Label>Address *</Form.Label>
            <Form.Control  required
            disabled={addressFormFilled}
            onChange={(e)=>{setUser(user=>({
                ...user,
                address: e.target.value
            }))}}
            className="input" placeholder="Country & City & and street " />
            </div>
            
            <div className="mb-2" >
                <Form.Label>Address 2(optional)</Form.Label>
                <Form.Control  
                disabled={addressFormFilled}
                onChange={(e)=>{setUser(user=>({
                    ...user,
                    address_two: e.target.value
                }))}}
                className="input" placeholder="Street and appartment  " />
            </div>

            <div className="mb-2" >
                <Form.Label >Phone Number*</Form.Label>
                <Form.Control 
                disabled={addressFormFilled}
                required
                onChange={(e)=>{setUser(user=>({
                    ...user,
                    phone: e.target.value
                }))}}
                type="number"  className="input" placeholder="phone number  " />
            </div>
            <div className="my-3 " >
                <Button 
                variant={addressFormFilled &&  "dark"}
                disabled={addressFormFilled}

                type="submit" className=" btn border-0  bg-darkblue py-2 bt w-100">
                        Save
                </Button>
            </div>

        
           

            <div  className="bg-dangr border p- position-relative" >
            <div className="bg-secondary position-absolute h-100 w-100 vertcally-centerd jus-center" style={{top : '0px' , left : '0px' , zIndex :'999' , opacity : '0.6' , display : addressFormFilled && "none"}} />
            
            <div className="mb-3" >
                <Button 
                onClick={chashOnDeliveryHandel}
                 className=" btn border-0 bg-k bg-darkblue b  py-2 bt w-100">
                       Cash on delivery
                </Button>
            </div>
            <div className="or mb-3 horiz-centerd">
                <div className="line bg-darkblue w-100"></div>
                <div>Or</div>
                <div className="line bg-darkblue w-100"></div>
            </div>
             <PayPalScriptProvider
             options={{
                "client-id" : "AYAi-ew655Thda2x2AI9S8bg8agzylfvEJJae2gEso0T-nKndcq7PTiJkz2b3obzS6lY2WSUgGGpxS4C"
             }}
             
             >
                <PayPalButtons 
                 createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: calculTotalCharge(),
                          },
                        },
                      ],
                    });
                  }} 
                  onApprove={()=>{
                    setPaid(true)
                    chashOnDeliveryHandel()

                  }}
                  
                />
             </PayPalScriptProvider>
        </div>
          

        </Form>
        </>
    )
}
export default Address ;