import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addList } from '../actions/listsActions'

class AddList extends Component {
    state = {
        description: ""
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault()
        if (this.state.description) {
            this.props.addList(this.state.description)
            this.setState({ description: "" })
        }
        else {
            alert("cannot add empty list")
        }
    }
    render() {
        return (
            <form
                onSubmit={this.onSubmit}
            >
                <input type="text" name="description" value={this.state.description} onChange={this.onChange} />
                <input type="submit" value="add new list" />
            </form>
        )
    }
}
export default connect(null, { addList })(AddList)