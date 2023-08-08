import { useNavigate } from 'react-router-dom';
import './login.scss';

const Login = () => {
  const navigate = useNavigate();
  const handleLoginStudent = () => {
    localStorage.setItem('accessToken', true);
    navigate('/');
  };

  return (
    <div className="login">
      <div className="loginstudent">
        <button onClick={handleLoginStudent}>Login with student</button>
      </div>
      <div className="loginlecture">
        <button>Login with lecture</button>
      </div>
    </div>
  );
};

export default Login;
