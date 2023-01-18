import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import ImagesSection from './ImagesSection'
import {useMediaQuery} from 'usehooks-ts'
import ProductDesc from './ProductDesc'
import { collection, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { db } from "../../Firebase";
import StoreProduct from './StoreProduct'

export default function ProductPage ({setBadge}){
    const params = useParams()
    const [product , setProduct] = useState()
    const [relatedProducts , setRelatedProducts] = useState([])
    const [load , setLoad] = useState(false)

    useEffect(()=>{
        let fetch = true 
        if (fetch) {
            
            setLoad(true)
            onSnapshot(doc(db , 'products' , params.id) , (res)=>{
                setProduct(res?.data())
                setLoad(false)

            })
        }
        return ()=>{fetch = false}
    },[])


    useEffect(()=>{
        let fetch = true 
        if (fetch && product) {
            
            setLoad(true)
            const arr = []
            onSnapshot(query(collection(db , 'products') , where('categories' , 'array-contains' , product?.categories[0])) , (res)=>{
                res.docs.forEach((doc)=>{
                    arr.push(doc.data())
                })
                
                
                setRelatedProducts(arr)
                console.log(arr)
                setLoad(false)
                //   console.log(product)
            })
        }
        return ()=>{fetch = false}
    },[])


    const [addedroducts , setAddedProducts] = useState([])
    useEffect(()=>{
        let fetch = true 
        if (fetch) {
            const savedProducts = JSON.parse(localStorage.getItem('cart'))
            savedProducts ?  setAddedProducts(savedProducts) : setAddedProducts([])
           
        }
        return ()=>{fetch = false}
    },[])
  

    function AddToCart (obj){
        var arr  = addedroducts
        arr.includes(obj) ? arr = addedroducts : arr.push(obj)
        localStorage.setItem('cart' , JSON.stringify(arr))
        setBadge(arr.length)
 
    }

    

    function kickCurrentProduct () {
        const newList  = relatedProducts?.filter((item)=>{
            return item != product
        })
        return newList
    }


    return (
       <div  className="bg-inf col9 mx-auto ">
       { load ? 'loading..' :  <div className="col-lg-9 col-sm-12 bg-ino mt-2 mx-auto around py-1">
          <ImagesSection product={product} />
          <ProductDesc  AddToCart={AddToCart} product={product}/>

        </div>}
        <div className="bg-dager  col-lg-10 col-sm-12 mx-auto mt-5">
            <h3>Related Products</h3>
            <div className="row">
               {!load && relatedProducts?.map((relproduct)=>{
                return(<div key={relproduct.product_id} className="col-lg-3 col-sm-4">
                            <StoreProduct product={relproduct} />
                        </div>)
               })}
            </div>
        </div>
       </div>
    )
}