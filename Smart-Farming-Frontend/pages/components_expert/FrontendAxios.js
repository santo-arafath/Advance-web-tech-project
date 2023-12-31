import axios from 'axios';

const backendAPI = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your actual backend base URL
});

export const getUserByID = async (id) => {
  try {
    const response = await backendAPI.get(`userbyid/${id}`);
    return response.data; // Assuming the response contains the user data
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};

export const downloadFile = async (filename) => {
  try {
    const response = await axios.get(`http://localhost:3000/getpdf/${filename}`, {
      responseType: 'blob', // Set the response type to blob
    });

    // Create a blob URL from the blob data received in the response
    const blob = new Blob([response.data], { type: response.headers['content-type'] });
    const url = window.URL.createObjectURL(blob);

    // Create a link element and trigger a click event to initiate the download
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    // Remove the link element from the document
    document.body.removeChild(link);

    // Revoke the blob URL to free up resources
    window.URL.revokeObjectURL(url);
  } catch (error) {
    throw new Error(`Error downloading file: ${error.message}`);
  }
};