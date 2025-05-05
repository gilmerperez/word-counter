// Text Area
const textArea = document.getElementById("textArea");

// Functional Buttons
const clearBtn = document.getElementById("clearBtn");
const lowercaseBtn = document.getElementById("lowercaseBtn");
const uppercaseBtn = document.getElementById("uppercaseBtn");
const titleCaseBtn = document.getElementById("titleCaseBtn");
const sentenceCaseBtn = document.getElementById("sentenceCaseBtn");
const capitalizedCaseBtn = document.getElementById("capitalizedCaseBtn");
const inverseCaseBtn = document.getElementById("inverseCaseBtn");
const alternatingCaseBtn = document.getElementById("alternatingCaseBtn");
const undoBtn = document.getElementById("undoBtn");
const redoBtn = document.getElementById("redoBtn");
const copyBtn = document.getElementById("copyBtn");
const pasteBtn = document.getElementById("pasteBtn");

// Count Displays
const charCountDisplay = document.getElementById("charCountDisplay");
const wordCountDisplay = document.getElementById("wordCountDisplay");
const sentenceCountDisplay = document.getElementById("sentenceCountDisplay");
const lineCountDisplay = document.getElementById("lineCountDisplay");

// Undo and Redo Stack
let undoStack = [];
let redoStack = [];

// Clear everything
function clear() {
  textArea.value = "";
  // Clear all count Displays
  charCountDisplay.textContent = 0;
  wordCountDisplay.textContent = 0;
  lineCountDisplay.textContent = 0;
}

// Lowercase everything
function lowercase() {
  textArea.value = textArea.value.toLowerCase();
}

// Uppercase everything
function uppercase() {
  textArea.value = textArea.value.toUpperCase();
}

// Title case everything
function titleCase() {
  // Lowercase everything in the textArea
  const lowercase = textArea.value.toLowerCase();

  // Seperate the content into an array of words
  const words = lowercase.split(" ");

  // Loop over each word and uppercase the first character
  // Then add all of the rest of the letters after
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    textArea.value = words.join(" ");
  }
}

// Undo last change
function undo() {
  if (undoStack.length > 0) {
    // Save current version for redo
    redoStack.push(textArea.value);
    // Revert to last state
    const previousVersion = undoStack.pop();
    textArea.value = previousVersion;
    // Display counts
    characterCount();
    wordCount();
    lineCount();
  }
}

// Redo last change
function redo() {
  if (redoStack.length > 0) {
    // Save current version to undo stack
    undoStack.push(textArea.value);
    // Reapply the undone version
    const nextVersion = redoStack.pop();
    textArea.value = nextVersion;
    // Display counts
    charCount();
    wordCount();
    lineCount();
  }
}

// Count all characters
function charCount() {
  const charCount = textArea.value.length + 1;
  charCountDisplay.textContent = charCount;
}

// Count all words
function wordCount() {
  const wordCount = textArea.value.split(" ").length;
  wordCountDisplay.textContent = wordCount;
}

// Count all lines
function lineCount() {
  const lineCount = textArea.value.split("\n").length;
  lineCountDisplay.textContent = lineCount;
}

// Functional Buttons
clearBtn.addEventListener("click", clear);
lowercaseBtn.addEventListener("click", lowercase);
titleCaseBtn.addEventListener("click", titleCase);
uppercaseBtn.addEventListener("click", uppercase);
undoBtn.addEventListener("click", undo);
redoBtn.addEventListener("click", redo);

// Count Displays
textArea.addEventListener("input", () => {
  // Push current version of the textArea into the undoStack to make a copy of it
  undoStack.push(textArea.value);
  // Clear the redoStack because of this new change
  redoStack = [];
  charCount();
  wordCount();
  lineCount();
});
