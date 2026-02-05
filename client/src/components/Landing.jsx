import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import './Landing.css';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';





function Landing() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  if(!token){
    navigate('/login')
  }
  return (
    <>
    <Navbar expand="lg mb-3" bg="dark" variant="dark">
      
        <Navbar.Brand href="#home">Task Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Add new Task</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <LinkContainer to="/dashboard">
            <Button variant="link" className="nav-link">Dashboard</Button>
          </LinkContainer>
          <LinkContainer to="/login">
            <Button variant="link" className="nav-link">Login</Button>
          </LinkContainer>
          <LinkContainer to="/signup">
            <Button variant="link" className="nav-link">Signup</Button>
          </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      

    
    </Navbar>
    <div>
        <div className="Container login-container text-center mt-5 p-4 border rounded" style={{ maxWidth: '700px', margin: '0 auto', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' ,height:'300px', alignItems:'center', display:'flex', flexDirection:'column', justifyContent:'center'}}>
            <h2 style={{ fontSize: '3rem' }}>Welcome to Task Manager</h2>
            <p style={{ fontSize: '1.5rem' }}>Manage your tasks efficiently and stay organized.</p>

        </div>
    </div>
    
    <footer>
      <div className="footer text-center p-3 color-white">
        <p>© 2024 Task Manager. All rights reserved.</p>
       
      </div>
    </footer>
    </>
  );
}

export default Landing;