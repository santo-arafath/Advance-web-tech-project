import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../components/layput2';

const ProfileUploadForm = () => {
  const [file, setFile] = useState(null);
  const expertId = sessionStorage.getItem('id');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('profileImage', file);

      await axios.post(`http://localhost:3000/${expertId}/upload-profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Profile picture uploaded successfully!');
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      alert('Error uploading profile picture. Please try again.');
    }
  };

  return (
    <>
    <Layout>
    <div>
      <h2>Upload Profile Picture</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
    </Layout>
    </>
  );
};

export default ProfileUploadForm;
