class CheckboxListRenderer {

    static renderList(list, deleteFunction, toggleFunction) {
        return (
            <table>
                <thead>
                    <tr>
                        <th>completed</th>
                        <th>description</th>
                        <th>-</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map(todo =>
                            <tr key={todo.id}>
                                <td><input type="checkbox" checked={todo.completed} onChange={() => toggleFunction(todo.id, todo.completed)} /></td>
                                <td>{todo.description}</td>
                                <td><button onClick={() => deleteFunction(todo.id)}>x</button></td>
                            </tr>)
                    }
                </tbody>
            </table>
        )
    }

}
export default CheckboxListRenderer