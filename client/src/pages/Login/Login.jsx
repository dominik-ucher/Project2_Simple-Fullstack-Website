import React from 'react';
import './Login.css';
import '../../style.css';

const Login = () => {
  return (
    <div className="auth">
      <h1>Logg inn</h1>
      <form>
        <input type="text" placeholder='brukernavn' />
        <input type="password" placeholder='passord' />
        <button>Logg inn</button>
        <p>This is an error!</p>
      </form>
    </div>
  );
};

export default Login;
