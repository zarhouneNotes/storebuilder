import { Alert, TextareaAutosize, useMediaQuery } from '@mui/material'
import { addDoc, collection, doc } from 'firebase/firestore'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { MoonLoader } from 'react-spinners'
import BeatLoader from 'react-spinners/BeatLoader'
import { db, useAuth } from '../../Firebase'
import { uuidv4 } from '@firebase/util'

function Contact() {
    const isMobile = useMediaQuery('(max-width : 460px)')
    const [email , setEmail] = useState('')
    const [message , setMessage] = useState('')
    const [name , setName] = useState('') 
    const [load , setLoad] = useState(false)
    const [showAlert , setShowAlert] = useState(false)
    const params = useParams()
    const changeHandel =(e)=>{
        e.target.name =='email' ? setEmail(e.target.value) : e.target.name =='message' ? setMessage(e.target.value) : setName(e.target.value)
    }  
    const sendHandel = (e)=>{
        e.preventDefault()
        // console.log(email , message , name)
        setLoad(true)
        addDoc(collection(db , 'mails' ), {
            mail_id : uuidv4() ,
            user : name ,
            email : email ,
            message : message , 
            isRead : false ,
            time : new Date() ,
            store_id : params?.id
        }).then((res)=>{
            setEmail('')
            setMessage('')
            setName('')
            setShowAlert(true)
            setLoad(false)
        })

    }
    return (
        <>
      { showAlert && <Alert className='fs-6 d-flex justify-content-center vertcally-centerd'>Your mail has been sent successefully</Alert>}
      <div  className='bg- jus-center py-4 '>
       <div className=" bg-warnig col-12 col-lg-8 d-fle vertcally-centerd">
        {!isMobile && <img  className='p-3C col-6' width="400px" src="https://img.freepik.com/vecteurs-libre/illustration-concept-stage_114360-6225.jpg" alt="" />}
        <Form
         onSubmit={sendHandel}
         className='bg-inf col-11 col-lg-5 mx-auto py-4 '>
        <Form.Label>FullName :</Form.Label>
            <Form.Control 
            
            onChange={changeHandel}
            name='name'
            type='text'
            placeholder='full name'
            value={name}
            required className='input' />


            <Form.Label>Enter your Email :</Form.Label>
            <Form.Control 
            onChange={changeHandel}
            name='email'
            type='email'
            placeholder='example@mail.com'
            value={email}
            required className='input' />
            <Form.Label>how can we help you ? :</Form.Label> <br />
            <textarea 
            onChange={changeHandel}
            name='message'
            type='text'
            placeholder='describe your problem..'
            value={message}
             rows='5' maxLength='300' required  className='input bord w-100'  />
            <div className='justify-content-end d-flex'>
                <Form.Text>{message?.length}/300</Form.Text>
            </div>
           
            {/* <div className="horiz-centerd mx-3"> */}
                
                 <Button type='submit' variant='' className='btn border-0 py- bg-darkblue text-light w-100'>
                    Send 
                    {load &&<BeatLoader color="#fff" size='5px'speedMultiplier={0.4}  />}
                 </Button> <br />
                 <Form.Text>We'll respond in less than 48h</Form.Text>
            {/* </div> */}
        </Form>
       </div>
    </div>
    </>
  )
}

export default Contact