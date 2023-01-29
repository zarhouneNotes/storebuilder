import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {IoLogoPaypal} from 'react-icons/io5'
import {FaMoneyCheck} from 'react-icons/fa'

function Pay (){

    const [addressFormFilled , setAddressFormFilled] = useState(true)

    return (
        <Form className="borde adress-form">
            
            <div className="horiz-centerd">
                <h4>Payment</h4>
                <div 
                onClick={()=>{setAddressFormFilled(!addressFormFilled)}}
                className={`border vertcally-centerd py- px-3 ${addressFormFilled && ' border-primary text-primary'}`}
                >
                    <div className="vertcally-centerd gap-1">
                        <div >pay now </div>
                        <FaMoneyCheck className="my-ato" />
                    </div>
                 </div>
            </div>
            <div className="mb-2">
                <Form.Label>Email*</Form.Label>
                
                <Form.Control 
                 disabled={!addressFormFilled}
                required
                // value={fullName} 
                // onChange={(e)=>{setFullName(e.target.value)}}
                className="input" placeholder="paypal email.." />
            </div>
            <div className="mb-2">
                <Form.Label>Password*</Form.Label>
                
                <Form.Control 
                 disabled={!addressFormFilled}
                required
                // value={fullName} 
                // onChange={(e)=>{setFullName(e.target.value)}}
                className="input" placeholder="paypal password.." />
            </div>
            <div className="my-3" >
                <Button 
                variant={!addressFormFilled &&  "dark"}
                 disabled={!addressFormFilled} type="submit" className=" btn border-0  bg-darkblue b  py-2 bt w-100">
                    <IoLogoPaypal  fontSize='22px'/>    Login with Paypal
                </Button>
            </div>
            <div className="or  horiz-centerd">
                <div className="line bg-darkblue w-100"></div>
                <div>Or</div>
                <div className="line bg-darkblue w-100"></div>
            </div>
            <div className="my-3" >
                <Button 
                variant={addressFormFilled &&  "dark"}
                disabled={addressFormFilled}
                type="submit" className=" btn border-0 bg-k bg-darkblue b  py-2 bt w-100">
                       Cash on delivery
                </Button>
            </div>
        </Form>
    )
}
export default Pay ;