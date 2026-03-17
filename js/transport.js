document.addEventListener("DOMContentLoaded", function () {

 
// ==========================
// ELEMENT
// ==========================

const popup = document.getElementById("ridePopup");
const openBtn = document.getElementById("openRideBooking");
const closeBtn = document.querySelector(".close-popup");

const form = document.getElementById("transportForm");

const destination = document.getElementById("destination");
const people = document.getElementById("people");
const paymentOption = document.getElementById("paymentOption");

const totalPriceDisplay = document.getElementById("totalPrice");
const payNowDisplay = document.getElementById("payNowAmount");

let totalPrice = 0;
let finalAmount = 0;


// ==========================
// POPUP
// ==========================



openBtn.onclick = function(){
popup.style.display = "flex";
}

closeBtn.onclick = function(){
popup.style.display = "none";
}

window.onclick = function(e){
if(e.target === popup){
popup.style.display = "none";
}
}



// ==========================
// CALCULATE PRICE
// ==========================

function updatePrice(){

const selected = destination.options[destination.selectedIndex];

if(!selected || !selected.dataset.price){
totalPriceDisplay.innerText = "IDR 0";
payNowDisplay.innerText = "IDR 0";
return;
}

const basePrice = parseInt(selected.dataset.price);
const passenger = parseInt(people.value) || 1;

totalPrice = basePrice;

// extra passenger
if(passenger > 3){
totalPrice += (passenger - 3) * 100000;
}

// deposit
if(paymentOption.value === "deposit"){
finalAmount = totalPrice * 0.5;
}else{
finalAmount = totalPrice;
}

totalPriceDisplay.innerText = "IDR " + totalPrice.toLocaleString();
payNowDisplay.innerText = "IDR " + finalAmount.toLocaleString();

}


// ==========================
// EVENTS
// ==========================

destination.addEventListener("change", updatePrice);
people.addEventListener("input", updatePrice);
paymentOption.addEventListener("change", updatePrice);


// ==========================
// INIT (FIX UTAMA)
// ==========================

// set default ke option pertama yang ada harga
if(destination.selectedIndex === 0){
  destination.selectedIndex = -1; // biar tidak dianggap valid
}

updatePrice();

// ==========================
// FORM SUBMIT
// ==========================

form.addEventListener("submit", function (e) {

e.preventDefault();

if(totalPrice === 0){
alert("Please select destination first.");
return;
}

// clear old paypal
document.getElementById("paypal-button-container").innerHTML = "";

paypal.Buttons({

createOrder: function(data, actions) {

return actions.order.create({

purchase_units: [{

amount: {
value: (finalAmount / 16000).toFixed(2)
}

}]

});

},

onApprove: function(data, actions) {

return actions.order.capture().then(function(details) {

const name = document.getElementById("name").value;
const pickup = document.getElementById("pickup").value;
const destinationValue = destination.value;
const passengers = people.value;

window.location.href =
"thank-you.html?type=transport" +
"&name=" + encodeURIComponent(name) +
"&pickup=" + encodeURIComponent(pickup) +
"&destination=" + encodeURIComponent(destinationValue) +
"&passengers=" + encodeURIComponent(passengers) +
"&total=" + encodeURIComponent(totalPrice) +
"&paid=" + encodeURIComponent(finalAmount) +
"&payment=" + encodeURIComponent(paymentOption.value) +
"&transaction=" + encodeURIComponent(details.id);

});

}

}).render('#paypal-button-container');

});

}); 

