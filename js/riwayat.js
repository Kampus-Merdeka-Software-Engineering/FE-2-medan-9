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


  //melakukan fetch pada reservation data
  async function fetchReservationData() {

  //mengambil jwtToken dari lokal storage
  const yourJWTToken = localStorage.getItem('token');
  try {
    //melakukan fecth data reservation menggunakan api get-reservation
    const response = await fetch('http://localhost:5001/get-reservation', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + yourJWTToken,
        'Content-Type': 'application/json',
      },
    });

    //melakukan check apakah fetcg dara berhasil atau tidak
    if (!response.ok) {
      throw new Error('Failed to fetch reservation data');
    }

    //menyimpan respon fetch api ke dalam data
    const data = await response.json();

    
    if (Array.isArray(data.reservations)) { //melakukan check apakah data yang diterima merupakan array

      displayReservations(data.reservations); //menjalankan fungsi display reservation

    } else {
      console.error('Invalid data structure. Reservations array not found.');
    }
  } catch (error) {
    console.error('Error fetching reservation data:', error);
  }
}


function displayReservations(reservations) {
  const reservationContainer = $('.booking-card'); //mendefinisikan container yang akan digunakan untuk menyimpan card

  reservations.forEach((reservation) => { //menggunakan forEach untuk menampilkan data history booking

    //konfigurasi gambar
    let imageName = "kamar1"; // Default image name

    if (reservation.room === "Deluxe Valley View") {
      imageName = "kamar1";
    } else if (reservation.room === "One Bedroom Pool Villa") {
      imageName = "kamar2";
    } else if (reservation.room === "Suite Pool Access") {
      imageName = "kamar3";
    }
    
    const imageSrc = `./img/${imageName}.jpg`; //menyimpan path image sesuai dengan kamar pilihan user

    const reservationCard = `
      <div class="booking-card-container book-form">
      <div class="left">
        <div class="elem-group">
          <label for="name">Name :</label>
          <input type="text" id="name" name="name" value="${reservation.nama}" readonly>
        </div>
        <div class="elem-group">
          <label for="email">Room Type :</label>
          <input type="text" id="room-type" name="room-type" value="${reservation.room}" readonly>
        </div>
        <div class="elem-group">
          <label for="phone">Total Price : </label>
          <input type="text" id="total-price" name="total-price" value="${reservation.total_harga}" readonly>
        </div>
        <div class="elem-group">
          <label for="phone">Payment</label>
          <input type="text" id="payment-method" name="payment-method" value="${reservation.metode}" readonly>
        </div>
        <div class="elem-group inlined">
          <div>
            <label for="checkin-date">Check-in </label>
            <input type="text" id="checkin-date" name="checkin" value="${reservation.check_in}" readonly>
          </div>
          <div>
            <label for="checkout-date">Check-out </label>
            <input type="text" id="checkout-date" name="checkout" value="${reservation.check_out}" readonly>
          </div>
        </div>
        <div class="elem-group bayar">
          <a id="pay-button" class="button" href="#" onclick="redirectToInvoice(${reservation.id_reservasi})">Invoice</a>
        </div>      
      </div>
      <div class="right">
        <div class="elem-group">
          <img src="${imageSrc}" alt="Room Image" >
        </div>
      </div>
      </div>
    `;

    reservationContainer.append(reservationCard); //menampilkan reservationCard ke dalam bookingCard
  });
}

function redirectToInvoice(idReservation) {
    // Mengarahkan pengguna ke halaman invoice.html dengan menyertakan id_reservation
    // Buka halaman baru
    window.open(`invoice.html?id_reservation=${idReservation}`, '_blank');
}


$(document).ready(function () {
  //ketika dokumen di load, maka data akan langsung ditmpilkan
  fetchReservationData();
});


