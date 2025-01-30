import React from 'react'
import './Card.css'





export default function Card({picture,firstName,lastName,department,onClick}) {



  return (
    <div className='card__container'>
        <div className='card__profile'>
            <img className='profile_picture' src={picture}/>
            <div className=''>
              <h3 className=''><b>{firstName} {lastName}</b></h3>
              <p style={{color:' #333333'}}>{department}</p>
              <button onClick={onClick}  type='submit'>Nominate</button>
       
            </div>
          
        </div>
        
     
       
    </div>
  )
}
