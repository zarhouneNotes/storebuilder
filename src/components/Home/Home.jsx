import React from 'react'
///css
import './home.css'
///components
import Navbar from './Navbar'
import Footer from './Footer'
import Hero from './Hero'
import PreFooter from './PreFooter'
import ThirdSec from './ThirdSec'
import WhyUs from './WhyUs'
import Fourd from './Fourd'
import Fivth from './Fivth'


function Home() {
  return (
    <div className='home'>
        <Navbar />
        <Hero />
        <WhyUs />
        <ThirdSec />
        <Fourd />
        <Fivth />
        <PreFooter />
        <Footer />
    </div>
  )
}

export default Home