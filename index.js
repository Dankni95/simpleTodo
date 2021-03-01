const createBtn = document.getElementById("toDoBtn");
const toDoTitle = document.getElementById("toDosTitle");
const toDoBody = document.getElementById("toDosBody");
const toDoTag = document.getElementById("toDosTag");
const primaryDiv = document.getElementById('toDos');
const titleAlert = document.getElementById("tooLongStringAlert");




class Todo {
  constructor(title, toDoBody, tag, id) {
    this.title = title;
    this.toDoBody = toDoBody;
    this.tag = tag;
    this.id = id;
    //  this.addEventListener("click",this.removeObject);


  }

  customize() {
    switch (this.tag) {
      case "Ideas":
        return `is-dark`;
      case "Design":
        return `is-primary`;
      case "Development":
        return `is-info`;
      case "Deployment":
        return `is-success`;
      default:
        return console.log("Something went wrong @customize function " + this.tag);
    }
  }
  outputTodo() {
    if (this.id % 2 == 0) {
      return `
      <div id="toDos${this.id}" class="columns is-vcentered">
      <div class="column">
      <p class="notification has-text-centered ${this.customize()}" style="padding: 55px;">Progress bar
      <br>
          <br>
          <progress class="progress is-large is-danger" max="100">30%</progress>
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
            <span class="content is-small is-info">${this.toDoBody}</span>
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
            <span class="content is-small">${this.toDoBody}</span>
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
            <progress style="width: 100%;" class="progress is-link is-large" value="30" max="100">50%</progress>
            </p>
            </div>
            </div>
            </div> 
            </div>
            `
    }
  }
}

createBtn.onclick = limitLengthEmptyTitle;


function limitLengthEmptyTitle() {
  if (toDoTitle.value.length > 45 || toDoTitle.value.length == 0) {
    toDoTitle.className = `input is-danger`;
    titleAlert.className = `help is-danger`;
    titleAlert.innerHTML = "Title cannot be too long or empty";
  } else {
    toDoTitle.className = `input is-primary`;
    titleAlert.className = `help is-hidden`;

    output();
    toDoTitle.value = null;

  }
}



function output() {
  const nodes = primaryDiv.childElementCount + 1;
  let newTodo = new Todo(`${toDoTitle.value}`, `${toDoBody.value}`, `${toDoTag.value}`, `${nodes}`);

  newTodo.customize();
  primaryDiv.innerHTML += newTodo.outputTodo();

  let json = JSON.stringify(newTodo);
  console.log(json);


}



document.addEventListener('click', function (e) {
  let buttonIds = primaryDiv.getElementsByTagName('button');
  for (let i = 0; i < buttonIds.length; i++) {
    if (e.target.id == buttonIds[i].id) {
      let lol = buttonIds[i].id;
      // Since buttonID is the same as ToDoID, slice to for selection
      let childrenDivRemove = document.querySelector(`#toDos${lol.slice(lol.length - 1)}`);
      // To DO:
      // Add validiontion for deletion
      childrenDivRemove.remove();
      }
  }
});

