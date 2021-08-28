import { ADDLIST, DELLIST, EDITLIST } from './types'

export const addList = (description) => dispatch => {
    fetch("todoslists", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ description })
    }).then(response => response.json()).then(newList => {
        if (newList.success) {
            dispatch({
                type: ADDLIST, payload: newList
            })
        }
        else {
            alert("error occured")
        }
    })
}




export const delList = (id) => dispatch => {
    fetch(`todoslists/${id}`, {
        method: "DELETE"
    }).then(response => response.json()).then(() => {

        dispatch({ type: DELLIST, payload: id })
    })
}

export const toggleList = (id, completed) => dispatch => {

    fetch("todosLists/" + id, {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ completed: !completed })
    }).then(response => response.json()).then(() => {
        dispatch({
            type: EDITLIST,
            payload: id
        })
    })

}
