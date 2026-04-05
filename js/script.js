// ADDRESS EXPAND

function toggleAddress(){

let addressBox = document.getElementById("addressBox");
let addText = document.getElementById("addAddressText");

addressBox.classList.remove("hidden");

addText.style.display = "none";

}

// UPDATE SUBROLE

function updateSubrole(){

let role = document.getElementById("role").value;
let subrole = document.getElementById("subrole");
let receiverFields = document.getElementById("receiverFields");

subrole.innerHTML = '<option disabled selected>Select Subrole</option>';

receiverFields.classList.add("hidden");

if(role === "donor"){

subrole.innerHTML += `

<option>Supermarket</option>
<option>Hotel / Restaurant</option>
<option>Catering</option>

`;

}

else if(role === "receiver"){

subrole.innerHTML += `

<option>Orphanage</option>
<option>NGO</option>
<option>Animal Feed</option>

`;

receiverFields.classList.remove("hidden");

}

else if(role === "industries"){

subrole.innerHTML += `

<option>Biogas</option>
<option>Fertilizer</option>

`;

}

}





window.onload = () => {

  // Splash logic (only if exists)
  let splash = document.getElementById("splash");
  let home = document.getElementById("home");

  if(splash && home){
    setTimeout(() => {
      splash.style.display = "none";
      home.classList.remove("hidden");
    }, 2000);
  }

  // Net quantity (only if exists)
  if(document.getElementById("netQty")){
    calculateNetQuantity();
  }

  if(document.getElementById("timer")){
  startTimer();
}

};


function registerUser(){

  let role = document.getElementById("role").value;
  let userId = document.querySelector("input[placeholder='Create User ID']").value;
  let password = document.querySelector("input[type='password']").value;

  // Create user object
  let user = {
    role: role,
    userId: userId,
    password: password
  };

  // Save in localStorage
  localStorage.setItem("currentUser", JSON.stringify(user));

  alert("Registered Successfully!");

  window.location.href = "login.html";
}

function toggleDonation(){
  let box = document.getElementById("donationDetails");
  box.classList.toggle("hidden");
}

function submitDonation(){
  alert("Donation Created Successfully!");
  window.location.href = "donor-dashboard.html";
}
function goToProfile(){
  window.location.href = "profile.html";
}
function goToNotifications(){
  window.location.href = "notifications.html";
}


function toggleReceiverDonation(){
  let box = document.getElementById("receiverDonationDetails");
  box.classList.toggle("hidden");
}

function goToHistory(){
  window.location.href = "receiver-history.html";
}

function raiseRequest(){
  alert("Request sent to donor!");
}

function goToReceiverDashboard(){
  window.location.href = "receiver-dashboard.html";
}

function toggleStorage(){
  let box = document.getElementById("storageDetails");
  box.classList.toggle("hidden");
}

function goToStorage(){
  window.location.href = "storage.html";
}


function toggleItem1(){
  document.getElementById("item1").classList.toggle("hidden");
}

function toggleItem2(){
  document.getElementById("item2").classList.toggle("hidden");
}

function goToReceiverProfile(){
  window.location.href = "receiver-profile.html";
}

function goToReceiverNotifications(){
  window.location.href = "receiver-notifications.html";
}

function goToIndustryProfile(){
  window.location.href = "industry-profile.html";
}

function goToIndustryNotifications(){
  window.location.href = "industry-notifications.html";
}

function goToStorageSpot(){
  window.location.href = "storage-on-spot.html";
}

function goToIndustryHistory(){
  window.location.href = "industry-history.html";
}

/* PICKUP ALERT LOGIC */
function checkPickup(){

  let dot = document.getElementById("pickupDot");

  // simulate threshold
  let thresholdReached = Math.random() > 0.5;

  if(thresholdReached){
    dot.classList.remove("red");
    dot.classList.add("yellow");
    alert("Threshold reached! Schedule pickup.");
  } else {
    dot.classList.remove("yellow");
    dot.classList.add("red");
    alert("Threshold not reached yet.");
  }
}

function toggleStorageItem(id){
  document.getElementById(id).classList.toggle("hidden");
}

function schedulePickup(){
  alert("Pickup Scheduled Successfully!");
}

function loginUser(){

  let enteredId = document.querySelector("input[placeholder='Email / User ID / Phone']").value;
  let enteredPass = document.querySelector("input[type='password']").value;

  let storedUser = JSON.parse(localStorage.getItem("currentUser"));

  if(!storedUser){
    alert("No user found. Please register.");
    return;
  }

  // Check credentials
  if(enteredId === storedUser.userId && enteredPass === storedUser.password){

    if(storedUser.role === "donor"){
      window.location.href = "donor-dashboard.html";
    }

    else if(storedUser.role === "receiver"){
      window.location.href = "receiver-dashboard.html";
    }

    else if(storedUser.role === "industries"){
      window.location.href = "industry-dashboard.html";
    }

  } else {
    alert("Invalid credentials");
  }
}

function schedulePickupAll(){
  alert("All items scheduled for pickup!");
}

function calculateNetQuantity(){
  let quantities = [30, 20, 25]; // your items
  let total = quantities.reduce((a,b) => a+b, 0);

  document.getElementById("netQty").innerText = total + " kg";
}

function goToPast(){
  window.location.href = "past-donations.html";
}

function goToCreateDonation(){
  window.location.href = "create-donation.html";
}

function goToTrust(){
  window.location.href = "trust.html";
}

let alertTriggered = false; // ✅ prevents repeat alerts

function startTimer() {

  let expiry = new Date();
  expiry.setHours(18, 0, 0); // 6:00 PM

  let alertSound = new Audio("sounds/alert.mp3");

  setInterval(() => {

    let now = new Date();
    let diff = expiry - now;

    let timerEl = document.getElementById("timer");

    if(diff <= 0){
      timerEl.innerText = "Expired";
      timerEl.className = "expired";
      return;
    }

    let hrs = Math.floor(diff / (1000 * 60 * 60));
    let mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let secs = Math.floor((diff % (1000 * 60)) / 1000);

    timerEl.innerText = `${hrs}:${mins}:${secs}`;

    // 🎨 COLOR STATES
    if(diff <= 30 * 60 * 1000){
      timerEl.className = "danger-timer";

      // 🔔 SOUND + POPUP (ONLY ONCE)
      if(!alertTriggered){
        alertTriggered = true;

        alertSound.play();

        alert("⚠️ Less than 30 minutes left! Take action now!");
      }

    }
    else if(diff <= 60 * 60 * 1000){
      timerEl.className = "warning-timer";
    }
    else{
      timerEl.className = "normal-timer";
    }

  }, 1000);
}