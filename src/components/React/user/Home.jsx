import React from 'react'
import Header from './Header'
import Banner from './Banner'
import Package from './Package'
import Supplement from './Supplement'
import Diet from "./Diet"
import Schedule from './Schedule'
import Footer from './Footer'
import Notification from './Notification'

const Home = () => {
  return (
    <div>
        <Header/>
        <Banner/>
        <Notification/>
        <Package/>
        <Supplement/>
        <Diet/>
        <Schedule/>
        <Footer/>
    </div>
  )
}

export default Home
