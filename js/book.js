function handleClick(event){
  const navbar = document.querySelector(".nav-links");
  navbar.classList.toggle("showNavbar");
  navbar.classList.toggle("hideNavbar");
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
  
  function updatePrice() {
    var dropdown = document.getElementById("jeniskamar");
    var selectedOption = dropdown.options[dropdown.selectedIndex];
    var price = selectedOption.getAttribute("data-price");

    var numberOfRooms = document.getElementById("jumlahkamar").value;

    var checkinDate = new Date(document.getElementById("checkin").value);
    var checkoutDate = new Date(document.getElementById("checkout").value);

    // Menghitung durasi menginap dalam milidetik
    var duration = checkoutDate - checkinDate;
    var nights = Math.ceil(duration / (1000 * 60 * 60 * 24)); // Konversi dari milidetik ke malam

    var total = price * numberOfRooms * nights;

    // Menggunakan toLocaleString() untuk format angka
    document.getElementById("total").value = "Rp " + total.toLocaleString("id-ID");
}

// Panggilan awal untuk mengatur total default
updatePrice();