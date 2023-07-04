import React from 'react';
import './Register.css'
import '../../style.css'

const Register = () => {
    return(
    <div className="auth">
      <h1>Registrer bruker</h1>
      <form>
        <input type="text" placeholder='Navn' />
        <input type="text" placeholder='Brukernavn' />
        <input type="password" placeholder='Passord' />
        <button>Registrer</button>
        <p>This is an error!</p>
      </form>
    </div>
    )
}

export default Register