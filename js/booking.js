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

  // USD reference only
  const exchangeRate = 16000;

  // =========================
  // OPEN MODAL
  // =========================
  buttons.forEach(button => {

    button.addEventListener("click", function () {

      const tourName = this.dataset.tour;
      basePrice = parseInt(this.dataset.price);

      tourTitle.innerText = tourName;

      modal.style.display = "block";

      // ===== TREKKING NOTE =====
      const trekkingNote = document.getElementById("trekkingNote");

      if (tourName.toLowerCase().includes("ricefield")) {
        trekkingNote.style.display = "block";
      } else {
        trekkingNote.style.display = "none";
      }

      calculateTotal();

    });

  });

  // =========================
  // CLOSE MODAL
  // =========================
  closeModal.onclick = () => {
    modal.style.display = "none";
  };

  // =========================
  // INPUT EVENTS
  // =========================
  document.getElementById("people")
    .addEventListener("input", calculateTotal);

  document.getElementById("paymentType")
    .addEventListener("change", calculateTotal);

  // =========================
  // CALCULATE TOTAL
  // =========================
  function calculateTotal() {

    const people =
      parseInt(document.getElementById("people").value) || 1;

    const paymentType =
      document.getElementById("paymentType").value;

    let totalIDR = basePrice * people;

    // ===== GROUP DISCOUNT =====
    let discount = 0;

    if (people >= 2) {
      discount = totalIDR * 0.10;
      totalIDR = totalIDR - discount;
    }

    // ===== DEPOSIT =====
    if (paymentType === "deposit") {
      totalIDR = totalIDR * 0.5;
    }

    // ===== USD REFERENCE =====
    const totalUSD =
      (totalIDR / exchangeRate).toFixed(2);

    // ===== FORMAT IDR =====
    const formattedIDR =
      totalIDR.toLocaleString("id-ID");

    // ===== DISPLAY =====
    if (people >= 2) {

      totalPrice.innerHTML = `
        <div style="font-size:28px;font-weight:bold;color:#111;">
          IDR ${formattedIDR}
        </div>

        <div style="font-size:14px;color:gray;margin-top:4px;">
          ≈ $${totalUSD} USD (reference only)
        </div>

        <div style="font-size:14px;color:green;font-weight:bold;margin-top:6px;">
          10% Group Discount Applied
        </div>
      `;

    } else {

      totalPrice.innerHTML = `
        <div style="font-size:28px;font-weight:bold;color:#111;">
          IDR ${formattedIDR}
        </div>

        <div style="font-size:14px;color:gray;margin-top:4px;">
          ≈ $${totalUSD} USD (reference only)
        </div>
      `;

    }

  }

  // =========================
  // PAY NOW
  // =========================
  payNow.addEventListener("click", function () {

    const name =
      document.getElementById("name")?.value || "";

    const email =
      document.getElementById("email")?.value || "";

    const date =
      document.getElementById("date")?.value || "";

    const people =
      parseInt(document.getElementById("people")?.value) || 1;

    const hotel =
      document.getElementById("hotel")?.value || "";

    const pickupTime =
      document.getElementById("pickupTime")?.value || "";

    const phone =
      document.getElementById("phone")?.value || "";

    const paymentType =
      document.getElementById("paymentType")?.value || "full";

    // =========================
    // CALCULATE FINAL PRICE
    // =========================
    let totalIDR = basePrice * people;

    // GROUP DISCOUNT
    if (people >= 2) {
      totalIDR = totalIDR - (totalIDR * 0.10);
    }

    // DEPOSIT
    if (paymentType === "deposit") {
      totalIDR = totalIDR * 0.5;
    }

    // USD reference
    const totalUSD =
      (totalIDR / exchangeRate).toFixed(2);

    // Format IDR
    const formattedIDR =
      totalIDR.toLocaleString("id-ID");

    // =========================
    // BOOKING DATA
    // =========================
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

      // MAIN PRICE
      amount_idr: formattedIDR,

      // REFERENCE ONLY
      amount_usd: totalUSD

    };

    // =========================
    // SAVE LOCAL STORAGE
    // =========================
    localStorage.setItem(
      "bookingData",
      JSON.stringify(data)
    );

    // =========================
    // SEND EMAILS
    // =========================
    emailjs.send(
      "service_e7hsh38",
      "template_wm84v18",
      data
    )

    .then(function () {

      return emailjs.send(
        "service_e7hsh38",
        "template_sgcx2mc",
        data
      );

    })

    .then(function () {

      window.location.href = "booking-success.html";

    })

    .catch(function (error) {

      console.log("EMAIL FAILED:", error);

      // tetap redirect
      window.location.href = "booking-success.html";

    });

  });

});

