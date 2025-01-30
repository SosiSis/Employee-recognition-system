import React from 'react'
import { useNavigate } from 'react-router'
import teamwork from '../Assets/teamwork.png'

function ContainerTwo({name,nominations,recognition}) {

  const navigate=useNavigate()

  const see_more=()=>{
    navigate('/approvement')
  }
    return (
      <div className='container_custum'>
         
          <div className='left-container'>
              <h3>{name}</h3>
          
              <div>Nomninated for : <i>{recognition}</i></div>
              <div>Nomninated by : <b>{nominations}</b> people</div>
              <div className='button'><button onClick={see_more}>See More</button></div>
          </div>
          <div className='right-container-two center'>
              <div className='top-container'><img src={teamwork}/></div>
              <div className='bottom-container'></div>
          </div>
      </div>
    )
  }

export default ContainerTwo