import React  from "react";
import { Button, Form } from "react-bootstrap";
import {AiFillCreditCard} from 'react-icons/ai'
import Address from "./Adress";
import Pay from "./Pay";

function Checkout() {
    return (
        <div className="">
            <div className="py-3 bg-darkblue ">    
                <div className="col-lg-8 mx-auto bg-dange fs-5 vertcally-centerd  gap-2">
                    <div className='my-auto'>Address and Billings</div> 
                    <AiFillCreditCard  />
                </div>
            </div>
        <div className="col-lg-10 mx-auto bg-daner around mt-4 ">
            <Address />
            <Pay />

        </div>
        </div>
    )
}
export default Checkout ;