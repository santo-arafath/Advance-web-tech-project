// pages/contact.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import MyLayout from '../components/layput2';

const Contact = () => {
  const [experts, setExperts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/AllExperts');
        setExperts(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching experts:', error);
        setError('Error fetching experts. Please try again.');
      }
    };

    fetchExperts();
  }, []);

  return (
    <MyLayout>
      <div className="container mx-auto my-10">
        <h1 className="text-3xl font-semibold mb-6">Contact Experts</h1>
        {experts.length === 0 ? (
          <p>No experts found.</p>
        ) : (
          <ul>
            {experts.map((expert) => (
              <li key={expert.id}>
                <Link href={`/expert/messaging?receiverId=${expert.id}`} passHref>
  <div className="text-blue-500 hover:underline cursor-pointer">
    {expert.username}
  </div>
</Link>
              </li>
            ))}
          </ul>
        )}

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </MyLayout>
  );
};

export default Contact;
