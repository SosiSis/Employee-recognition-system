import React from 'react'
import './ApprovalHeader.css'
import logo from '../Assets/logo.png'
import { useNavigate } from 'react-router'
import { Link, NavLink } from 'react-router-dom'

function ApprovalHeader() {
  const navigate=useNavigate();
  const logout =()=>{
    localStorage.removeItem('authToken')
    navigate('/')
  }
  
  return (
    <div className='header__container'>
      <div className='center'>
          <img className='logo' src={logo} alt="Logo" />
        </div>
     <div className='header__components'>
        <Link className='header__link' to="/approver"><p >Approval</p></Link>
        <Link className='header__link' to="/approvement/announcement"><p>Announcement</p></Link>
        <Link className='header__link' to="/approvement/support"><p >Support</p></Link>
        
       
     
      
        

     </div>
    
     
     <div  className='logout'>
     <div className='center'>
     <svg width='31px' height='31px' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="margin color">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
     </div>
      <span onClick={logout} className=''>Log out</span>
      </div>
     
    </div>
  )
}

export default ApprovalHeader