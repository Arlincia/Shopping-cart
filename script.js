
// Array to hold cart items
let cartItems = [];

// Function to add item to the cart
function addToCart(itemName, itemPrice) {
  const quantityInput = event.target.parentElement.previousElementSibling;
  const quantity = parseInt(quantityInput.value);
  if (quantity > 0) {
    const colorInput = event.target.parentElement.querySelector(".color-input");
    const color = colorInput ? colorInput.value : "";

    const item = {
      name: itemName,
      color: color,
      price: itemPrice,
      quantity: quantity,
    };
    cartItems.push(item);
    updateCart();
    quantityInput.value = 1;
    if (colorInput) {
      colorInput.value = "";
    }
  }
}

// Function to remove item from the cart
function removeFromCart(index) {
  cartItems.splice(index, 1);
  updateCart();
}

// Function to update the cart in the off-canvas shopping cart
function updateCart() {
  const cartItemsDiv = document.getElementById("cartItems");
  cartItemsDiv.innerHTML = "";
  let totalAmount = 0;

  cartItems.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");

    const itemTitle = document.createElement("p");
    itemTitle.textContent = item.name;
    itemDiv.appendChild(itemTitle);

    const itemQuantity = document.createElement("input");
    itemQuantity.type = "number";
    itemQuantity.classList.add("cart-quantity-input");
    itemQuantity.placeholder = "Number of Items";
    itemQuantity.min = "1";
    itemQuantity.value = item.quantity;
    itemQuantity.addEventListener("input", () => {
      updateCart();
    });
    itemDiv.appendChild(itemQuantity);

    const itemPrice = document.createElement("small");
    itemPrice.classList.add("text-body-secondary");
    itemPrice.textContent = "R " + (item.price * item.quantity).toFixed(2);
    itemDiv.appendChild(itemPrice);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("btn", "btn-outline-secondary");
    removeButton.onclick = function () {
      removeFromCart(index);
    };
    itemDiv.appendChild(removeButton);

    cartItemsDiv.appendChild(itemDiv);

    totalAmount += item.price * item.quantity;
  });

  const cartTotalSpan = document.getElementById("cartTotal");
  cartTotalSpan.textContent = "R " + totalAmount.toFixed(2);

}

// Call updateCart initially to display an empty cart
updateCart();
