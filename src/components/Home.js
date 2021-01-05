import React from 'react'
import {Link} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';

export default function Home() {
  return (
    <div>
      <Navbar bg="dark" expand="lg" >
				  <Navbar.Brand href="/">
				  	Blog App
				  </Navbar.Brand>
				  <Navbar.Toggle aria-controls="basic-navbar-nav"/>
				  <Navbar.Collapse id="basic-navbar-nav">
				    <Nav className="mr-auto">
				      <Link to="/login" className="mr-3">Login</Link>
              <Link to="/registration" className="mr-3">Registration</Link>
              <Link to="/dashboard">Dashboard</Link>
				    </Nav>
				  </Navbar.Collapse>
				</Navbar>
    </div>
  )
}
