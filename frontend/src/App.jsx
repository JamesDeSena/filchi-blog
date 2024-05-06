import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import NavBar from "./admin/adminComponents/NavBar";
import BlogForm from "./admin/adminComponents/BlogForm";
import BlogEdit from "./admin/adminComponents/BlogEdit";


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
        <Route
          exact
          path="/admin/newblog"
          element={
            <>
              <BlogForm/>
            </>
          }
        />
        <Route
          exact
          path="/admin/editblog/:id"
          element={
            <>
              <BlogEdit/>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
