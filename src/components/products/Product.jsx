import { deleteDoc, doc } from 'firebase/firestore'
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import {AiFillEye} from 'react-icons/ai'
import {BiEditAlt} from 'react-icons/bi'
import {BsTrashFill} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import {useMediaQuery} from 'usehooks-ts'
import { db } from '../../Firebase'
import Loader from '../AuthComponents/Loader'
  

function Product({product , fetch}) {
  const isMobile=   useMediaQuery("(max-width: 700px)")
  const [show, setShow] = useState(false);
  const [load , setLoad] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const deleteProduct = ()=>{
    setLoad(true)
    deleteDoc(doc(db, 'products' , product?.product_id))
    .then(()=>{
      fetch()
      setLoad(false)
    })
  }
   return (
    <>
    <div className='horiz-centerd border px-2 my-1 vertcally-centerd '>
      <div className='vertcally-centerd' >
        <div className='bg-img  ' style={{backgroundImage:`url(${product?.images[0]})` , width:'60px' , height : '60px'}}  />
        <small  className='mx-2 cut-text'>  {product?.title}</small>
      </div>
      <div>
        <small>
          {product?.price}$
        </small>
      </div>
      <div>
        <small>
          in Stock
        </small>
      </div>

      { !isMobile && <div className="crud-icons mx-2">
        <Link to={`/dashboard/edit-product=${product?.product_id}&edit=${false}`}>
          <Button size='sm' className='bg-darkblue border-0' > <AiFillEye fontSize="18px" /> </Button>
        </Link>
        <Link to={`/dashboard/edit-product=${product?.product_id}&edit=${true}`} >
         <Button size='sm' className='bg-darkblue mx-1 border-0' > <BiEditAlt  fontSize="18px" /> </Button>
        </Link>
        <Button 
        onClick={handleShow}
        size='sm' className='orange-background  mx-1 border-0' > <BsTrashFill  fontSize="18px" /> </Button>
      </div>}
      
    </div>
    <Modal centered show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <div>Are you sure you want to delete this product ?</div>
        </Modal.Header>
        <Modal.Footer>
          <Button 
          
          variant="danger px-4" size='sm' onClick={deleteProduct}>
            { load ? <Loader  /> : "DELETE"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>)
}

export default Product