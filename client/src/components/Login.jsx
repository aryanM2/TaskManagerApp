import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.css'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


export default function Login() {

  
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate = useNavigate();

  function handleSubmit(event){ 
    event.preventDefault();
    
    axios.post("http://localhost:4001/api/auth/login",{
      email:email,
      password:password

    }).then((response)=>{      
      const token  = response.data.token;
      localStorage.setItem("token",token)
      navigate("/dashboard");


    }).catch((error)=>{
      console.error("There was an error!", error);
      alert("Login failed. Please check your credentials and try again.");
    });

  }

  return (
    <div className="container"  >
        <div className='login-container'>
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" value={email}   onChange={(e) => setEmail(e.target.value)}placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control value={password}   onChange={(e) => setPassword(e.target.value)}type="password" placeholder="Password" />
      </Form.Group>
   
      <Button className='button-primary' variant="primary" type="submit">
        Submit
      </Button>

      <Form.Group>
        <Form.Text className="signup-text">
          Don't have an account? <Link to={"/signup"}>signup here!</Link>
        </Form.Text>
      </Form.Group>
    </Form>
    </div>

    </div>
        
  )
}
