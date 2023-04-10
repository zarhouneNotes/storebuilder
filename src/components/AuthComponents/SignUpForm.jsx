import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { db, SignUpWithEmailAndPassword, useAuth } from '../../Firebase'
import { Link, useNavigate } from 'react-router-dom'
import '../Home/home.css'
import './Auth.css'
import Loader from './Loader'
import {AiFillCheckCircle, AiOutlineClose} from 'react-icons/ai'

function SignUpForm() {
    const currentUser = useAuth()
    const navigate = useNavigate()
    const [Error , setError] = useState('')
    const [storeName , setStoreName] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassWord] = useState('')
    const [load , setLoad] = useState(false)
    const [avail , setAvail] = useState()
    const [listOfName , setListOfNames] = useState([])
    if (currentUser) {
        navigate('/dashboard')
      }


useEffect(()=>{
    const arr= []
    getDocs(collection(db , 'stores'))
    .then((res)=>{
       res.docs.forEach((doc)=>{
           arr.push(doc.data().store_name?.toLowerCase())
       })
       setListOfNames(arr)
    })
},[])

 const CreateStoreHandel =(e)=>{
    e.preventDefault()
    setLoad(true)
        SignUpWithEmailAndPassword(email , password)
        .then((res)=>{
            setDoc(doc(db , 'stores' ,res?.user?.uid),{
                email: email, 
                store_name : storeName, 
                store_id : res?.user?.uid,
            })
            .then(()=>{
                setLoad(false)
                navigate('/login')
            })
            .catch((err)=>{
                setLoad(false)
                setError(err.message)
            })
        })
        .catch((err)=>{
            setLoad(false)
            setError(err.message)
        })
 }

  return (
    <div className='form-container  ' >
        <Form className='bg- form bg-inf'  onSubmit={CreateStoreHandel} >
           {Error && <Alert variant='danger input border-0'>{Error}</Alert>}
            <div className="d-flex mb-3">
            <Form.Control 
            minLength="4"
                onChange={(e)=>{
                    if (!listOfName?.includes(e.target.value.toLowerCase()) &&e.target.value.length >= 4 ) {
                        setAvail(true)
                    }else( setAvail(false))
                    setStoreName(e.target.value)
                }}
                value={storeName}
                className='input '
                placeholder='Sotre name..'
             required/>
             {  <div className='border mx-1 fs-5 px-2 d-flex justify-content-center align-items-center' >
                {avail ?     <AiFillCheckCircle  color='#0BDA51	' />
                       :      <AiOutlineClose  className='text-danger' />}
             </div>}
            </div>

             <Form.Control 
                onChange={(e)=>{
                    setEmail(e.target.value)
                }}
                value={email}
                className='input mb-3'
                placeholder='Email..'
                required/>
             <Form.Control 
                onChange={(e)=>{
                    setPassWord(e.target.value)
                }}
                value={password }
                className='input mb-3'
                placeholder='password..'
                type='password'
                required/>
             <Button  type='submit' className='w-100 bg-darkblue input border-0'>
                {load ? <Loader /> : 'Create store'}
            </Button>
            <Form.Text>Already having it? <Link to='/login'>Log In</Link></Form.Text>
        </Form>
    </div>
  )
}

export default SignUpForm