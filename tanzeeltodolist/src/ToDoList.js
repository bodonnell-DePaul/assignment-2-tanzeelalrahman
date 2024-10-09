import React, { useState } from 'react';
import { Container, Row, Col, ListGroup, Tab, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ToDoList.css';
import todos from './todoItems';

const getColorVariant = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);
  const diffDays = (due - today) / (1000 * 3600 * 24);

  if (diffDays < 2) return 'danger';
  else if (diffDays < 4) return 'warning';
  else if (diffDays < 7) return 'success';
  else return 'primary';
};

function TodoList() {
  const normalizeTitle = (title) => title.toLowerCase().replace(/\s+/g, '_');
  
  const [activeKey, setActiveKey] = useState(normalizeTitle(todos[0].title));
  
  // State for editing description
  const [currentDescriptions, setCurrentDescriptions] = useState(
    todos.reduce((acc, todo) => ({ ...acc, [normalizeTitle(todo.title)]: todo.description }), {})
  );

  const handleDescriptionChange = (event, titleKey) => {
    const updatedDescription = event.target.textContent;
    setCurrentDescriptions({ ...currentDescriptions, [titleKey]: updatedDescription });
  };

  return (
    <Container className="mt-4">
      <h1>Assignment 2: ToDo List</h1>
      <Row className="content-wrapper">
        <Col md={4}>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" placeholder="Add ToDo Item" required />
            </Form.Group>
            <Form.Group controlId="formDueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control type="date" name="dueDate" required />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" name="description" placeholder="Enter the description of your task" required />
            </Form.Group>
            <Button type="submit" variant="success">Add Todo</Button>
          </Form>
        </Col>
        <Col md={8}>
          <Tab.Container activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
            <Row>
              <Col sm={4}>
                <ListGroup>
                  {todos.map(todo => (
                    <ListGroup.Item
                      key={normalizeTitle(todo.title)}
                      action
                      variant={getColorVariant(todo.dueDate)}
                      onClick={() => setActiveKey(normalizeTitle(todo.title))}
                    >
                      {todo.title}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
              <Col sm={8}>
                <Tab.Content>
                  {todos.map(todo => {
                    const titleKey = normalizeTitle(todo.title);
                    return (
                      <Tab.Pane eventKey={titleKey} key={titleKey}>
                        <p
                          contentEditable="true" // Enable content editing
                          suppressContentEditableWarning={true} // Suppress React warning for contentEditable
                          onBlur={(event) => handleDescriptionChange(event, titleKey)} // Update the state onBlur
                        >
                          {currentDescriptions[titleKey]}
                        </p>
                        <input type="date" defaultValue={todo.dueDate} className="form-control" />
                      </Tab.Pane>
                    );
                  })}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
}

export default TodoList;
