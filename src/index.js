import './styles.css';
import {TodoClass, TodoListClass} from "./class";
import {crearTodoHtml} from "./js/componentes";

export const todoList = new TodoListClass();
// todoList.todos.forEach( todo => crearTodoHtml(todo)); o hacer el otro son iguales
todoList.todos.forEach( crearTodoHtml );
console.log(todoList.todos);
// const tarea = new TodoClass('Aprender JS');
//
// todoList.nuevoTodo(tarea);
// console.log(todoList);
//
// crearTodoHtml(tarea);

// localStorage.setItem('mi-key', 'ABC123');
// sessionStorage.setItem('mi-key', 'ABC1234');
