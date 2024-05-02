import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc"; 
import { IoDocumentTextOutline } from "react-icons/io5"; 
import { GoFileMedia } from "react-icons/go"; 
import WithAuth from "../../../auth/WithAuth";

const NavBar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/admin"); 
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-around">
        <Nav>
          <Nav.Link href="#content" className="">
            <IoDocumentTextOutline size={24} /> Content
          </Nav.Link>
          <Nav.Link href="#media">
            <GoFileMedia size={24} /> Media
          </Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown title="Quick Add" id="basic-nav-dropdown">
            <NavDropdown.Item href="#blog">Blog</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title={<VscAccount size={24} />} id="basic-nav-dropdown">
            <NavDropdown.Item onClick={handleSignOut}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default WithAuth(NavBar);
