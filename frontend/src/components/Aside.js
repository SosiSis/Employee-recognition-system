import React from 'react'
import './Aside.css'
import profile from '../Assets/logo.png'
import { Link } from 'react-router-dom'

function Aside({profile,name,email}) {
  return (
    <div className='aside'>
        <div className='personal-profile'>
            {/* <div className='picture'><img src={profile}/></div> */}
            <div className='personal-information'>
                <p>{name}</p>
                <p>{email}</p>
            </div>

        </div>
       
        <div className='aside-menu'>
            <Link className='link' to={'/nomination'}><p>Nominate</p> </Link>
            <Link className='link' to={'/nomination/announcement'}><p>Announcement</p> </Link>
            <Link className='link' to={'/nominator/support'}><p>Support</p> </Link>
            <Link className='link' to={'/'}><p>Log out</p> </Link>
            

           
        </div>
    </div>
  )
}

export default Aside