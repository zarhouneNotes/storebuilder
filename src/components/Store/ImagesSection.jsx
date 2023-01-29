import { width } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMediaQuery } from 'usehooks-ts'
import VariantTmb from './VariantTmb'

export default function ImagesSection ({product }){
    const isMobile = useMediaQuery('max-width("460px")')
    const [mainImg , setMainImg] = useState(product?.images[0] )
   
    const params = useParams()
    return (
          <div className={`col-sm-12 col-lg-5  bg-liht border`}>
                <img src={mainImg} alt="" srcset=""  
                width={ "100%"} 
                />
            <div className="variants bg- d-flex gap-1 mt-1">
                {product?.images?.map((image )=>{
                    return   <VariantTmb  setMainImg={setMainImg} mainImg={mainImg}  image={image}  />
                })}
            
           </div>
        </div>
    )
}