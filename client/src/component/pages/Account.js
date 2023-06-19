import React, { useState } from 'react'
import "../css/account.css"
import { Link, useParams } from 'react-router-dom'
import Myprofile from './Myprofile'

export default function Account() {
    const[toggle,settoggle]=useState(false)

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
    </div>
    </>


  )
}
