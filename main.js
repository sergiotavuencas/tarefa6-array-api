var users = [];
var userId = 0;

document.addEventListener('DOMContentLoaded', function (e) {
  document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();
    saveUser();
  });

  getUsersFromApi();
});

function saveUser() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const telephone = document.getElementById('telephone').value;

  if (users[0] == undefined) {
    users = [];
  } else {
    userId = users.length;
  }

  const data = { id: userId++, name: name, email: email, telephone: telephone };

  users.push(data);

  updateUsers();
}

function postUsers() {
  users.forEach((data) => {
    fetch('https://632a4215713d41bc8e6ce218.mockapi.io/array/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
      })
      .catch((e) => {
        alert('Error: ', e);
      });
  });
}

function updateUsers() {
  const tbody = document.getElementById('usersList');
  tbody.innerHTML = '';

  users.forEach((user) => {
    const tr = document.createElement('tr');
    const nameTd = createElementAndAppendNode('td', user.name);
    const emailTd = createElementAndAppendNode('td', user.email);
    const telephoneTd = createElementAndAppendNode('td', user.telephone);

    tr.appendChild(nameTd);
    tr.appendChild(emailTd);
    tr.appendChild(telephoneTd);
    tbody.appendChild(tr);
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
    .then(({data}) => {
      users.push(data);
    })
    .catch((e) => {
      console.log('Error: ', e);
    });
}

function createElementAndAppendNode(elementTag, nodeValue) {
  const element = document.createElement(elementTag);
  const node = document.createTextNode(nodeValue);
  element.appendChild(node);
  return element;
}
