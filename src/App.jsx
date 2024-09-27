import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LoginAndRegister from './components/auth/LoginAndRegister';
import ClientDashboardDetails from './components/clientDashboard/ClientDashboardDetails';
import MoreDetails from './components/clientDashboard/MoreDetails';
import Test from './components/clientDashboard/Test'
import Footer from './components/Footer';
import Header from './components/Header';

const Layout = ({ children }) => {
  const location = useLocation();
  const isLoginC2 = location.pathname === '/';
  const isLoginC1 = location.pathname === '/login';
  
  // Classes for margins and content
  return (
    <>
      {!isLoginC1 && !isLoginC2 ? <Header /> : ""}
      <div>
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
          <Route path="/moreDetails" element={<MoreDetails />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
