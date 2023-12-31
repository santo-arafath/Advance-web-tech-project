// pages/settings.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/layput2';
import DeleteProfileButton from '../components/deleteProfile';
import { useRouter } from 'next/router';

const Settings = () => {
    const [profileData, setProfileData] = useState(null);
    const [passwordData, setPasswordData] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const userId = sessionStorage.getItem('id');
    const router = useRouter();
    

  if (!userId) {
    // Handle the case where userId is not available (e.g., redirect to login)
    // You can also display a loading spinner or any other UI
    return <div>Loading...</div>;
  }
  
    useEffect(() => {
      // Get the expert ID from session storage
      const expertId = sessionStorage.getItem('id');
    
  
      if (expertId) {
        // Fetch profile information based on the expert ID
        axios
          .get(`http://localhost:3000/profile/${expertId}`)
          .then((response) => {
            setProfileData(response.data);
          })
          .catch((error) => {
            console.error('Error fetching profile information:', error);
          });
      }
    }, []); // Empty dependency array ensures that this effect runs only once when the component mounts
  
    const handleChangePassword = () => {
        // Validate form fields
        if (!passwordData) {
          setPasswordError('Password is required');
          return;
        }
    
        if (passwordData !== confirmPassword) {
          setConfirmPasswordError('Passwords do not match');
          return;
        }
    
        // Clear any previous error messages
        setPasswordError(null);
        setConfirmPasswordError(null);
    
        // Get the expert ID from session storage
        const expertId = sessionStorage.getItem('id');
    
        // Make a request to change the password
        axios
          .patch(`http://localhost:3000/${expertId}/change-password`, { password: passwordData })
          .then(() => {
            setSuccessMessage('Password changed successfully');
          })
          .catch((error) => {
            console.error('Error changing password:', error);
            setPasswordError('Error changing password. Please try again.');
          });
      };
    
      const handleInputChange = (e) => {
        setPasswordData(e.target.value);
      };
    
      const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
      };

      const redirectToUpdateProfile = () => {
        // Redirect to the dynamic update profile page with the user's id
        router.push(`/updateprofile/${userId}`);
      };
    return (
     <>
    <Layout>
        <div>
          {profileData ? (
            <div>
              <h2>Profile Information</h2>
              <p>Name: {profileData[0].name}</p>
              <p>Username: {profileData[0].username}</p>
              <p>Email: {profileData[0].email}</p>

              <h3>Profile Details</h3>
              {profileData[0].uprofile ? (
                <>
                  <p>First Name: {profileData[0].uprofile.firstName}</p>
                  <p>Last Name: {profileData[0].uprofile.lastName}</p>
                  <p>Phone Number: {profileData[0].uprofile.phoneNumber}</p>
                </>
              ) : (
                // Redirect to the update profile page if profile details are not available
                <>
                  <p>Profile details are not available. Please update your profile.</p>
                  <button onClick={redirectToUpdateProfile}>Update Profile</button>
                </>
              )}
            </div>
          ) : (
            <p>Loading profile information...</p>
          )}


<div>
            <h2>Change Password</h2>
            <form>
              <div>
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordData}
                  onChange={handleInputChange}
                />
              </div>
              {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}

              <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
              
              {confirmPasswordError && <p style={{ color: 'red' }}>{confirmPasswordError}</p>}

              {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
              <button type="button" onClick={handleChangePassword}>
                Change Password
              </button>
            </form>
          </div>
          <div>
      {/* Other profile-related content */}
      <DeleteProfileButton userId={userId} />
    </div>
        </div>
      </Layout>
    </>
    );
  };

export default Settings;
