import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { AiFillCloseCircle, AiOutlineClose } from "react-icons/ai";
import { useMediaQuery } from "usehooks-ts";

export default function CartItem ({cartproduct  , changeCartItem , deleteCartItem}){
    const isMobile = useMediaQuery('max-width("460px")')
    const [total , setTotal] = useState(parseInt(cartproduct?.product.price)*cartproduct?.quantity)
    const [show , setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
return (
    <>
    
    
    <div className="bg- m-2 horiz-centerd   vertcally-centerd"  >
        <div className="image-name-variant d-flex  ">
            <div className="position-relative">
            <img width='75px' src={cartproduct?.product?.images[0]} alt=""  srcset="" />
            <div className="delete-variant m" onClick={handleShow}>
                <AiFillCloseCircle />
            </div>
            </div>
            <div className="name-variant mx-2 my-auto flex-column">
                <div className="cut-text"><small>{cartproduct?.product?.title}</small></div> 
               
               { cartproduct?.choices?.color && <div className="text-secondary my-1"><small>color : {cartproduct?.choices?.color}</small></div>}
                 
               {cartproduct?.choices?.variant && <div className="text-secondary"><small>size : {cartproduct?.choices?.variant}</small></div>}
            </div>
        </div>
        <div className="price">
          {parseInt(cartproduct?.product?.price).toFixed(2)}$
        </div>
        <div className="quantiy">
        <select onChange={(e)=>{
           Object.assign(cartproduct, {quantity : e.target.value}); 
           changeCartItem(cartproduct) ; 
           setTotal(parseInt(cartproduct?.product.price)*cartproduct?.quantity)}} >
            {[ 1 , 2,3,4,5,6,7,8,9].map((num)=>{
                return <option
                selected={num == cartproduct?.quantity}
              
                 value={num} 
                 >
                    {num}
                </option>
            })}
        </select>
        </div>
        { <div className="total mx-2">
            {total?.toFixed(2)}$
        </div>}

    </div>
    <hr />


    <Modal centered show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <div>you sure ? delete this product from your cart ?</div>
        </Modal.Header>
        <Modal.Footer>
          <Button 
          
          variant="danger px-4" size='sm' 
          onClick={()=>{ handleClose() ; deleteCartItem(cartproduct)}}
          >
            DELETE
            {/* { load ? <Loader  /> : "DELETE"} */}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
)
}