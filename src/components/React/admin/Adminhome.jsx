import React from 'react'
import Adminheader from "./Adminheader"
import Adminpackage from './Adminpackage'
import Adminsupplement from './Adminsupplement'
import Admindiet from './Admindiet'
import Adminusers from './Adminusers'

const Adminhome = () => {
  return (
    <div>
      <Adminheader/>
      <Adminpackage/>
      <Adminsupplement/>
      <Admindiet/>
      <Adminusers/>
    </div>
  )
}

export default Adminhome
