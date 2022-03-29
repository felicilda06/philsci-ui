import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Login, Register, Portal, AdminPage, Infodesk, ForgotPass, Winners, Prizes } from './components';

const App: React.FC = () => {
  
  return (
    <Router>
      <Routes>
          <Route path={`/`} element={<Login/>}/>
          <Route path={`/signup`} element={<Register/>}/>
          <Route path={`/portal`} element={<Portal/>}/>
          <Route path={`/admin`} element={<AdminPage/>}/>
          <Route path={`/info-desk`} element={<Infodesk/>}/>
          <Route path={`/forgot-password`} element={<ForgotPass/>}/>
          <Route path={`/winners`} element={<Winners/>}/>
          <Route path={`/prizes`} element={<Prizes/>}/>
      </Routes>
    </Router>
  );
}

export default App;
