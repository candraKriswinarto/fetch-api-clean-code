const listGroup = document.querySelector('.list-group');
// Gel all buttons
const getPost = document.querySelector('.get-post');
const addPost = document.querySelector('.add-post');
const editPost = document.querySelector('.edit-post');
const deletePost = document.querySelector('.delete-post');

const url = 'https://jsonplaceholder.typicode.com/posts';
let output = '';

const getResponse = response => response.json();
const processJSON = json => {
  if(!!Object.keys(json).length) {
    output = `
      <li class="list-group-item">${json.title}</li>
      <li class="list-group-item">${json.body}</li>
    `
  }
  listGroup.innerHTML = output;
}
const writeServer = (action, data) => ({
  method: action,
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  }
});

// GET
getPost.addEventListener('click', () => {
  fetch(`${url}/1`)
    .then(getResponse)
    .then(processJSON)
});

// POST
addPost.addEventListener('click', () => {
  const newPost = {
    userId: 1,
    title: 'post 101',
    body: 'This is post 101'
  }

  fetch(url, writeServer('POST', newPost))
    .then(getResponse)
    .then(processJSON);
});

// PUT
editPost.addEventListener('click', () => {
  const updatePost = {
    userId: 2,
    title: 'post two',
    body: 'This is post two!'
  }
  fetch(`${url}/1`, writeServer('PUT', updatePost))
    .then(getResponse)
    .then(processJSON);
});

// DELETE
deletePost.addEventListener('click', () => {
  fetch(`${url}/1`, { method: 'DELETE' })
    .then(getResponse)
    .then(processJSON);
});