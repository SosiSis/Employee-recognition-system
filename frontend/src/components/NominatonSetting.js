import React, { useState, useEffect } from 'react';
import './NominationSetting.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function NominationSetting() {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [recognitionType, setRecognitionType] = useState([]);
  const [selectedRecognitionType, setSelectedRecognitionType] = useState('');
  const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL  ;
  useEffect(() => {
    const fetchRecognitionType = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await fetch(`${REACT_APP_BASE_URL}/api/recognition_type`, {
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
      }
    };

    fetchRecognitionType();
  }, []);

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('authToken');
    const startDateISO = selectedStartDate ? selectedStartDate.toISOString() : null;
    const endDateISO = selectedEndDate ? selectedEndDate.toISOString() : null;

    const requestBody = {
      recognition_type: selectedRecognitionType,
      nominationStartDate: startDateISO,
      nominationEndDate: endDateISO,
    };

    try {
      const response = await fetch(`${REACT_APP_BASE_URL}/api/nomination_date/setdate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authToken': token,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to set nomination dates');
      }

      const data = await response.json();
      console.log('Nomination dates set successfully:', data);
      // Handle success response (e.g., show a success message)
    } catch (error) {
      console.error('Error setting nomination dates:', error);
      // Handle error response (e.g., show an error message)
    }
  };

  return (
    <div className='nomination-setting'>
      <div className='nomination-setting__form__container'>
        <form onSubmit={handleSubmit} className='nomination-setting__form'>
          <label><b>Recognition Type</b></label>
          <select value={selectedRecognitionType} onChange={(e) => setSelectedRecognitionType(e.target.value)}>
            <option value="">Select recognition type</option>
            {recognitionType.map((item) => (
              <option key={item._id} value={item.recognitionType}>{item.recognitionType}</option>
            ))}
          </select>
          <div style={{ marginTop: "30px" }} className='flex'>
            <div>
              <label><b>Nomination start date</b></label>
              <DatePicker
                selected={selectedStartDate}
                onChange={handleStartDateChange}
                placeholderText="Select a date"
              />
            </div>
            <div style={{ marginLeft: "40px" }}>
              <label><b>Nomination end date</b></label>
              <DatePicker
                selected={selectedEndDate}
                onChange={handleEndDateChange}
                placeholderText="Select a date"
              />
            </div>
          </div>
          <div className='button'>
            <button type='submit'>Set</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NominationSetting;
