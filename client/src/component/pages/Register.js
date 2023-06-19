import React, { useEffect, useState } from 'react'
import "../css/login.css"
import { Link, useNavigate } from 'react-router-dom'
export default function Register() {
  const navigate=useNavigate()
  const[name,setname]=useState()
  const[email,setemail]=useState()
  const[password,setpassword]=useState()
  const [Cpassword,setCpassword]=useState()

  const [worngpass, setwrongpass]=useState(false)
  const[fillerr,setfillerr]=useState(false)
  const[dublicateEmail, setdublicateEmail]=useState(false)

  const register=async()=>{
    
    setwrongpass(false)
    setdublicateEmail(false)
    if(name && email && password && Cpassword){
        setfillerr(false)
      if(password===Cpassword){
        setwrongpass(false)
        try{
          const res= await fetch("http://localhost:8000/register",{
            method:"POST",
            credentials:"include",
            headers:{
              "content-type":"application/json"
            },
            body:JSON.stringify({
              name,
              email,
              password
            })
          })
          const data= await res.json()
          if(res.status===200){
            navigate("/")
          }
          if(res.status===409){
            setdublicateEmail(true)
          }



        }catch(err){
          console.log(err)
        }
  
      }else(
        setwrongpass(true)
      )
    }else(
      setfillerr(true)
    )
  }
  // ------------------------------------auto enter-----------------------------
  const autoEnter=async()=>{
    try{
      const res= await fetch("http://localhost:8000/register",{
        method:"POST",
        credentials:"include",
        headers:{
          "content-type":"application/json"
        },
      })
      const data= await res.json()
      if(res.status===200){
        navigate("/")
      }



    }catch(err){
      console.log(err)
    }
  }


  useEffect(()=>{
    autoEnter()
  },[])

  return (
    <>
        <div className="main_login">
            {worngpass ? <p>Password and Conformpassword not matched</p>:""}
            {fillerr ? <p>Please fill all required form</p>:""}
            {dublicateEmail ? <p>This Email is already registered.</p>:""}
            <input type="text" name="name" placeholder='Name'
              value={name} onChange={e=>setname(e.target.value)}
            />
            <input type="text" name="email" placeholder='Email'
              value={email} onChange={e=>setemail(e.target.value)}
            />
            <input type="text" name="conform password" placeholder='Password'
              value={password} onChange={e=>setpassword(e.target.value)}
            />
            <input type="text" name="password" placeholder='Conform Password'
              value={Cpassword} onChange={e=>setCpassword(e.target.value)}
            />
            <button onClick={register}>Register</button>
            <span>Already have an account <Link to={"/login"}>Login</Link></span>
        </div>
    </>
  )
}
