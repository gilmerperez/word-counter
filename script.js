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
  sentenceCountDisplay.textContent = 0;
  lineCountDisplay.textContent = 0;
}

// Lowercase everything
function lowercase() {
  textArea.value = textArea.value.toLowerCase().trim();
}

// Uppercase everything
function uppercase() {
  textArea.value = textArea.value.toUpperCase().trim();
}

// Title case capitalizes the first letter of every major word, unless they are minor words at the start or end
function titleCase() {
  // List of minor words to ignore
  const minorWords = [
    "a",
    "an",
    "and",
    "but",
    "for",
    "nor",
    "or",
    "so",
    "the",
    "to",
    "in",
    "on",
    "at",
    "by",
    "as",
    "up",
    "of",
    "from",
  ];
  // Lowercase everything and trim whitespace
  const lowercase = textArea.value.toLowerCase().trim();
  // Separate the content into an array of words
  const words = lowercase.split(" ");
  // Loop through each word and uppercase the first character, unless it's a minor word
  for (let i = 0; i < words.length; i++) {
    // Check if word is not in the minorWords list and if it's the first or last word
    if (!minorWords.includes(words[i]) || i === 0 || i === words.length - 1) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
  }
  // Join the words back together and trim any whitespace
  textArea.value = words.join(" ").trim();
}

// Sentence case only capitalizes the first word in every sentence
function sentenceCase() {
  // Lowercase everything and trim whitespace
  const lowercase = textArea.value.toLowerCase().trim();
  // Split the text into sentences and their punctuation
  const parts = lowercase.split(/([.!?])\s*/).filter(Boolean);
  // Rebuild the sentences with proper capitalization and spacing
  let result = "";
  for (let i = 0; i < parts.length; i += 2) {
    const sentence = parts[i].trim();
    const punctuation = parts[i + 1] || "";
    if (sentence.length > 0) {
      const capitalized = sentence.charAt(0).toUpperCase() + sentence.slice(1);
      result = result + capitalized + punctuation + " ";
    }
  }
  // Trim any whitespace and update the text area
  textArea.value = result.trim();
}

// Capitalized case capitalizes every word, no exceptions
function capitalizedCase() {
  // Lowercase everything and trim whitespace
  const lowercase = textArea.value.toLowerCase().trim();
  // Split words by one or more spaces
  const words = lowercase.split(/\s+/);
  // Capitalize every word
  for (let i = 0; i < words.length; i++) {
    if (words[i]) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
  }
  // Join the words back together and trim any whitespace
  textArea.value = words.join(" ").trim();
}

// Inverse case flips the case of each letter
function inverseCase() {
  let output = "";
  // Get each character
  for (let i = 0; i < textArea.value.length; i++) {
    const char = textArea.value[i];
    // If character is lowercase, convert to uppercase
    if (char === char.toLowerCase() && char !== char.toUpperCase()) {
      output += char.toUpperCase();
      // If character is uppercase, convert to lowercase
    } else if (char === char.toUpperCase() && char !== char.toLowerCase()) {
      output += char.toLowerCase();
      // If character is a symbol, leave it
    } else {
      output = output + char;
    }
  }
  // Trim any whitespace and update the text area
  textArea.value = output.trim();
}

// Alternating case switches between lowercase and uppercase every other letter
function alternatingCase() {
  let output = "";
  let shouldUppercase = false;
  // Get each character
  for (let i = 0; i < textArea.value.length; i++) {
    const char = textArea.value[i];
    // Check if the character is a letter
    if (char.toLowerCase() !== char.toUpperCase()) {
      if (shouldUppercase) {
        output = output + char.toUpperCase();
      } else {
        output = output + char.toLowerCase();
      }
      shouldUppercase = !shouldUppercase; // Flip the flag
    } else {
      output = output + char; // Preserve symbols and whitespace
    }
  }
  // Trim any whitespace and update the text area
  textArea.value = output.trim();
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
function sentenceCount() {
  const sentences = textArea.value.match(/[^.!?]+[.!?]+(\s|$)/g);
  if (sentences) {
    sentenceCountDisplay.textContent = sentences.length;
  } else {
    sentenceCountDisplay.textContent = 0;
  }
}

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
  // Display counts
  charCount();
  wordCount();
  sentenceCount();
  lineCount();
});
