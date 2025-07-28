const toDoDeleteButton = document.getElementsByClassName('to-do-delete');
const toDoCheck = document.getElementsByClassName('to-do-checkbox');
const toDoParagraph = document.getElementsByClassName('to-do-item-p');
const toDoItemContainer = document.querySelector('.to-do-items-div');
const toDoSearchBar = document.querySelector('.to-do-search-bar');
const toDoAddButton = document.querySelector('.to-do-add-button');
const toDoRemaining = document.querySelector('.to-do-remaining');
const toDoQuoteElem = document.querySelector('.to-do-quote');

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
            id: toDoId,
            checked: false
        })

        renderToDos();
        saveLocalStorage();
    });
}

function renderToDos() {
    toDoItemContainer.innerHTML = '';
    toDos.forEach((toDo) => {
        toDoItemContainer.innerHTML += `<div class="to-do-item">
        <input class="to-do-checkbox" type="checkbox" data-id="${toDo.id}">
        <p class="to-do-item-p" data-id="${toDo.id}">${toDo.text}</p>
        <button class="to-do-delete" data-id="${toDo.id}"><span class="material-symbols-outlined">
            close
          </span></button>
      </div>`;
    });
    deleteToDo();
    toDoCheckBoxToggle();
    renderRemainingToDos();
}

function toDoCheckBoxToggle() {
    for (let i = 0; i < toDoCheck.length; i++) {
        toDoCheck[i].addEventListener('click', () => {
            const checkID = toDoCheck[i].dataset.id;
            const checkObj = (toDos.filter(toDo => toDo.id === checkID))[0];
            if (checkObj.checked)
                checkObj.checked = false;
            else if (!checkObj.checked)
                checkObj.checked = true;

            toDoParagraphGetter(checkID, checkObj);
            renderRemainingToDos();
        })
    }
}

function toDoParagraphGetter(id, obj) {
    for (let i = 0; i < toDoParagraph.length; i++) {
        const paraID = toDoParagraph[i].dataset.id;
        if (paraID === id && obj.checked) {
            toDoParagraph[i].style.textDecoration = 'line-through';
            toDoParagraph[i].style.color = 'rgb(150, 150, 150)';
        }
        else {
            toDoParagraph[i].style.textDecoration = 'none';
            toDoParagraph[i].style.color = 'rgb(50, 50, 50)';
        }
    }
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

function renderRemainingToDos() {
    const toDosRemaining = toDos.filter(toDo => toDo.checked === false);
    console.log(toDosRemaining);
    toDoRemaining.innerHTML = `
    <p class="to-do-remaining-p">Your remaining todos: ${toDosRemaining.length}</p>`

}

function saveLocalStorage() {
    localStorage.setItem('to-do-list', JSON.stringify(toDos));
}

async function toDoQuoteAPI() {
    const url = 'https://api.api-ninjas.com/v1/quotes';
    try {
        const response = await fetch(url, {
            method: 'GET',
            withCredentials: 'true',
            headers: {
                "x-api-key": "bK4dOX76i5e19FYu3+a24Q==Xg8QeFrrmQuEovGi",
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Response status :${response.status}`)
        }

        const json = await response.json();
        // console.log(json[0]);
        console.log(json[0])
        toDoQuoteElem.innerHTML = `<p class="to-do-quote-p">${json[0].quote}</p>
                                    <p class = "to-do-author-p">-${json[0].author}</p>`;
    }
    catch (error) {
        console.log(error.message)
    }
}

// toDoQuote();
toDoQuoteAPI();
renderToDos();
addToDo();
