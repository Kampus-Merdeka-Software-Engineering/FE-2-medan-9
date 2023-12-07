const username = localStorage.getItem('uname');

// Memilih elemen HTML dengan id 'username'
const dropdownDisplay = document.getElementById('dropdown-content');

// Menetapkan nilai username ke dalam elemen HTML
// Memeriksa apakah username tidak null
if (username !== null) {

  // Menetapkan nilai username ke dalam elemen HTML
  dropdownDisplay.innerHTML = `<a id="username" ><b>${username}</b></a>
  <hr>
  <a href="profile.html">Profile</a>
  <a href="#" id="logoutButton">Logout</a>`;
  
} else {
  // Menetapkan nilai default atau menampilkan pesan jika username null
  dropdownDisplay.innerHTML = `<a id="username" ><b>Guest</b></a>
  <hr>
  <a href="loginregist.html">Login</a>`;
}

// Add this to your script
function toggleDropdown() {
    var dropdownContent = document.getElementById("userDropdown");
    dropdownContent.classList.toggle("show");
  }

// JavaScript file (logout.js) for making Ajax request
document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logoutButton');
  const yourJWTToken = localStorage.getItem('token');


  logoutButton.addEventListener('click', async () => {
    try {
      const response = await fetch('http://127.0.0.1:5001/auth/logout', {
        method: 'POST',
        credentials: 'include', // Send cookies
        headers: {
          Authorization: 'Bearer ' + yourJWTToken,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
            title: 'Sukses!',
            text: data.message,
            icon: 'success',
            confirmButtonText: 'OK'
        }).then( () => { //ketika di klik oke, maka then akan dijalankan

            localStorage.clear(); // Logout successful
            //mengalihkan ke halaman utama
            window.location.href = '/FE-2-medan-9/index.html';
        })
      } else {
        console.error(data.message); // Logout failed
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  });
});

  