import React from 'react'
import './Announcement.css'
import decoration from '../Assets/decoration.png'
import closed from '../Assets/closed.jpg'

function Announcement({fullName,RecognitionType}) {
  return (
    <div className='announcement'>
       
        <div>
       
        <div className='announcement__container'>
          <div className='announcement__inner__container'>
          <div className='announcement__header'>
            <img className='top-left'  src={decoration}/>
           
           
            <img className='top-right'  src={decoration}/>
        </div>
        <div className='announcement__content' >
            <p className='text-center text-xl' style={{color:'black'}}>{RecognitionType}</p>
            <p></p>
            <p className='text-center text-lg' style={{color:'black'}}>{fullName}</p>
        </div>
        <div className='announcement__footer'>
        <img className='bottom-left'  src={decoration}/>
        
        
        <img className='bottom-right' src={decoration}/>
        </div>

          </div>
       
        </div>
       
      

        </div>
        


    </div>
  )
}

export default Announcement
