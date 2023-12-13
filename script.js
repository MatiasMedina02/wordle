let attemps = 6;
let randomWord = "";
let words = ["APPLE", "BEACH", "CLOUD", "DANCE", "EAGLE", "FLAME", "GRAND", "HUMOR", "IMAGE", "JUMBO"];
let isSoundEnabled = false;

const input = document.querySelector(".input_attempt");
const error = document.querySelector(".error");
const buttonAttempt = document.querySelector(".button_attempt");
const results = document.querySelector(".results");
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector(".modal_title");
const modalPlay = document.querySelector(".modal_play");
const modalCancel = document.querySelector(".modal_cancel");
const buttonMusic = document.querySelector(".button_music");
const backgroundAudio = document.querySelector(".background_audio");

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

buttonAttempt.addEventListener("click", newAttempt);

modalPlay.addEventListener("click", playAgain);

modalCancel.addEventListener("click", () => {
  modal.style.display = "none";
});

buttonMusic.addEventListener("click", toggleSound);

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
  row.className = "row";

  for (let letra in randomWord) {
    const newLetter = document.createElement("span");
    newLetter.textContent = valueAttempt[letra];
    newLetter.className = "letter";
    if (valueAttempt[letra] === randomWord[letra]) {
      newLetter.style.backgroundColor = "#2b9348";
    } else if (randomWord.includes(valueAttempt[letra])) {
      newLetter.style.backgroundColor = "#ffff3f";
    } else {
      newLetter.style.backgroundColor = "#e5383b";
    };
    row.appendChild(newLetter);
  }

  results.appendChild(row);
  input.value = "";

  attemps--;
  if (attemps === 0) {
    input.disabled = true;
    buttonAttempt.disabled = true;
    modalTitle.innerHTML = "Haz perdido =&lpar;"
    modal.style.display = "flex";
    return;
  }
}

function playAgain() {
  input.disabled = false;
  buttonAttempt.disabled = false;
  modal.style.display = "none";
  results.innerHTML = "";
  attemps = 6;
  getRandomWord();
}

function toggleSound() {
  if (isSoundEnabled) {
    backgroundAudio.pause();
    buttonMusic.innerHTML = `
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM17.78 9.22a.75.75 0 10-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 001.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L20.56 12l1.72-1.72a.75.75 0 00-1.06-1.06l-1.72 1.72-1.72-1.72z" />
    </svg>  
    `;
  } else {
    backgroundAudio.play();
    buttonMusic.innerHTML = `
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
      <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
    </svg>  
    `;
  }
  isSoundEnabled = !isSoundEnabled;
}