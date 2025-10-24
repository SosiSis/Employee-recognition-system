import React, { useContext, useState } from 'react';
import './NominatorHeader.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Assets/logo.png';
import { IconContext } from '../pages/IconContext';

function AdminHeader() {
  const navigate=useNavigate()
  const [accountClick, setAccountClick] = useState(false);
  const [personalInformation, setPersonalInformation] = useState(true);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  const [imageError, setImageError] = useState(false);

  const { clickedIcon, handleIconClick } = useContext(IconContext);

  const handleClick = () => {
    if(accountClick === false) {
      handleIconClick(false);
    } else {
      handleIconClick(true);
    }
  }

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

  // Mock data from database
  const placeholderData = {
    firstName: 'Admin',
    lastName: 'admin',
    profilePicture: 'https://example.com/profile.jpg',
    email: 'admin@example.com',
    password: '12344',
    position: 'Manager',
    department: 'Sales',
  };

  const handleUpdatePassword = () => {
    // You can add logic here to update the password
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);
  };

  const handleSubmit = () => {
    // You can add logic here to update the personal information
  };
 
  const logout =()=>{
    localStorage.removeItem('authToken')
    navigate('/')
  }
  
  return (
    <div className='header__container'>
       <div className='center'>
          <img className='logo' src={logo} alt="Logo" />
        </div>
      <div className='header__components'>
       
      </div>
      <div className='logout'>
        <div className='flex'>
        <div onClick={handleClick} >
          <div className="profile-wrap" onClick={toggleAccount}>
            {placeholderData && placeholderData.profilePicture && !imageError ? (
              <img
                src={placeholderData.profilePicture}
                alt="avatar"
                className="profile-avatar"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="profile-avatar placeholder">{placeholderData.firstName ? placeholderData.firstName.charAt(0) : 'A'}</div>
            )}
          </div>
          </div>
          
         
          
        </div>
        <span onClick={logout} className=''>Log out</span>
      </div>
      {accountClick === true && (
        <>
          {/* full-page overlay that blurs the background; clicking it closes the account panel */}
          <div className="page-overlay" onClick={() => { setAccountClick(false); handleIconClick(false); }} />
          {/* ensure global icon state is reset when overlay closed */}

          <div className="profile-modal">
            {/* modal header with Cancel button (returns to previous page) */}
            <div className="profile-modal__header">
              <h3>My Profile</h3>
              <button
                type="button"
                className="profile-modal__close"
                onClick={() => { setAccountClick(false); handleIconClick(false); }}
                aria-label="Close modal"
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
            <form style={{border:'none'}}  className='flex flex-col'>
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
                    ) : placeholderData.profilePicture ? (
                      <img
                        src={placeholderData.profilePicture}
                        alt='Profile'
                        width={'120px'}
                        height={'120px'}
                      />
                    ) : (
                      <div className="avatar-large">{placeholderData.firstName ? placeholderData.firstName.charAt(0) : 'A'}</div>
                    )}
                    <div className="profile-caption">Profile Picture:</div>
                  </label>
                </div>

                <div className="profile-fields form-fields">
                  <label>First Name:</label>
                  <input type="text" placeholder={placeholderData.firstName} />

                  <label>Last Name:</label>
                  <input type="text" placeholder={placeholderData.lastName} />

                  <label>Email:</label>
                  <input type="text" placeholder={placeholderData.email} readOnly />

                  <div className="profile-modal__actions">
                    <button className="btn-submit" onClick={handleSubmit}>Submit</button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <form style={{border:'none'}}  className='flex flex-col'>
              <label>Old Password:</label>
              <input type="password" placeholder={placeholderData.password} value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} readOnly />
              <label>New Password:</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              <button onClick={handleUpdatePassword}>Update Password</button>
            </form>
          )}
        </div>
        </>
      )}
      
    </div>
  )
}

export default AdminHeader;
