import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const DeleteProfileButton = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const userId = sessionStorage.getItem('id');

  const handleDeleteProfile = async () => {
    try {
      setLoading(true);

      // Make a request to delete the profile
      await axios.delete(`http://localhost:3000/profile/${userId}`);

      // Clear session storage or perform other actions after successful deletion
      sessionStorage.clear();

      // Redirect to the login page or any other desired page
      router.push('/expert/signin');
    } catch (error) {
      console.error('Error deleting profile:', error);
      // Handle error, display a message, or perform other actions as needed
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleDeleteProfile} disabled={loading}>
        {loading ? 'Deleting...' : 'Delete Profile'}
      </button>
    </div>
  );
};

export default DeleteProfileButton;