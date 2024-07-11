
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
  import { getDatabase, ref, push, set, onValue, remove, update } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDcSt_ZCpKZFhQT2jYQG4OyG8nGy4EAo0Y",
    authDomain: "to-do-list-543d4.firebaseapp.com",
    databaseURL: "https://to-do-list-543d4-default-rtdb.firebaseio.com",
    projectId: "to-do-list-543d4",
    storageBucket: "to-do-list-543d4.appspot.com",
    messagingSenderId: "544296981555",
    appId: "1:544296981555:web:d6528e9d122d2a83daff46",
    measurementId: "G-5DEDKZLKPL"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getDatabase(app);


// Add a new todo
const todoAppCreate = document.querySelector("#todo-app-create");
todoAppCreate.addEventListener('submit', (event) => {
    event.preventDefault();
    const content = event.target.elements.content.value;
    if(content){
        const todoListRef = ref(db, 'todo-list');
        const newTodoRef = push(todoListRef);

        set(newTodoRef, {
            content: content,
            conpleted: false
        });
    }
    event.target.elements.content.value = '';
});

// Delete a todo
const deleteToDo = () =>{
    const listButtonDelete = document.querySelectorAll('[button-delete]');
    if(listButtonDelete.length > 0){
        listButtonDelete.forEach(button => {
            button.addEventListener("click", () => {
                const key = button.getAttribute('button-delete');
                const todoRef = ref(db, 'todo-list/' + key);
                remove(todoRef);
            
            })
    })
}
}

// Complete a todo
const completeToDo = () =>{
    const listButtonComplete = document.querySelectorAll('[button-complete]');
    if(listButtonComplete.length > 0){
        listButtonComplete.forEach(button => {
            button.addEventListener("click", () => {
                const key = button.getAttribute('button-complete');
                const todoRef = ref(db, 'todo-list/' + key);
                update(todoRef, {
                    completed: true
                })
            
            })
    })
}
}

// Edit a todo

const editToDo = () =>{
    const listButtonEdit = document.querySelectorAll('[button-edit]');
    if(listButtonEdit.length > 0){
        listButtonEdit.forEach(button => {
            button.addEventListener("click", () => {
                const key = button.getAttribute('button-edit'); 
                const dataContent = button.getAttribute("data-content");
                const  newContent = prompt("Enter new content",  dataContent);

                if(newContent){
                    const todoRef = ref(db, 'todo-list/' + key);
                    update(todoRef, {
                        content: newContent
                    });
                    }
            
            })
    })
}
}


// Get list todo

onValue(ref(db, 'todo-list'), (list) => {
    let htmls = "";

    list.forEach(item => {
        const key = item.key;
        const data = item.val();

        htmls += `
        <div class="todo-app__item ${data.completed ? 'todo-app__item--completed' : ''}">
            <span class="todo-app__item-content">${data.content}</span>
            <div class="todo-app__item-actions">
            <button button-edit="${key}" data-content="${data.content}" class="todo-app__item-button todo-app__item-button--edit">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button button-complete="${key}" class="todo-app__item-button todo-app__item-button--complete">
                <i class="fa-solid fa-check"></i>
            </button>
            <button button-delete="${key}" class="todo-app__item-button todo-app__item-button--delete">
                <i class="fa-solid fa-trash"></i>
            </button>
            </div>
        </div>
        `;
    })
    const todoAppList = document.querySelector("#todo-app-list");
    todoAppList.innerHTML = htmls;
    deleteToDo();
    completeToDo();
    editToDo();
});
