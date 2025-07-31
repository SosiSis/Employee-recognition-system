import React, { useState } from 'react'
import './RewardType.css'

function RewardType() {
  const [rewardType, setRewardType] = useState('');
  const [description, setDescription] = useState('');

  const token = localStorage.getItem('authToken');
  const submit = (e) => {
    e.preventDefault();
    fetch("https://employee-recognition-system.onrender.com/api/reward_type", {
      headers: {
        'Content-Type': 'application/json',
        'authToken': token,
      },
      method: "POST",
      body: JSON.stringify({
        rewardType: rewardType,
      
        description: description,
      }),
    });
  };
  return (
    <div className='reward-type'>
        
        <div className='reward-type__form__container'>
            <form onSubmit={submit}  className='reward-type__form' >
                <label><b>Reward Type</b></label>
                <input type='text' value={rewardType} onChange={(e) => setRewardType(e.target.value)}/>
                
                <label><b>Description</b></label>
                <textarea value={description}
            onChange={(e) => setDescription(e.target.value)} placeholder='write some description abiut this nomination type'/>
                <div className='button'><button>Set</button></div>

            </form>
        </div>
    </div>
  )
}

export default RewardType