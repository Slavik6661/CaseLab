import { getUserTodos } from "./api.js";
import { globalState } from "./globalState.js";
export default class todoList {
  constructor() {
    this.task = document.querySelector("#todo-list");
  }

  fetchDataTodos() {
    let userID=globalState.get('userId')
    console.log(globalState);
    getUserTodos(userID).then((jsonUserTodos)=>{
      console.log(jsonUserTodos);
      this.renderTodoList(jsonUserTodos) 
      console.log('render');
    })
   
  }
  createDivContentToDo(id){
    let divContentTodo=document.createElement('div')
    divContentTodo.id=id
    divContentTodo.classList.add('todo-item')
    return divContentTodo;
  }

  createInputElement(id){
    let input=document.createElement('input')
    input.type="checkbox" 
    input.id=id
    input.classList.add('todo-checkbox"')
    return input;
  }
  createLabelElement(id,element,userId){
    let span=document.createElement('span') 
    span.textContent = userId+' '+element
    span.setAttribute('for',id)
    span.classList.add('todo-text')
    return span;
  }

  createButtonElement(id){
    let deleteBtn=document.createElement('button')
    deleteBtn.id=id
    deleteBtn.classList.add("todo-deleteBtn");
    return deleteBtn;
  }
  clearDivToDo(){
    const divToClear = document.querySelector("#todo-list");
    divToClear.innerHTML = ''
  }
  renderTodoList(jsonUserTodos){
    this.clearDivToDo()
    jsonUserTodos.forEach((element,id) => {
      const div = this.createDivContentToDo(id); // Создает div
      const input = this.createInputElement(id); // Создает input
      const span = this.createLabelElement(id,element.title,element.userId); // Создает label
      const button = this.createButtonElement(id); // Создает button
  
      div.appendChild(input); // Добавляет input в div
      div.appendChild(span); // Добавляет label в div
      div.appendChild(button); // Добавляет button в div
  
      this.task.appendChild(div); // Добавляет div в this.task
    });
    
  }
}
