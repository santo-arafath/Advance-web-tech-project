import { useState, useEffect } from 'react';
import axios from 'axios';
import MyLayout from '../components/layput2';
import { useRouter } from 'next/router';

const Solutions = () => {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const expertId = sessionStorage.getItem('id');
        console.log('Expert ID:', expertId);

        if (!expertId) {
          router.push('/signin');
          return;
        }

        const response = await axios.get(`http://localhost:3000/getsolutionsby/${expertId}`);
        console.log('Solutions Response:', response);

        if (response.data && Array.isArray(response.data)) {
          setSolutions(response.data);
        } else {
          setSolutions([]);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching solutions:', error);
        setError(`Error fetching solutions. Please try again. Error: ${error.message}`);
        setLoading(false);
      }
    };

    fetchSolutions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <MyLayout>
        <div className="container mx-auto my-10">
          <h1 className="text-3xl font-semibold mb-6">Solutions by Expert</h1>
          {solutions.length === 0 ? (
            <p>No solutions found.</p>
          ) : (
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300">ID</th>
                  <th className="border border-gray-300">Title</th>
                  <th className="border border-gray-300">Description</th>
                  <th className="border border-gray-300">Category</th>
                </tr>
              </thead>
              <tbody>
                {solutions.map((solution) => (
                  <tr key={solution.id}>
                    <td className="border border-gray-300">{solution.id}</td>
                    <td className="border border-gray-300">{solution.title}</td>
                    <td className="border border-gray-300">{solution.description}</td>
                    <td className="border border-gray-300">{solution.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </MyLayout>
    </>
  );
};

export default Solutions;
