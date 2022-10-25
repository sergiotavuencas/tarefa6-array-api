document.addEventListener('DOMContentLoaded', function (e) {
  document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();
    saveUser(event);
  });

  getUsersFromApi();
});

function saveUser(event) {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const telephone = document.getElementById('telephone').value;

  const data = { name: name, email: email, telephone: telephone };
  console.log(data);

  // const formData = new FormData(event.target);
  // const data = {};
  // formData.forEach((value, key) => (data[key] = value));

  fetch('https://632a4215713d41bc8e6ce218.mockapi.io/array/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.name.toUpperCase() + ', SEUS DADOS FORAM SALVOS COM SUCESSO!');
      getUsersFromApi();
    })
    .catch((e) => {
      alert('Error: ', e);
    });
}

function getUsersFromApi() {
  fetch('https://632a4215713d41bc8e6ce218.mockapi.io/array/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'apllication/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      updateUsers(data);
    })
    .catch((e) => {
      console.log('Error: ', e);
    });
}

function updateUsers(users) {
  const tbody = document.getElementById('usersList');
  tbody.innerHTML = '';

  users.forEach((user) => {
    const tr = document.createElement('tr');
    const idTd = createElementAndAppendNode('td', user.id);
    const nameTd = createElementAndAppendNode('td', user.name);
    const emailTd = createElementAndAppendNode('td', user.email);
    const telephoneTd = createElementAndAppendNode('td', user.telephone);

    tr.appendChild(idTd);
    tr.appendChild(nameTd);
    tr.appendChild(emailTd);
    tr.appendChild(telephoneTd);
    tbody.appendChild(tr);
  });
}

function createElementAndAppendNode(elementTag, nodeValue) {
  const element = document.createElement(elementTag);
  const node = document.createTextNode(nodeValue);
  element.appendChild(node);
  return element;
}
