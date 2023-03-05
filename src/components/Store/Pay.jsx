import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {IoLogoPaypal} from 'react-icons/io5'
import {FaMoneyCheck} from 'react-icons/fa'

function Pay ({addadded , chashOnDeliveryHandel}){

    const [payNow , setPayNow] = useState(false)
    const abeled = addadded && payNow


    return (
        <Form className="borde adress-form position-relative">
            <div className="bg-secondary position-absolute h-100 w-100 vertcally-centerd jus-center" style={{top : '0px' , left : '0px' , zIndex :'9' , opacity : '0.2' , display : addadded && "none"}}>
                {/* <div>you must fill all your informations</div> */}
            </div>
            
            <div className="horiz-centerd">
                <h4>Payment</h4>
                <div 
                onClick={()=>{setPayNow(!payNow )}}
                className={`border vertcally-centerd py- px-3 ${payNow&&addadded && ' border-primary text-primary'}`}
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
                 disabled={!payNow}
                required
                // value={fullName} 
                // onChange={(e)=>{setFullName(e.target.value)}}
                className="input" placeholder="paypal email.." />
            </div>
            <div className="mb-2">
                <Form.Label>Password*</Form.Label>
                
                <Form.Control 
                 disabled={!payNow}
                required
                // value={fullName} 
                // onChange={(e)=>{setFullName(e.target.value)}}
                className="input" placeholder="paypal password.." />
            </div>
            <div className="my-3" >
                <Button 
                variant={!payNow &&  "dark"}
                 disabled={!payNow} type="submit" className=" btn border-0  bg-darkblue b  py-2 bt w-100">
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
                variant={payNow &&  "dark"}
                disabled={payNow}
                onClick={chashOnDeliveryHandel}
                 className=" btn border-0 bg-k bg-darkblue b  py-2 bt w-100">
                       Cash on delivery
                </Button>
            </div>
        </Form>
    )
}
export default Pay ;