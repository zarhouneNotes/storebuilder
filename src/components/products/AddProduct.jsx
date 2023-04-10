import { color } from '@mui/system'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { FiPlus} from 'react-icons/fi'
import {uploadBytes , getDownloadURL , ref} from 'firebase/storage'
import { db, storage, useAuth } from '../../Firebase'
import { uuidv4 } from '@firebase/util'
import AddPtoductLoad from './AddPtoductLoad'
import { doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'
import Category from '../Dashboard/Category'


function AddProduct() {
    const currentStore = useAuth()
    const [mainTag , setMainTag] = useState('')
    const [filesToUpload , setFilesToUpload] = useState([])
    const [selectValue, setSelectValue] = useState('')
    const [variant, setVariant] = useState('')
    const [variants, setVariants] = useState([]) ;
    const [colors, setColors] = useState([]) ;
    const  [title , setTitle] = useState('') ;
    const  [desc , setDesc] = useState('') ;
    const  [price , setPrice] = useState(0) ;
    const [load , setLoad] = useState(false)
    const [cat , setCat] = useState('')
    const [cats , setCats] = useState([])
    const [options , setOptions] = useState()
    const productId = uuidv4()

    useEffect(()=>{
        let fetch = true
        if(fetch && currentStore){
            onSnapshot(doc(db , 'stores' , currentStore?.uid), (res)=>{
                const d = res.data()
               setOptions(d?.categories)
                
            })
        }
        return ()=>{
            fetch = false
        }
    },[currentStore])
 


    const  uploadPics=   (e) =>{
        e.preventDefault()
        const arrOfUrls = []
        if (filesToUpload && currentStore){
            setLoad(true)
            setDoc(doc(db , 'products' , productId),{
                store_id : currentStore?.uid ,
                product_id : productId ,
                title : title ,
                description : desc ,
                price : price ,
                images : [] , 
                colors : colors ,
                variants : variants , 
                instock : true , 
                categories : cats ,
                main_tag : mainTag

            })
            .then(()=>{
                Object.values(filesToUpload).map((file)=>{
                    const fileRef= ref(storage , file.name )
                    uploadBytes(fileRef , file )
                    .then(()=>{
                        getDownloadURL(fileRef)
                        .then((url)=>{
                           arrOfUrls.push(url)
                           updateDoc(doc(db , 'products' , productId),{
                            images : arrOfUrls
                           })
                        }).catch((err)=>{
                            console.log(err.message)
                        })
                    })
                    .catch((err)=>{
                        console.log(err.message)
                    })
                })
            }) .then(()=>{
                    setDesc('')
                    setPrice(0)
                    setTitle('')
                    setFilesToUpload([])
                    setColors([])
                    setVariants([])
                    setLoad(false)
                    setCats([])
                   })
                
           
        
   
         
        }

         
    }

   

    const AddVariant=(e)=>{
        e.preventDefault()
        if (variant!=="" && !variants.includes(variant)) {
            variants.push(variant)
            setVariant('')
        }
    }
    const AddColor=(e)=>{
        e.preventDefault()
        if (selectValue!=="" && !colors.includes(selectValue)) {
            colors.push(selectValue)
            setSelectValue('')
        }
        
    }
    const AddCat=(e)=>{
        e.preventDefault()
        if (cat!=="" && !cats.includes(cat)) {
            cats.push(cat)
            setCat('')
        }
        
    }

    const arrIncludes = (value)=>{
        return variants.includes(value) || colors.includes(value)
    }

    const deleteItem = (arr   , item)=>{
            const newArr = arr.filter((val)=>{
                return val !== item
            })
            return newArr
    }

  return (
    <>
    <div className='jus-center  position-relative bg-sccess add-product  '>
        <Form className="add-product-form-container bg-ifo " onSubmit={uploadPics}>
            <div className='bg-ino horiz-centerd'> 
                        <h3>Add product</h3>
                        <Button 
                        type='submit'
                        // onClick={addProduct}
                        className='border-0 px-4  bg-darkblue' 
                         >
                                Add product
                         </Button>
            </div>
           
            <div className=''>
                <Form.Label className=' darkblue'>upload your images</Form.Label>
                <div className="upload-input-container d-flex flex-wrap ">
                    <div className="upload-plus mx-2 my-1  ">
                        <Button className='my-btn w-100 h-100' >
                          <FiPlus />
                        </Button>
                       
                        <input  
                            required
                        onChange={(e)=>{
                            setFilesToUpload(e.target.files)
                        }}
                        className='position-absolute upload-btn'  type="file" accept='image/*' multiple />
 
                    </div>
                    {Object.values(filesToUpload).map((file)=>{
                       return <div 
                              className="  mx-2 my-1 border position-relative bg-ifo variant-dim local-image-variant vertcally-centerd"  >
                                <img  className='mx-auto' src={URL.createObjectURL(file)} alt="" srcset="" width='100%' />
                                     <AiOutlineCloseCircle
                                     onClick={(e)=>{
                                        e.preventDefault()
                                        setFilesToUpload(deleteItem(Object.values(filesToUpload) , file))
                                     }}
                                      className='delete-variant ' fontSize="18px" />
                              </div>
                    })}
    
                        
                    
                </div>
                <Form.Label className='mt-2 darkblue'>Title</Form.Label>
                <Form.Control 
                required
                    onChange={(e)=>{setTitle(e.target.value)}}
                    value={title}   type=''placeholder='name your product' className='input '/>
               
                <Form.Label className='mt- mt-2 darkblue'>Description</Form.Label>
                <Form.Control 
                required
                    onChange={(e)=>{setDesc(e.target.value)}}
                    value={desc}  type=''placeholder='describe your product in few words' className='input w-5'/>



                <Form.Label className='mt- mt-2 darkblue'>Main category <small className="text-secondary">(Check settings to add your categories)</small></Form.Label>
                <div className="">
                    <Form 
                    
                    
                    onChange={(e)=>{
                            setMainTag(e.target.value)
                    }}>
                               {options?.map((op)=>{
                                        return (<div>
                                                    <input  type="radio" id={op} name="options" value={op}/>
                                                    <label for={op}>{op}</label>
                                                </div>)
                                    })}
                    
                    </Form>
                    
            
                
                </div>




                <Form.Label className='mt- mt-2 darkblue'>Additionnal tags <small className="text-secondary">(Check settings to add your categories)</small></Form.Label>
                <div className="d-flex">
                    <Form.Select 
                                
                                    value={cat}
                                    onChange={(e)=>{
                                        setCat(e.target.value)
                                    }}
                                    size='sm'
                                    className='input  w-100'
                                
                                >
                                    
                                                <option value='' >Which categories your product goes in ?</option>
                                    {options?.map((op)=>{
                                        return  <option value={op}  >{op}</option>
                                    })}
                                
                    </Form.Select>
                    <Button className='my-btn btn' onClick={AddCat} >Add</Button>
            
                
                </div>

                <div className="d-flex colors mt-2 gap-2">
                    {cats?.map((item)=>{
                        return <Category value={item} deleteHandel={()=>{setCats(deleteItem(cats , item))}} />
                    })}
                </div>


                <Form.Label className='mt-2 darkblue'>price </Form.Label>                   
                <Form.Control
                   required
                    min={0}
                    onChange={(e)=>{setPrice(e.target.value)}}
                    value={price}  className='input' type='number'placeholder='00.00$' style={{width:'4cm'}} />
                <div className="variants" >
                    <Form.Label className='mt- mt-2 darkblue'>Variants </Form.Label>
                    <div className="vertcally-centerd variants-check  horiz-center">
                      
                       <div className="variant-input  vertcally-center d-flex  ">
                            <Form.Control
                            
                                value={variant}
                                onChange={(e)=>{
                                    setVariant(e.target.value)
                                }}
                                //  disabled={isColors} 
                                  size='sm' placeholder='variant name' className='input  ' /> 
                            <Button  
                                onClick={AddVariant}
                                disabled={variant.length ==0}
                                variant='dark'  className='my-border my-btn vertcally-centerd  '>
                                <FiPlus />
                            </Button>
                       </div>
                        
                        <div className='variant-input mx-3 vertcally-center  d-flex'>
                            <Form.Select 
                            
                                value={selectValue}
                                onChange={(e)=>{
                                    setSelectValue(e.target.value)
                                }}
                                size='sm'
                                className='input  w-100'
                            
                            >
                                <option value='' >Select colors</option>
                                <option disabled={arrIncludes('Blue')} value="Blue">Blue</option>
                                <option disabled={arrIncludes('Green')} value="Green">Green</option>
                                <option disabled={arrIncludes('white')}  value="white">white</option>
                                <option disabled={arrIncludes('Black')} value="Black">Black</option>
                                <option disabled={arrIncludes('brown')} value="brown">brown</option>
                                <option disabled={arrIncludes('Grey')} value="Grey">Grey</option>
                            </Form.Select>
                            <Button 
                                variant='dark'
                                disabled={selectValue.length ==0}
                                onClick={AddColor}
                                className='my-border my-btn vertcally-centerd h-10 '>
                                <FiPlus />
                            </Button>
                        </div>
                        
                        
                    </div>
                    <div className='m mt-2  variant-values'>
                       
                       { colors?.length !==0 &&
                           <div className="colors  vertcally-centerd d-gri">
                            <div>Colors: </div>
                            {colors?.map((color)=>{
                                return (
                                    <div className='m-2 border position-relative p-1 vertcally-centerd horiz-centerd' >
                                        <AiOutlineCloseCircle 
                                        onClick={(e)=>{
                                            e.preventDefault()
                                            setColors(deleteItem(colors , color))
                                         }}
                                        className='delete-variant orange-color' fontSize="18px" />
                                            <span className=" bg-ligt variant-span vertcally-centerd  py-1 px-2 ">
                                                <span className='variant-color' style={{backgroundColor:color}} />
                                                <small className='mx-2'>
                                            {color}
                                                </small>
                                            </span>
                                        
                                    </div>
                                )
                            })}
                       </div>}
                       
                       { variants?.length !==0 &&  <div className="other-varians mt-3 vertcally-centerd d-gri">
                            <div>Other: </div>
                            {variants?.map((variant)=>{
                                return (
                                    <div className='m-2 border position-relative p-1 vertcally-centerd horiz-centerd' >
                                        <AiOutlineCloseCircle 
                                        onClick={(e)=>{
                                            e.preventDefault()
                                            setVariants(deleteItem(variants , variant))
                                         }}
                                        className='delete-variant orange-color' fontSize="18px" />
                                            <span className=" bg-ligt variant-span vertcally-centerd  py-1 px-2 ">
                                                <small className='mx-2'>
                                            {variant}
                                                </small>
                                            </span>
                                        
                                    </div>
                                )
                            })}
                       </div>}
                      
                       

                
                       
                      
                    </div>

                </div>
                
           
            </div>
        </Form>
     
    </div>
    { load && <AddPtoductLoad />}
    </>
  )
}

export default AddProduct