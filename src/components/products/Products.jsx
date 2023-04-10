import { collection, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db, useAuth } from '../../Firebase'
import Loader from '../AuthComponents/Loader'
import Filters from './Filters'
import Product from './Product'
import './products.css'

function Products() {  
  const [products , setProducts] = useState([])
  const [originalList , setOriginalList] = useState()
  const [load , setLoad] = useState()
  const currentStore = useAuth()

  function fetchProducts (){
    
    const arr= []
    getDocs(query(collection(db , 'products') , where('store_id' , '==' , currentStore?.uid)) )
      .then((res)=>{
        res.docs.forEach((doc)=>{
          arr.push(doc.data())
        })
        setProducts(arr)
        setOriginalList(arr)
        setLoad(false)
      })
  }

  useEffect(()=>{
    let fetch = true
    if(fetch && currentStore){
      setLoad(true)
      fetchProducts ()
    }
    return ()=>{
      fetch = false
    }
  },[currentStore])

  const filterProducts = (query)=>{
    if (query) {
      let newList = originalList?.filter((item)=>{
        return item?.title?.toLowerCase().includes(query?.toLowerCase())
      })
      setProducts(newList)
    } 
    else {
      setProducts(originalList)
    }
  }

  return (
    <>
    <div className='  jus-center bg-inf vertcally-cente products '>
       <div className="products-container b py  ">
         <Filters filterProducts={filterProducts} />
         <div className='s products-list'>
           {!load ? 
            <>
            {products?.map((product)=>{
                // updateDoc(doc(db , 'products' , product?.product_id) , {instock : 'av'})
              
              return <Product key={product.product_id} product={product} fetch={fetchProducts} />
            })}
         
           </> 
           : 
           <div>
            {[4 , 2 , 3 , 4 ].map((item)=>{
              return  <div className="vertcally-centerd jus-center py-3 my-2  bg-light ">
                  <Loader />
               </div>
            })}
           </div>
           }
         </div>
       </div>
    </div>


   </>
    )
}

export default Products