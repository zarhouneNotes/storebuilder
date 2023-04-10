import React, { useEffect, useState } from 'react'
import BigButton from './BigButton'
import { MyChart } from './MyChart'
import { MyPie } from './MyPie'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db, useAuth } from '../../Firebase'
import Stats from './Stats'
import { MoonLoader } from 'react-spinners'

function Reports() {
  
  const cs = useAuth()
  const [ordersList , setOrdersList] = useState()
  const [load , setLoad] = useState(false)
  const [shippedNum , setShippedNum] = useState(0)
  const [canceledNum , setCanceledNum] = useState(0)
  const [readNum , setReadNum] = useState(0)


  const [thisDayNumber , setThisDayNumber] = useState(0)
  const [thisWeekNumber , setThisWeekNumber] = useState(0)
  const [thisMonthNumber , setThisMonthNumber] = useState(0)
  const [thisYearNumber , setThisYearNumber] = useState(0)


  const [dayProfit , setDayProfit] = useState(0)
  const [weekProfit , setWeekProfit] = useState(0)
  const [monthProfit , setMonthProfit] = useState(0)
  const [yearProfit , setYearProfit] = useState(0)
  const [allTimeProfit , setAllTimeProfit] = useState(0)

  const thisDay = new Date().toDateString()
  const thisMonth =new Date().getMonth().toString()+'/'+new Date().getFullYear().toString()
  const thisYear = new Date().getFullYear().toString()
  const data = {
    labels: ["Canceled", "Shipped", "Read"],
    datasets: [
      {
        label: "# of Votes",
        data: [canceledNum , shippedNum , readNum],
        backgroundColor: ["red", "#0f0", "skyblue"],
        // borderColor: [
        //   'rgba(255, 99, 132, 1)',
        //   'rgba(54, 162, 235, 1)',
  
        // ],
        borderWidth: 1,
      },
    ],
  };



  useEffect(()=>{
  
   
    if (cs) {
      setLoad(true)
     onSnapshot(query(collection(db , 'orders') , where('store_id' , '==' , cs?.uid )),
     (res)=>{
         const arr = []
         
         res?.docs.forEach((doc)=>{
            arr.push(doc.data())
        })
        setOrdersList(arr)
        /////////day
        var  ThisDayOrders = 0 
        var p_day = 0
        arr?.map((order)=>{ 
          const  toDate = new Date(order?.time.seconds * 1000 + order?.time.nanoseconds/1000000).toDateString()
          
          if(toDate==thisDay ){
            ThisDayOrders = ThisDayOrders +1
            p_day = p_day + parseFloat(order?.total_charge)
          }else{
            ThisDayOrders = ThisDayOrders
          }
          })
          setDayProfit(p_day)
          setThisDayNumber(ThisDayOrders)

    ///////////////mionth
      var  thisMonthOrders = 0 
      var p_month = 0
      arr?.map((order)=>{ 
        const  toDate = new Date(order?.time.seconds * 1000 + order?.time.nanoseconds/1000000).getMonth().toString()+'/'+new Date(order?.time.seconds * 1000 + order?.time.nanoseconds/1000000).getFullYear().toString()
        
        if(toDate==thisMonth ){
          thisMonthOrders = thisMonthOrders +1
          p_month = p_month + parseFloat(order?.total_charge)
        }else{
          thisMonthOrders = thisMonthOrders
        }
        })
        setThisMonthNumber(thisMonthOrders)
        setMonthProfit(p_month)

        /////////weeeek

        var  thisweek = 0 
        var p_week = 0
        arr?.map((order)=>{ 
          const new_day = new Date().getDate()
          const  toDate = new Date(order?.time.seconds * 1000 + order?.time.nanoseconds/1000000).getDate()
          const  day_year = new Date(order?.time.seconds * 1000 + order?.time.nanoseconds/1000000).getMonth().toString()+'/'+new Date(order?.time.seconds * 1000 + order?.time.nanoseconds/1000000).getFullYear().toString()

          if(new_day-toDate<=7  && thisMonth == day_year ){
            thisweek = thisweek +1
            p_week = p_week + parseFloat(order?.total_charge)
          }else{
            thisweek = thisweek
          }

          
        }
          )
          setThisWeekNumber(thisweek)
          setWeekProfit(p_week)
///////////yaeear

          var  allTime = 0 
          var p_year = 0
          arr?.map((order)=>{ 
            const  toDate = new Date(order?.time.seconds * 1000 + order?.time.nanoseconds/1000000).getFullYear().toString()
            
            if(toDate==thisYear ){
              allTime = allTime +1
              p_year = p_year + parseFloat(order?.total_charge)
            }else{
              allTime = allTime
            }
            })
            setThisYearNumber(allTime)
            setYearProfit(p_year)
        var shipped = 0 ; 
        var canceled = 0 ; 
        var read = 0 ; 
        var p = 0 ;
        arr?.map((order)=>{
          p = p + parseFloat(order?.total_charge)
          if (order?.status == 'shipped') {
            shipped = shipped + 1
          }if (order?.status == 'canceled') {
            canceled = canceled +1 
          }
          if (order?.status == 'read') {
            read = read +1 
          }
        })
        setAllTimeProfit(p)
        setCanceledNum(canceled)
        setReadNum(read)
        setShippedNum(shipped)
        setLoad(false)
    }
 
     )
    }
 
 
   },[cs])
 
   







  return load ? 
  <div className="jus-center w-100 h-100 vertcally-centerd">
    <MoonLoader   size={30}
 color="#151717" />

  </div>
   :(
    <div className="bg-secondry reports ">
        <div className="mt-3  big-btns col-12 col-lg-10 mx-auto ">
            <BigButton label='all orders' value={ordersList?.length}   bg='black' />
            <BigButton  label='shipped' value={shippedNum} bg='#16cc77' />
            <BigButton  label='canceled' value={canceledNum} bg='#f54542'/>
            <BigButton  label='Read' value={readNum} bg='#008b8b'/>
            <BigButton  label='profit' value='321.21$' bg='#44bcd8' profit={true} />
        </div>   
        <hr />
       <div className=" vertcally-centerd around mt-2 c bg-scondary">
        <div className="chart col-12 col-lg-5  jus-cen bg-info my-auto ">
            {/* <MyChart /> */}
            {/* <Stats /> */}
          <div className="bg-light p-3 d-flex horiz-centerd  ">
           <div className="fs- text-secondary">To day orders</div>  
           <div className=""> {thisDayNumber} </div>
           <div className="">{dayProfit}$</div>
          </div>


          <div className="bg-light p-3 d-flex horiz-centerd ">
           <div className="fs- text-secondary"> This week orders </div>  
           <div className=""> {thisWeekNumber} </div>
           <div className="">{weekProfit}$</div>
          </div>

          <div className="bg-light p-3 d-flex horiz-centerd ">
           <div className="fs- text-secondary">This month orders</div>  
           <div className=""> {thisMonthNumber} </div>
           <div className="">{monthProfit}$</div>
          </div>

          <div className="bg-light p-3 d-flex horiz-centerd ">
           <div className="fs- text-secondary">This year orders</div>  
           <div className=""> {thisYearNumber} </div>
           <div className="">{yearProfit}$</div>
          </div>

          <div className="bg-light p-3 d-flex horiz-centerd ">
           <div className="fs- text-secondary">All time  orders</div>  
           <div className=""> {ordersList?.length} </div>
           <div className="">{allTimeProfit}$</div>
          </div>
            {/* !this month orders : {ThisMonth()} <br />
            this year orders : {AllTime()} <br />
            this week orders : {ThisWeek()} <br />
            all time  orders :  {ordersList?.length} */}
        </div>
        <div className="chart col-8 mx-auto col-lg-5 bg-ifo" style={{scale:''}}>
            <MyPie data={data} />
        </div>
       
       </div>
    </div>
  )
}

export default Reports