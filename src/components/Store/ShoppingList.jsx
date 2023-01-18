import React from "react";
import Cart from "./Cart";
import CartItem from "./CartItem";


 export default function ShoppingList({products , changeCartItem , deleteCartItem}) {
    return (
    <div className="bg-dange">
       {products?.map((product)=>{
        return <CartItem key={product.product.order} cartproduct={product} deleteCartItem={deleteCartItem} changeCartItem={changeCartItem}/>
       })}
       
    </div>
    )
}