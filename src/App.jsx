import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LoginAndRegister from './components/auth/LoginAndRegister';
import ClientDashboardDetails from './components/clientDashboard/ClientDashboardDetails';
import Footer from './components/Footer';
import Header from './components/Header';

const Layout = ({ children }) => {
  const location = useLocation();
  const isLoginC2 = location.pathname === '/';
  const isLoginC1 = location.pathname === '/login';
  const contentClass = !isLoginC1 && !isLoginC2 ? 'mt-20 ml-5 mr-5 mb-10' : '';

  return (
    <>
      {!isLoginC1 && !isLoginC2 ? <Header /> : ""}
      <div className={contentClass}>
        {children}
      </div>
      {!isLoginC1 && !isLoginC2 ? <Footer /> : ""}
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
          <Route path="/clientdashboard" element={<ClientDashboardDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
