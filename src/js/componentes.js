// referencia html
import {TodoClass} from "../class";
import {todoList} from "../index";

const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const buttonClear = document.querySelector('.clear-completed');
const ulFilter = document.querySelector('.filters');
const afiltro = document.querySelectorAll('.filtro');
const countPendientes = document.querySelector('.todo-count');

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
export const totalPendientes = () => {
    countPendientes.children[0].innerText = todoList.countPendientes();
}

txtInput.addEventListener('keyup', (event) => {
    // keycode -> te enseña el codigo de la tecla a presionar enter es 13
    // console.log({event})

    if (event.keyCode === 13 && event.target.value.length > 0) {
        const nuevoTodo = new TodoClass(event.target.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
        totalPendientes();
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
        totalPendientes();
    } else if (nombreElemento.includes('button')) {
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
        totalPendientes();
    }

});

buttonClear.addEventListener('click', (event) => {
    todoList.eliminarCompletado();
    // importante por si tienes que eliminar interno.. comenzar desde el ultimo
    for (let i = divTodoList.children.length-1; i >= 0; i--) {
        const elements = divTodoList.children[i];
        if (elements.classList.contains('completed')) {
            divTodoList.removeChild(elements);
            totalPendientes();
        }
    }
});

ulFilter.addEventListener('click', (event) => {
    const filtro = event.target.text;
    if (!filtro) return;
    afiltro.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');
    for (const element of divTodoList.children ) {
        element.classList.remove('hidden');
        const completado = element.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    element.classList.add('hidden');
                }
                break;
            case 'Completados':
                if (!completado) {
                    element.classList.add('hidden');
                }
                break;
        }
        totalPendientes();
    }
});
