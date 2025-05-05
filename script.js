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

function sentenceCase() {}

function capitalizedCase() {}

function inverseCase() {}

function alternatingCase() {}

// Undo last change
function undo() {
  if (undoStack.length > 0) {
    // Save current version for redo
    redoStack.push(textArea.value);
    // Revert to last state
    const previousVersion = undoStack.pop();
    textArea.value = previousVersion;
    // Display counts
    charCount();
    wordCount();
    sentenceCount();
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
    sentenceCount();
    lineCount();
  }
}

function copy() {
  // If there is content in text area
  if (textArea.value) {
    // Copy it to the clipboard
    navigator.clipboard.writeText(textArea.value);
    // Handle dynamic HTML
    copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    setTimeout(() => {
      copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
    }, 1500);
  }
}

async function paste() {
  try {
    const clipboardText = await navigator.clipboard.readText();
    if (clipboardText) {
      textArea.value = textArea.value + clipboardText;
      // Handle dynamic HTML
      pasteBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
      setTimeout(() => {
        pasteBtn.innerHTML = '<i class="fa-regular fa-paste"></i>';
      }, 1500);
    }
  } catch (error) {
    console.error("Failed to paste text:", error);
    alert("Unable to access clipboard. Please allow clipboard permissions.");
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

// Count all sentences
function sentenceCount() {}

// Count all lines
function lineCount() {
  const lineCount = textArea.value.split("\n").length;
  lineCountDisplay.textContent = lineCount;
}

// Functional Buttons
clearBtn.addEventListener("click", clear);
lowercaseBtn.addEventListener("click", lowercase);
uppercaseBtn.addEventListener("click", uppercase);
titleCaseBtn.addEventListener("click", titleCase);
sentenceCaseBtn.addEventListener("click", sentenceCase);
capitalizedCaseBtn.addEventListener("click", capitalizedCase);
inverseCaseBtn.addEventListener("click", inverseCase);
alternatingCaseBtn.addEventListener("click", alternatingCase);
undoBtn.addEventListener("click", undo);
redoBtn.addEventListener("click", redo);
copyBtn.addEventListener("click", copy);
pasteBtn.addEventListener("click", paste);

// Count Displays
textArea.addEventListener("input", () => {
  // Push current version of the textArea into the undoStack to make a copy of it
  undoStack.push(textArea.value);
  // Clear the redoStack because of this new change
  redoStack = [];
  charCount();
  wordCount();
  sentenceCount();
  lineCount();
});
