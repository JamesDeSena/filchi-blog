import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";

import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'font-awesome/css/font-awesome.min.css';

import "./components/lib/animate/animate.min.css";
import "./components/lib/owlcarousel/assets/owl.carousel.min.css";

import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import NavBar from "./admin/adminComponents/NavBar";
import BlogForm from "./admin/adminComponents/BlogForm";
import BlogEdit from "./admin/adminComponents/BlogEdit";


import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Blog from './components/Blog';

function App() {
  return (
    <div>
      <HelmetProvider/>
      <ToastContainer />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <Header/>
              <Home/>
              <Footer/>
            </>
          }
        />
        <Route
          exact
          path="/blog/:id/:title"
          element={
            <>
              <Header/>
              <Blog />
              <Footer/>
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
