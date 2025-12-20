import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AddFood from './pages/AddFood/AddFood';
import ListFood from './pages/ListFood/ListFood';
import Orders from './pages/Orders/Orders';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import Sidebar from './components/Sidebar/Sidebar';
import Menubar from './components/Menubar/Menubar';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="d-flex" id="wrapper">
                <Sidebar sidebarVisible={sidebarVisible} />
                
                <div id="page-content-wrapper">
                  <Menubar toggleSidebar={toggleSidebar} />
                  
                  <div className="container-fluid">
                    <Routes>
                      <Route path="/add" element={<AddFood />} />
                      <Route path="/list" element={<ListFood />} />
                      <Route path="/orders" element={<Orders />} />
                      <Route path="/" element={<ListFood />} />
                    </Routes>
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;