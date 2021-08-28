import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addTodo } from '../actions/todosActions'
class AddTodo extends Component {
    state = {
        description: "", listId: ""
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault()
        if (this.state.description) {
            let listId = this.state.listId ? this.state.listId : this.props.todosLists[0].id
            this.props.addTodo(this.state.description, listId)
            this.setState({ description: "" })
        }
        else {
            alert("cannot add empty todo")
        }
    }
    render() {
        return (
            <form
                onSubmit={this.onSubmit}
            >
                <input type="text" name="description" value={this.state.description} onChange={this.onChange} />
                <select defaultValue={this.state.listId} name="listId" onChange={this.onChange}>
                    {this.props.todosLists.map(List =>
                        <option key={List.id} value={List.id}>{List.description}</option>)}
                </select>
                <input type="submit" value="add new todo" />
            </form>
        )
    }
}
const mapStateToProps = (state) => {
    return ({
        todosLists: state.listsReducer.todosLists
    })
}



export default connect(mapStateToProps, { addTodo })(AddTodo)
