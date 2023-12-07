const email = localStorage.getItem('email');


// Memilih elemen HTML dengan id 'userDisplay'
const usernameDisplay = document.getElementById('userDisplay');
const emailDisplay = document.getElementById('email');

// Menetapkan nilai username ke dalam elemen HTML
usernameDisplay.innerHTML = `${username}`;
emailDisplay.innerHTML = `${email}`;
