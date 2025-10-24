import React, { useState } from 'react'
import './Login.css'
import illustration from "../Assets/login.png"
import { useNavigate } from 'react-router'

function Login() {
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')
  const navigate=useNavigate()
  const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL  
  const login = (e) => {
    e.preventDefault();
 
     
   
    const data={
                    password:password,
                    email:email,
                    
              }
    console.log(data)
    fetch(`${REACT_APP_BASE_URL}/api/employee/login`, {
      headers:{
        'Content-Type': 'application/json',
      },
      method: "POST",
      body: JSON.stringify(
        {        password:password,
                 email:email,
                 }
      ),
      
    })
    .then((response)=>{
      if (!response.ok) {
       
        console.log(response)
        console.log(response.json())
        return alert('login is not uccessfully')}
       else{
        console.log(data)
         return response.json().then((data)=>{
          localStorage.setItem("authToken",data.token)
          localStorage.setItem("position",data.position)
          localStorage.setItem("email",data.email)
          localStorage.setItem("id",data.id)
          localStorage.setItem("firstname",data.firstname)
                  console.log(data.token);
                  if(localStorage.getItem('position')=='Employee'){
                    navigate('/nomination')

                  }else if(localStorage.getItem('position')=='Manager') {
                    navigate('/approver')

                  }else if(localStorage.getItem('position')=='Admin'){
                    navigate('/admin/setting1')

                  }
                 
       } )
  }}) .catch ((error)=>{
    alert(error.message)
  }) 
}


  return (
    <div className='login__container'>
      <div className='login__image'>
        <img src={illustration} alt="Employee Recognition System" />
      </div>
      
      <div className='login__form'>
        <div className='login__form__wrapper'>
          <form onSubmit={login}>
            <h3>Welcome Back</h3>
            <p className='login__subtitle'>Sign in to your Employee Recognition System account</p>
            
            <div className='form__group'>
              <label htmlFor="email">Email Address</label>
              <input 
                type='email' 
                id="email"
                placeholder="Enter your email address"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span className='input-icon'></span>
            </div>
            
            <div className='form__group'>
              <label htmlFor="password">Password</label>
              <input 
                type='password' 
                id="password"
                placeholder="Enter your password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
              <span className='input-icon'></span>
            </div>
            
            <div className='login__button'>
              <button type="submit">Sign In</button>
            </div>
          </form>
          
          <div className='login__footer'>
            <p>Secure access to your recognition platform</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login