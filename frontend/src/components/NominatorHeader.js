import React, { useContext, useState, useEffect } from 'react';
import './NominatorHeader.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Assets/logo.png';
import { IconContext } from '../pages/IconContext';

function NominatorHeader() {
  const [accountClick, setAccountClick] = useState(false);
  const [personalInformation, setPersonalInformation] = useState(true);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    profilePicture: '',
    email: '',
    password: '',
    position: '',
    department: '',
  });

  const { handleIconClick } = useContext(IconContext);
  const navigate = useNavigate();
  const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL  
  const handleClick = () => {
    handleIconClick(!accountClick);
  };

  const toggleAccount = () => {
    setAccountClick(!accountClick);
  };

  const handlePersonalInformation = () => {
    setPersonalInformation(true);
  };

  const handleManagePassword = () => {
    setPersonalInformation(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token= localStorage.getItem('authToken')
        const response = await fetch(`${REACT_APP_BASE_URL}/api/employee/me`,{headers:{'authToken':token}}); // Adjust the URL if necessary
        const data = await response.json();
        setUserData(data[0]); // Assuming the response is an array with a single user object
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdatePassword = async (e) => {
     e.preventDefault()
    try {
      const id= localStorage.getItem('id')
      const token= localStorage.getItem('authToken')
      const response = await fetch(`${REACT_APP_BASE_URL}/api/employee/${id}/password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authToken':token
        },
        body: JSON.stringify({
          
          password:newPassword
        }),
      });
      const result = await response.json();
      if (response.ok) {
        console.log('Password updated successfully');
      } else {
        console.error('Error updating password:', result);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('firstName', userData.firstName);
      formData.append('lastName', userData.lastName);
      if (photo) {
        formData.append('profilePicture', photo);
      }
      const id= localStorage.getItem('id')
      const token= localStorage.getItem('authToken')
      const response = await fetch(`${REACT_APP_BASE_URL}/api/employee/${id}`, {
        method: 'PATCH',
        headers:{'authToken':token},
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        console.log('User data updated successfully');
      } else {
        console.error('Error updating user data:', result);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <>
      <div className='header__container'>
        <div className='center'>
          <img className='logo' src={logo} alt="Logo" />
        </div>

        <div className='header__components'>
          <div className='flex'>
            <Link className='link' to={'/nomination'}>
              <p>Nominate</p>
            </Link>
            <Link className='link' to={'/nomination/announcement'}>
              <p>Announcement</p>
            </Link>
            <Link className='link' to={'/nominator/support'}>
              <p>Support</p>
            </Link>
          </div>
        </div>

        <div className='flex'>
          <div className='center' style={{ marginRight: '20px' }} onClick={handleClick}>
              <div className="profile-wrap" onClick={toggleAccount}>
                {userData && userData.profilePicture ? (
                  <img src={userData.profilePicture} alt="avatar" className="profile-avatar" />
                ) : (
                  <div className="profile-avatar placeholder">{userData && userData.firstName ? userData.firstName.charAt(0) : 'U'}</div>
                )}
              </div>
            </div>

         

          <span onClick={logout} className=''>Log out</span>
        </div>
      </div>

      {accountClick === true && (
        <>
          {/* overlay - clicking it closes the modal */}
          <div className="page-overlay" onClick={() => { setAccountClick(false); handleIconClick(false); }} />

          <div className="profile-modal" role="dialog" aria-modal="true">
            <div className="profile-modal__header">
              <h3>My Profile</h3>
              <button
                className="profile-modal__close"
                aria-label="Close profile modal"
                onClick={() => { setAccountClick(false); handleIconClick(false); }}
              >
                ✕
              </button>
            </div>
          <nav>
            <ul className='flex modal-tabs'>
              <li
                onClick={handlePersonalInformation}
                className={"modal-tab " + (personalInformation ? 'active' : '')}
                aria-selected={personalInformation}
              >
                Edit your personal Information
              </li>
              <li
                onClick={handleManagePassword}
                className={"modal-tab " + (!personalInformation ? 'active' : '')}
                aria-selected={!personalInformation}
              >
                Manage password
              </li>
            </ul>
          </nav>
            {personalInformation === true ? (
            <form style={{ border: 'none' }} className='flex flex-col' onSubmit={handleSubmit}>
              <div className="profile-modal__body">
                <div className="profile-preview profile-preview--center">
                  <label htmlFor='file-upload' className=''>
                    <input
                      id='file-upload'
                      type='file'
                      className='hidden'
                      name="productImage"
                      onChange={handleFileChange}
                    />
                    {photo ? (
                      <img
                        src={URL.createObjectURL(photo)}
                        alt='Selected'
                        width={'120px'}
                        height={'120px'}
                      />
                    ) : userData.profilePicture ? (
                      <img
                        src={userData.profilePicture}
                        alt='Profile'
                        width={'120px'}
                        height={'120px'}
                      />
                    ) : (
                      <div className="avatar-large">{userData && userData.firstName ? userData.firstName.charAt(0) : 'U'}</div>
                    )}
                    <div className="profile-caption">Profile Picture:</div>
                  </label>
                </div>

                <div className="profile-fields form-fields">
                  <label>First Name:</label>
                  <input
                    type="text"
                    value={userData.firstName}
                    onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                  />

                  <label>Last Name:</label>
                  <input
                    type="text"
                    value={userData.lastName}
                    onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                  />

                  <label>Email:</label>
                  <input type="text" value={userData.email} readOnly />

                  <div className="profile-modal__actions">
                    <button type="submit" className="btn-submit">Submit</button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <form style={{ border: 'none' }} className='flex flex-col'>
              <label>Old Password:</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <label>New Password:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button type="button" onClick={handleUpdatePassword}>Update Password</button>
            </form>
          )}
        </div>
          </>
      )}
    </>
  );
}

export default NominatorHeader;
