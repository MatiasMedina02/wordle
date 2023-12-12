let attemps = 6;
let randomWord = "";
let words = ["APPLE", "BEACH", "CLOUD", "DANCE", "EAGLE", "FLAME", "GRAND", "HUMOR", "IMAGE", "JUMBO"];

const input = document.querySelector(".input_attempt");
const error = document.querySelector(".error");
const button = document.querySelector(".button_attempt");
const results = document.querySelector(".results");
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector(".modal_title");
const modalPlay = document.querySelector(".modal_play");
const modalCancel = document.querySelector(".modal_cancel");

// Events
document.addEventListener("DOMContentLoaded", getRandomWord);

input.addEventListener("input", event => {
  let inputValue = event.target.value;
  inputValue = inputValue.slice(0, 5);
  input.value = inputValue;
  error.textContent = "";
});

input.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    newAttempt();
  }
});

button.addEventListener("click", newAttempt);

modalPlay.addEventListener("click", playAgain);

modalCancel.addEventListener("click", () => {
  modal.style.display = "none";
});

// Functions
function getRandomWord() {
  randomWord = words[Math.floor(Math.random() * words.length)];
}

function newAttempt() {
  const valueAttempt = input.value.toUpperCase();

  if (valueAttempt.length < 5) {
    error.textContent = "Debe ser una palabra de 5 letras";
    return;
  }

  if (valueAttempt === randomWord) {
    modalTitle.innerHTML = "Haz ganado =&rpar;";
    modal.style.display = "flex";
    return;
  }


  const row = document.createElement("div");
  row.classList = "row";

  for (let letra in randomWord) {
    const newLetter = document.createElement("span");
    if (valueAttempt[letra] === randomWord[letra]) {
      newLetter.textContent = valueAttempt[letra];
      newLetter.classList = "letter";
      newLetter.style.backgroundColor = "#2b9348";
    } else if (randomWord.includes(valueAttempt[letra])) {
      newLetter.textContent = valueAttempt[letra];
      newLetter.classList = "letter";
      newLetter.style.backgroundColor = "#ffff3f";
    } else {
      newLetter.textContent = valueAttempt[letra];
      newLetter.classList = "letter";
      newLetter.style.backgroundColor = "#e5383b";
    };
    row.appendChild(newLetter);
  }

  results.appendChild(row);
  input.value = "";

  attemps--;
  if (attemps === 0) {
    input.disabled = true;
    button.disabled = true;
    modalTitle.innerHTML = "Haz perdido =&lpar;"
    modal.style.display = "flex";
    return;
  }
}

function playAgain() {
  input.disabled = false;
  modal.style.display = "none";
  results.innerHTML = "";
  attemps = 6;
  getRandomWord();
}