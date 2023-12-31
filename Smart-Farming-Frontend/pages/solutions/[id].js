import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const ExpertSolutions = ({ id }) => {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/getsolutions/${id}`);
        console.log('Fetched solutions:', response.data); // Log the response data
        setSolutions(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching solutions:', error);
        setLoading(false);
      }
    };
  
    fetchSolutions();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Solutions</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Title
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Description
              </th>
              {/* Add more headers if needed */}
            </tr>
          </thead>
          <tbody>
            {solutions.map((solution) => (
              <tr key={solution.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{solution.title}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{solution.description}</p>
                </td>
                {/* Add more data cells if needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  return { props: { id } };
}

export default ExpertSolutions;
