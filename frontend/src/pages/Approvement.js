import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Approvement.css';
import ApprovalHeader from '../components/ApprovalHeader';
import Footer from '../components/Footer';
import ApprovalCard from '../components/ApprovalCard';
import approvement from '../Assets/approvement.png';

function Approvement() {
  const location = useLocation();
  const { first, last, email: nomineeEmail, id, type } = location.state;
  const [nominationDetails, setNominationDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(
      `http://localhost:3010/api/nomination/nomination-details/${id}/${type}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'authToken': token,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched data:', data); // Log the fetched data
        setNominationDetails(Array.isArray(data) ? data : [data]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching nomination details:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [id, type, token]);

  const handleRejection=()=>{}

  const handleApprove = (nomination) => {
    
    const postData = {
      recognition_type: nomination.recognitionType,
      nominator_email: nomination.nominator.email,
      nominee_email: nomineeEmail, // Use the nominee's email from location state
      reason: nomination.reason
    };

    fetch('http://localhost:3010/api/recognition', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authToken': token,
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Post response data:', data);
        // Handle success, e.g., show a notification or update the UI
      })
      .catch((error) => {
        console.error('Error posting recognition:', error);
        // Handle error, e.g., show an error message
      });
  };

  return (
    <div>
      <ApprovalHeader />

      <div className="flex center">
        <div className="box-1 center">
          <img src={approvement} alt="Approvement" />
        </div>

        <div className="box-2">
          <h3
            style={{ margin: '0px 0px 10px 0px' }}
            className="font-bold text-2xl"
          >
            Nominations for {first} {last}
          </h3>
          <p>These nominations are for {first} {last}. Please approve these nominations.</p>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && nominationDetails.length === 0 && <p>No nominations found.</p>}

      {/* Conditional Rendering for nominations */}
      {!loading && !error && nominationDetails.length > 0 && (
        <div className="grid-3">
          {nominationDetails.map((nomination) => (
            <ApprovalCard
              key={nomination._id} // Ensure the key is unique
              name={nomination.is_anonymous? 'Anonymous':`${nomination.nominator.firstName} ${nomination.nominator.lastName}`} // Assuming nominator contains the employee details
              reason={nomination.reason}
              onClick={() => handleApprove(nomination)} // Pass the nomination to the handler
              change={handleRejection}
            />
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Approvement;
