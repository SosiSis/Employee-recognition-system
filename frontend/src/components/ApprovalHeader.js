import React, { useEffect, useState } from 'react'
import './ApprovalHeader.css'
import logo from '../Assets/logo.png'
import { useNavigate } from 'react-router'
import { Link, NavLink } from 'react-router-dom'

function ApprovalHeader() {
  const navigate=useNavigate();
  const [personalInformation, setPersonalInformation] = useState(true);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [file, setFile] = useState(null);
  const logout =()=>{
    localStorage.removeItem('authToken')
    navigate('/')
  }
  const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

  const fetchProfile = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    try {
      setLoadingProfile(true);
      const res = await fetch(`${REACT_APP_BASE_URL}/api/employee/me`, {
        headers: { authToken: token }
      });
      const data = await res.json();
      // backend returns an array for find(); use first element if exists
      const user = Array.isArray(data) ? data[0] : data;
      setProfile(user || null);
      if (user) {
        setEditFirstName(user.firstName || '');
        setEditLastName(user.lastName || '');
      }
    } catch (err) {
      console.error('Failed to fetch profile', err);
    } finally {
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handlePersonalInformation = () => setPersonalInformation(true);
  const handleManagePassword = () => setPersonalInformation(false);

  const handleUpdatePassword = async () => {
    // minimal client-side placeholder, backend endpoint exists at PATCH /:id/password
    try {
      const id = profile?._id || localStorage.getItem('id');
      const token = localStorage.getItem('authToken');
      await fetch(`${REACT_APP_BASE_URL}/api/employee/${id}/password`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', authToken: token },
        body: JSON.stringify({ password: newPassword })
      });
      // clear field on success
      setNewPassword('');
      alert('Password updated');
    } catch (err) {
      console.error('Failed to update password', err);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (!profile) return;
    const token = localStorage.getItem('authToken');
    const form = new FormData();
    form.append('firstName', editFirstName);
    form.append('lastName', editLastName);
    if (file) form.append('profilePicture', file);

    try {
      const res = await fetch(`${REACT_APP_BASE_URL}/api/employee/${profile._id}`, {
        method: 'PATCH',
        headers: { authToken: token },
        body: form
      });
      const updated = await res.json();
      // backend returns update result; re-fetch profile to get new values
      await fetchProfile();
      setAccountOpen(false);
    } catch (err) {
      console.error('Failed to update profile', err);
    }
  };
  
  return (
    <div className='header__container'>
      <div className='center'>
          <img className='logo' src={logo} alt="Logo" />
        </div>
     <div className='header__components'>
        <Link className='header__link' to="/approver"><p >Approval</p></Link>
        <Link className='header__link' to="/approvement/announcement"><p>Announcement</p></Link>
        <Link className='header__link' to="/approvement/support"><p >Support</p></Link>
        
       
     
      
        

     </div>
    
     
     <div  className='logout'>
     <div className='center'>
     <div className="profile-wrap">
       {profile && profile.profilePicture ? (
         <img src={profile.profilePicture} alt="avatar" className="profile-avatar" onClick={() => setAccountOpen(true)} />
       ) : (
         <div className="profile-avatar placeholder" onClick={() => setAccountOpen(true)}>
           {profile && (profile.firstName ? profile.firstName.charAt(0) : 'U')}
         </div>
       )}
     </div>
     </div>
      <span onClick={logout} className=''>Log out</span>
      </div>
      {accountOpen && (
        <>
          <div className="page-overlay" onClick={() => setAccountOpen(false)} />
          <div className="profile-modal" role="dialog" aria-modal="true">
            <div className="profile-modal__header">
              <h3>My Profile</h3>
              <button className="profile-modal__close" onClick={() => setAccountOpen(false)}>✕</button>
            </div>

            <nav>
              <ul className='flex modal-tabs'>
                <li
                  onClick={handlePersonalInformation}
                  className={"modal-tab " + (personalInformation ? 'active' : '')}
                >
                  Edit your personal Information
                </li>
                <li
                  onClick={handleManagePassword}
                  className={"modal-tab " + (!personalInformation ? 'active' : '')}
                >
                  Manage password
                </li>
              </ul>
            </nav>

            {personalInformation ? (
              <>
                <div className="profile-modal__body">
                  <div className="profile-preview profile-preview--center">
                      {profile && profile.profilePicture ? (
                        <img src={profile.profilePicture} alt="profile" />
                      ) : (
                        <div className="avatar-large">{profile && profile.firstName ? profile.firstName.charAt(0) : 'U'}</div>
                      )}
                      <input type="file" accept="image/*" onChange={handleFileChange} />
                    </div>
                    <div className="profile-fields form-fields">
                    <label>First name</label>
                    <input value={editFirstName} onChange={(e) => setEditFirstName(e.target.value)} />
                    <label>Last name</label>
                    <input value={editLastName} onChange={(e) => setEditLastName(e.target.value)} />
                    <label>Email</label>
                    <input value={profile ? profile.email : ''} readOnly />
                  </div>
                </div>
                <div className="profile-modal__actions">
                  <button className="btn-reset" onClick={() => { setEditFirstName(profile?.firstName || ''); setEditLastName(profile?.lastName || ''); setFile(null); }}>Reset</button>
                  <button className="btn-submit" onClick={handleSave}>Save</button>
                </div>
              </>
            ) : (
              <div style={{ padding: 16 }}>
                <label>Old Password:</label>
                <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                <label style={{ marginTop: 8 }}>New Password:</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <div style={{ marginTop: 12 }}>
                  <button className="btn-submit" onClick={handleUpdatePassword}>Update Password</button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
     
    </div>
  )
}

export default ApprovalHeader