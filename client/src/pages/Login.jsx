import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userExists } from '../redux/slices/authSlice';


const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();



  const handleSubmit = async(e) => {
    const url='http://localhost:3000'
    try {
      e.preventDefault();
      const formdata = new FormData(e.target)
      const credentials = {
        name: formdata.get('name'),
        password: formdata.get('password'),
      }
      const {data} =await axios.post('/api/auth/login', credentials,{withCredentials: true})
      if(data.success) {
        dispatch(userExists(data?.user))

        navigate('/');
      }
    } catch (err) {
      console.error(err.response?.data?.message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center">Login</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"

              className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;