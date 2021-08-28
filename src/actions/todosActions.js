import { GETTODOS, GETTODOSBYLIST, ADDTODO, EDITTODO, DELTODO } from './types'

export const addTodo = (description, listId) => dispatch => {
    fetch("todos", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ description, listId })
    }).then(response => response.json()).then(newTodo => {
        if (newTodo.success) {
            dispatch({
                type: ADDTODO,
                payload: newTodo
            })
        }
        else {
            alert("error occured")
        }
    })
}

export const delTodo = (id) => dispatch => {
    fetch(`todos/${id}`, {
        method: "DELETE"
    }).then(response => response.json()).then(() => {

        dispatch({
            type: DELTODO,
            payload: id
        })
    })
}

export const toggleTodo = (id, completed) => dispatch => {

    fetch("todos/" + id, {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ completed: !completed })
    }).then(response => response.json()).then(() => {
        dispatch({
            type: EDITTODO,
            payload: id
        })
    })
}
export const getTodosByList = (listId) => dispatch => {
    dispatch({
        type: GETTODOSBYLIST,
        payload: listId
    })
}
export const getTodos = () => dispatch => {
    dispatch({
        type: GETTODOS,
        payload: 0
    })
}