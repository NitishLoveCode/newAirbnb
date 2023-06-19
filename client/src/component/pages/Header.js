import React, { useContext } from 'react'
import "../css/header.css"
import { Link } from 'react-router-dom'
import { User_Data } from '../../App'



export default function Header() {
  const {userinfo}=useContext(User_Data)
    
  return (
    <>
        <header>
            <nav>
                <Link to={"/"}>
                <div className="logo">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                    <span>airbnb</span>
                </div>
                </Link>
                
                <div className="search">
                    <div>Anywhere</div>
                    <div className=" hide border-right"></div>
                    <div className='hide'>Any week</div>
                    <div className=" hide border-right"></div>
                    <div className='hide'>Add guests</div>
                    <div className='search_icon'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>
                </div>
                <div className="user_icon">
                    <div className="menu">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </div>
                        
                        {/* {userinfo? <p>{`${userinfo.name.slice(0,5)}..`}</p>: */}
                        <div className="user_img">
                            <Link to={userinfo? "/account" : "/login"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            </Link>
                        </div>
                        {/* } */}
                </div>
            </nav>
        </header>
    </>
  )
}
