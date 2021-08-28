import { GETALL, GETTODOS, GETTODOSBYLIST, ADDTODO, EDITTODO, EDITLIST, DELLIST, DELTODO } from '../actions/types'

const initialState = {
    todos: [],
    filterId: 0
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GETALL:
            console.log(action.payload)
            return ({
                todos: action.payload.todos, filterId: state.filterId
            })
        case ADDTODO:
            return ({
                todos: [...state.todos, action.payload], filterId: state.filterId
            })
        case DELTODO:
            return (
                {
                    todos: state.todos.filter(todo => todo.id !== action.payload), filterId: state.filterId
                }
            )
        case EDITTODO:
            return (
                {
                    todos: state.todos.map(todo => {
                        if (todo.id === action.payload) {
                            todo.completed = !todo.completed
                        }
                        return todo
                    })
                    , filterId: state.filterId
                }
            )
        case GETTODOSBYLIST:
        case GETTODOS:
            return ({
                todos: state.todos,
                filterId: action.payload
            })
        case DELLIST:
            return (
                {
                    todos: state.todos.filter(todo => todo.listId !== action.payload)
                }
            )
        case EDITLIST:
            return (
                {
                    todos: state.todos.map(todo => {
                        if (todo.listId === action.payload) {
                            todo.completed = !todo.completed
                        }
                        return todo
                    })
                    , filterId: state.filterId
                }
            )
        default:
            return state

    }
}
