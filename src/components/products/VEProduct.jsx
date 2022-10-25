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
import { useParams } from 'react-router-dom'
import Category from '../Dashboard/Category'


function VEProduct() {
    const params = useParams()
    const currentStore = useAuth()
    const [images , setImages] = useState( [])
    const [filesToUpload , setFilesToUpload] = useState([])
    const [selectValue, setSelectValue] = useState('')
    const [variant, setVariant] = useState('')
    const [variants, setVariants] = useState([]) ;
    const [colors, setColors] = useState([]) ;
    const  [title , setTitle] = useState('') ;
    const  [desc , setDesc] = useState('') ;
    const  [price , setPrice] = useState(0) ;
    const [cats , setCats] = useState([])
    const [cat , setCat] = useState('')
    const [options , setOptions] = useState()
    const [load , setLoad] = useState(false)

    useEffect(()=>{
        let fetch = true
        if (fetch && params && currentStore) {
            setLoad(true)
            onSnapshot(doc(db , 'stores' , currentStore?.uid), (res)=>{
                const d = res.data()
               setOptions(d?.categories)
                
            })
            onSnapshot(doc(db , 'products' , params.id),(res)=>{
                const p = res.data()
                setImages(p?.images)
                setTitle(p?.title)
                setDesc(p?.description)
                setPrice(p?.price)
                setColors(p?.colors)
                setVariants(p?.variants)
                setCats(p?.categories)
                setLoad(false)
                

            })
        }
    },[currentStore])


    const  uploadPics=   (e) =>{
        e.preventDefault()
        const arrOfUrls = []
        if ( currentStore){
            setLoad(true)
            updateDoc(doc(db , 'products' , params?.id),{
                title : title ,
                description : desc ,
                images : images ,
                price : price ,
                colors : colors ,
                variants : variants , 
                instock : true ,
                categories : cats ,      
            })
            .then(()=>{
               if (filesToArr.length !==0) {
                    filesToArr.map((file)=>{
                    const fileRef= ref(storage , file.name )
                    uploadBytes(fileRef , file )
                    .then(()=>{
                        getDownloadURL(fileRef)
                        .then((url)=>{
                           arrOfUrls.push(url)
                           updateDoc(doc(db , 'products' , params?.id),{
                            images : images?.concat(arrOfUrls)
                           })
                        }).catch((err)=>{
                            console.log(err.message)
                        })
                    })
                    .catch((err)=>{
                        console.log(err.message)
                    })
                })
               }
            }) .then(()=>{
                   setLoad(false)
                    console.log('done')
                   })
                
           
        
   
         
        }

         
    }
    const filesToArr = Object.values(filesToUpload)


    const AddVariant=(e)=>{
        e.preventDefault()
        if (variant!== null && !variants.includes(variant)) {
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
  const disabled = params?.edit == 'true' ? false : true
  return (
    <>
    <div className='jus-center  position-relative   add-product  '>
        <Form className="add-product-form-container bg-no " onSubmit={uploadPics}>
            <div className='bg-ino horiz-centerd'> 
                        <h3>{params.edit == 'true' ?'Edit' : 'View' } product</h3>
                        { params.edit == 'true' && 
                        <Button 
                        type='submit'
                        className='border-0 px-4  bg-darkblue' 
                         >
                                Update product
                         </Button>}
            </div>
           
            <div className=''>
                <Form.Label className=' darkblue'>update your images</Form.Label>
                <div className="upload-input-container d-flex flex-wrap ">
                    {params?.edit == 'true' &&  <div className="upload-plus mx-2 my-1  ">
                        <Button className='my-btn w-100 h-100' >
                          <FiPlus />
                        </Button>
                       
                        <input 
                        
                        onChange={(e)=>{
                            setFilesToUpload(e.target.files)
                        }}
                        className='position-absolute upload-btn'  type="file" accept='image/*' multiple />
 
                    </div>}
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
                    {images?.map((src)=>{
                         return <div 
                         className="  mx-2 my-1 border position-relative bg-ifo variant-dim local-image-variant vertcally-centerd"  >
                           <img  className='mx-auto' src={src} alt="" srcset="" width='100%' />
                                {!disabled && <AiOutlineCloseCircle
                                onClick={(e)=>{
                                   e.preventDefault()
                                   setImages(deleteItem(images , src))
                                }}
                                 className='delete-variant ' fontSize="18px" />}
                         </div>
                    })

                    }
    
                        
                    
                </div>
                <Form.Label className='mt-4 darkblue'>Title</Form.Label>
                <Form.Control 
                required
                    disabled={disabled}
                    onChange={(e)=>{setTitle(e.target.value)}}
                    value={title}   type=''placeholder='name your product' className='input w-5'/>
               
                <Form.Label className='mt-4 darkblue'>Description</Form.Label>
               
           
                <Form.Control 
                required
                    disabled={disabled}
                    onChange={(e)=>{setDesc(e.target.value)}}
                    value={desc}  type=''placeholder='describe your product in few words' className='input w-5'/>
                 <Form.Label className='mt- mt-2 darkblue'>Category </Form.Label>
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
                <Button className='my-btn btn' onClick={AddCat} >ADD</Button>
            
                
                </div>
                <div className="d-flex mt-2 gap-2">
                    {cats?.map((item)=>{
                        return <Category value={item} deleteHandel={()=>{setCats(deleteItem(cats , item))}} />
                    })}
                </div>
                <Form.Label className='mt-4 darkblue'>Price </Form.Label>
                <Form.Control
                required
                    disabled={disabled}
                    min={0}
                    onChange={(e)=>{setPrice(e.target.value)}}
                    value={price}  className='input' type='number'placeholder='00.00$' style={{width:'4cm'}} />
                <div className="variants">
                    <Form.Label className='mt-4 darkblue'>Variants </Form.Label>
                    <div className="vertcally-centerd variants-check  horiz-center">
                      
                       <div className="variant-input  vertcally-center d-flex  ">
                            <Form.Control
                            
                                disabled={disabled}
                                value={variant}
                                onChange={(e)=>{
                                    setVariant(e.target.value)
                                }}
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
                            
                                disabled={disabled}
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
                    <div className='mt-4  variant-values'>
                       
                       { colors.length !==0 &&
                           <div className="colors  vertcally-centerd d-gri">
                            <div>Colors: </div>
                            {colors?.map((color)=>{
                                return (
                                    <div className='m-2 border position-relative p-1 vertcally-centerd horiz-centerd' >
                                        { !disabled && <AiOutlineCloseCircle 
                                        onClick={(e)=>{
                                            e.preventDefault()
                                            setColors(deleteItem(colors , color))
                                         }}
                                        className='delete-variant orange-color' fontSize="18px"
                                         />}
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
                       
                       { variants.length !==0 &&  <div className="other-varians mt-3 vertcally-centerd d-gri">
                            <div>Other: </div>
                            {variants?.map((variant)=>{
                                return (
                                    <div className='m-2 border position-relative p-1 vertcally-centerd horiz-centerd' >
                                        { !disabled &&  <AiOutlineCloseCircle 
                                        onClick={(e)=>{
                                            e.preventDefault()
                                            setVariants(deleteItem(variants , variant))
                                         }}
                                        className='delete-variant orange-color' fontSize="18px"
                                        />}
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

export default VEProduct