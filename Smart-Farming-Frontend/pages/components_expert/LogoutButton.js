// components/LogoutButton.js
import React from 'react';
import { useAuth } from '../utils/authcontext';
import { useRouter } from 'next/router';

const LogoutButton = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/expert/signin');
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;