import './App.css'
import React, { Component } from 'react';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import AddList from './components/AddList';

import Lists from './components/Lists'
import { Card, Accordion, Button } from 'react-bootstrap'

import { getAll } from './actions/genericActions'
import { connect } from 'react-redux'

class App extends Component {

  constructor() {
    super()
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.props.getAll()
    this.setState({
      loading: false
    })
  }

  render() {
    console.log(this.props.todos)
    const lists = !this.state.loading ? <Lists /> : <p>loading.....</p>
    const todos = !this.state.loading ?
      <Todos /> : <p>loading.....</p>

    return (
      <div className="App">
        <h1>Todo app </h1>
        <Accordion >
          <Card >
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0"> Add list </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0" >
              <Card.Body>
                <AddList />
              </Card.Body>
            </Accordion.Collapse>

          </Card>
          <Card >
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1"> Add Todo </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1" >

              <Card.Body>
                <AddTodo />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>

        <div className="mybox">
          <Card style={{
            marginRight: "50px", paddingRight: "100px"
          }}>
            <Card.Body>
              <Card.Title>My Lists</Card.Title>
              {lists}
            </Card.Body>
          </Card>
          <Card style={{
            marginTop: "70px", paddingRight: "100px"
          }}>
            <Card.Body>
              <Card.Title>Todos</Card.Title>
              {todos}
            </Card.Body>
          </Card>
        </div>

      </div>
    );
  }


}


export default connect(null, { getAll })(App);

