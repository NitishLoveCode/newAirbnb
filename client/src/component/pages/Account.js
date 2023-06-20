import React, { useState } from 'react'
import "../css/account.css"
import { Link, useParams } from 'react-router-dom'
import Myprofile from './Myprofile'
import Addnewplace from './Addnewplace'
import Createplace from './Createplace'

export default function Account() {

    const {subpage}=useParams()


  return (
    <>
        <div className="main_account">
        <Link to={"/account"}>
        <div className={subpage===undefined? "color_toggle":"gray_toggle"}>My profile</div>
        </Link>
        <Link to={"/account/my-booking"}>
        <div className={subpage==="my-booking"? "color_toggle":"gray_toggle"}>My booking</div>
        </Link>
        <Link to={"/account/my-accomondatation"}>
        <div className={subpage==="my-accomondatation"? "color_toggle":"gray_toggle"}>My accomondatation</div>
        </Link>
    </div>
    <div className="result_bar">
         {subpage===undefined? <Myprofile/>:""}
         {subpage==="my-accomondatation"? <Addnewplace/>:""}
         {subpage==="create-new-place"? <Createplace/>:""}

    </div>
    </>


  )
}
