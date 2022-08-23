const form = document.querySelector('#userForm');
const listUser = document.querySelector('.list');
const inputName = document.querySelector('.input-name-user');
const inputEmal = document.querySelector('.input-email-user');

function createId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getUsers() {
  const users = localStorage.getItem('users')
    ? JSON.parse(localStorage.getItem('users'))
    : [];

  return users;
}

function save() {
  const inputNameValue = inputName.value.trim();
  const inputEmalValue = inputEmal.value.trim();
  const users = getUsers();
  const userData = {
    id: createId(),
    name: inputNameValue,
    email: inputEmalValue,
  };

  if (inputNameValue && inputEmalValue != '') {
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
  } else {
    alert('Erro');
  }
}

function handleSubmit(event) {
  event.preventDefault();
  save();
}

form.addEventListener('submit', handleSubmit);
