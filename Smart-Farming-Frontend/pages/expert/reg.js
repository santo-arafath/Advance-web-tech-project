
import { useState } from 'react';
import Layout from "../components/layout"
import Title from "../components/title";
import axios from 'axios';

export default function RegisterPage () {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  //const [phone, setPhone] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleChangeFullName = (e) => {
    setFullName(e.target.value);
  };

  const handleChangeUserName = (e) => {
    setUsername(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  /*const handleChangePhone = (e) => {
    setPhone(e.target.value);
  };*/

  const handleChangeAdress = (e) => {
    setAddress(e.target.value);
  };


  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
  };
  const isValidEmail = (email) => {
    const emailPattern = /^\S+@\S+\.\S+$/;
    return emailPattern.test(email);
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form validation
    if (!fullName || !username || !email || !password || !confirmPassword || !address || !file) {
      console.log(fullName, username, email, password, confirmPassword, address, file);
      setError('All fields are required');
    }  else if (!isValidEmail(email)) {
      setError('Invalid email address');}
    else if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
     
    try {
      postData()
      setError("user created successfully");
    } catch (e) {
      setError(e);
    }
      setFullName('');
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      //setPhone('');
      setAddress('');
      setFile(null);
      setError('');
    }
  };

  async function postData() {
   try {
     const formData = new FormData();
     formData.append('name', fullName);
     formData.append('username', username);
     //formData.append('email', email);
     formData.append('password', password);
     formData.append('address', address);
    // formData.append('phone', phone);
     formData.append('myCV', document.querySelector('#myfile').files[0]);
     formData.append('email', email);
    console.log(formData);
     const response = await axios.post('http://localhost:3000/registration', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
    }
     });
    
     const data = response.data;
     console.log(data);
     } catch (error) {
     console.error(error);
     }
    }

  return (
 
      <>
        <Title page="Registration" />
        <Layout>
          <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Registration Form</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                <input type="text" name="fullName" value={fullName} onChange={handleChangeFullName} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                <input type="username" name="username" value={username} onChange={handleChangeUserName} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input type="email" name="email" value={email} onChange={handleChangeEmail} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input type="password" name="password" value={password} onChange={handleChangePassword} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleChangeConfirmPassword} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                <input type="address" name="address" value={address} onChange={handleChangeAdress} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="space-y-1">
                <label className="block text-gray-700 text-sm font-bold mb-2">Upload File</label>
                <input type="file" name="myfile" id="myfile" onChange={handleChangeFile} className="py-2 px-3 border rounded-md w-full" />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-4">
                Register
              </button>
            </form>
          </div>
        </Layout>
      </>
    
  );

};

