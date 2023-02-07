import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CryptoContext from './contexts/cryptoContext';
import 'react-alice-carousel/lib/alice-carousel.css';

import './index.css';
import App from './App';

ReactDOM.render(
    <CryptoContext >
         <BrowserRouter>
    <App /> 
    </BrowserRouter>

    </CryptoContext>
 
,
 document.getElementById('root'));
