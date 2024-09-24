import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LoginAndRegister from './components/auth/LoginAndRegister';
import Dashboard from './components/dashboard/Dashboard';
import Footer from './components/Footer';
import Header from './components/Header'; 

const Layout = ({ children }) => {
  const location = useLocation();
  const isLoginC2 = location.pathname === '/';
  const isLoginC1 = location.pathname === '/login';
  return (
    <>
      {!isLoginC1 && !isLoginC2 ? <Header />:""} 
      {children} 
      {!isLoginC1 && !isLoginC2 ? <Footer />:""} 
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
        <Route path="/" element={<LoginAndRegister />} />
          <Route path="/login" element={<LoginAndRegister />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
