import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { Button, ButtonGroup, Dropdown, DropdownButton, Form, Modal } from 'react-bootstrap'
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
  const [load , setLoad] = useState(false) ;
  const size  = isMobile ? '50px' : "70px"

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
    <div className='horiz-centerd bg   px-2  vertcally-centerd '>
      <div className='vertcally-centerd' >
        <div className='bg-img bg-light ' style={{backgroundImage:`url(${product?.images[0]})` , width:size , height : size}}  />
        <div className="mx-2 cut-text">  {product?.title}</div> 
      </div>
      <div>
        <small>
          {product?.price}$
        </small>
      </div>
  {!isMobile &&     <div>
        {/* <small>
          {product?.instock ? 'Available' : 'Out Of Stock'}
        </small> */}
             <Form.Select 
                                size='sm'
                                className='input'
                                // value='hhhh'
                                // defaultValue={product?.instock ? 'available' : 'Out Of Stock'}
                                onChange={(e)=>{
                                    updateDoc(doc(db , 'products' , product?.product_id) , {instock : e.target?.value})
                                }}
                            
                            >
                              {/* <option>{product?.instock ? 'Available' : 'Out Of Stock'}</option> */}
                              
                                <option selected={product?.instock == 'av' }  value='av'  >Available</option>
                                <option value='oof' selected={product?.instock == 'oof' } >Out of Stock</option>
                              

                                
                                
                            
                </Form.Select>
      </div>}
     <div>
        <small>
          {product?.main_tag}
        </small>
      </div>
      {isMobile &&  <DropdownButton
            as={ButtonGroup}
            variant='dark'
            size="sm"
            style={{scale  : '0.7'}}
            
          >
            <Dropdown.Item >
            <div className="crud-icons mx-2">
              <Link to={`/dashboard/edit-product=${product?.product_id}&edit=${false}`}>
                <Button size='sm' className='bg-darkblue border-0' > <AiFillEye fontSize="18px" /> </Button>
              </Link>
              <Link to={`/dashboard/edit-product=${product?.product_id}&edit=${true}`} >
              <Button size='sm' className='bg-darkblue mx-1 border-0' > <BiEditAlt  fontSize="18px" /> </Button>
              </Link>
              <Button 
              onClick={handleShow}
              size='sm' className='orange-background  mx-1 border-0' > <BsTrashFill  fontSize="18px" /> </Button>
            </div>
            </Dropdown.Item>
           
      </DropdownButton>}

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
      <hr />
    </>)
}

export default Product