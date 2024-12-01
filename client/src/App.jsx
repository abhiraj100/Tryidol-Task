import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ProtectRoute from './components/ProtectRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react';
import axios from 'axios';
import { url } from './constants/server';
import { userExists, userNotExists } from './redux/slices/authSlice';

function App() {
  const dispatch = useDispatch()
  const { user,loader } = useSelector((state) => state.auth)
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await axios.get(`${url}/api/user/`, { withCredentials: true } )
        console.log(data)
        if (data.success) {
          dispatch(userExists(data.user))
        } 
      } catch (err) {
        dispatch(userNotExists)
        console.log(err.response?.data?.message || err.message)
      }
    }
    loadProfile()
  }, [dispatch])

  if(loader){
    return <div className='min-h-dvh  grid place-content-center'>Loading...</div>
  }
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={ <ProtectRoute user={user} /> } >
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;