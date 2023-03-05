import React from "react";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";

function Thanks (){
    const isMobile = useMediaQuery("max-width('450px')")
    const params = useParams()
    return (
        <div className="bg-dangr text-center  ">
            <div className=""> 
                <img  className='thanks'  src="https://img.freepik.com/vecteurs-libre/peu-temps-illustration-du-concept_114360-6880.jpg" alt="" srcset="" />
            </div>
            <Button className="btn bg-darkblue px-3 py-2 border-0" size="sm" >
                <Link className="link text-white"  to={`/storeId=${params?.id}` } >Continue Shopping..</Link>
            </Button>
        </div>
    )
}
export default Thanks ;