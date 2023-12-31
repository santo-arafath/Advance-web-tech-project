// pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/header2';
import Footer from './components/Footer';
import { useRouter } from 'next/router';

const Dashboard = () => {
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

  return (
    <>
    
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="container mx-auto my-10 overflow-auto"> {/* Added overflow-auto */}
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
        <div className="container mx-auto p-6">
          <div className="flex flex-wrap -mx-4">
            {/* Main Content */}
            <main className="lg:w-1/2 lg:pr-4 px-4"> {/* Adjusted width for lg screens */}
              {/* Image Section */}
              <div className="mb-6 lg:hidden"> {/* Hidden on small screens */}
                <img src="dram.jpg" alt="mockup" className="w-full h-auto" />
              </div>

             
              <div>
             {/* Added overflow-auto */}
             <td className="border border-gray-300"></td>
              {/* Added overflow-auto */}
              </div>
            </main>
            <div>
             {/* Added overflow-auto */}
             <td className="border border-gray-300"></td>
              {/* Added overflow-auto */}
              </div>
          </div>
        </div>
      </div>
      <div>
              {/* Added overflow-auto */}
              <td className="border border-gray-300"></td>
              {/* Added overflow-auto */}
      </div>
      
    </>
  );
};

export default Dashboard;
