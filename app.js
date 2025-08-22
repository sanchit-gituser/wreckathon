const popup2 = document.getElementById("tabPopup");
const emoji2 = document.getElementById("popupEmoji");
const msg2 = document.getElementById("popupMessage");
const btn2 = document.getElementById("popupBtn");

const funnyWarnings = [
  "👀 Kahan gaye the? Form ko chhodkar?!",
  "😏 Dusre tab pe kya dekh rahe the?",
  "😂 Wapas aa gaye? Humne socha tum bhool gaye!",
  "😈 Tab change mat karo warna password leak ho jaayega 🤣",
  "🤡 Abhi thoda serious ho jao, kaam karo!"
];

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    emoji2.textContent = ["🤡", "🙃", "😂", "😈", "👀"][Math.floor(Math.random() * 5)];
    msg2.textContent = funnyWarnings[Math.floor(Math.random() * funnyWarnings.length)];
    popup2.style.display = "flex";
  }
});

btn2.addEventListener("click", () => {
  popup2.style.display = "none";
});

// ---------------------
let lastBatteryLevel = null;
const popup = document.getElementById("batteryPopup");
const emoji = document.getElementById("batteryEmoji");
const msg = document.getElementById("batteryMessage");
const btn = document.getElementById("batteryBtn");

const funnyMessages = [
  "😜 Battery ne jump kiya, tum bhi kood lo!",
  "😂 Abhi form nahi milega, button dabao!",
  "😈 Battery ka mood badal gaya!",
  "🤡 Kitni der aur kaam karoge?",
  "🐒 Battery bol rahi hai thoda rest lo!"
];

navigator.getBattery().then(battery => {
  lastBatteryLevel = Math.round(battery.level * 100);

  function checkBattery() {
    let current = Math.round(battery.level * 100);
    if (Math.abs(current - lastBatteryLevel) >= 1) {
      // Show popup
      emoji.textContent = ["🔋", "⚡", "😂", "🙃", "🤪"][Math.floor(Math.random() * 5)];
      msg.textContent = funnyMessages[Math.floor(Math.random() * funnyMessages.length)]
        + ` (Battery: ${current}%)`;
      popup.style.display = "flex";
    }
    lastBatteryLevel = current;
  }

  battery.addEventListener("levelchange", checkBattery);
});

btn.addEventListener("click", () => {
  popup.style.display = "none";
});
// --------
const formSection = document.getElementById("formSection");
const simonSection = document.getElementById("simonSection");


const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const verifyBtn = document.getElementById("verifyBtn");
const createBtn = document.getElementById("createBtn");
const message = document.getElementById("message");

let funnyRules = [
  (e, p) => e.includes("lol") ? "" : "Email must contain 'lol' 😂",
  (e, p) => e.endsWith("@gmail.com") ? "" : "Only Gmail allowed, sorry Yahoo 😜",
  (e, p) => p.length >= 10 ? "" : "Password must be at least 10 chars 🐍",
  (e, p) => /\d/.test(p) ? "" : "Password must contain at least one number 🔢",
  (e, p) => /[A-Z]/.test(p) ? "" : "Password must have 1 uppercase letter 💪",
  (e, p) => p.includes("123") ? "Password cannot contain '123' 🤡" : "",
  (e, p) => e !== p ? "" : "Email and password can’t be same 🙅",
  (e, p) => /[@#$%^&*!]/.test(p) ? "" : "Password must have a special char ✨",
];

function checkRules() {
  let e = emailInput.value;
  let p = passwordInput.value;
  let errors = funnyRules.map(rule => rule(e, p)).filter(msg => msg !== "");
  if (errors.length > 0) {
    message.textContent = errors[Math.floor(Math.random() * errors.length)];
    verifyBtn.disabled = true;
  } else {
    message.textContent = "✅ All rules cleared... for now 😉";
    verifyBtn.disabled = false;
  }
}

emailInput.addEventListener("input", checkRules);
passwordInput.addEventListener("input", checkRules);

// Create button trolling
createBtn.addEventListener("mouseover", () => {
  if (!verifyBtn.disabled) {
    const x = Math.floor(Math.random() * 200) - 100;
    const y = Math.floor(Math.random() * 200) - 100;
    createBtn.style.transform = `translate(${x}px, ${y}px)`;
  }
});

verifyBtn.addEventListener("click", () => {
  if (!verifyBtn.disabled) {
    message.textContent = "😂 Verification passed... now catch the button!";
  }
});

// Internet off
window.addEventListener("offline", () => {
  formSection.style.display = "none";
  simonSection.style.display = "block";
});

// Internet on
window.addEventListener("online", () => {
  simonSection.style.display = "none";
  formSection.style.display = "block";
});