// * Variables
// Text Area
const textarea = document.getElementById("textarea");

// Functional Buttons
const clearBtn = document.getElementById("clearBtn");
const lowercaseBtn = document.getElementById("lowercaseBtn");
const titlecaseBtn = document.getElementById("titlecaseBtn");
const uppercaseBtn = document.getElementById("uppercaseBtn");
const undoBtn = document.getElementById("undoBtn");
const redoBtn = document.getElementById("redoBtn");

// Count Displays
const charCountDisplay = document.getElementById("charCountDisplay");
const wordCountDisplay = document.getElementById("wordCountDisplay");
const lineCountDisplay = document.getElementById("lineCountDisplay");

// * Functions
// Clear everything
function clear() {
  textarea.value = "";
  // Clear all count Displays
  charCountDisplay.textContent = 0;
  wordCountDisplay.textContent = 0;
  lineCountDisplay.textContent = 0;
}

// Lowercase everything
function lowercase() {
  textarea.value = textarea.value.toLowerCase();
}

// Title case everything
function titlecase() {
  // Lowercase everything in the textarea
  const lowercase = textarea.value.toLowerCase();

  // Seperate the content into an array of words
  const words = lowercase.split(" ");

  // Loop over each word and uppercase the first character
  // Then add all of the rest of the letters after
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    textarea.value = words.join(" ");
  }
}

// Uppercase everything
function uppercase() {
  textarea.value = textarea.value.toUpperCase();
}

function undo() {}

function redo() {}

// Count all characters
function characterCount() {
  const characterCount = textarea.value.length + 1;
  charCountDisplay.textContent = characterCount;
}

// Count all words
function wordCount() {
  const wordCount = textarea.value.split(" ").length;
  wordCountDisplay.textContent = wordCount;
}

// Count all lines
function lineCount() {
  const lineCount = textarea.value.split("\n").length;
  lineCountDisplay.textContent = lineCount;
}

// * Event Listeners
// Functional Buttons
clearBtn.addEventListener("click", clear);
lowercaseBtn.addEventListener("click", lowercase);
titlecaseBtn.addEventListener("click", titlecase);
uppercaseBtn.addEventListener("click", uppercase);
undoBtn.addEventListener("click", undo);
redoBtn.addEventListener("click", redo);
// Count Displays
textarea.addEventListener("input", () => {
  characterCount();
  wordCount();
  lineCount();
});
