import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getTodos, getTodosByList } from '../actions/todosActions'
import { toggleList, delList } from '../actions/listsActions'

class Lists extends Component {

    render() {
        return (
            <div>
                <Button variant="primary" onClick={() => this.props.getTodos()} >get All todos</Button>
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
                            this.props.todosLists.map(list =>
                                <tr key={list.id}>
                                    <td><input type="checkbox" checked={list.completed} onChange={() => this.props.toggleList(list.id, list.completed)} /></td>
                                    <td><Button variant="light" onClick={() => this.props.getTodosByList(list.id)} >{list.description}</Button></td>
                                    <td><Button variant="danger" onClick={() => this.props.delList(list.id)}>x</Button></td>
                                </tr>)
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return ({
        todosLists: state.listsReducer.todosLists
    })
}
export default connect(mapStateToProps, { getTodos, getTodosByList, toggleList, delList })(Lists)