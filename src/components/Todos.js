import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap'
import { connect } from 'react-redux'

import { toggleTodo, delTodo } from '../actions/todosActions'
class Todos extends Component {

    render() {

        let todos = [...this.props.todos]
        if (this.props.filterId) {
            todos = todos.filter(todo => todo.listId === this.props.filterId)
        }
        return (
            <Table>
                <thead>
                    <tr>
                        <th>completed</th>
                        <th>description</th>
                        <th>-</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        todos.map(todo =>
                            <tr key={todo.id}>
                                <td><input type="checkbox" checked={todo.completed} onChange={() => this.props.toggleTodo(todo.id, todo.completed)} /></td>
                                <td>{todo.description}</td>
                                <td><Button variant="danger" onClick={() => this.props.delTodo(todo.id)}>x</Button></td>
                            </tr>)
                    }
                </tbody>
            </Table>
        )
    }
}
const mapStateToProps = (state) => {
    return ({
        todos: state.todosReducer.todos,
        filterId: state.todosReducer.filterId
    })
}
export default connect(mapStateToProps, { toggleTodo, delTodo })(Todos)