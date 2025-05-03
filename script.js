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
const characterCountDisplay = document.getElementById("characterCount");
const wordCountDisplay = document.getElementById("wordCount");
const lineCountDisplay = document.getElementById("lineCount");

// Functions
function clear() {
  textarea.value = "";
}

function lowercase() {
  textarea.value = textarea.value.toLowerCase();
}

function titlecase() {}

function uppercase() {
  textarea.value = textarea.value.toUpperCase();
}

function undo() {}

function redo() {}

function characterCount() {}

function wordCount() {}

function lineCount() {}

// Event Listeners
clearBtn.addEventListener("click", clear);

lowercaseBtn.addEventListener("click", lowercase);

titlecaseBtn.addEventListener("click", titlecase);

uppercaseBtn.addEventListener("click", uppercase);

undoBtn.addEventListener("click", undo);

redoBtn.addEventListener("click", redo);
