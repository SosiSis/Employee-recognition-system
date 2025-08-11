import React, { useEffect, useState } from 'react';
import './NominationForm.css';
import { useLocation, useNavigate } from 'react-router-dom';

function NominationForm() {
  const location = useLocation();
  const { firstName, lastName, email } = location.state || { firstName: '', lastName: '', nomineeEmail: '' };
  const navigate = useNavigate();

  const [recognitionType, setRecognitionType] = useState([]);
  const [selectedRecognitionType, setSelectedRecognitionType] = useState('');
  const [nominatorEmail, setNominatorEmail] = useState('');
  const [reason, setReason] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const token = localStorage.getItem('authToken');
  const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL  
  useEffect(() => {
    const fetchRecognitionType = async () => {
      try {
        const response = await fetch(`${REACT_APP_BASE_URL}/api/recognition_type/active`, {
          headers: {
            'Content-Type': 'application/json',
            'authToken': token,
          },
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

    fetchRecognitionType();

    // Assuming the nominator's email can be fetched from some API or local storage
    const userEmail = localStorage.getItem('email');
    setNominatorEmail(userEmail || ''); // Set the nominator's email
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nominationData = {
      recognition_type: selectedRecognitionType,
      nominator_email: nominatorEmail,
      nominee_email: email,
      reason: reason,
      is_anonymous: isAnonymous,
    };

    try {
      const response = await fetch(`${REACT_APP_BASE_URL}/api/nomination`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authToken': token,
        },
        body: JSON.stringify(nominationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData);
        throw new Error('Failed to submit nomination');
      }

    } catch (error) {
      console.error('Error submitting nomination:', error);
      // Handle the error (e.g., show an error message)
    }
  };

  return (
    <div className='nomination'>
      <div>
        <h1 className='text-lg font-bold'>Nomination Form</h1>
        <div className='nomination__form__container'>
          <form style={{ padding: '10px' }} className='nomination__form' onSubmit={handleSubmit}>
            <div className='flex justify-between'>
              <div>
                <label>Nominee Name</label>
                <input value={`${firstName} ${lastName}`} readOnly />
              </div>
              <div>
                <label>Select Recognition Type</label>
                <select
                  value={selectedRecognitionType}
                  onChange={(e) => setSelectedRecognitionType(e.target.value)}
                  style={{ width: "18vw" }}
                >
                  <option value="">Select recognition type</option>
                  {recognitionType.map((item) => (
                    <option key={item._id} value={item.recognitionType}>
                      {item.recognitionType}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <label>What is your reason for nominating this colleague?</label>
            <textarea placeholder='Write here your reason' required onChange={(e) => setReason(e.target.value)} />
            <div className='flex'>
              <label>Do you want to be known?</label>
              <input type='checkbox' checked={!isAnonymous} onChange={() => setIsAnonymous(!isAnonymous)} />
            </div>
            <div className='button'><button type='submit'>Submit</button></div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NominationForm;
