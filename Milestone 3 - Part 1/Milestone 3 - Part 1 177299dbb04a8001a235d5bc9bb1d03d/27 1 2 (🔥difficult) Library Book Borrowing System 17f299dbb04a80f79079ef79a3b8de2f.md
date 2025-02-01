# 27.1.2 (🔥difficult) Library Book Borrowing System

**D27_S1_A2_Library Book Borrowing System**

# library.js

```tsx
// library.js
/**
* Validates the borrow form inputs.
// * @returns {boolean} True if all inputs are valid, otherwise false.
*/
function validateBorrowForm() {
  const inputs = document.querySelectorAll('.days-input');
  let isValid = true;
 
  // Loop through each input and validate
  inputs.forEach(input => {
    const value = input.value.trim();
    const bookTitle = input.dataset.book;
    // Check if the value is empty
    if (value === '') {
      alert(`Please enter a value for "${bookTitle}"`);
      isValid = false;
      return;
    }
 
    // Check if the value is a number and within the valid range (1-30)
    const days = parseInt(value, 10);
    if (isNaN(days) || days < 1 || days > 30) {
      alert(`Please enter a valid number of days (1-30) for "${bookTitle}"`);
      isValid = false;
      return;
    }
  });
 
  return isValid;
}
 
/**
* Displays a library alert when a book is successfully borrowed.
*/
function showLibraryAlert(borrowList) {
  let alertMessage = "You have successfully borrowed the following books:\n";
  borrowList.forEach(item => {
    alertMessage += `${item.bookTitle} for ${item.days} days\n`;
  });
  alert(alertMessage);
}
 
/**
* Updates the borrow display area with the borrowed books and their borrowing duration.
*/
function updateBorrowDisplay(borrowList) {
  let borrowDisplay = document.getElementById('borrowDisplay');
  borrowDisplay.innerHTML = "<h4>Borrowing Confirmation</h4><ul class='list-group'>";
  borrowList.forEach(item => {
    borrowDisplay.innerHTML += `<li class='list-group-item'>${item.bookTitle} for ${item.days} days</li>`;
  });
  borrowDisplay.innerHTML += "</ul>";
}
 
// Export functions for Jest testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { validateBorrowForm, showLibraryAlert, updateBorrowDisplay };
}
// has context menu
```