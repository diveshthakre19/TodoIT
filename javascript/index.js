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
              data-bs-target='#showTask'>
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
    class="img-fluid m-3 place_holder_image" />`
    }
    <strong class="text-sm text-muted"> created on ${date.toDateString()}</strong>
    <h2 class="my-3"> ${title} </h2>
    <p class="Lead">${description} </p>
  </div>
  `;
};
