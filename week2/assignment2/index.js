import { todos as initialTodos } from './todos.js';

const STORAGE_KEY = 'todos';
let todos = [];

const todoInput = document.getElementById('todo-input');
const prioritySelect = document.getElementById('priority-select');
const addBtn = document.getElementById('add-btn');
const todoBody = document.getElementById('todo-body');
const selectAll = document.getElementById('select-all');
const filterButtons = document.querySelectorAll('.filter-buttons button');
const priorityDropdown = document.querySelector('.priority-dropdown');
const priorityOptions = document.querySelectorAll('.priority-options div');

let currentFilter = 'all';
let currentPriority = null;

function loadTodos() {
    const stored = localStorage.getItem(STORAGE_KEY);
    todos = stored ? JSON.parse(stored) : initialTodos;
    if (!stored) saveTodos();
}
  
function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}
  
function render() {
    todoBody.innerHTML = '';
    let filtered = todos;
  
    if (currentFilter === 'completed') {
      filtered = todos.filter(t => t.completed);
    } else if (currentFilter === 'incomplete') {
      filtered = todos.filter(t => !t.completed);
    }
  
    if (currentPriority) {
      filtered = filtered.filter(t => t.priority === currentPriority);
    }
  
    filtered.forEach(todo => {
        const tr = document.createElement('tr');
        tr.draggable = true;
        tr.dataset.id = todo.id;
        if (todo.completed) tr.classList.add('completed');
  
        tr.innerHTML = `
            <td><input type="checkbox" ${todo.completed ? 'checked' : ''}></td>
            <td>${todo.priority}</td>
            <td>
                <i class="${todo.completed ? 'fas fa-check-circle' : 'far fa-times-circle'}"
                    style="color: ${todo.completed ? 'green' : 'red'};"></i>
            </td>
            <td class="title">${todo.title}</td>
        `;
  
        const checkbox = tr.querySelector('input[type="checkbox"]');
        if (checkbox) {
            checkbox.addEventListener('change', () => {
                todo.completed = !todo.completed;
                saveTodos();
                render();
            });
        }

        todoBody.appendChild(tr);
    });
  
    const checkboxes = todoBody.querySelectorAll('input[type="checkbox"]');
    const allChecked = checkboxes.length && [...checkboxes].every(cb => cb.checked);
    selectAll.checked = allChecked;
  
    enableDragAndDrop();
}
  
function enableDragAndDrop() {
    let dragged;
  
    todoBody.querySelectorAll('tr').forEach(row => {
      row.addEventListener('dragstart', () => {
        dragged = row;
        row.classList.add('dragging');
      });
  
      row.addEventListener('dragend', () => {
        dragged.classList.remove('dragging');
        dragged = null;
    
        const ids = [...todoBody.querySelectorAll('tr')].map(tr => +tr.dataset.id);
        todos.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
        saveTodos();
      });
  
      row.addEventListener('dragover', e => {
        e.preventDefault();
        const after = [...todoBody.children].find(child => {
          return e.clientY <= child.getBoundingClientRect().top + child.offsetHeight / 2;
        });
        if (after) todoBody.insertBefore(dragged, after);
        else todoBody.appendChild(dragged);
      });
    });
}
  
addBtn.addEventListener('click', () => {
    const title = todoInput.value.trim();
    const priority = parseInt(prioritySelect.value);
  
    if (!title || isNaN(priority)) {
      alert('할 일과 중요도를 모두 입력해주세요!');
      return;
    }
  
    todos.push({ id: Date.now(), title, completed: false, priority });
    saveTodos();
    render();
  
    todoInput.value = '';
    todoInput.placeholder = '할 일 입력';
    prioritySelect.value = '';
});
  
selectAll.addEventListener('change', () => {
    const checked = selectAll.checked;
    todos.forEach(t => t.completed = checked);
    saveTodos();
    render();
});
  
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.filter;
      render();
    });
});
  
priorityDropdown.querySelector('button').addEventListener('click', () => {
    priorityDropdown.classList.toggle('active');
});
  
priorityOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      currentPriority = parseInt(opt.dataset.priority);
      render();
      priorityDropdown.classList.remove('active');
    });
});

function getCheckedTodoIds() {
    return [...todoBody.querySelectorAll('tr')].filter(row =>
      row.querySelector('input[type="checkbox"]').checked
    ).map(row => parseInt(row.dataset.id));
}
  
document.getElementById('delete-btn').addEventListener('click', () => {
    const idsToDelete = getCheckedTodoIds();
    if (idsToDelete.length === 0) return alert("삭제할 항목을 선택하세요!");
  
    todos = todos.filter(todo => !idsToDelete.includes(todo.id));
    saveTodos();
    render();
});
  
document.getElementById('mark-done-btn').addEventListener('click', () => {
    const idsToMark = getCheckedTodoIds();
    if (idsToMark.length === 0) return alert("완료할 항목을 선택하세요!");
  
    const alreadyDone = todos.some(
      todo => idsToMark.includes(todo.id) && todo.completed
    );
  
    if (alreadyDone) {
      alert("이미 완료된 항목이 포함되어 있어 완료할 수 없습니다.");
      return;
    }
  
    todos = todos.map(todo =>
      idsToMark.includes(todo.id) ? { ...todo, completed: true } : todo
    );
    saveTodos();
    render();
});
  

loadTodos();
render();