import { getUserTodos, updatedTodoApi, newTodoApi, deleteTodoApi } from "./api.js";
import { globalState, updateState } from "./globalState.js";
export default class todoList {
  constructor() {
    this.task = document.querySelector("#todo-list");
    this.arrayTodo = []
  }
  async specialToDo(jsonUserTodos) {
    this.arrayTodo = []
    jsonUserTodos = { userId: 0, id: 1, title: 'Зарядится позитивом )', completed: false, href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }
    this.arrayTodo.push(jsonUserTodos)
  }

  async fetchDataTodos() {

    let userID = globalState.get('userId')
    let jsonUserTodos = await getUserTodos(userID)
    if (userID == 0) {
      this.specialToDo(jsonUserTodos)
    } else {
      this.arrayTodo = [...jsonUserTodos]
      updateState('arrayTodo', this.arrayTodo)
      console.log(this.arrayTodo);
    }

    this.renderTodoList(this.arrayTodo)
  }
  createDivContentToDo(id, taskLink = '') {
    let divContentTodo = document.createElement('div')
    divContentTodo.id = id
    divContentTodo.classList.add('todo-item')

    if (taskLink) {
      divContentTodo.style.cursor = 'pointer';
      divContentTodo.addEventListener('click', () => {
        window.open(taskLink, '')
      });
    }
    return divContentTodo;
  }

  createInputElement(id, todoState) {
    let userId = globalState.get('userId')
    let input = document.createElement('input')
    input.type = "checkbox"
    input.id = id
    this.setCheckboxState(input, todoState)
    input.classList.add('todo-checkbox"')

    input.addEventListener('click', (async e => {
      console.log('click checkbox' + ' ' + e.target.id + '' + userId);
      let postId = this.arrayTodo[id].id
      console.log('id' + '' + postId);
      let stateToDo = this.arrayTodo[id].completed
      updateState('stateToDo', stateToDo)
      const updatedTodo = await updatedTodoApi(postId);
      if (updatedTodo != undefined) {
        this.updateToDo(postId)
      } else {
        console.log(e.target);
        e.target.checked = false;
      }
    }))
    return input;
  }

  setCheckboxState(checkboxElement, completed) {
    if (completed) {
      checkboxElement.setAttribute("checked", "checked");
    } else {
      checkboxElement.removeAttribute("checked");
    }
  }

  createSpanElement(id, element) {
    let span = document.createElement('span')
    span.textContent = element
    span.setAttribute('for', id)
    span.classList.add('todo-text')
    return span;
  }

  createDeleteButtonElement(id) {
    let deleteBtn = document.createElement('button')
    deleteBtn.id = id
    deleteBtn.classList.add("todo-deleteBtn");
    deleteBtn.textContent = 'X'

    deleteBtn.addEventListener('click', async e => {
      let idBtn = e.target.id
      let jsonUserTodos = await getUserTodos(idBtn)
      if (jsonUserTodos != undefined) {
        this.deleteTodo(idBtn)
      }
    })
    return deleteBtn;
  }
  clearDivToDo() {
    const divToClear = document.querySelector("#todo-list");
    divToClear.innerHTML = ''
  }
  async createNewTask() {
    let userID = globalState.get('userId')
    let newTask = document.getElementById('new-todo')
    this.arrayTodo = [...globalState.get('arrayTodo')]
    let newToDo = await newTodoApi(userID, newTask.value)
    this.arrayTodo.push(newToDo)
    updateState('arrayTodo', this.arrayTodo)
    console.log('newTodo');
    console.log(this.arrayTodo);
    this.renderTodoList(this.arrayTodo)
  }

  async updateToDo(postId) {
    try {
      const updatedTodo = await updatedTodoApi(postId);
      console.log('Updated Todo: ' + JSON.stringify(updatedTodo, null, 2));
      // Найдем индекс задачи в массиве arrayTodo
      const index = this.arrayTodo.findIndex(todo => todo.id === postId);
      console.log('продолжаю выполнятся ');
      if (index !== -1) {
        this.arrayTodo[index].completed = updatedTodo.completed;
      } else {
        alert('Задача не найдена');
      }

    } catch (error) {
      alert('Произошла ошибка при обновлении задачи:');
    }
  }

  async deleteTodo(idBtn) {
    let userID = globalState.get('userId')
    let jsonUserTodos = await getUserTodos(userID)
    if (jsonUserTodos) {
      this.arrayTodo = this.arrayTodo.filter(item => item.id != +idBtn)
      console.log('Новый после удаления');
      console.log(this.arrayTodo);
      this.renderTodoList(this.arrayTodo)
    }
  }


  renderTodoList(jsonUserTodos) {
    this.clearDivToDo()
    jsonUserTodos.forEach((element, id) => {
      const div = this.createDivContentToDo(id, element.href); // Создает div
      const input = this.createInputElement(id, element.completed); // Создает input
      const span = this.createSpanElement(id, element.title, element.userId);
      const button = this.createDeleteButtonElement(element.id); // Создает button

      div.appendChild(input); // Добавляет input в div
      div.appendChild(span); // Добавляет label в div
      div.appendChild(button); // Добавляет button в div
      this.task.appendChild(div); // Добавляет div в this.task

    });

  }

  addEventListenerBtnAddTask() {
    document.getElementById('add-Todo').addEventListener('click', (e => {
      this.createNewTask()
    }))


    document.getElementById('new-todo').addEventListener('keydown', (e) => {
      if (e.key == 'Enter') {
        this.createNewTask()

      }

    })


  }
}
