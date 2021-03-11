const createBtn = document.getElementById("toDoBtn");
const toDoForm = document.getElementById("task-form");
const toDoTitle = document.getElementById("toDosTitle");
const toDoBody = document.getElementById("toDosBody");
const toDoTag = document.getElementById("toDosTag");
const primaryDiv = document.getElementById('toDos');
const titleAlert = document.getElementById("tooLongStringAlert");
const createSuccess = document.getElementById("create-success");
const successText = document.getElementById("success-text");
const deleteDiv = document.getElementById("delete-div");
const deleteConfirmed = document.getElementById("delete-confirm");
const deleteCancelled = document.getElementById("delete-cancel");
const updateModalDiv = document.getElementById("update-modal");
const updateModalTitle = document.getElementById("update-modal-title");
const updateModalBody = document.getElementById("update-modal-body");
const updateModalClose = document.getElementById("update-close");
const updateModalTag = document.getElementById("update-modal-tag");
const updateModalCancel = document.getElementById("update-cancel");
const updateModalSave = document.getElementById("update-modal-save");
const updateModalEditTitle = document.getElementById("update-modal-edit-btn");
const updateModalProgressBar = document.getElementById("progress-bar");
const navChildren = document.getElementById("nav-children");






class Todo {
  constructor(title, body, tag, bar, id) {
    this.title = title;
    this.body = body;
    this.tag = tag;
    this.bar = bar;
    this.id = id;
  }

  customize() {
    switch (this.tag) {
      case "Ideas":
        return `is-info`;
      case "Design":
        return `is-primary`;
      case "Development":
        return `is-danger`;
      case "Deployment":
        return `is-success`;
      default:
        console.log("Something went wrong @customize function " + this.tag);
    }
  }

  outputTodo() {
    //im aware of html injections ://
    if (this.id % 2 === 0) {
      return `
      <div id="toDos${this.id}" class="columns is-vcentered">
      <div class="column">
      <p class="notification has-text-centered ${this.customize()}" style="padding: 55px;">Progress bar:<code id="taskProg${this.id}" class="is-hidden has-text-primary">Completed</code>

      <br>
          <br>
          <progress id="progBar${this.id}" class="progress is-large is-dark" value="${this.bar}" max="100"></progress>
          </p>

          </div>
          <div class="column is-two-thirds">
          <article class="message ${this.customize()} is-large">
          <div class="message-header is-size-4">
          <span id="toDosTag${this.id}" class="tag is-dark is-rouded">${this.tag}</span>
          <p id="toDosTitle${this.id}">${this.title}</p>
            <button id="deleteBtn${this.id}" class="button delete has-addon is-black is-large"></button>
            </div>
            <div class="message-body">
            <span id="toDosBody${this.id}" class="content is-small is-info">${this.body}</span>
            <br>
            <br>
            <br>
            <button id="updateBtn${this.id}" class="button is-focused  ${this.customize()}">Update card</button>
            </div>              
            </div>
            </div>
            `;
    } else {
      return `
      <div id="toDos${this.id}" class="columns is-vcentered">
      <div class="column is-two-thirds">
      <article class="message ${this.customize()} is-large">
          <div class="message-header is-size-4">
          <span id="toDosTag${this.id}" class="tag is-dark is-rouded">${this.tag}</span>
         <p id="toDosTitle${this.id}"> ${this.title}</p>
          <button id="deleteBtn${this.id}" class="button delete has-addon is-black is-large"></button>
            </div>
            <div class="message-body">
            <span id="toDosBody${this.id}" class="content is-small">${this.body}</span>
              <br>
              <br>
              <br>
              <button id="updateBtn${this.id}" class="button is-focused  ${this.customize()}">Update card</button>
              </div>              
              </div>
              
              <div class="column">
              <div class="column">
          <p class="notification has-text-centered ${this.customize()}" style="padding: 54px; width: 105%; right: 3%">Progress bar:
          <code id="taskProg${this.id}" class="is-hidden has-text-primary">Completed</code>
          <br>
          <br>
            <progress id="progBar${this.id}" style="width: 100%;" class="progress is-dark is-large" value="${this.bar}" max="100"></progress>
            </p>
            </div>
            </div>
            </div> 
            </div>
            `
    }
  }
}

window.onload = sortLocalStorageIdsAfterDeletion();

