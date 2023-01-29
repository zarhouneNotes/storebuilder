import React from "react";

function LoadingProducts (){
   return( 
   <div className="bg-dangr mx-auto col-lg-11 d-flex flex-wrap ">

    {[1,2,3,4,5,6,7,8].map((c)=>{
       return <div className="col-6 col-lg-3 bg-succss text-center m" style={{ aspectRatio  : "1/1" }}>
                   <div className="bg-lightt m-1  h-100">
                            
                    </div>
                </div>
    })}
        
       
        
      
      
        
    </div>)
}

export default LoadingProducts