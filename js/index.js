function handleClick(event){
  const navbar = document.querySelector(".nav-links");
  navbar.classList.toggle("showNavbar");
  
}

const backgrounds = [
    './img/villaa.jpg',
    './img/villa5.jpg',
    './img/villa6.jpg'
    // Tambahkan lebih banyak gambar latar jika diperlukan
];

let currentBackgroundIndex = 0;

function changeBackground() {
    document.querySelector('.head').style.backgroundImage = `url('${backgrounds[currentBackgroundIndex]}')`;
    currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length;
}

// Panggil fungsi untuk mengganti latar belakang setiap beberapa detik (misalnya, setiap 5 detik)
setInterval(changeBackground, 1700); // Ganti angka 5000 dengan interval yang diinginkan dalam milidetik


document.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelector("nav");
  
    window.addEventListener("scroll", function () {
      if (window.scrollY > 0) {
        nav.classList.add("nav-scrolled");
      } else {
        nav.classList.remove("nav-scrolled");
      }
    });
  });

  var navLinks = document.querySelector('.nav-links');

  // Tangkap peristiwa scroll pada dokumen
  document.addEventListener('scroll', function() {
    // Periksa apakah posisi scroll lebih besar dari 0
    if (window.scrollY > 0) {
      // Jika ya, tambahkan kelas 'scrolled'
      navLinks.classList.add('scrolled');
    } else {
      // Jika tidak, hapus kelas 'scrolled'
      navLinks.classList.remove('scrolled');
    }
  }
  );