function sortLocalStorageIdsAfterDeletion() {

  // getting all localStorage keys
  var values = []
  keys = Object.keys(localStorage);

  //getting from local then pushing into array
  for (let i = 0; i <= keys.length; i++) {
    let localItem = localStorage.getItem(keys[i]);
    if (!localItem) continue;
    values.push(localItem);

  }
  //Sorting ids ascending??
  values.sort(function (a, b) {

    return a.slice(-3)[0] - b.slice(-3)[0]; // added more class variables(Progress bar).. this broke, thankfully it was quick find in contrast to the one under
  });

  let numCallbackRuns = 1;
  localStorage.clear(); // WELP, 1h lost for not understanding why there was duplicate entries.. 
  //did not clear localStorage before rebuilding :/

  if (values.length === 0) {
    primaryDiv.innerHTML = `<h1 class="title has-text-centered">You have no task created, please create <code id="new-task" onclick="navFunctionality(this)">New Task</code></h1>`;
  }


  // then parsing to obj and filling missing ids
  values.forEach(function (element) {
    let parsedElem = JSON.parse(element);
    parsedElem.id = numCallbackRuns;

    // then adding sorted and filled objects back to localStorage.. crossing fingers that this works 
    let toDoFromLocal = new Todo(`${parsedElem.title}`, `${parsedElem.body}`, `${parsedElem.tag}`, `${parsedElem.bar}`, `${parsedElem.id}`);

    addToLocalStorage(toDoFromLocal);
    outputFromLocalStorage(toDoFromLocal);

    // adding completed text if task progress reach 100%
    if (parsedElem.bar === "100") {
      let completedToDo = document.getElementById(`taskProg${parsedElem.id}`);
      completedToDo.className = "has-text-primary";
    }

    numCallbackRuns++;
  });
}

// Checks if task input title is empty or too long

function limitLengthEmptyTitle() {
  if (toDoTitle.value.length > 45 || toDoTitle.value.length === 0) {
    toDoTitle.className = `input is-danger`;
    titleAlert.className = `help is-danger`;
    titleAlert.innerText = "Title cannot be too long or empty";
    toDoTitle.parentElement.children[1].childNodes[1].className = "fa fa-times-circle";
  } else {
    toDoTitle.className = `input is-primary`;
    titleAlert.className = `help is-hidden`;

    // add task created alert box top :) // Done
    createSuccessMessage("create");
    output();
  }
}




function createSuccessMessage(mode) {

  // add get deleted object ---fix
  if (mode === "delete") {
    successText.className = "has-text-danger";
    successText.innerHTML = `You just <strong> deleted </strong> a task </strong><button class="button is-primary is-loading"></button> `;
    createSuccess.className = "navbar is-fixed-bottom";

    //sets time before Message is hidden
    setTimeout(() => { createSuccess.className = "navbar is-fixed-bottom is-hidden"; }, 1500);

  } else if (mode === "create") {
    successText.className = "has-text-info";
    successText.innerHTML = `You just added <strong>new task</strong> <code>" ${toDoTitle.value} "</code> with tag <span class="tag is-dark is-rouded">${toDoTag.value}</span><button class="button is-primary is-loading"></button> `;
    createSuccess.className = "navbar is-fixed-bottom";
    setTimeout(() => { location.reload(); }, 1500);
  } else if (mode === "update") {
    successText.className = "has-text-info";
    successText.innerHTML = `You just <strong> updated </strong> a task </strong><button class="button is-primary is-loading"></button> `;
    createSuccess.className = "navbar is-fixed-bottom";
    setTimeout(() => { location.reload(); }, 1500);
  } else {

    // fires when buttons/actions are under construction

    successText.className = "has-text-danger";
    successText.innerHTML = `Something went wrong or action is still <strong> under construction </strong><button class="button is-primary is-loading"></button> `;
    createSuccess.className = "navbar is-fixed-bottom";
    setTimeout(() => { createSuccess.className = "navbar is-fixed-bottom is-hidden"; }, 2000);

  }
}

// creating new to do OBJ. This is directly from the form user fills in.
function toDoObj() {

  // Added + 1 for ID, creates new ID
  let newTodo = new Todo(`${toDoTitle.value}`, `${toDoBody.value}`, `${toDoTag.value}`, `${0}`, `${primaryDiv.childElementCount + 1}`);
  return newTodo;

}
// outputting from localStorage
function outputFromLocalStorage(toDoFromLocal) {

  primaryDiv.innerHTML += toDoFromLocal.outputTodo();

}
// outputting and changing colors for tags.
function output() {

  toDoObj().customize();
  primaryDiv.innerHTML += toDoObj().outputTodo();
  addToLocalStorage(toDoObj());


}

//Adding to localStorage after creation

