import React from "react";

function VariantTmb ({setMainImg , mainImg , image }){
   return <div 
   onClick={()=>{
    setMainImg(image)
   }}
   className={`bg-img  border ${mainImg == image && 'border-dark variant-tmb' } `} style={{backgroundImage: `url("${image}")` , width :'2cm' , height : "2cm" }}  />
}
export default VariantTmb