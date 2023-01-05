const state = {
  taskList: [{}],
};

const taskContents = document.querySelector(".task_contents");
const taskModal = document.querySelector(".task_modal_body");

const htmlTaskContent = ({ id, title, description, type, url }) => `
<div class="col-md-6 col-lg-4 mt-4" id="${id} key=${id} ">
    <div class=" card shadow-sm task_card"
        <div class="card-header d-flex justify-content-end task_card_header"
            <button type="button" class="btn btn-outline-info mr-2 mane=${id} >
            <i class = 'fas fa-pencil-alt name=${id}
            </button>
        </div>
        <div class="card-body"> 
              ${url &&
  `<img width="100%" src=${url}  alt="CardImage" class="card-image-top mb-3 rounded-lg" />`
  }
                <h4 class="task_card_title"> ${title} </h4>
              <p class="description trim-3-lines  text-muted" data-gram_editor='false'>
                ${description}
              </p>
              <div class="tags d-flex text-white flex-wrap"> 
                <span class="badge bg-primary m-1"> ${type} </span>
              </div>
        </div>
        <div class="card-footer"> 
            <button type="button" class="btn btn-outline-primary float-right"
              data-bs-toggel='modal'
              data-bs-target='#showTask'
              id=${id} 
              onclick="openTask.apply(this, agruments)">
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
    ${url &&
    `<img width="100%" src=${url}  
      alt="CardImage" 
        class="img-fluid m-3 
        place_holder_image" />`
    }
      <strong class="text-sm text-muted"> created on ${date.toDateString()}</strong>
        <h2 class="my-3"> ${title} </h2>
      <p class="Lead">${description} </p>
  </div>
  `;
};

const updateLocalStorage = () => {
  localStorage.setItem(tasks,
    JSON.stringify({
      tasks: state.taskList,
    })
  );
};

const loadInitalData = () => {
  const localStorageCopy = JSON.parse(localStorage.tasks);
  console.log(JSON.parse(localStorage.tasks))
  if (localStorageCopy) state.taskList = localStorageCopy.tasks;

  state.taskList.map((cardDate) => {
    taskContents.insertAdjacentElement(
      "beforebegin",
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


  if (input.title === " " || input.description === " " || input.type === " ") {
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