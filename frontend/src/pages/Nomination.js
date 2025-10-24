import React, { useContext, useEffect, useState } from 'react';
import './Nomination.css';
import NominatorHeader from '../components/NominatorHeader';
import Footer from '../components/Footer';
import Card from '../components/Card';
import profilePicture from '../Assets/profile.jpg';
import { IconContext } from './IconContext';
import { useNavigate } from 'react-router';

function Nomination() {
  const [mapData, setMapData] = useState([]); // Initialize mapData as an empty array
  const { clickedIcon, handleIconClick } = useContext(IconContext);
  const navigate = useNavigate();
  const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL; // Ensure REACT_APP_BASE_URL is defined correctly
  const container = document.getElementsByClassName('blur-container')[0];
  if (container) {
    if (clickedIcon) {
      container.classList.add('blur');
    } else {
      container.classList.remove('blur');
      handleIconClick(false);
    }
  }

  const token = localStorage.getItem('authToken');

  useEffect(() => {
    fetch(`${REACT_APP_BASE_URL}/api/employee/teammate`, {
      headers: {
        'Content-Type': 'application/json',
        'authToken': token,
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setMapData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [token]);

  const handleCardClick = (firstName, lastName,email) => {
    navigate('/nomination/form', { state: { firstName, lastName,email } });
  };

  return (
    <div>
      <NominatorHeader />
      <div>
        <div className="flex justify-start">
          <h1 className="text-2xl font-bold">Nominate your team mate</h1>
          
        </div>
        <div className="center">
          <div className="grid-3">
            {mapData.map((item) => (
              <Card 
                onClick={() => handleCardClick(item.firstName, item.lastName,item.email)}
                picture={item.profilePicture || profilePicture} 
                firstName={item.firstName} 
                lastName={item.lastName} 
                department={item.department} 
                key={item.id} 
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Nomination;
