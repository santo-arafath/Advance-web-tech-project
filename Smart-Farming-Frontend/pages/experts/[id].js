import Header from '../components/header2';
import Footer from '../components/Footer';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { useRouter } from 'next/router';
import Chart from 'chart.js/auto';

const Dashboard = ({ user }) => {
  const [farmersRequests, setFarmersRequests] = useState([]);
  const [accountBalance, setAccountBalance] = useState(0);
  const router = useRouter();
  const { id } = router.query;
  // Sample data for chart
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Number of Solutions Provided',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      }
    ],
  };

  useEffect(() => {
    // Fetch farmers' requests
    axios.get(`http://localhost:3000/getsolutions/${id}`) // Replace with your actual API endpoint
      .then(response => setFarmersRequests(response.data))
      .catch(error => console.error(error));

    // Fetch account balance
    axios.get(`http://localhost:3000/${id}/balance`) // Replace with your actual API endpoint
      .then(response => setAccountBalance(response.data.balance))
      .catch(error => console.error(error));
  }, []);

  return (
    <>
    <div className="min-h-screen bg-gray-100">
      <Header user={user} />

      <div className="container mx-auto p-6">
        <div className="flex flex-wrap -mx-4">
          {/* Main Content */}
          <main className="w-full lg:w-3/4 px-4">
            {/* Farmers' Requests Section */}
            <section className="bg-white p-4 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4">Current Farmers' Requests</h2>
              {/* Map through farmersRequests to display each request */}
            </section>

           
          </main>

          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 px-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Account Balance</h2>
              <p className="text-lg font-semibold">${accountBalance.toFixed(2)}</p>
              {/* Additional shortcuts or information */}
            </div>
          </aside>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Dashboard;
