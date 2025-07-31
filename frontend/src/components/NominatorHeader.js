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

  const { clickedIcon, handleIconClick } = useContext(IconContext);
  const navigate = useNavigate();

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
        const response = await fetch(`https://employee-recognition-system.onrender.com/api/employee/me`,{headers:{'authToken':token}}); // Adjust the URL if necessary
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
      const response = await fetch(`https://employee-recognition-system.onrender.com/api/employee/${id}/password`, {
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
      const response = await fetch(`https://employee-recognition-system.onrender.com/api/employee/${id}`, {
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
            <svg width='31px' height='31px' style={{ color: 'white' }} onClick={toggleAccount} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </div>

          <div className='center'>
            <svg className='header__notification' width='31px' height='31px' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
            </svg>
          </div>

          <span onClick={logout} className=''>Log out</span>
        </div>
      </div>

      {accountClick === true && (
        <div
          style={{
            border: "1px solid #c3cbc6",
            boxShadow: "0 0 5px rgba(25, 164, 74, 0.15)",
            zIndex: "900",
            position: 'absolute',
            top: '20%',
            left: '30%',
            width: '500px',
            borderRadius: "4px",
            color: 'black',
            backgroundColor: 'white'
          }}
        >
          <nav>
            <ul className='flex '>
              <li onClick={handlePersonalInformation} style={{ margin: '10px', backgroundColor: 'white', color: 'black', border: "1px solid #c3cbc6", borderRadius: "10px", padding: '8px' }}>Edit your personal Information</li>
              <li onClick={handleManagePassword} style={{ margin: '10px', border: "1px solid #c3cbc6", borderRadius: "10px", backgroundColor: 'white', color: 'black', padding: '8px' }}>Manage password</li>
            </ul>
          </nav>
          {personalInformation === true ? (
            <form style={{ border: 'none' }} className='flex flex-col' onSubmit={handleSubmit}>
              <div className='flex justify-center items-center'>
                <div>
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
                        className=''
                        width={'100px'}
                        height={'100px'}
                      />
                    ) : (
                      <p></p>
                    )}Profile Picture:
                  </label>
                </div>
                <div>
                  <label>Email:</label>
                  <input type="text" value={userData.email} readOnly />
                </div>
              </div>
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
              <button type="submit">Submit</button>
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
      )}
    </>
  );
}

export default NominatorHeader;
