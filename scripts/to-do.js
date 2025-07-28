const toDoDeleteButton = document.getElementsByClassName('to-do-delete');
const toDoItemContainer = document.querySelector('.to-do-items-div');
const toDoSearchBar = document.querySelector('.to-do-search-bar');
const toDoAddButton = document.querySelector('.to-do-add-button');
const toDoRemaining = document.querySelector('.to-do-remaining');

let toDos = JSON.parse(localStorage.getItem('to-do-list')) || [];

function generateToDoId(length) {
    const availableChars = '1234567890abcdefhijklmnopqrstuv';
    let generatedToDoId = '';
    for (var i = 0; i < length; ++i) {
        generatedToDoId += availableChars.charAt(Math.floor(Math.random() * availableChars.length));
    }
    return generatedToDoId;
}

function addToDo() {
    toDoAddButton.addEventListener('click', () => {
        const toDoSearchInput = toDoSearchBar.value;
        if (!toDoSearchInput) return;
        const toDoId = generateToDoId(12);
        toDoSearchBar.value = '';
        toDos.push({
            text: toDoSearchInput,
            id: toDoId
        })

        renderToDos();
        saveLocalStorage();
    });
}

function renderToDos() {
    toDoItemContainer.innerHTML = '';
    toDos.forEach((toDo) => {
        toDoItemContainer.innerHTML += `<div class="to-do-item">
        <input class="to-do-checkbox" type="checkbox">
        <p class="to-do-item-p">${toDo.text}</p>
        <button class="to-do-delete" data-id="${toDo.id}"><span class="material-symbols-outlined">
            close
          </span></button>
      </div>`;
    });
    renderRemainingToDos();
    deleteToDo();
}

function renderRemainingToDos() {
    toDoRemaining.innerHTML = `
    <p class="to-do-remaining-p">Your remaining todos: ${toDos.length}</p>`

}

function deleteToDo() {
    for (let i = 0; i < toDoDeleteButton.length; i++) {
        toDoDeleteButton[i].addEventListener('click', () => {
            const toDoDeleteID = toDoDeleteButton[i].dataset.id;
            console.log('delete fired', toDos, toDoDeleteID);
            toDos = toDos.filter(toDo => toDo.id !== toDoDeleteID);
            renderToDos();
            saveLocalStorage();
        })
    }
}

function saveLocalStorage() {
    localStorage.setItem('to-do-list', JSON.stringify(toDos));
}
renderToDos();
addToDo();
