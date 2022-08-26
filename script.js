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

function createButtonEdit() {
  const btnEdit = document.createElement('button');

  btnEdit.type = 'button';
  btnEdit.innerHTML = 'Editar';
  btnEdit.addEventListener('click', () => {
    const user = btnEdit.closest('li');
    user.classList.add('editing');
  });

  return btnEdit;
}

function createButtonRemove(index) {
  const btnRemove = document.createElement('button');
  const data = getUsers();

  btnRemove.classList.add('btn-remove');
  btnRemove.type = 'button';
  btnRemove.innerHTML = 'Remover';
  btnRemove.addEventListener('click', () => {
    data.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(data));
    clearList();
    generateList();
  });

  return btnRemove;
}

function generateList() {
  const data = getUsers();

  for (let i = 0; i < data.length; i++) {
    const itemList = document.createElement('li');
    const boxName = document.createElement('div');
    const boxInputName = document.createElement('div');
    const boxInputEmail = document.createElement('div');
    const boxEmal = document.createElement('div');
    const boxButton = document.createElement('div');
    const inputEditName = document.createElement('input');
    const inputEditEmail = document.createElement('input');
    const usernName = document.createElement('span');
    const userEmal = document.createElement('span');

    inputEditName.classList.add('edit-input');
    inputEditEmail.classList.add('edit-input');
    listUser.appendChild(itemList);
    itemList.appendChild(boxName);
    itemList.appendChild(boxInputName);
    boxInputName.appendChild(inputEditName);
    inputEditName.value = data[i].name;
    inputEditEmail.value = data[i].email;
    itemList.appendChild(boxEmal);
    itemList.appendChild(boxInputEmail);
    boxInputEmail.appendChild(inputEditEmail);
    itemList.appendChild(boxButton);
    boxButton.appendChild(createButtonRemove(i));
    boxButton.appendChild(createButtonEdit());
    boxName.appendChild(usernName);
    boxEmal.appendChild(userEmal);
    usernName.innerHTML = data[i].name;
    userEmal.innerHTML = data[i].email;
  }
}

function clearList() {
  listUser.innerHTML = '';
}

function handleSubmit(event) {
  event.preventDefault();
  save();
  clearList();
  generateList();
}

generateList();

form.addEventListener('submit', handleSubmit);
