import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/layput2';

const RatingsBalancePage = () => {
  const [ratings, setRatings] = useState(null);
  const [balance, setBalance] = useState(null);
  const userId = sessionStorage.getItem('id');

  useEffect(() => {
    if (userId) {
      // Fetch expert ratings
      axios
        .get(`http://localhost:3000/ratings/${userId}`)
        .then((response) => setRatings(response.data))
        .catch((error) => console.error(error));

      // Fetch expert balance
      axios
        .get(`http://localhost:3000/${userId}/balance`)
        .then((response) => setBalance(response.data))
        .catch((error) => console.error(error));
    }
  }, [userId]);

  return (
    <>
    <Layout>
      <h2>Expert Ratings and Balance</h2>

      {ratings !== null && (
        <div>
          <h3>Ratings</h3>
          <p>User ID: {ratings.userId}</p>
          <p>Ratings: {ratings.ratings}</p>
        </div>
      )}

      {balance !== null && (
        <div>
          <h3>Balance</h3>
          
          <p>Balance: ${balance.balance.toFixed(2)}</p>
        </div>
      )}
      </Layout>
    </>
  );
};

export default RatingsBalancePage;
