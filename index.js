// let input = document.querySelector("input");
// let submitBtn = document.querySelector(".btn");
// let form = document.querySelector(".form");
// let listItems = document.querySelector("ol");
// let listContainer = document.querySelector(".container-list");
// let imageRefresh = document.createElement("img");
// imageRefresh.src =
//   "https://i.fbcd.co/products/original/27e1bd4903a0e30e8e1c9daaf21b780704be85f408a163876c439dd6459f6384.jpg";
// imageRefresh.classList.add("refresh-btn");
// listContainer.append(imageRefresh);

// form.addEventListener("submit", (event) => {
//   event.preventDefault();

//   if (input.value == "") {
//     input.style.borderColor = "red";
//   } else {
//     let listItem = document.createElement("li");
//     let imgElement = document.createElement("img");
//     imgElement.classList.add("img-delete");
//     imgElement.src =
//       "https://w7.pngwing.com/pngs/29/45/png-transparent-delete-key-logo-button-text-rectangle-logo.png";

//     listItem.classList.add("list-item");
//     listItem.innerText = input.value;
//     listItem.append(imgElement);
//     listItems.append(listItem);

//     form.reset();
//   }
// });

// listItems.addEventListener("click", (event) => {
//   let currentItem = event.target;
//   if (currentItem.tagName == "LI") {
//     currentItem.classList.toggle("line");
//   } else if (currentItem.classList.contains("img-delete")) {
//     currentItem.parentNode.remove();
//   } else if (currentItem.classList.contains("refresh-btn")) {
//     listItems.innerHTML = "";
//     localStorage.removeItem("tasks");
//   }

//   // currentItem.classList.add("line");
//   // if (currentItem.classList.contains("line")) {
//   //   currentItem.classList.remove('line')
//   // } else {
//   //   currentItem.classList.add('line')
//   // }
// });

let input = document.querySelector("input");
let submitBtn = document.querySelector(".btn");
let form = document.querySelector(".form");
let listItems = document.querySelector("ol");
let listContainer = document.querySelector(".container-list");
let imageRefresh = document.createElement("img");
let viewPort = document.querySelector(".view-port");
let messageContainer = document.createElement("div");

imageRefresh.src =
  "https://i.fbcd.co/products/original/27e1bd4903a0e30e8e1c9daaf21b780704be85f408a163876c439dd6459f6384.jpg";
imageRefresh.classList.add("refresh-btn");
listContainer.append(imageRefresh);

imageRefresh.addEventListener("click", () => {
  savedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (savedTasks.length > 0) {
    listItems.innerText = "";
    localStorage.removeItem("tasks");
    messageContainer.classList.add("show");

    setTimeout(() => {
      messageContainer.classList.remove("show");
    }, 5000);
  }
});

window.addEventListener("load", () => {
  messageContainer.classList.add("message-container");
  let title = document.createElement("h2");
  let checkIcon = document.createElement("img");
  let closeBtn = document.createElement("img");
  closeBtn.classList.add("close-btn");
  closeBtn.src =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqTZzgr75VC422aDwbBRRJchW9-A7vWiUPTQ&usqp=CAU";
  checkIcon.src = "https://cdn-icons-png.flaticon.com/512/5610/5610944.png";
  title.innerText = "list is clear";
  title.append(checkIcon);
  messageContainer.append(title, closeBtn);
  viewPort.append(messageContainer);

  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  savedTasks.forEach((task, index) => {
    let listItem = document.createElement("li");
    let imgElement = document.createElement("img");
    imgElement.classList.add("img-delete");
    imgElement.src =
      "https://w7.pngwing.com/pngs/29/45/png-transparent-delete-key-logo-button-text-rectangle-logo.png";

    listItem.classList.add("list-item");
    if (task.completed == true) {
      listItem.classList.add("line");
    }
    listItem.id = index + 1;

    listItem.innerText = task.text;
    listItem.append(imgElement);
    listItems.append(listItem);
  });

  closeBtn.addEventListener("click", () => {
    messageContainer.classList.remove("show");
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (input.value == "") {
    input.style.borderColor = "red";
  } else {
    addTaskToList(input.value);
    saveTasksToLocalStorage(input.value);

    form.reset();
  }
});

listItems.addEventListener("click", (event) => {
  let currentItem = event.target;
  if (currentItem.tagName == "LI") {
    currentItem.classList.toggle("line");

    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    let updatedTasks = savedTasks.map((task) => {
      console.log(currentItem);
      if (task.id == currentItem.id) {
        if (task.completed == true) {
          task.completed = false;
        } else {
          task.completed = true;
        }
      }
      return task;
    });

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    console.log(updatedTasks);
  } else if (currentItem.classList.contains("img-delete")) {
    currentItem.parentNode.remove();

    removeTaskFromLocalStorage(currentItem.parentNode.id);
  } else if (currentItem.classList.contains("refresh-btn")) {
    listItems.innerHTML = "";

    localStorage.removeItem("tasks");
  }
});

function addTaskToList(taskText) {
  let listItem = document.createElement("li");
  let imgElement = document.createElement("img");
  imgElement.classList.add("img-delete");
  imgElement.src =
    "https://w7.pngwing.com/pngs/29/45/png-transparent-delete-key-logo-button-text-rectangle-logo.png";

  listItem.classList.add("list-item");

  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  console.log(savedTasks.length);
  listItem.id = savedTasks.length + 1;

  listItem.innerText = taskText;
  listItem.append(imgElement);
  listItems.append(listItem);
}

function saveTasksToLocalStorage(taskText) {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  let taskObj = {
    text: taskText,
    id: savedTasks.length + 1,
    completed: false,
  };

  savedTasks.push(taskObj);

  localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

function removeTaskFromLocalStorage(id) {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = savedTasks.filter((task) => task.id != id);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
