import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ProtectRoute from './components/ProtectRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route  element={<ProtectRoute/>}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;