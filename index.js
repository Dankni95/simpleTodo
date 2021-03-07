const createBtn = document.getElementById("toDoBtn");
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
const updateToDo = document.getElementById("update-modal");
const updateModalClose = document.getElementById("update-close");
const updateModalCancel = document.getElementById("update-cancel");




class Todo {
  constructor(title, body, tag, id) {
    this.title = title;
    this.body = body;
    this.tag = tag;
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
        return console.log("Something went wrong @customize function " + this.tag);
    }
  }
  outputTodo() {
    if (this.id % 2 === 0) {
      return `
      <div id="toDos${this.id}" class="columns is-vcentered">
      <div class="column">
      <p class="notification has-text-centered ${this.customize()}" style="padding: 55px;">Progress bar
      <br>
          <br>
          <progress class="progress is-large is-danger" max="100"></progress>
          </p>

          </div>
          <div class="column is-two-thirds">
          <article class="message ${this.customize()} is-large">
          <div class="message-header is-size-4">
            <span class="tag is-dark is-rouded">${this.tag}</span>
            ${this.title}
            <button id="deleteBtn${this.id}" class="button delete has-addon is-black is-large"></button>
            </div>
            <div class="message-body">
            <span class="content is-small is-info">${this.body}</span>
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
          <span class="tag is-dark is-rouded">${this.tag}</span>
          ${this.title}
          <button id="deleteBtn${this.id}" class="button delete has-addon is-black is-large"></button>
            </div>
            <div class="message-body">
            <span class="content is-small">${this.body}</span>
              <br>
              <br>
              <br>
              <button id="updateBtn${this.id}" class="button is-focused  ${this.customize()}">Update card</button>
              </div>              
              </div>
              
              <div class="column">
              <div class="column">
          <p class="notification has-text-centered ${this.customize()}" style="padding: 54px; width: 105%; right: 3%">Progress bar
          <br>
          <br>
            <progress style="width: 100%;" class="progress is-link is-large" value="" max="100"></progress>
            </p>
            </div>
            </div>
            </div> 
            </div>
            `
    }
  }
}


function sortLocalStorageIdsAfterDeletion() {

  // getting all localStorage keys
  var values = []
  keys = Object.keys(localStorage);

  //getting from local then pushing into array
  for (let i = 0; i <= keys.length; i++) {
    let localItem = localStorage.getItem(keys[i]);
    if (!localItem) continue;
    console.log(values.push(localItem));

  }
  console.log(values);
  //Sorting after ids
  values.sort(function (a, b) {

    return a.slice(-3)[0] - b.slice(-3)[0];
  });
  let numCallbackRuns = 1;

  localStorage.clear() // WELP, 1h lost for not understanding why there was duplicate entries.. 
  //did not clear localStorage before rebuilding :/

  // then parsing to obj and filling missing ids
  values.forEach(function (element) {
    let parsedElem = JSON.parse(element);
    parsedElem.id = numCallbackRuns;
    // then adding sorted and filled objects back to localStorage.. crossing fingers that this works
    console.log(parsedElem);
    let toDoFromLocal = new Todo(`${parsedElem.title}`, `${parsedElem.body}`, `${parsedElem.tag}`, `${parsedElem.id}`);
    console.log(toDoFromLocal);
    addToLocalStorage(toDoFromLocal);
    outputFromLocalStorage(toDoFromLocal);
    numCallbackRuns++;

  });
}


window.onload = sortLocalStorageIdsAfterDeletion();



function limitLengthEmptyTitle() {
  if (toDoTitle.value.length > 45 || toDoTitle.value.length === 0) {
    toDoTitle.className = `input is-danger`;
    titleAlert.className = `help is-danger`;
    titleAlert.innerText = "Title cannot be too long or empty";
  } else {
    toDoTitle.className = `input is-primary`;
    titleAlert.className = `help is-hidden`;

    // add task created alert box top :) // Done
    createSuccessMessage(false);
    output();
  }
}




function createSuccessMessage(deleteOrCreate) {

  // add get deleted object
  if (deleteOrCreate) {
    successText.innerHTML = `You just deleted <strong>a task</strong> with tag <span class="tag is-dark is-rouded">${toDoTag.value}</span><button class="button is-primary is-loading"></button> `;
    createSuccess.className = "navbar is-fixed-bottom";

    setTimeout(() => { createSuccess.className = "navbar is-fixed-bottom is-hidden"; }, 1500);
  } else if (!deleteOrCreate) {
    successText.innerHTML = `You just added <strong>new task</strong> <code>" ${toDoTitle.value} "</code> with tag <span class="tag is-dark is-rouded">${toDoTag.value}</span><button class="button is-primary is-loading"></button> `;
    createSuccess.className = "navbar is-fixed-bottom";
    setTimeout(() => { location.reload(); }, 1500);



  }
}

// creating new to do OBJ. This is directly from the form user fills in.
function toDoObj() {

  // Added + 1 for ID, creates new ID
  let newTodo = new Todo(`${toDoTitle.value}`, `${toDoBody.value}`, `${toDoTag.value}`, `${primaryDiv.childElementCount + 1}`);
  return newTodo;

}
// outputting from localStorage
function outputFromLocalStorage(toDoFromLocal) {

  toDoFromLocal.customize();
  primaryDiv.innerHTML += toDoFromLocal.outputTodo();

}
// outputting and changing colors for tags   !from localStorage
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
  sortLocalStorageIdsAfterDeletion();

  console.log("Key to delete: ", keyToDelete);
  localStorage.removeItem(`${keyToDelete}`);

  //Need to sort ids after one is deleted
  createSuccessMessage(true);
  clearDivForRebuilding();  // clearing divs after deletion for rebuilding, no need to reload page.
  sortLocalStorageIdsAfterDeletion();
}
function clearDivForRebuilding() {
  primaryDiv.innerHTML = "";
}


document.addEventListener('click', function (e) {
  let buttonIds = primaryDiv.getElementsByTagName('button');
  for (let i = 0; i < buttonIds.length; i++) {
    if (e.target.id === buttonIds[i].id) {
      let clickedButtonId = buttonIds[i].id;
      var checkIfUpdateButton = clickedButtonId.charAt(0);


      //jeesus IFCEPTION!!
      //This if check if the button clicked starts with u, for updateBtn id. Then unhide update modal!
      if (checkIfUpdateButton === "u") {
        updateToDo.className ="modal is-active";
        updateModalCancel.onclick = () => updateToDo.className ="modal is-hidden";
        updateModalClose.onclick = () => updateToDo.className ="modal is-hidden";
      }else{

        
        // Since buttonID full name is example:"deleteBtn1", slice to integer for selection
        let sliceDownToInteger = clickedButtonId.slice(clickedButtonId.length - 1);
        let childrenDivRemove = document.querySelector(`#toDos${sliceDownToInteger}`);
        // To DO:
        // Add validiontion for deletion // Done
  
        //Making confirmation modal visible
        deleteDiv.className = "modal is-active";
        deleteConfirmed.onclick = () => deleteNow(true); 
        deleteCancelled.onclick = () => deleteNow(false); 
  
        function deleteNow(deleteOrCancel) {
          if (deleteOrCancel) {
            //delete
            deleteFromLocalStorage(sliceDownToInteger)
            childrenDivRemove.remove();
            deleteDiv.className = "modal is-hidden";
          }else{
            //Cancel
            deleteDiv.className = "modal is-hidden";
          }
        }

      }

    }
  }
});


createBtn.onclick = limitLengthEmptyTitle;

