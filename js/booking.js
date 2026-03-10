document.addEventListener("DOMContentLoaded", function () {
console.log("SUBMIT WORKING");
  emailjs.init("8520Px4LIsuk2To9W");
  
  const buttons = document.querySelectorAll(".book-btn");
  const modal = document.getElementById("bookingModal");
  const closeModal = document.getElementById("closeModal");
  const tourTitle = document.getElementById("tourTitle");
  const totalPrice = document.getElementById("totalPrice");

  const payNow = document.getElementById("payNow");

  let basePrice = 0;
  const exchangeRate = 16000; 

  buttons.forEach(button => {
    button.addEventListener("click", function () {
      const tourName = this.dataset.tour;
      basePrice = parseInt(this.dataset.price);

      tourTitle.innerText = tourName;
      modal.style.display = "block";
      // ===== NOTE LOGIC =====
    const trekkingNote = document.getElementById("trekkingNote");

    if(tourName.toLowerCase().includes("ricefield")){
        trekkingNote.style.display = "block";
    } else {
        trekkingNote.style.display = "none";
    }
      calculateTotal();
    });
  });

  closeModal.onclick = () => modal.style.display = "none";

  document.getElementById("people").addEventListener("input", calculateTotal);
  document.getElementById("paymentType").addEventListener("change", calculateTotal);


  function calculateTotal() {
  const people = parseInt(document.getElementById("people").value) || 1;
  const paymentType = document.getElementById("paymentType").value;

  let totalIDR = basePrice * people;

  // ===== DISCOUNT LOGIC =====
  let discount = 0;

  if (people >= 2) {
    discount = totalIDR * 0.10; // 10% discount
    totalIDR = totalIDR - discount;
  }

  // ===== PAYMENT TYPE =====
  if (paymentType === "deposit") {
    totalIDR = totalIDR * 0.5;
  }

  const totalUSD = (totalIDR / exchangeRate).toFixed(2);

  // ===== SHOW PRICE =====
  if (people >= 2) {
    totalPrice.innerText = "10% Group Discount Applied | Total: $" + totalUSD + " USD";
  } else {
    totalPrice.innerText = "Total: $" + totalUSD + " USD";
  }
}

   (payNow).addEventListener("click", function() {
 const name = document.getElementById("name")?.value || "";
 const email = document.getElementById("email")?.value || "";
 const date = document.getElementById("date")?.value || "";
 const people = parseInt(document.getElementById("people")?.value) || 1;
 const hotel = document.getElementById("hotel")?.value || "";
 const pickupTime = document.getElementById("pickupTime")?.value || "";
 const phone = document.getElementById("phone")?.value || "";
 const paymentType = document.getElementById("paymentType")?.value || "full";
  
  let totalIDR = basePrice * people;
  if (paymentType === "deposit") {
    totalIDR = totalIDR * 0.5;
  }

  const totalUSD = (totalIDR / exchangeRate).toFixed(2);

  const data = {
    customer_name: name,
    customer_email: email,
    phone: phone,
    tour: tourTitle.innerText,
    date: date,
    people: people,
    hotel: hotel,
    pickup_time: pickupTime,
    payment: paymentType,
    amount: totalUSD
  };

 
    // ✅ SIMPAN DULU
  localStorage.setItem("bookingData", JSON.stringify(data));

  // LALU kirim email
  emailjs.send("service_e7hsh38", "template_wm84v18", data)
  .then(function() {
      return emailjs.send("service_e7hsh38", "template_sgcx2mc", data);
  })
  .then(function() {
      window.location.href = "booking-success.html";
  })
  .catch(function(error) {
      console.log("EMAIL FAILED:", error);
      window.location.href = "booking-success.html"; // tetap redirect walau email gagal
  });

});
 

 });


