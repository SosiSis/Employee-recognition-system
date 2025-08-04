import React, { useState } from 'react';
import './RecognitionType.css';

function RecognitionType() {
  const [recognitionType, setRecognitionType] = useState('');
  const [description, setDescription] = useState('');
  const [position, setPosition] = useState('');
  const token = localStorage.getItem('authToken');
  const BASE_URL = process.env.BASE_URL;
  const submit = (e) => {
    e.preventDefault();
    fetch(`${BASE_URL}/api/recognition_type`, {
      headers: {
        'Content-Type': 'application/json',
        'authToken': token,
      },
      method: "POST",
      body: JSON.stringify({
        recognitionType: recognitionType,
        eligiblePosition: position,
        description: description,
      }),
    });
  };

  return (
    <div className='recognition-type'>
      <div className='recognition-type__container'>
        <form onSubmit={submit} className='recognition-type__form'>
          <label>
            <b>Recognition Type</b>
          </label>
          <input type='text' value={recognitionType} onChange={(e) => setRecognitionType(e.target.value)} />
          <label>
            <b>Who is eligible for this type of recognition?</b>
          </label>
          <select value={position} onChange={(e) => setPosition(e.target.value)}>
          <option>Define Eligible position</option>
            <option>CEO</option>
            <option>Manager</option>
            <option>Employee</option>
          </select>
          <label>
            <b>Description</b>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Write some description about this nomination type'
          />
          <div className='button'>
            <button type='submit'>Set</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RecognitionType;