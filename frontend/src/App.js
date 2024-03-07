import './App.css';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login'
import Registro from './components/Registro/Registro'
import Inicial from './components/Inicial/Inicial'

export const UserContext = React.createContext();

function App() {
  const [usuario, setUsuario] = useState(null);
  
  return (
    <UserContext.Provider value={usuario}>
      <Routes>
      // Rutas de Autenticacion
      <Route path="/" element={<Login setUsuario={setUsuario} />} />
      <Route path="/login" element={<Login setUsuario={setUsuario} />} />

      <Route path="/registro" element={<Registro />}></Route>   
      <Route path="/inicial" element={<Inicial />}></Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
  
