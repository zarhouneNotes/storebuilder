import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {FiEdit} from 'react-icons/fi'

function Address (){
    const [fullName , setFullName] = useState('')
    const [adress , setAddress] = useState('')
    const [secondAddress , setSecondAddress] = useState('')
    const [phoneNumber , setPhoneNumber] = useState()
    const [addressFormFilled , setAddressFormFilled] = useState(false)
    const user = {
        fullname : fullName ,
        address : adress , 
        sec_address : secondAddress ,
        phone : phoneNumber
    }

    const saveHandel = (e)=>{
        e.preventDefault()
        setAddressFormFilled(true)
        console.log(user)
    }
    return (
        <Form className=" bg-primar adress-form" onSubmit={saveHandel}>
            <h4>Adress</h4>
            <div className="mb-2">
               <div className="horiz-centerd">
               <Form.Label>Full Name*</Form.Label>
               <FiEdit onClick={()=>{setAddressFormFilled(false)}} />
               </div>
                <Form.Control 
                disabled={addressFormFilled}
                required
                value={fullName} 
                onChange={(e)=>{setFullName(e.target.value)}}
                className="input" placeholder="first and last name " />
            </div>
            <div className="mb-2">
                <Form.Label>Address *</Form.Label>
            <Form.Control  required
            disabled={addressFormFilled}
            value={adress} 
            onChange={(e)=>{setAddress(e.target.value)}}
            className="input" placeholder="Country & City & and street " />
            </div>
            
            <div className="mb-2" >
                <Form.Label>Address 2(optional)</Form.Label>
                <Form.Control  
                disabled={addressFormFilled}
                value={secondAddress} 
                onChange={(e)=>{setSecondAddress(e.target.value)}}
                className="input" placeholder="Street and appartment  " />
            </div>

            <div className="mb-2" >
                <Form.Label >Phone Number*</Form.Label>
                <Form.Control 
                disabled={addressFormFilled}
                required
                value={phoneNumber} 
                onChange={(e)=>{setPhoneNumber(e.target.value)}}
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
          

        </Form>
    )
}
export default Address ;