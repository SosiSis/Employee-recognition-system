import React from 'react'
import './Container.css'
import { useNavigate } from 'react-router'
import teamwork from '../Assets/nominate.png'

function ContainerOne({name,nominations,recognition}) {
  const navigate=useNavigate()

  const see_more=()=>{
    navigate('/approvement')
  }
  return (
    <div className='container_custum'>
        <div className='left-container-one center'>
            <div className='top-container'><img src={teamwork}/></div>
            <div className='bottom-container'></div>
        </div>
        <div className='right-container'>
            <h3>{name}</h3>
            
            <div>Nomninated for : <i>{recognition}</i> </div>

            <div>Nomninated by : <b>{nominations}</b> people</div>
            <div className='button'><button onClick={see_more}>See More</button></div>
        </div>
    </div>
  )
}

export default ContainerOne