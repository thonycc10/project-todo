// referencia html
import {TodoClass} from "../class";
import {todoList} from "../index";

const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');


export const crearTodoHtml = (todo) => {
    const htmlTodo = `
        <li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
                <div class="view">
                    <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''} >
                    <label>${todo.tarea}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">
            </li> 
    `;

    const div = document.createElement('div')
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}

txtInput.addEventListener('keyup', (event) => {
    // keycode -> te enseña el codigo de la tecla a presionar enter es 13
    // console.log({event})

    if (event.keyCode === 13 && event.target.value.length > 0) {
        const nuevoTodo = new TodoClass(event.target.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
        console.log({todoList})
    }
});

divTodoList.addEventListener('click', (event) => {
    // console.log(event.target.localName); // saber donde se hace click
    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    console.log(todoElemento);
    const todoId = todoElemento.getAttribute('data-id');

    if (nombreElemento.includes('input')) {
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    }

    console.log(todoList);
});
