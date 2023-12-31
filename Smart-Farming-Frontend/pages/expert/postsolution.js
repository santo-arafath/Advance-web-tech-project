// pages/postsolution.js
import { useState } from 'react';
import axios from 'axios';
import Layout from '../components/layput2';
import Title from '../components/title';

const CreateSolution = () => {
  const [solutionData, setSolutionData] = useState({
    title: '',
    description: '',
    category: '',
    expertId: 0,
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSolutionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming your server is running on http://localhost:3000
      const response = await axios.post('http://localhost:3000/postsolution', solutionData);

      setSuccessMessage('Solution created successfully!');
      setError(null);
    } catch (error) {
      console.error('Error creating solution:', error);
      setError('Error creating solution. Please try again.');
      setSuccessMessage(null);
    }
  };

  return (
    <>
      <Title page="Create Solution" />
      <Layout>
        <div className="container mx-auto mt-8">
          <h1 className="text-3xl font-semibold mb-4">Create Solution</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={solutionData.title}
                onChange={handleChange}
                className="py-2 px-3 border rounded-md w-full"
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                name="description"
                value={solutionData.description}
                onChange={handleChange}
                className="py-2 px-3 border rounded-md w-full"
              ></textarea>
            </div>
            <div>
              <label>Category</label>
              <input
                type="text"
                name="category"
                value={solutionData.category}
                onChange={handleChange}
                className="py-2 px-3 border rounded-md w-full"
              />
            </div>
            <div>
              <label>Expert ID</label>
              <input
                type="number"
                name="expertId"
                value={solutionData.expertId}
                onChange={handleChange}
                className="py-2 px-3 border rounded-md w-full"
              />
            </div>

            {error && <p className="text-red-500">{error}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Create Solution
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default CreateSolution;
