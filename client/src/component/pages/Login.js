import React, { useContext, useEffect, useState } from 'react'
import "../css/login.css"
import { Link, useNavigate } from 'react-router-dom'
import { User_Data } from '../../App'


export default function Login() {
  const navigate=useNavigate()

  const {userinfo,setuserinfo}=useContext(User_Data)

  const[email,setemail]=useState()
  const[password,setpassword]=useState()

  const [fillerr,setfillerr]=useState(false)

  const login=async()=>{
    if(email && password){
        try{
          setfillerr(false)
          const res=await fetch("http://localhost:8000/login",{
            credentials:"include",
            method:"POST",
            headers:{
              "content-type":"application/json"
            },
            body:JSON.stringify({
              email,
              password
            })
          })
          const data=await res.json()
          if(res.status===200){
            if(!userinfo){
                setuserinfo(data)
            }
            navigate("/")
          }

        }catch(err){
          console.log(err)
        }
    }else(
      setfillerr(true)
    )
  }
  const autoLogin=async()=>{
    try{
        const res=await fetch("http://localhost:8000/login",{
          credentials:"include",
          method:"POST",
          headers:{
            "content-type":"application/json"
          }
        })
        const data=await res.json()
        if(res.status===200){
            if(!userinfo){
                setuserinfo(data)
            }
          navigate("/")
        }

      }catch(err){
        console.log(err)
      }
  }


  useEffect(()=>{
    autoLogin()
  },[])


  return (
    <>
        <div className="main_login">
            {fillerr ? <p>Plese fill all fields.</p>:""}
            <input type="text" name="email" placeholder='Email'
              value={email} onChange={e=>setemail(e.target.value)}
            />
            <input type="text" name="password" placeholder='Password'
              value={password} onChange={e=>setpassword(e.target.value)}
            />
            <button onClick={login}>Login</button>
            <span>I don't have an account <Link to={"/register"}>Register</Link></span>
        </div>
    </>
  )
}
