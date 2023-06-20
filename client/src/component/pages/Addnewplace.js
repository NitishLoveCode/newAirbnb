import React from 'react'
import "../css/addnewplace.css"
import { Link } from 'react-router-dom'

export default function Addnewplace() {
  return (
    <>
      <div className="main_place">
        <Link to="/account/create-new-place">
          <div className="add_new">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <p>Add new place</p>
          </div>
        </Link>
      </div>  
    </>
  )
}
