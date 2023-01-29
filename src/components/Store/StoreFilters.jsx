import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useMediaQuery } from "usehooks-ts";

export default function StoreFilters ({setColor,setShow , setSize , setLessPrice , setMaxPrice , color , size , minPrice , maxPrice}){
  const colors  = ["Blue" , 'Green' , "White" , "Black"  ,'Brown' , "Grey"]
  const Shoes_sizes = ['38' , '39' ,'40','41','42','43','44','45']
  const tops_sizes = ["S" ,"M" , 'L' , "XL" , "XXL" , "3XL"]
  const isMobile = useMediaQuery('max-width("460px")')




  const RadioOption = ({value , isColor})=>{
    return   (  <span onClick={()=>{isColor ? setColor(value) : setSize(value)}} className={`vertcally-centerd  gap-2 border my-2 p-1 ${ isColor && value == color && "border-primary" }  ${ !isColor && value == size && "border-primary" }`} style={{width :'3cm' , justifyContent : !isColor && 'center' , }}>
                    { isColor && <div className="px-2 m-1" style={{backgroundColor : value ? value : 'lightgrey'   , color : value}}>.</div>}
                      <div className="" >{value}</div>
                 </span>)

           }
    return(
        <div className="bg-in mt-2" style={{overflowY : 'scroll' , maxHeight : '70vh' }}>
          <Form>
            <Form.Label>Price</Form.Label>
            <div className="d-flex border py-3 px-2">
                <small className="col-3">Less than : {maxPrice}$</small>
                <Form.Range
                onChange={(e)=>{setMaxPrice(e.target.value)}}
                step='1'min="0" max="99"  value={maxPrice} />
            </div>
            <div className="d-flex border my-2 py-3 px-2">
                <small className="col-3">more than : {minPrice}$ </small>
                <Form.Range step='1'   min="0" max="99"  value={minPrice} onChange={(e)=>{setLessPrice(e.target.value)}}  />
            </div>
            <Form.Label>Color</Form.Label>
            <div className="bordr px-2 p3">
              {colors.map((color)=>{
                return <RadioOption isColor={true}  value={color}/>
              })}
            </div>

            <Form.Label>Tops sizes</Form.Label>
            <div className="  px-2 p3">
              {tops_sizes.map((sz)=>{
                return <RadioOption   value={sz} />
              })}
            </div>


            <Form.Label>Shoes sizes</Form.Label>
            <div className="bordr px-2 p3">
              {Shoes_sizes.map((sz)=>{
                return <RadioOption  type="radio" value={sz} />
              })}
            </div>
          </Form>
          <div className=" bg-dager jus-center gap-2">
            <Button variant="outline-dark my-" className="px- rounded-pil w-100 tn mx-auto"
            onClick={()=>{
                setLessPrice(0)
                setMaxPrice(99)
                setColor()
                setSize()
                // setShow(false)
            }}
             >Reset</Button>
            <Button 
           
             variant=" primary" className=" bg-darkblue rounded-pil w-100  mx-auto" onClick={()=>{setShow(false)}} >Save</Button>
          </div>

        </div>
    )
}