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
    const JWTToken = localStorage.getItem('token');

    if (JWTToken) {
      // Token ditemukan di localStorage
      console.log('Token ditemukan:', JWTToken);
    } else {
      // Token tidak ditemukan di localStorage
      console.log('Token tidak ditemukan.');
    }

}

// Panggilan awal untuk mengatur total default
updatePrice();

//mengambil token dari local storage
const yourJWTToken = localStorage.getItem('token');

$('.book-form').submit(function (e) {
  e.preventDefault();

  $.ajax({

    type: 'POST',
    url: 'https://be-2-medan-9-production.up.railway.app/reservation',
    data: JSON.stringify({
      nama: $('#nama').val(),
      check_in: $('#checkin').val(),
      check_out: $('#checkout').val(),
      room: $('#jeniskamar').val(),
      jumlah_room: $('#jumlahkamar').val(),
      total_harga: $('#total').val(),
      metode: $('#Payment').val(), //mengambil value dari form
    }),
    dataType: 'json',
    contentType: 'application/json',
    headers: {
      // authorization user apakah sudah login
      Authorization: 'Bearer ' + yourJWTToken,
    },
  })

  //ketika sudah ter autentikasi maka akan lanjut
    .done(function (response) {
      if (response) {
        //menggunakan sweet alert untuk menampilkan pop up pesan berhasil
        Swal.fire({
          title: 'Sukses!',
          text: 'Berhasil memesan tempat.',
          icon: 'success',
          confirmButtonText: 'OK'
      }).then( ()=> { //ketika di klik ok maka akan lanjut ke then
        $('.book-form input').val(''); // celar input form
        
        window.location.href = '/FE-2-medan-9/riwayat.html'; // redirect ke halaman riwayat
      })
      }
    })
    .fail(function (xhr) {
      console.log(xhr.responseText);

      alert('Failed to make a reservation. Please register now!!!');
    });
});
