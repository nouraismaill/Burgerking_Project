const cartIcon = document.querySelector("#cart-Icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");
cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});
closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
});
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}
function start() {
  addEvents();
}

function update() {
  addEvents();
  updateTotal();
}

function addEvents() {
  let CartRemove_btns = document.querySelectorAll(".Cart-Remove");
  console.log(CartRemove_btns);
  CartRemove_btns.forEach((btn) => {
    btn.addEventListener("click", handle_removeCartItem);
  });

  let cartQuantity_inputs = document.querySelectorAll(".Cart-Quantity");
  cartQuantity_inputs.forEach((input) => {
    input.addEventListener("change", handle_changeItemQuantity);
  });

  let addCart_btns = document.querySelectorAll("#add-cart");
  addCart_btns.forEach((btn) => {
    btn.addEventListener("click", handle_addCartItem);
  });
  const buy_btn = document.querySelector(".btn-Buy");
  buy_btn.addEventListener("click", handle_buyOrder);
}
let itemsAdded = [];
function handle_addCartItem() {
  let product = this.parentElement;
  let title = product.querySelector(" .product-title").innerHTML;
  let price = product.querySelector(" .price").innerHTML;
  let imgSrc = product.querySelector(" .product-img").src;
  console.log(title, price, imgSrc);
  let newToAdd = {
    title,
    price,
    imgSrc,
  };
  if (itemsAdded.find((el) => el.title == newToAdd.title)) {
    alert("This Item Is Already Exist!");
    return;
  } else {
    itemsAdded.push(newToAdd);
  }
  let cartBoxElement = CartBoxComponent(title, price, imgSrc);
  let newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  const CartContent = cart.querySelector(".cart-content");
  CartContent.appendChild(newNode);
  update();
}

function handle_removeCartItem() {
  this.parentElement.remove();
  itemsAdded = itemsAdded.filter(
    (el) =>
      el.title !=
      this.parentElement.querySelector(".cart-products-title").innerHTML
  );
  update();
}
function handle_changeItemQuantity() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  this.value = Math.floor(this.value);
  update();
}
function handle_buyOrder() {
  if (itemsAdded.length <= 0) {
    alert("There is No Order to place Yet! \n Please Make an Order first.");
    return;
  }
  const cartcontent = cart.querySelector(".cart-content");
  cartcontent.innerHTML = "";
  alert("Your order is Placed Successfully:)");
  itemsAdded = [];
  update();
}
function updateTotal() {
  let cartBoxes = document.querySelectorAll(".cart-box");
  const totalElement = cart.querySelector(".total-Price");
  let total = 0;
  cartBoxes.forEach((cartBox) => {
    let priceElement = cartBox.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerHTML.replace("$", ""));
    let quantity = cartBox.querySelector(".Cart-Quantity").value;
    total += price * quantity;
  });
  total = total.toFixed(2);
  totalElement.innerHTML = "$" + total;
}
function CartBoxComponent(title, price, imgSrc) {
  return `
    
     <div class ="cart-box">
      <img src= ${imgSrc} alt="" class="cart-img">
      <div class="detail-box">
          <div class="cart-products-title">${title}</div>
          <div class="cart-price">${price}</div>
          <input type="number" value="1" class="Cart-Quantity">
      </div>
             <i class="fa-solid fa-trash Cart-Remove" style="color: #310404;"></i>
     </div>`;
}
