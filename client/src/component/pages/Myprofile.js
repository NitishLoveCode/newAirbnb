import React, { useContext } from 'react'
import "../css/myprofile.css"
import { User_Data } from '../../App'
import { useNavigate } from 'react-router-dom'

export default function Myprofile() {
    const navigate=useNavigate()
    const {userinfo}=useContext(User_Data)


    const logout=async()=>{
        try{
            const res=await fetch("http://localhost:8000/logout",{
                method:"POST",
                credentials:"include",
                headers:{
                    "content-type":"application/json"
                }
            })
            const data= await res.json()
            navigate("/")

        }catch(err){
            console.log(err)
        }
    }


  return (
    <>
        <div className="main_profile">
            <div className="user_info">
                <p>Logged in as {`${userinfo? userinfo.name:""}`} {`(${userinfo? userinfo.email:""})`}</p>
            </div>
            <button onClick={logout}>Logout</button>
        </div>
    </>
  )
}
