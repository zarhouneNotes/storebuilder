import { Button } from "react-bootstrap";
import React from "react";

export default function Bills ({products}){
    function calculTotalCharge (){
        var bills = 0
        products?.map((cartItem)=>{
            bills= bills + cartItem?.quantity*cartItem?.product?.price
        })
        return bills.toFixed(2)
    }
    return (
    <div  >
        <div className="orange-backgroun bg-darkblue m-3 px-3 py-4">

            {products?.map((cartItem)=>{
                return (
                    <div key={cartItem?.order_id} className="horiz-centerd my-1 ">
                        <div className="d-flex">
                          <div className="cut-text">{cartItem?.product?.title} </div>
                          <div>x {cartItem?.quantity}</div>
                        </div>
                        <div>{(cartItem?.quantity * cartItem?.product?.price).toFixed(2)}$</div>
                    </div>
                )
            })}
          
            
            <hr />
            <div className="horiz-centerd">
                <div>total</div>
                <div>{calculTotalCharge()}$</div>
            </div>
            <hr />
            <div className="check vertcally-centerd gap-2">
                <input type="checkbox"  /> 
                <label htmlFor=""><small>Accept terms and conditions</small></label>
            </div>
            <Button className="w-100 mt-3 text-dark bg-light bg-darkblue  border-0"  >Checkout</Button>
        </div>
    </div>
    )
}