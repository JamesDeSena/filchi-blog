import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Button, Form, FormControl } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc"; 
import { IoDocumentTextOutline } from "react-icons/io5"; 
import { GoFileMedia } from "react-icons/go"; 
import { FaSearch } from "react-icons/fa"; // Importing Font Awesome icon
import WithAuth from "../../../auth/WithAuth";

const NavBar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/admin"); 
  };

  const handleSearch = (event) => {
    // Implement your search functionality here
    console.log("Search query:", searchQuery);
    // You can perform search operations using the 'searchQuery' state
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-around">
        <Nav>
          <Nav.Link href="#content" className="">
            <IoDocumentTextOutline size={24} /> Content
          </Nav.Link>
          {/* <Nav.Link href="#media">
            <GoFileMedia size={24} /> Media
          </Nav.Link> */}
        </Nav>
        {/* <div style={{ display: 'flex' }}>
        <Form inline onSubmit={handleSearch} className="">
          <FormControl 
            type="text" 
            placeholder="Search" 
            className="mr-sm-2" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
          <Button type="submit" variant="outline-success"><FaSearch /></Button>
        </Form>
        </div> */}

        <Nav>
          <NavDropdown title="Quick Add" id="basic-nav-dropdown">
            <NavDropdown.Item href="/admin/newblog">Blog</NavDropdown.Item>
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
