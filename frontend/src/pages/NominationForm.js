import React from 'react'
import './NominationForm.css'
import Form from '../components/NominationForm'
import NominatorHeader from '../components/NominatorHeader'
import nomination from '../Assets/nomination.png'
import Footer from '../components/Footer'
import profilePicture from '../Assets/profilePicture.jpg'

function NominationForm() {
  return (
    <div>
    <NominatorHeader/>
    <div className='flex' style={{}}>

    <div className='center' style={{flex:'1 1 50%', width:'60%'}}>
    <img width={'60%'}  src={nomination}/>
    </div>
    
    <div  style={{flex:'1 1 70%'}} >
    <Form /> 

    </div> 
    
   
  
   


    </div>
   
    
    
   
    <Footer/>
</div>
  )
}

export default NominationForm