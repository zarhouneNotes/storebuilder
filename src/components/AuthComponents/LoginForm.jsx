import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button, Form, Spinner } from 'react-bootstrap'
import { LogInWithEmailAndPassword, useAuth } from '../../Firebase'
import '../Home/home.css'
import './Auth.css'
import { FadeLoader } from 'react-spinners'
import Loader from './Loader'

function LoginForm() {
  const navigate = useNavigate()
  
  const [Error , setError] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassWord] = useState('')
  const [load , setLoad] = useState(false)
  const currentUser =useAuth()
 
  if (currentUser) {
    navigate('/dashboard')
  }

  const LogInHandel = (e)=>{
    e.preventDefault()
    setLoad(true)
    LogInWithEmailAndPassword(email , password)
    .then(()=>{
      setLoad(false)
      
      // localStorage.setItem('auth' , 'true')
    })
    .catch((err)=>{
      setLoad(false)
      setError(err.message)
  })
  }

  return (
    <div className='form-container  ' >
      <Form className='bg- form bg-inf' onSubmit={LogInHandel}>
      {Error && <Alert variant='danger input border-0'>{Error}</Alert>}
            <Form.Control 
                onChange={(e)=>{
                  setEmail(e.target.value)
              }}
                value={email}
                className='input mb-3'
                placeholder='Email..'
             />
             <Form.Control 
                onChange={(e)=>{
                  setPassWord(e.target.value)
                }}
                value={password }
                className='input mb-3'
                placeholder='password..'
                type='password'
             />
          <Button type='submit' className='w-100 bg-darkblue input border-0'>
            {load ? <Loader /> : 'Login'}
          </Button>
          <Form.Text>Create a store? <Link to='/signup'>Sign up</Link></Form.Text>
      </Form>
    </div>
  )
}

export default LoginForm