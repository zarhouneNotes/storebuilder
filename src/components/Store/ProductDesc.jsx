import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import { collection, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { db } from "../../Firebase";
import { uuidv4 } from '@firebase/util'


function ProductDesc ({product , AddToCart}){
    
    const isMobile = useMediaQuery('max-width("460px")')

    const [cart , setCart ] = useState([])
    const [color , setColor]  = useState()
    const [variant , setVariant] = useState()
    const visitedProduct = {
        order_id : uuidv4() ,
        product : product ,
        choices : {
            color : color ,
            variant : variant 
        } ,
        quantity : 1
    }

    const AddToCartHandel = ()=>{
        AddToCart(visitedProduct)
        
    }
        
 
    return (
        <div  className={` col-lg-4  p-2  `} >
            <h2 className="my-2" >{product?.title}</h2>
         { product?.colors?.length !==0 &&  <hr />}
            <div className={`d-flex flex-wrap  gap-1  ${isMobile ? " my-3" : 'my-2'}`}>
                
                {product?.colors.map((clr)=>{
                    return <div
                    onClick={()=>{setColor(clr)}}
                    className={` bg-light py-2 px-3 border  ${clr == color  ? "border-secondary " : "border-light" } `}> {clr}</div>
                })}
              
            </div>
             
            { product?.variants?.length !==0 &&  <hr />}
            <div className={`d-flex flex-wrap  gap-1  ${isMobile ? " my-3" : 'my-2'}`}>
               {product?.variants.map((varian)=>{
                    return <div 
                    onClick={()=>{setVariant(varian)}}
                    className={`bg-light py-2 px-3 border  ${varian == variant  ? "border-secondary " : "border-light" } `}> {varian}</div>
                })}
               
              
            </div>
            { product?.variants?.length !==0 &&  <hr />}
            <h5 className="text-">{product?.price}$</h5>
            <Button size="lgS" className="btn py-2 px-4 w-100 bg-darkblue border-0" onClick={AddToCartHandel} >
                ADD TO CART
            </Button>
            <p className="text-secondary">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste laudantium cum minus nam nulla? Provident magnam corrupti aperiam earum ullam reprehenderit, reiciendis in voluptatem voluptas labore tempora quaerat, illo atque!
            </p>

        </div>
    )
}
export default ProductDesc