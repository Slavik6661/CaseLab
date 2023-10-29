import { globalState } from "./globalState.js";
let count = 0
function checkNet() {
    if (navigator.onLine) {
        alert('проблема на стороне сервера')
    } else {
        alert('Проблема с интернет подключением ');


    }
}

export async function getUsersData() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users/")
        if (!response.ok) {
            throw new Error('error response')
        }
        return response.json()
    }
    catch (error) {
        checkNet()
    }
}

export async function getUserTodos(userID) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userID}/todos`)

        if (!response.ok) {
            alert('error response')
            throw new Error('error response')

        }
        return response.json()
    }
    catch (error) {
        checkNet()
    }
}

export async function updatedTodoApi(id) {
    let statusToDo = globalState.get('stateToDo')
    try {
        let response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                completed: !statusToDo,
            }),
        })
        if (!response.ok) {
            alert('error response')
            throw new Error('error response')

        }
        return response.json()
    }
    catch (error) {
        checkNet()
    }
}

export async function newTodoApi(userID, newTask) {
    try {
        let response = await fetch(`https://jsonplaceholder.typicode.com/users/${userID}/todos`, {
            method: 'POST',
            body: JSON.stringify({
                title: newTask,
                completed: false
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (!response.ok) {
            alert('error response')
            throw new Error('error response')

        }
        return response.json()
    }
    catch (error) {
        checkNet()
    }
}

export async function deleteTodoApi(todoId) {
    try {
        let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${todoId}`, {
            method: 'DELETE',
        })
        if (!response.ok) {
            alert('error response')
            throw new Error('error response')
        }
        return await response.json()
    }
    catch (error) {
        checkNet()
    }
}

export async function createUserApi(userName) {
    try {
        let response = await fetch(`https://jsonplaceholder.typicode.com/users/`, {
            method: 'POST',
            body: JSON.stringify({
                name: userName,
            }),
        })
        if (!response.ok) {
            alert('error response')
            throw new Error('error response')
        }
        return await response.json()
    }
    catch (error) {
        checkNet()
    }
}