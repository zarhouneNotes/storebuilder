import { collection, onSnapshot, query, where } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../Firebase'
import CollRow from './CollRow'

function StoreHome({store , mobileMode}) {
    const params = useParams()
    const [products , setProducts] = useState([])
    
    useEffect(()=>{
        let fetch = true
        const arr = []
        if(params && fetch){
            onSnapshot(query(collection(db , 'products') , where('store_id' , '==' , params.id)), (res)=>{
                res.docs.forEach((doc)=>{
                    arr.push(doc.data())
                })
                setProducts(arr)
            })
        }
        return ()=>{
            fetch = false
        }
    },[])


  return (
   
       <div className=' bg-dangr mx-auto' >
        {store?.categories.map((cat)=>{
            return <CollRow sl3a={products} name={cat} mobileMode={mobileMode}/> 
        })}
        
       </div>
        
    
  )
}

export default StoreHome