import React from 'react'
import './Support.css'

function Support() {
  return (
    <div className='support-page__cotainer'>
        <div className='support-page'>
            <div className='support-page__message-history'></div>
            <div className='support-page__message'><textarea placeholder='write here your message'/></div>
            <div className='button'> <button>Send</button></div>
        </div>
       
       
    </div>
  )
}

export default Support