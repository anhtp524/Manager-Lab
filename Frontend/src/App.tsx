import { useEffect, useState } from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import Login from './pages/Login/Login';

function App() {
  const [user, setUser] = useState<boolean>();
  useEffect(() => {
    const user = localStorage.getItem('accessToken');
    if (user) {
      setUser(true);
    }
  }, []);
  console.log(user);
  return <div id="app">{user ? <Layout /> : <Login />}</div>;
}

export default App;
