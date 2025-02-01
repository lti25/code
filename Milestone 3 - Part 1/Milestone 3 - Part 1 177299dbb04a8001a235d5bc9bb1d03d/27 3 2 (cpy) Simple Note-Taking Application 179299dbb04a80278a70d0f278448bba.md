# 27.3.2 (cpy) Simple Note-Taking Application

⚠️1 test case failed out of 3.

**D27_S3_A2_Simple Note-Taking Application**

# notes.js

```jsx
// Initialization on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('addNoteButton').addEventListener('click', addNote);
});

// addNote Function
function addNote() {
  const noteField = document.getElementById('note'); // Ensure this matches the ID in the test case
  const notesDisplay = document.getElementById('notesDisplay');
  const noteValue = noteField.value.trim();

  if (noteValue === '') {
      alert('Please enter a valid note.');
      return;
  }

  // Create a new div element for the note
  const noteDiv = document.createElement('div');
  noteDiv.className = 'note';
  noteDiv.innerText = noteValue;

  // Add the new note to the notes display area
  notesDisplay.appendChild(noteDiv);

  // Clear the text area
  noteField.value = '';
}

// Export addNote function for testing
module.exports = { addNote };

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { addNote };
}

```

# notes.html

```jsx
<!-- //doto: complete missing code..
//create div element with  id="notesDisplay" 
//create button with id="addNoteBtn"
//create textarea id="note"
//create form with id="noteForm" -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Note Taker</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div>
        <h1>Note Taker</h1>
        <textarea id="note" placeholder="Enter your note here..."></textarea>
        <button id="addNoteButton">Add Note</button>
        <div id="notesDisplay"></div>
    </div>
    <script src="note.js"></script>
</body>
</html>

```