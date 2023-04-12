import { collection, onSnapshot, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db, useAuth } from '../../Firebase'
import Mail from './Mail'

function Mails() {
    const [mailsList  , setMailsList] = useState()
    const [load , setLoad ] = useState(false)
    const [showContent , setShowContent] = useState('')
    const currentStore = useAuth()

    const getMails  = ()=>{
       if (currentStore) {
        onSnapshot(query(collection(db , 'mails') , where('store_id' , '==' , currentStore?.uid )),
        (res)=>{
            const arr = []
            setLoad(true)
            res?.docs.forEach((doc)=>{
               arr.push(doc.data())
           })

           setMailsList(arr)
        //    orderLength = arr.lengthc
        //    setOrderBadge(res?.docs.length)
           setLoad(false)
       }

        )
       }
    }
    useEffect(()=>{
       const unsubscribe =  getMails()
       return unsubscribe
    },[currentStore])
  return mailsList?.length == 0 ? 
  <div className="text-secondary add-product text-center py-3">
    your mails list is empty!
  </div> : (
    <div className='add-product mails'>
            <div className=' col-lg-11  mx-2 mt-3 fs-4' >Mails</div>
            
            
            <div className="mt-3 ">
                {mailsList?.map((mail)=>{
                    return <Mail setShowContent={setShowContent} showContent={showContent} details={mail}  key={mail?.email}/>
                })}
                
            </div>
    </div>
  )
}

export default Mails