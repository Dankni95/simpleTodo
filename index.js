class Todo {
    constructor(title, toDoBody, tag, id) {
        this.title = title;
        this.toDoBody = toDoBody;
        this.tag = tag;
        this.id = id;

       }
       customize(){
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
            <button class="button delete has-addon is-black is-large"></button>
            </div>
            <div class="message-body">
              <span class="content is-small is-info">${this.toDoBody}</span>
              <br>
              <br>
              <br>
              <button class="button is-focused  ${this.customize()}">Update card</button>
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
            <button class="button delete has-addon is-black is-large"></button>
            </div>
            <div class="message-body">
              <span class="content is-small">${this.toDoBody}</span>
              <br>
              <br>
              <br>
              <button class="button is-focused  ${this.customize()}">Update card</button>
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

const createBtn = document.getElementById("toDoBtn");




createBtn.onclick = () => createTodos();



function createTodos() {
    const toDoBody = document.getElementById("toDosBody").value;
    const toDoTag = document.getElementById("toDosTag").value;
    const toDoTitle = document.getElementById("toDosTitle").value;
    const nodes = document.getElementById('toDos').childElementCount + 1;
    const primaryDiv = document.getElementById('toDos');

    let newTodo = new Todo(`${toDoTitle}`, `${toDoBody}`, `${toDoTag}`, `${nodes}`);
    newTodo.customize();
    primaryDiv.innerHTML += newTodo.outputTodo();

    let json = JSON.stringify(newTodo);
    console.log(json);


}

