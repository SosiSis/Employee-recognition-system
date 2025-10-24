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
      <div className='nomination__header'>
        <h1>Employee Nomination Form</h1>
        <p className='nomination__subtitle'>Recognize outstanding performance and contributions</p>
      </div>
      
      <div className='nomination__form__container'>
        <form className='nomination__form' onSubmit={handleSubmit}>
          <div className='form__section'>
            <h3 className='form__section__title'> Nomination Details</h3>
            
            <div className='form__row'>
              <div className='form__group'>
                <label htmlFor='nominee-name'>
                  👤 Nominee Name
                  <span className='required-indicator'>*</span>
                </label>
                <input 
                  id='nominee-name'
                  value={`${firstName} ${lastName}`} 
                  readOnly 
                  style={{ backgroundColor: 'var(--neutral-100)', color: 'var(--neutral-600)' }}
                />
              </div>
              
              <div className='form__group'>
                <label htmlFor='recognition-type'>
                  🏆 Recognition Type
                  <span className='required-indicator'>*</span>
                </label>
                <select
                  id='recognition-type'
                  value={selectedRecognitionType}
                  onChange={(e) => setSelectedRecognitionType(e.target.value)}
                  required
                >
                  <option value="">Choose recognition type...</option>
                  {recognitionType.map((item) => (
                    <option key={item._id} value={item.recognitionType}>
                      {item.recognitionType}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className='form__section'>
            <h3 className='form__section__title'>💭 Nomination Reason</h3>
            
            <div className='form__group'>
              <label htmlFor='reason'>
                ✍️ What is your reason for nominating this colleague?
                <span className='required-indicator'>*</span>
              </label>
              <textarea 
                id='reason'
                placeholder='Describe the specific achievements, behaviors, or contributions that make this person deserving of recognition. Be specific and provide examples when possible...'
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                rows={6}
              />
            </div>
          </div>

          <div className='form__section'>
            <h3 className='form__section__title'>🔒 Privacy Settings</h3>
            
            <div className='form__group'>
              <label style={{ flexDirection: 'row', alignItems: 'center', gap: '0.75rem' }}>
                <input 
                  type='checkbox' 
                  checked={!isAnonymous} 
                  onChange={() => setIsAnonymous(!isAnonymous)}
                  style={{ width: 'auto', margin: 0 }}
                />
                <span> I want to be identified as the nominator</span>
              </label>
              <p style={{ 
                fontSize: '0.75rem', 
                color: 'var(--neutral-500)', 
                marginTop: '0.5rem',
                fontStyle: 'italic'
              }}>
                {!isAnonymous 
                  ? 'Your name will be visible to the nominee and reviewers.' 
                  : 'Your nomination will remain anonymous.'
                }
              </p>
            </div>
          </div>

          <div className='nomination__form__actions'>
            <button type='button' className='btn-reset' onClick={() => {
              setReason('');
              setSelectedRecognitionType('');
              setIsAnonymous(false);
            }}>
              Reset
            </button>
            <button type='submit' className='btn-submit'>
              Submit 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NominationForm;
