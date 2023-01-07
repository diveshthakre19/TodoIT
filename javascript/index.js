const state = {
  taskList: [],
};

const taskContents = document.querySelector(".task_contents");
const taskModal = document.querySelector(".task_modal_body");

const htmlTaskContent = ({ id, title, description, type, url }) => `
    <div class='col-md-6 col-lg-4 mt-3' id=${id} key=${id}>
      <div class='card shadow-sm task_card'>
        <div class='card-header d-flex gap-2 justify-content-end task_card_header'>
          <button type='button' class='btn btn-outline-info mr-2' name=${id}>
            <i class='fas fa-pencil-alt' name=${id}></i>
          </button>
          <button type='button' class='btn btn-outline-danger mr-2' name=${id} onclick="deleteTask.apply(this,arguments)">
            <i class='fas fa-trash-alt' name=${id}></i>
          </button>
        </div>
        <div class='card-body'>
          ${url
    ? `<img width='100%'  src=${url} alt='card image cap' class='card-image-top md-3 rounded-lg' />`
    : `
        <img width='100%' src="https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png" alt='card image cap' class='img-fluid place__holder__image mb-3' />
        `
  }
          <h4 class='task__card__title'>${title}</h4>
          <p class='description trim-3-lines text-muted' data-gram_editor='false'>
            ${description}
          </p>
          <div class='tags text-white d-flex flex-wrap'>
            <span class='badge bg-primary m-1'>${type}</span>
          </div>
        </div>
        <div class='card-footer'>
          <button 
          type='button' 
          class='btn btn-outline-primary float-right' 
          data-bs-toggle='modal'
          data-bs-target='#showTask'
          id=${id}
          onclick='openTask.apply(this, arguments)'
          >
            Open Task
          </button>
        </div>
      </div>
    </div>
  `;

const htmlModalContent = ({ id, title, description, url }) => {
  const date = new Date(parseInt(id));
  return `
  <div id=${id}>
  ${url
      ? `
  <img width='100%' src=${url} alt='card image cap' class='img-fluid place__holder__image mb-3' />
`
      : `
<img width='100%' src="https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png" alt='card image cap' class='img-fluid place__holder__image mb-3' />
`
    }
      <strong class="text-sm text-muted"> created on ${date.toDateString()}</strong>
        <h2 class="my-3"> ${title} </h2>
      <p class="lead">${description} </p>
  </div>
  `;
};

const updateLocalStorage = () => {
  localStorage.setItem("tasks",
    JSON.stringify({
      tasks: state.taskList,
    })
  );
};

const loadInitalData = () => {
  const localStorageCopy = JSON.parse(localStorage.tasks);

  if (localStorageCopy) state.taskList = localStorageCopy.tasks;

  state.taskList.map((cardDate) => {
    taskContents.insertAdjacentHTML(
      "beforeend",
      htmlTaskContent(cardDate)
    );
  });
};

const handelSubmit = (event) => {
  const id = `${Date.now()}`;
  const input = {
    url: document.getElementById("imageURL").value,
    title: document.getElementById("taskTitle").value,
    description: document.getElementById("taskDescription").value,
    type: document.getElementById("tags").value,
  };


  if (input.title === "" || input.description === "" || input.type === "") {
    return alert("Fill all fieds")
  }

  taskContents.insertAdjacentHTML(
    "beforeend",
    htmlTaskContent({ ...input, id })
  );
  state.taskList.push({ ...input, id });
  updateLocalStorage();
};

const openTask = (e) => {
  if (!e) e = window.event
  const getTask = state.taskList.find(({ id }) => id === e.target.id)
  taskModal.innerHTML = htmlModalContent(getTask)
}

const deleteTask = (e) => {
  if (!e) e = window.event;
  const targetID = e.target.getAttribute("name");
  const type = e.target.tagName;
  const removeTask = state.taskList.filter(({ id }) => id !== targetID);
  state.taskList = removeTask;
  updateLocalStorage();

  if (type === "BUTTON") {
    return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
      e.target.parentNode.parentNode.parentNode
    )
  }
  return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
    e.target.parentNode.parentNode.parentNode.parentNode
  )
};