function addToLocalStorage(newEntry) {

  let objString = JSON.stringify(newEntry);
  localStorage.setItem(`${newEntry.id}`, objString);

}

function deleteFromLocalStorage(keyToDelete) {
  localStorage.removeItem(`${keyToDelete}`);

  //Need to sort ids after one is deleted
  createSuccessMessage("delete");
  clearOutputForRebuilding();  // clearing divs after deletion for rebuilding, no need to reload page.
  sortLocalStorageIdsAfterDeletion();
}
function clearOutputForRebuilding() {
  primaryDiv.innerHTML = "";
}


document.addEventListener('click', function (e) {
  let buttonIds = primaryDiv.getElementsByTagName('button');
  for (let i = 0; i < buttonIds.length; i++) {
    if (e.target.id === buttonIds[i].id) {
      let clickedButtonId = buttonIds[i].id;
      let checkIfUpdateButton = clickedButtonId.charAt(0);


      //jeesus IFCEPTION!!
      //This if check if the button clicked starts with u, for updateBtn id. Then unhide update modal!
      if (checkIfUpdateButton === "u") {
        showUpdateModal(clickedButtonId);
      } else {
        // Since buttonID full name is example:"deleteBtn1", slice to integer for selection
        let sliceDownToInteger = clickedButtonId.slice(clickedButtonId.length - 1);
        let childrenDivRemove = document.querySelector(`#toDos${sliceDownToInteger}`);


        // To DO:
        // Add validiontion for deletion // Done

        //Making confirmation modal visible
        deleteDiv.className = "modal is-active";
        deleteConfirmed.onclick = () => deleteNow(true);
        deleteCancelled.onclick = () => deleteNow(false);

        function deleteNow(mode) {
          if (mode === true) {
            //delete
            deleteFromLocalStorage(sliceDownToInteger)
            childrenDivRemove.remove();
            deleteDiv.className = "modal is-hidden";
          } else if (mode === false) {
            //Cancel
            deleteDiv.className = "modal is-hidden";
          }
        }
      }
    }
  }
});

function showUpdateModal(clickedButtonId) {
  updateModalDiv.className = "modal is-active";

  let selectedDivID = clickedButtonId.slice(clickedButtonId.length - 1);
  let toDosTitle = document.getElementById(`toDosTitle${selectedDivID}`).innerText;
  let toDosBody = document.getElementById(`toDosBody${selectedDivID}`).innerText;
  let toDosTag = document.getElementById(`toDosTag${selectedDivID}`).innerText;
  let toDosBar = document.getElementById(`progBar${selectedDivID}`).value;

  updateModalBody.value = `${toDosBody}`;
  updateModalTitle.value = `${toDosTitle}`;
  updateModalTag.innerText = `${toDosTag}`;
  updateModalProgressBar.value = `${toDosBar}`

  updateModalSave.onclick = () => updateToDos();

  function updateToDos() {

    let updatedToDo = new Todo(`${updateModalTitle.value}`, `${updateModalBody.value}`, `${updateModalTag.innerText}`, `${updateModalProgressBar.value}`, `${selectedDivID}`);

    addToLocalStorage(updatedToDo);
    createSuccessMessage("update");

  }
}



// button elem is from html onclick <-- i have so many getElemByID now that im getting experimental for selecting elems lol
function navFunctionality(buttonElem) {

  // Resetting bulma-style every time function gets called
  let allLiElementsReset = navChildren.querySelectorAll("li");
  for (let i = 0; i < allLiElementsReset.length; i++) {
    allLiElementsReset[i].className = "";
  }
  toDoForm.className = "container is-max-desktop is-hidden";

  //Should probably use switch-case for this... redo later?

  if (buttonElem.id === "new-task") {
    buttonElem.parentNode.className = "is-active";
    toDoForm.className = "container is-max-desktop is-active"; // toggle form visible
  } else if (buttonElem.id === "overview") {
    buttonElem.parentNode.className = "is-active";

  } else if (buttonElem.id === "sort-tag") {
    buttonElem.parentNode.className = "is-active";
    createSuccessMessage("under construction");

  } else if (buttonElem.id === "search") {
    buttonElem.parentNode.className = "is-active";
    createSuccessMessage("under construction");

  } else {
    console.log("Something went wrong at: ", this);
  }


}

createBtn.onclick = limitLengthEmptyTitle;
updateModalCancel.onclick = () => updateModalDiv.className = "modal is-hidden";
updateModalClose.onclick = () => updateModalDiv.className = "modal is-hidden";
updateModalEditTitle.onclick = () => updateModalTitle.focus();