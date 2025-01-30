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
          <svg  width='31px' height='31px' onClick={toggleAccount} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{color:'white'}} className="margin">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          </div>
          <div className='center'>
          <svg className='header__notification' width='31px' height='31px' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
          </svg>
          </div>
         
          
        </div>
        <span onClick={logout} className=''>Log out</span>
      </div>
      {accountClick === true && (
        <div
          style={{
            border: "1px solid #c3cbc6",
            boxShadow: "0 0 5px   rgba(25, 164, 74, 0.15)",
            zIndex: "900",
            position: 'absolute',
            top: '13%',
            left: '26%',
            width: '520px',
            height:'518px',
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
            <form style={{border:'none'}}  className='flex flex-col'>
               
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
              <input type="text" placeholder={placeholderData.email} readOnly /></div>
              </div>
              <label>First Name:</label>
              <input type="text" placeholder={placeholderData.firstName} />
              <label>Last Name:</label>
              <input type="text" placeholder={placeholderData.lastName} />
            
             
              <button onClick={handleSubmit}>Submit</button>
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
      )}
      
    </div>
  )
}

export default AdminHeader;
