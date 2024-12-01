import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate ,Link} from 'react-router-dom';
import axios from 'axios';
import { userExists } from '../redux/slices/authSlice';
import { url } from '../constants/server';
import toast from 'react-hot-toast';

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    try {
      e.preventDefault();
      const formdata = new FormData(e.target)
      const credentials = {
        email: formdata.get('email'),
        password: formdata.get('password'),
      }
      const { data } = await axios.post(`${url}/api/auth/login`, credentials, { withCredentials: true })
      if (data.success) {
        dispatch(userExists(data?.user))
        toast.success("Welcome User!")
        navigate('/');
      }
    } catch (err) {
      console.error(err.response?.data?.message || err.message || "Opps something went wrong")
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
        <p>Create a new account ? <Link to='/register'>Sign Up</Link></p>
      </div>
    </div>
  );
};

export default Login;