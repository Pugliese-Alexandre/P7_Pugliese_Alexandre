import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importation des différentes page du site 
import Home from './pages/Home';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import Feed from './pages/Feed';

// Importation des différents composants
import './components/Header/Header.css';
import './components/ConnectionForm/ConnectionForm.css';
import './styles/Typography.css';

// Importation d Axios
/* import axios from "axios"; */

const App = () => {

    return (
<BrowserRouter>
<Routes>
{/*   <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive"> {errMsg}</p> */}
    <Route path='/' element={<Home />} />
    <Route path='/SignIn' element={<SignIn />} />    
    <Route path='/Register' element={<Register />} />
    <Route path='/Feed' element={<Feed />} />
    {/* path='*' = Fonctionne si jamais l'url ne correspond à rien de déclaré au dessus */}
    <Route path='*' element={<Home />} />
  {/*   <Route path='*'element={<ErrorPage />}/>*/}
    </Routes>
    </BrowserRouter>
    );
};

export default App;