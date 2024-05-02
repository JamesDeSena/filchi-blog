import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import NavBar from "./admin/adminComponents/NavBar";

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>

            </>
          }
        />
        <Route
          exact
          path="/admin"
          element={
            <>
              <AdminLogin />
            </>
          }
        />
        <Route
          exact
          path="/admin/dashboard"
          element={
            <>
              <NavBar/>
              <AdminDashboard/>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
