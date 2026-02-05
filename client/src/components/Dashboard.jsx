import React, { useState, useEffect } from 'react';
import { Button, Nav, Navbar, Table, Modal, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './dashboard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [title, setTitle] = useState(''); 
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [editingTask]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        // If no token, redirect to login
        if (!token) {
          navigate('/login');
          return;
        }
        const response = await axios.get('http://localhost:4001/api/tasks/user-task', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch tasks');
        setLoading(false);
      }
    };
    fetchTasks();
  }, [navigate]);

  const handleShowModal = (task = null) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  //logout logic can be added here 
  const logoutHandler = () => { 
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/landing");
  }


  


  const handleSaveTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const token = localStorage.getItem('token');
      if (editingTask) {
        // Edit existing task
        await axios.put(`http://localhost:4001/api/tasks/update-task/${editingTask._id}`, {
          title,
          description,
          status: editingTask.status, // Preserve status
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        // Add new task
        await axios.post('http://localhost:4001/api/tasks/post-task', {
          title,
          description,
          status: 'pending',
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
      }
      // Refresh tasks
      const response = await axios.get('http://localhost:4001/api/tasks/user-task', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
      handleCloseModal();
    } catch (err) {
      alert('Failed to save task');
    }
  };

  
  const  HandleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:4001/api/tasks/delete-task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Refreshing tasks array after deleting task
      const response = await axios.get('http://localhost:4001/api/tasks/user-task', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (err) {
      alert('Failed to delete task');
    }

  };

  const handleToggleComplete = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      const task = tasks.find(t => t._id === taskId);
      const newStatus = task.status === 'completed' ? 'pending' : 'completed';
      await axios.put(`http://localhost:4001/api/tasks/update-task/${taskId}`, {
        title: task.title,
        description: task.description,
        status: newStatus,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Refresh tasks
      const response = await axios.get('http://localhost:4001/api/tasks/user-task', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (err) {
      alert('Failed to toggle task status');
    }
  };

  return (
    <>
      <Navbar expand="lg" className="mb-3" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Task Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Button className='nav-link' onClick={() => handleShowModal()}>
              Add new Task
            </Button>
          </Nav>
          <Nav className="ms-auto">
            <LinkContainer to="/landing">
              <Button onClick={logoutHandler} variant="link" className="nav-link">
                Logout
              </Button>
            </LinkContainer>
           
          </Nav>
        </Navbar.Collapse>
      </Navbar> 

      <div className="container taskBox mt-5">
        {loading ? (
          <p>Loading tasks...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : tasks.length === 0 ? (
          <p>No tasks available. Please add a task.</p>
        ) : (
          <TaskList
            tasks={tasks}
            onEdit={handleShowModal}
            onDelete={HandleDeleteTask}
            onToggleComplete={handleToggleComplete}
          />
        )}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingTask ? 'Edit Task' : 'Add Task'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveTask}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>{' '}
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <footer className="footer text-center p-3">
        <p>© 2024 Task Manager. All rights reserved.</p>
      </footer>
    </>
  );
}

/**
 * Displays the list of tasks.
 */
function TaskList({ tasks, onEdit, onDelete, onToggleComplete }) {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <TaskItem
            key={task._id}
            task={task}
            index={index}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </tbody>
    </Table>
  );
}

/**
 * Displays a single task item.
 */
function TaskItem({ task, index, onEdit, onDelete, onToggleComplete }) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>{task.status === 'completed' ? 'Completed' : 'Incomplete'}</td>
      <td>
        <Button variant="info" size="sm" onClick={() => onEdit(task)}>
          Edit
        </Button>{' '}
        <Button variant="danger" size="sm" onClick={() => onDelete(task._id)}>
          Delete
        </Button>{' '}
        <Button
          variant={task.status === 'completed' ? 'warning' : 'success'}
          size="sm"
          onClick={() => onToggleComplete(task._id)}
        >
          {task.status === 'completed' ? 'Mark Incomplete' : 'Mark Complete'}
        </Button>
      </td>
    </tr>
  );
}
