async function fetchDataAndDisplayInvoice() {
  try {
    const yourJWTToken = localStorage.getItem('token');
    const idReservation = getIdReservationFromQueryString();
    const url = `http://localhost:5001/get-reservation?id_reservasi=${idReservation}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + yourJWTToken,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data.reservations)) {
        displayInvoice(data.reservations);
      } else {
        console.error('Invalid data structure. Reservations array not found.');
      }
    } else {
      console.error('Gagal mendapatkan data reservasi.');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function getIdReservationFromQueryString() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('id_reservasi');
}

function generateRandomInvoiceNumber() {
  return 'INV' + Math.floor(Math.random() * 10000) + '-' + Date.now();
}

function getCurrentDate() {
  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth() + 1; // Januari dimulai dari 0
  var year = today.getFullYear();

  // Formatting tanggal menjadi 'YYYY-MM-DD'
  return year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
}

function displayInvoice(reservations) {
  const reservationContainer = $('.invoice-container');
  
  reservations.forEach((reservation) => {
    const invoiceNumber = generateRandomInvoiceNumber();
    const currentDate = getCurrentDate();

    const qrcodeText = `Invoice Number: ${invoiceNumber}\nTotal: ${reservation.total_harga}`;

    const reservationCard = `
      <div class="invoice-header">
        <h2>Receipt</h2>
      </div>

      <center>
      <div class="qrcode-container center-vertical" id="qrcode"></div>
      <div class="metode-section">
        <div id="metode">${reservation.metode}</div>
      </div>
      </center>
      </br>
      <div class="receipt">
        <div class="receipt-item">
          <span>Invoice Number:</span>
          <span id="invoiceNumber">${invoiceNumber}</span>
        </div>
        <div class="receipt-item">
          <span>Date:</span>
          <span id="currentDate">${currentDate}</span>
        </div>
    
        <!-- Detail lainnya -->
        <div class="receipt-item">
          <h4>Jenis Kamar : ${reservation.room}</h4>
        </div>
    
        <div class="total-section">
          <h4 id="total-harga">Total Price : ${reservation.total_harga}</h4>
        </div>
      </div>
    `;

    reservationContainer.html(reservationCard);
    var qrcode = new QRCode(document.getElementById("qrcode"), {
      text: qrcodeText,
      width: 128,
      height: 128
    });
  });
}

$(document).ready(function() {
  fetchDataAndDisplayInvoice();
});
