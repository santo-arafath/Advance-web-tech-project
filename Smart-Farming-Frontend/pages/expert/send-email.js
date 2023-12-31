// pages/send-email.js
import { useState } from 'react';
import axios from 'axios';
import Layout from '../components/layput2';

const SendEmail = () => {
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    text: '',
  });

  const [responseMessage, setResponseMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a request to the backend to send the email
      await axios.post('http://localhost:3000/send-email', emailData);
      setResponseMessage('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      setResponseMessage('Failed to send email. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-semibold mb-4">Send Email</h2>

        <form onSubmit={handleSubmit} className="max-w-md">
          <div className="mb-4">
            <label htmlFor="to" className="block text-gray-700 text-sm font-bold mb-2">
              To:
            </label>
            <input
              type="email"
              id="to"
              name="to"
              value={emailData.to}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="subject" className="block text-gray-700 text-sm font-bold mb-2">
              Subject:
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={emailData.subject}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="text" className="block text-gray-700 text-sm font-bold mb-2">
              Message:
            </label>
            <textarea
              id="text"
              name="text"
              value={emailData.text}
              onChange={handleChange}
              rows="5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Send Email
          </button>
        </form>

        {responseMessage && <p className="mt-4 text-green-600">{responseMessage}</p>}
      </div>
    </Layout>
  );
};

export default SendEmail;
