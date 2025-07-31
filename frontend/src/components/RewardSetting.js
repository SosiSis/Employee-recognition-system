import React, { useEffect, useState } from 'react';
import './RewardSetting.css';

function RewardSetting() {
  const [recognitionType, setRecognitionType] = useState([]);
  const [rewardType, setRewardType] = useState([]);
  const [selectedRecognitionType, setSelectedRecognitionType] = useState('');
  const [selectedRewardType, setSelectedRewardType] = useState('');
  const [amount, setAmount] = useState('');
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchRecognitionType = async () => {
      try {
        const response = await fetch('https://employee-recognition-system.onrender.com/api/recognition_type', {
          headers: {
            'Content-Type': 'application/json',
            'authToken': token,
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch recognition types');
        }
        const data = await response.json();
        if (data.types && Array.isArray(data.types)) {
          setRecognitionType(data.types);
        } else {
          throw new Error('Recognition types response is not valid');
        }
      } catch (error) {
        console.error('Error fetching recognition types:', error);
        setRecognitionType([]);
      }
    };

    const fetchRewardType = async () => {
      try {
        const response = await fetch('https://employee-recognition-system.onrender.com/api/reward_type', {
          headers: {
            'Content-Type': 'application/json',
            'authToken': token,
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch reward types');
        }
        const data = await response.json();
        if (data.types && Array.isArray(data.types)) {
          setRewardType(data.types);
        } else {
          throw new Error('Reward types response is not valid');
        }
      } catch (error) {
        console.error('Error fetching reward types:', error);
        setRewardType([]);
      }
    };

    fetchRecognitionType();
    fetchRewardType();
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://employee-recognition-system.onrender.com/api/reward', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authToken': token,
        },
        body: JSON.stringify({
          recognition_type: selectedRecognitionType,
          reward_type: selectedRewardType,
          amount: amount
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit reward');
      }

      const data = await response.json();
      console.log('Reward submitted successfully:', data);
      // You can add code here to handle the response, such as showing a success message

    } catch (error) {
      console.error('Error submitting reward:', error);
      // You can add code here to handle the error, such as showing an error message
    }
  };

  return (
    <div className='reward'>
      <div className='reward__container'>
        <form onSubmit={handleSubmit} className='reward__form'>
          <label><b>Recognition Type</b></label>
          <select value={selectedRecognitionType} onChange={(e) => setSelectedRecognitionType(e.target.value)}>
            <option value="">Select recognition type</option>
            {recognitionType.map((item, index) => (
              <option key={item._id} value={item.
                recognitionType}>{item.
                  recognitionType}</option>
            ))}
          </select>

          <label><b>Reward Type</b></label>
          <select value={selectedRewardType} onChange={(e) => setSelectedRewardType(e.target.value)}>
            <option value="">Select reward type</option>
            {rewardType.map((item, index) => (
              <option key={item._id} value={item.rewardType}>{item.rewardType}</option>
            ))}
          </select>

          <label><b>Amount</b></label>
          <input type='number' value={amount} onChange={(e) => setAmount(e.target.value)} />

          <div className='button'>
            <button type='submit'>Set</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RewardSetting;
