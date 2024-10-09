import React, { useState } from 'react';
import { Container, Row, Col, ListGroup, Tab, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap CSS is imported
import './App.css'; // Import custom CSS styles
import todos from './todoItems'; // Import ToDo items from your external file


// Function to determine the color variant based on due date
const getColorVariant = (dueDate) => {
  const daysUntilDue = (new Date(dueDate) - new Date()) / (1000 * 3600 * 24);
  if (daysUntilDue < 2) return 'danger';
  else if (daysUntilDue < 4) return 'warning';
  else if (daysUntilDue < 7) return 'success';
  else return 'primary';
};


function App() {
  const [todosState] = useState(todos); // Use imported todos as initial state
  const [activeKey, setActiveKey] = useState(todos[0].id.toString()); // Manage active key state for tabs
  
  
  return (
    <Container className="mt-4">
      <h1>Tanzeel's ToDo List Application</h1> 
      <Row className="content-wrapper">
        <Col md={4}>
          <Form>
            <Form.Group>
              <Form.Control type="text" name="title" placeholder="Add ToDo Item" required />
            </Form.Group>
            <Form.Group controlId="formDueDate">
              <Form.Control type="date" name="dueDate" required />
            </Form.Group>
            <Form.Group>
              <Form.Control type="text" name="description" placeholder="Enter the description of your task" required />
            </Form.Group>
            <Form.Group className="custom-button-group">
            <Button type="submit" variant="success">Add Todo</Button>
            </Form.Group>
          </Form>
        </Col>
        <Col md={8}>
          <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
            <Row>
              <Col sm={4}>
                <ListGroup>
                  {todosState.map(todo => (
                    <ListGroup.Item
                      key={todo.id}
                      action
                      variant={getColorVariant(todo.dueDate)}
                      onClick={() => setActiveKey(todo.id.toString())}
                    >
                      {todo.title}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
              <Col sm={8}>
                <Tab.Content>
                  {todosState.map(todo => (
                    <Tab.Pane eventKey={todo.id.toString()} key={todo.id}>
                      <h4 contentEditable>{todo.title}</h4>
                      <p contentEditable>{todo.description}</p>
                      <input type="date" defaultValue={todo.dueDate} className="form-control" />
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
