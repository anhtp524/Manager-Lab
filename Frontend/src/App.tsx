import { useEffect, useState } from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import Login from './pages/Login/Login';
import { useNavigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState<boolean>();
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem('accessToken');
    if (user) {
      setUser(true);
      navigate('/');
    } else {
      setUser(false);
      navigate('/login');
    }
  }, [navigate]);
  console.log(user);
  return <div id="app">{user ? <Layout /> : <Login />}</div>;
}

export default App;
