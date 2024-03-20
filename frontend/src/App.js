import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login'
import Registro from './components/Registro/Registro'
import Inicio from './components/Inicio/Inicio'
import Password from './components/Password/Password'

function App() {
  useEffect(() => {
    console.log('El componente App se ha montado');
    return () => {
      console.log('El componente App se ha desmontado');
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/password_reset" element={<Password />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
