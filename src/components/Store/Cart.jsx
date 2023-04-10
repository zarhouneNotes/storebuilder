import React, { useEffect, useState } from 'react'
import { IoListCircle } from 'react-icons/io5'
import Bills from './Bills'
import CartPageHeader from './CartPageHeader'
import ShoppingList from './ShoppingList'

function Cart({setBadge}) {
    const  [addedProducts , setAddedProducts]  = useState([])
    

    const changeCartItem = (obj)=>{
        const arr = []
    // console.log(addedProducts , obj)
       addedProducts?.map((product)=>{
        if (product?.item == obj.item_id) {
            arr.push(obj)
        }else{
            arr.push(product)
        }
       
       })
    // let newList = addedProducts.filter((product)=>{
    // //     return product !=
    // })
       setAddedProducts(arr)
       localStorage.setItem('cart' , JSON.stringify(arr))
    }
    
    const deleteCartItem = (obj) =>{
            // console.log(obj)
            const arr = addedProducts
            let newList = arr.filter((product)=>{
                return product?.item_id != obj?.item_id
            })
            setBadge(newList.length)
            setAddedProducts(newList)
            localStorage.setItem('cart' , JSON.stringify(newList))

    }
    
    useEffect(()=>{
         setAddedProducts( JSON.parse(localStorage.getItem('cart')))
      },[])
   
    return (
    <div className=''>
        <CartPageHeader />
        <div className="cart-page-body bg-dangr col-lg-10 col-sm-12 py-2 around mx-auto">
            
            <div className="col-12 col-lg-8 col-sm-12 py- bg-ino">
                <hr />
                <ShoppingList products={addedProducts} deleteCartItem={deleteCartItem} changeCartItem={changeCartItem} />
            </div>
            <div className="col-12 col-lg-4 col-sm-12 bg-priary">
                <Bills products={addedProducts}/>
            </div>
        </div>
    </div>
    )
}
export default Cart