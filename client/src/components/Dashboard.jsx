import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [location, setLocation] = useState('');
  const [file, setFile] = useState(null);

  const fetchLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/upload', formData);
      alert(response.data.message);
    } catch (err) {
      alert('Error uploading file');
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Location: {location}</p>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload Image</button>
    </div>
  );
};

export default Dashboard;
