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
    fetch("http://localhost:3010/api/employee/teammate", {
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
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Nominate your team mate</h1>
          <div style={{ marginRight: '20px', marginTop: '20px' }} className="flex justify-center items-center">
            <input style={{ marginTop: '20px', height: '30px',padding:'3px' }} placeholder="search by name" className="header__input" />
            <div className="flex justify-center items-center">
              <svg width="25px" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="search__icon">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
          </div>
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
