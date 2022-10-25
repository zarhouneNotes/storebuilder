import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import {IoMdLaptop } from 'react-icons/io'
import { IoCashOutline} from 'react-icons/io5'
import { db, useAuth } from '../../Firebase'
import Loader from '../AuthComponents/Loader'
import Category from './Category'


export default function Settings() {
  const currentStore = useAuth()
  const [option , setOption] = useState('')
  const [store , setStore] = useState('')
  const [paypal , setPaypal] = useState('')
  const [about , setAbout] = useState('')
  const [support , setSupport] = useState('')
  const [cat , setCat] = useState('')
  const [arr , setArr] = useState([])
  // const arr =  []
  const [load , setLoad] = useState(false)
  useEffect(()=>{
    let fetch  = true
    if (fetch && currentStore) {
      onSnapshot(doc(db , "stores" , currentStore?.uid),(res)=>{
        const storeData = res.data()
        setOption(storeData?.store_type)
        setPaypal(storeData.email)
        setStore(storeData.store_name)
        setAbout(storeData?.about)
        setSupport(storeData?.support)
        setArr(storeData?.categories)

      })
    }
    return ()=>{
      fetch = false
    }
  },[currentStore])

  const AddItem = ()=>{
    
     if(cat && !arr.includes(cat)){
      arr.push(cat)
      setCat('')
    
     }
    
  }
  
  const saveHandel = (e)=>{
    e.preventDefault()
    if (option) {
      setLoad(true)
      updateDoc(doc(db , 'stores' , currentStore?.uid),{
        store_name : store ,
        paypal : paypal ,
        store_type : option , 
        support : support ,
        about : about ,
        categories : arr
      }).finally(()=>{
        setLoad(false)
      })
    }
  }
  const deleteItem = (arr   , item)=>{
    const newArr = arr.filter((val)=>{
        return val !== item
    })
    return newArr
}
  var classOption = ' text-primary border border-primary '
  return (
    <div className='settings-container bg-daner'  >
        <div className="settings">
          <h5>Settings</h5>
          <Form className='mt-2'onSubmit={saveHandel} >
            <div className="form-sec mb-2">
              <Form.Label>Store Name</Form.Label>
              <Form.Control 
              required 
              onChange={(e)=>{setStore(e.target.value)}}
              value={store}
              placeholder='store name..' className='input w-5' />
            </div>
            <div className='mb-2'>
              <Form.Label>Catagories of your products</Form.Label>
              <div className="d-flex">
              <Form.Control 
              
              onChange={(e)=>{setCat(e.target.value)}}
              value={cat}
              type='text' placeholder='EX: Popular, Tops..' className='input w-5' />
              <Button className='my-btn'  onClick={()=>{AddItem(arr , cat)}}  >Add</Button>
              </div>
              <div className="d-flex gap-3 mt-3 w-75 cats ">
                {arr?.map((val)=>{
                  return <Category value={val} deleteHandel={()=>{setArr(deleteItem(arr , val))}} key={val} />
                })}
              </div>
            </div>
            <div className='mb-2'>
              <Form.Label>Paypal mail</Form.Label>
              <Form.Control 
              required
              onChange={(e)=>{setPaypal(e.target.value)}}
              value={paypal}
              type='email' placeholder='enter your paypal..' className='input w-5' />
            </div>
            <div className='mb-2'>
              <Form.Label>Payment</Form.Label>
             <div 
             onClick={()=>{ setOption('dropshipping')}}
             className={`option mb-2 vertcally-centerd border horiz-centrd ${option == 'dropshipping' ? classOption : 'text-secondary'}  `}>
                
                <IoMdLaptop className='mx-2 fs-' />
                <small>
                    Online Payment
                </small>
             </div>
             <div 
             onClick={()=>{ setOption('cod')}}
             className={`option vertcally-centerd border tex  mb-2 ${option == 'cod' ? classOption : 'text-secondary'}  `}>
                <IoCashOutline className='mx-2 5' />
                <small>
                Cash On Delivery 
                </small>
               
               
             </div>
             <div className='mb-2'>
              <Form.Label>About your store</Form.Label>
              <Form.Control 
              required
              onChange={(e)=>{setAbout(e.target.value)}}
              value={about}
              type='text' placeholder='Talk about your store..' className='input w-5' />
            </div>
            <div className='mb-2'>
              <Form.Label>Contact email</Form.Label>
              <Form.Control 
              required
              onChange={(e)=>{setSupport(e.target.value)}}
              value={support}
              type='email' placeholder='Support mail..' className='input w-5' />
            </div>
            
            
            </div>

            <hr />
            <div>
              <Button className='btn border-0 px-5 bg-darkblue' type='submit'>
                {load ? <Loader /> : 'Save'}
              </Button>
            </div>
          </Form>
        </div>
    </div>
  )
}
