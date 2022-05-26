import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import FirebaseContext from './context/firebase';
import {firebase} from './lib/firebase'
import './index.css'
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<FirebaseContext.Provider value={{firebase}}>
    <App />
</FirebaseContext.Provider>);