# 27.1.1 …..(CW difficult🔥🔥) Design a simple webpage for an online shopping cart

**D27_S1_A1_Design a simple webpage for an online shopping cart**

[chirag code](27%201%201%20%E2%80%A6%20(CW%20difficult%F0%9F%94%A5%F0%9F%94%A5)%20Design%20a%20simple%20webpage%20%20178299dbb04a80ac96b4c28eeccad343/chirag%20code%20178299dbb04a80ce926ff9cbf5559605.md)

```jsx
// Ayush code with error
const cart = [];

function addToCart(item){

  const quantity = document.getElementById(item.toLowerCase()).value;

  if(quantity > 0){
    cart.push({item, quantity});

    showAlert(`${item} added to cart`, "success");
  }else{
    showAlert("Please enter a valid quantity");
  }
}

function updateCartDisplay(){
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = '';

  cart.forEach( ( {item, quantity} ) => {
    const li = document.createElement("li");

    li.classList.add('list-group-item');
    li.textContent = `${item}: ${quantity}`;
    cartItems.appendChild(li);
  } )
}

function validateForm(){
  const item1Quantity = parseInt(document.getElementById("apple").value);
  const item2Quantity = parseInt(document.getElementById("banana").value);
  const item3Quantity = parseInt(document.getElementById("orange").value);

  if(isNaN(item1Quantity) || item1Quantity < 0 ){
    showAlert("Invalid quantity entered for Apple", "danger");
    return;
  }
  
  if(isNaN(item2Quantity) || item2Quantity < 0 ){
    showAlert("Invalid quantity entered for Banana", "danger");
    return;
  }
  
  if(isNaN(item3Quantity) || item3Quantity < 0 ){
    showAlert("Invalid quantity entered for Orange", "danger");
    return;
  }

  showAlert("Proceeding to checkout. Thank you!", "succes");

  const fruits = ["Apple", "Banana", "Orange", "Mongo", "Grapes" ];
  const randomFruit = fruits[Math.floor(Math.random() * fruits.length )];
  showAlert(`Randomly select fruit: ${randomFruit}`, "info");
  
  changeBackgroundColor();
  updateCartDisplay();
}

function showAlert(message, type){
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
  alertDiv.role = 'alert';
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&time;</span>
    </button>
  `;
}

const container = document.querySelector('.container');
container.insertBefore(alertDiv, container.firstChild);

setTimeout(() => {
  
  alertDiv.classList.remove("show");
  alertDiv.classList.add("fade");
  
  setTimeout(() => {
    alertDiv.remove();
  }, 500);

}, 3000);

function changeBackgroundColor(){
  const randomColor = Math.floor(Math.random(16777215).toString(16)); // random hex color
  document.body.style.backgroundColor = '#' + randomColor;
}

//dont remove this section
module.exports = {
  validateForm,
  addToCart,
  showAlert
};

```