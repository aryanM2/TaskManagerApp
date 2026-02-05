
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Signup.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios' 

export default function Signup() {

   const [username,setUsername]=useState("");
   const [email,setEmail]=useState("");
   const [password,setPassword]=useState("");
   const [confirmPassword,setConfirmPassword]=useState("");
   const navigate = useNavigate();

     function handleChange(event){
        event.preventDefault();

        if(password !== confirmPassword){
          alert("Passwords do not match!");
          return;
        }
        else{
            axios.post("http://localhost:4001/api/auth/register",{
          name:username,
          email:email,
          password:password,
        }).then((response)=>{
          console.log(response.data);
          navigate("/login");

        }).catch((error)=>{
          console.error("There was an error!", error);
          alert("Registration failed. Please try again.");
        });
        }
      


     }
     

 
  return (
    <div className="container"  >
        <div className='signup-container login-container'>
        <Form onSubmit={handleChange}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control onChange={(e)=>{setUsername(e.target.value)}} value={username} type="text" placeholder="Enter username" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}   placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" onChange={(e)=>{setPassword(e.target.value)}}  placeholder="Password" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" onChange={(e)=>{setConfirmPassword(e.target.value)}}placeholder="Confirm Password" />
      </Form.Group>
   
      <Button className='button-primary' variant="primary" type="submit">
        Sign Up
      </Button>

      <Form.Group>
        <Form.Text className="signup-text">
          Already have account? <Link to={"/login"}>Login!</Link>
        </Form.Text>
      </Form.Group>
    </Form>
        </div>
    </div>
  )
}
