import { colors } from '@mui/material'
import { collection, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import {BiCategory} from 'react-icons/bi'
import { BsFillTreeFill, BsFilter } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import { db } from '../../Firebase'
import Loader from '../AuthComponents/Loader'
import AddPtoductLoad from '../products/AddPtoductLoad'
import StoreFilters from './StoreFilters'
import StoreProduct from './StoreProduct'

function Collection() {
  const [products , setProducts]  = useState([])
  const [load , setLoad] = useState(false)
  const [show , setShow] = useState(false)
  const [searchText , setSearchText] = useState('')
  const [color  , setColor] =useState()
  const [size , setSize] = useState()
  const [minPrice , setMinPrice] = useState(0)
  const [MaxPrice , setMaxPrice] = useState(999)
  const [applyChanges , setApplyChanges] = useState(false)

  const params = useParams()

  useEffect(()=>{
    let fetch = true
    if (fetch) {
      setLoad(true)
      onSnapshot(query(collection(db , 'products') ,  where('categories' , 'array-contains' , params?.coll) ) , (res)=>{
        const arr = []
        res.docs.forEach((doc)=>{
          arr.push(doc.data())
        })
        setProducts(arr)
        setOriginalList(arr)
        setLoad(false)
      })
    }
    return ()=>{
      fetch = false
    }
  },[params])
  

  const [OriginalList , setOriginalList] = useState([])

  function filterProducts (){
    
    setLoad(true)
    const newArr =  products?.filter((product)=>{
      const checkSize = product.variants.includes(size)
      const checkColor =  product.colors.includes(color)
      return (color ?   checkColor  : true) && (size ? checkSize : true ) && product.price  > minPrice && product.price  < MaxPrice
      // return  
    })
    // console.log(newArr)
    setProducts(newArr)
    setColor()
    setSize()
    setLoad(false)
  }

  useEffect(()=>{
    const newArr = []
    if(searchText)
    {OriginalList?.map((product)=>{
      if (product?.title?.toLowerCase().includes(searchText.toLowerCase())) {
        newArr.push(product)
      }
    })
    setProducts(newArr)
  }
  else{
    setProducts(OriginalList)
  }
    
  },[searchText])



  return (
    <>
    <div className='bg-ino position-reative '>
      <div className='bg-darkblue text-center fs-5 py-3'>
        <span className='mx-2'>{params?.coll}</span>
        <BiCategory />
      </div>
     
      <div className='d-fle mt-4 col-lg-10 col-md-11 col-sm-12 mx-auto align-items-start'>
        
         <Form className='d-flex m-2 gap-2 ' >
            <Form.Control
            size=''
            onChange={(e)=>{
             setSearchText(e.target.value)
            }}
             placeholder='Name a product..' className='input my-input'  />
            
            <Button size=' ' className='bg-light text-dark border border' onClick={()=>{setShow(true) ; setProducts(OriginalList)}} >
              <BsFilter />
            </Button>
            <Button size=' ' className='bg-darkblue border-0' onClick={filterProducts}>Apply</Button>
         </Form>

        <div className=" d-flex flex-wrap">
          {products?.map((product)=>{
            // updateDoc(doc(db, 'products' , product?.product_id),{
            //   main_tag : params?.coll
            // })
            // .then(()=>{
            //   console.log('products updated succesfuly')
            // })
            // .catch((e)=>{console.log('updating main tags went wrong')})
              return ( 
                // checkThis(product ) && 
                   <div onClick={()=>{console.log(product?.main_tag)}}  className='col-6 col-lg-3 col-md-4 ' key={product?.product_id}>
                        <StoreProduct  product={product} />
                    </div>)
          })}
        </div>

      </div>
      {load &&<div  style={{top:'0px'}} className='position-absolute text-white add-produuct-load  h-100 w-100 bg-dar vertcally-centerd jus-center '>
        <Loader size='lg' />
      </div>}
    </div>
    
    <Modal 

    onHide={()=>{setShow(false)}}
    show={show}   
    aria-labelledby="contained-modal-title-vcenter" 
    centered>
        <Modal.Header closeButton>
          <Modal.Title>Filter</Modal.Title>
        </Modal.Header>
       <Modal.Body className='px-3'>
          <StoreFilters
           setShow={setShow}
           maxPrice={MaxPrice}
           minPrice={minPrice}
           setColor={setColor} setSize={setSize} setLessPrice={setMinPrice}  setMaxPrice={setMaxPrice} color={color} size={size}   />
       </Modal.Body>
    </Modal>
    </>
  )
}

export default Collection
