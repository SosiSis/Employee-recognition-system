import React, { useState } from 'react'
import './Login.css'
import illustration from "../Assets/login.png"
import { useNavigate } from 'react-router'
<<<<<<< HEAD
import ConicGradientBackground from './ConicGradientBackground'
=======
>>>>>>> 608db045d313564aa7437593f9f833ac36e0db68

function Login() {
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')
  const navigate=useNavigate()
  const login = (e) => {
    e.preventDefault();
 
     
   
    const data={
                    password:password,
                    email:email,
                    
              }
    console.log(data)
    fetch("http://localhost:3010/api/employee/login", {
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


<<<<<<< HEAD


  return (
    <div className='login__container center'>
              <div className='login__container1 center'
 
 >
    
    

=======
  return (
    <div className='login__container center'>
       
>>>>>>> 608db045d313564aa7437593f9f833ac36e0db68
       
        <div className='justify-end login__image'><img className=""  src={illustration}/></div>
        <div className='login__form'>
          
          <div className=''>
                <form onSubmit={login} className='form' >
                     <h3 className='text-xl font-bold'>Login </h3>
                      
                      <label>Email</label>
                      <input type='text'  value={email} onChange={(e=>setEmail(e.target.value))}/>
                      <label>Password</label>
                      <input type='password'  value={password} onChange={(e=>setPassword(e.target.value))} required/>
                      <div className='button'><button >Submit</button></div>
                  </form>

          </div>
<<<<<<< HEAD
          </div>
=======
>>>>>>> 608db045d313564aa7437593f9f833ac36e0db68
           
        </div>
       
       


    </div>
  )
}

export default Login