import { GETALL, ADDLIST, DELLIST, EDITLIST } from '../actions/types'

const initialState = {
    todosLists: []
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GETALL:
            return ({
                todosLists: action.payload.todoslists
            })
        case ADDLIST:
            return ({
                todosLists: [...state.todosLists, action.payload]

            })
        case DELLIST:
            return (
                {
                    todosLists: state.todosLists.filter(list => list.id !== action.payload)
                }
            )
        case EDITLIST:
            return (
                {
                    todosLists: state.todosLists.map(list => {
                        if (list.id === action.payload) {
                            list.completed = !list.completed
                        }
                        return list
                    })
                }
            )
        default:
            return state

    }
}