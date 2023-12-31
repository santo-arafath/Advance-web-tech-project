import React, { useState } from 'react';
import { getUserByID, downloadFile } from './FrontendAxios';

const YourComponent = () => {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const fetchUserByID = async () => {
    try {
      const user = await getUserByID(userId);
      setUserData(user);
      setError(null);
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      setUserData(null);
      setError('Error fetching user. Please try again.');
    }
  };

  const handleFileClick = async (filename) => {
    try {
      await downloadFile(filename);
    } catch (error) {
      console.error('Error downloading file:', error);
      setError('Error downloading file. Please try again.');
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <label className="block text-lg font-semibold mb-2">Enter User ID:</label>
      <div className="flex items-center">
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="py-2 px-3 border rounded-md mr-2"
        />
        <button
          onClick={fetchUserByID}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Search User
        </button>
      </div>

      {userData && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <div className="mb-2">
              <span className="font-semibold">ID:</span> {userData.id}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Name:</span> {userData.name}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Username:</span> {userData.username}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Address:</span> {userData.address}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Filename:</span>{' '}
              <a
                href="#"
                className="text-blue-500 hover:underline"
                onClick={() => handleFileClick(userData.filename)}
              >
                {userData.filename}
              </a>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Email:</span> {userData.email}
            </div>
          </div>
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default YourComponent;
