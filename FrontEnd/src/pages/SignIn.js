import React, { useState  } from 'react';
import Header from '../components/Header/Header';
import '../components/ConnectionForm/ConnectionForm.css';

import { NavLink } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const sendForm = (e) => {
    console.log('hello')
    e.preventDefault();
 
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    axios.post('http://localhost:3000/api/user/login', {email, password}).then(data => {
      console.log(data);
    })
  }
 
    return (
        <div className='log_Page'>
            <Header />
            <div className='log_Container'>
<div className="log_Register" data-id="connection">
       <form onSubmit={(e) => sendForm(e)}> 
        <div className="row">
        <i class="fa-solid fa-envelope"></i>
          <input type="email" class="input" id="email" placeholder="Adresse Email"  />
        </div>
        <div className="row">
        <i class="fa-solid fa-lock"></i>
          <input placeholder="Mot de Passe" type="password" id="password" class="input"/>
        </div>
        <input type="submit" className="btn" value="connection" />  
            </form>
    </div>

    <div className='register_Now'> Vous n'avez pas encore de compte ?
    <ul>
        <NavLink to ="/register"><li>Inscrivez-vous en cliquant ici.</li></NavLink>
    </ul>    
    </div>

        </div>
        </div>
    );
};

export default SignIn;