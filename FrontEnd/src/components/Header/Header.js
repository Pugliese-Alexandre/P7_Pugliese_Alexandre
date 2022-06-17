import React from 'react';
import { NavLink } from 'react-router-dom';


const Header = () => {
    return (
        <header>
            <div className='logo'>
                <img className='logo-Principal' src='./img/logo_Groupomania.png' alt='Logo Groupomania'/>
            </div>
        <div className='navigation'>
        <div className='navigation_Container'>
            <ul>
                <NavLink to ="/" className={(nav) => (nav.isActive ? "nav-active" : "")}><li>Accueil</li></NavLink>
                <NavLink to ="/SignIn" className={(nav) => (nav.isActive ? "nav-active" : "")}><li>Se connecter</li></NavLink> 
                <NavLink to ="/register" className={(nav) => (nav.isActive ? "nav-active" : "")}><li>S'enregistrer</li></NavLink>       
            </ul>            
        </div>
        </div>
        </header>
    );
};

export default Header;