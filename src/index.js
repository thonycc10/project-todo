import './styles.css';
import {TodoClass, TodoListClass} from "./class";
import {crearTodoHtml} from "./js/componentes";

export const todoList = new TodoListClass();
const tarea = new TodoClass('Aprender JS');

todoList.nuevoTodo(tarea);
console.log(todoList);

crearTodoHtml(tarea);
