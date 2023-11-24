function handleClick(event){
  const navbar = document.querySelector(".nav-links");
  navbar.classList.toggle("showNavbar");

}

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
