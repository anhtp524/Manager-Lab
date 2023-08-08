import './login.scss';

const Login = () => {
  return (
    <div className="login">
      <div className="loginstudent">
        <button>Login with student</button>
      </div>
      <div className="loginlecture">
        <button>Login with lecture</button>
      </div>
    </div>
  );
};

export default Login;
