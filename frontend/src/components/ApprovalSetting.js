import React, { useState, useEffect } from 'react';
import './ApprovalSetting.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ApprovalSetting() {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [recognitionType, setRecognitionType] = useState([]);
  const [selectedRecognitionType, setSelectedRecognitionType] = useState('');

  useEffect(() => {
    const fetchRecognitionType = async () => {
      const token = localStorage.getItem('authToken');
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
      approvalStartDate: startDateISO,
    approvalEndDate: endDateISO,
    };

    try {
      const response = await fetch('https://employee-recognition-system.onrender.com/api/approval_date/setdate', {
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
      console.log('Approval dates set successfully:', data);
      // Handle success response (e.g., show a success message)
    } catch (error) {
      console.error('Error setting approval dates:', error);
      // Handle error response (e.g., show an error message)
    }
  };

  return (
    <div className='approval-setting'>
      <div className='approval-setting__form__container'>
        <form onSubmit={handleSubmit} className='approval-setting__form'>
          <label><b>Recognition Type</b></label>
          <select value={selectedRecognitionType} onChange={(e) => setSelectedRecognitionType(e.target.value)}>
            <option value="">Select recognition type</option>
            {recognitionType.map((item) => (
              <option key={item._id} value={item.recognitionType}>{item.recognitionType}</option>
            ))}
          </select>
          <div style={{ marginTop: "30px" }} className='flex'>
            <div>
              <label><b>Approvement start date</b></label>
              <DatePicker
                selected={selectedStartDate}
                onChange={handleStartDateChange}
                placeholderText="Select a date"
              />
            </div>
            <div style={{ marginLeft: "30px" }}>
              <label><b>Approvement end date</b></label>
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

export default ApprovalSetting;
