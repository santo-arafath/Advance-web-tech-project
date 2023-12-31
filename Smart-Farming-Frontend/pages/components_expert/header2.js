import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LogoutButton from '../components/LogoutButton';

const Header = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [id, setId] = useState(null); // Renamed for consistency
  const router = useRouter();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    // Fetch the logged-in user's ID from storage
    const storedId = sessionStorage.getItem('id') || localStorage.getItem('id');
    if (storedId) {
      setId(storedId); // Set the ID using the correct state setter function
    }
  }, []);

  const handleLogout = async () => {
    try {
      // Make a request to the backend to logout
      await axios.post('http://localhost:3000/auth/logout');

      // Clear user session storage
      sessionStorage.removeItem('id');
      // Redirect to the login or home page
      router.push('/expert/signin'); // Change the route according to your application
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="bg-neutral navbar text-neutral-content">
      <div className="navbar-start">
        <Link href="/" className="normal-case text-xl">Smart Farming</Link>
      </div>
      <div className="navbar bg-slate-400">
          {/* ... your existing code */}
          
          {/* ... your existing code */}
        </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
        <li><Link href="/experts">Dashoboard</Link></li>
        <li><Link href="/expert/solution">All Solutions</Link></li>
          {/* Other links */}
          <li><Link href="/expert/allexperts">All Experts</Link></li>
          <li><Link href="/expert/messaging">Message</Link></li>
          <li><Link href="/expert/postsolution">Create Solutions</Link></li>
          <li><Link href="/expert/send-email">
          Send Email
        </Link></li>
        
          {/*<li><Link href="/chat/ChatPage">Chat</Link></li> <li><Link href="/expert/more">More</Link></li>*/}
        </ul>
      </div>
      
      <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src={`http://localhost:3000/${id}/getimage`} />
        </div>
      </div>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
      
        <li>
        <Link href="/expert/profilepic">Profile Pic
        <span className="badge">New</span>
        </Link>
        </li>
        <li>
            <Link href={`/updateprofile/${id}`}>
            Update Profile
            </Link>
          </li>
          <li><Link href="/expert/settings">Settings </Link></li>
          <li><Link href="/expert/more">More</Link></li>
        <li><LogoutButton/></li>
      </ul>
    </div>
    </div>
  );
};

export default Header;
