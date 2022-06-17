import React from 'react';
import Header from '../components/Header/Header';
import '../components/ConnectionForm/ConnectionForm.css';



const Register = () => {
    return (
        <div className='log_Page'>
            <Header />
<div className='log_Container'>
<div className="log_Register" data-id="inscription">
      <form>
        <div className="row">
        <i class="fa-solid fa-user"></i>
          <input type="login" class="input" placeholder="Login"/>
        </div>  
        <div className="row">
        <i class="fa-solid fa-envelope"></i>
          <input type="email" class="input" placeholder="Adresse Email"/>
        </div>
        <div className="row">
        <i class="fa-solid fa-lock"></i>
          <input type="password" class="input" placeholder="Mot de Passe"/>
        </div>

        <button className="btn" type="button">Inscription</button>
      </form>
    </div>
            </div>
        </div>
    );
};

export default Register;