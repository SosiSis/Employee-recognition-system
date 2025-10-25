import React, { useContext, useState } from 'react'
import { IconContext } from '../pages/IconContext';

function UpdateInfo() {
    const [accountClick, setAccountClick] = useState(false);
    const [personalInformation, setPersonalInformation] = useState(true);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [photo, setPhoto] = useState(null);
  
    const { handleIconClick } = useContext(IconContext);
  
    const handleClick = () => {
      if(accountClick===false){
        handleIconClick(true);
      }else{
        handleIconClick(false);
      }
     
    }
  
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
      firstName: 'John',
      lastName: 'Doe',
      profilePicture: 'https://example.com/profile.jpg',
      email: 'john.doe@example.com',
      position: 'Manager',
      department: 'Sales',
    };
  
    const handleUpdatePassword = () => {
      // You can add logic here to update the password
      console.log("Old Password:", oldPassword);
      console.log("New Password:", newPassword);
    };
  return (
    <div> {accountClick === true && (
        <div
          style={{
            border:"1px solid #c3cbc6",
            borderRadius:" 30px",
            boxShadow: "0 0 5px   rgba(25, 164, 74, 0.15)",
            zIndex:"900",

            position: 'absolute',
            top: '30%',
            left: '30%',
            width: '500px',
            // height: '400px',
            color: 'white',
            backgroundColor: 'black'
          }}
        >
          <nav>
            <ul className='flex '>
              <li onClick={handlePersonalInformation} style={{ backgroundColor: 'grey', border: "1px solid #c3cbc6", borderRadius: "10px", padding: '5px' }}>Edit your personal Information</li>
              <li onClick={handleManagePassword} style={{ border: "1px solid #c3cbc6", borderRadius: "10px", backgroundColor: 'grey', padding: '5px' }}>Manage password</li>
            </ul>
          </nav>
          {personalInformation === true ? (
            <form className='flex flex-col'>
              <label>First Name:</label>
              <input type="text" placeholder={placeholderData.firstName} readOnly />
              <label>Last Name:</label>
              <input type="text" placeholder={placeholderData.lastName} readOnly />
            
              <div className=''>
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
                />
              ) : placeholderData.profilePicture ? (
                <img
                  src={placeholderData.profilePicture}
                  alt='Profile'
                  className=''
                />
              ) : (
                <p>No profile picture</p>
              )}
              Profile Picture:
            </label>
            </div>
              <label>Email:</label>
              <input type="text" placeholder={placeholderData.email} readOnly />
            </form>
          ) : (
            <form className='flex flex-col'>
              <label>Old Password:</label>
              <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} readOnly />
              <label>New Password:</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              <button onClick={handleUpdatePassword}>Update Password</button>
            </form>
          )}
        </div>
      )}o</div>
  )
}

export default UpdateInfo