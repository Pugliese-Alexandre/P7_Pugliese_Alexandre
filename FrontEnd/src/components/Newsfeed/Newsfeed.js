import React from 'react';
import styles from './Newsfeed.module.css';
// import './another-stylesheet.css'; créer un dossier CSS ?

const Newsfeed = () => {
    return (
        <header>
            <div className={styles.logo_Groupomania}>
            <img className='logo_Groupomania' src='./img/Groupomania.png' alt='Logo du site Groupomania'/>
            </div>

            <div className={styles.navigation}>
            <div className={styles.navigation}>
            <img className='icone_Groupomania' src='./img/icon-Groupomania.png' alt='Icone du site Groupomania'/>                             
            </div>
            <div className={styles.navigation}>
            <ul>
            <li>Accueil</li>
            <li>Profil</li>
            <li>Déconnection</li>
            </ul>    
            </div>
            </div>
            
        </header>
    );
};

export default Newsfeed;