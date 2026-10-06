// ===============================
// SEARCH FUNCTION
// ===============================

const searchInput = document.getElementById("searchInput");
const restaurantCards = document.querySelectorAll(".restaurant-card");

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const searchText = searchInput.value.toLowerCase();

        restaurantCards.forEach(function (card) {

            const restaurantName = card
                .querySelector("h3")
                .textContent
                .toLowerCase();

            const restaurantType = card
                .querySelector("p")
                .textContent
                .toLowerCase();

            if (
                restaurantName.includes(searchText) ||
                restaurantType.includes(searchText)
            ) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });

}


// ===============================
// CATEGORY FILTER
// ===============================

const categoryCards = document.querySelectorAll(".category-card");

categoryCards.forEach(function (category) {

    category.addEventListener("click", function () {

        const selectedCategory = category
            .getAttribute("data-category")
            .toLowerCase();

        restaurantCards.forEach(function (card) {

            const restaurantType = card
                .querySelector("p")
                .textContent
                .toLowerCase();

            if (restaurantType.includes(selectedCategory)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });

});


// ===============================
// OPEN RESTAURANT
// ===============================

function openRestaurant(restaurant) {

    window.location.href =
        `restaurant.html?restaurant=${restaurant}`;

}


// ===============================
// RESTAURANT DATA
// ===============================

const restaurantData = {

    pizza: {
        name: "Pizza Palace",
        cuisine: "Pizza, Italian, Fast Food",
        location: "Delhi • 2.5 km away",
        rating: "★ 4.5",
        price: "₹250",
        delivery: "25 min"
    },

    burger: {
        name: "Burger House",
        cuisine: "Burgers, Fast Food",
        location: "Delhi • 3.1 km away",
        rating: "★ 4.3",
        price: "₹200",
        delivery: "20 min"
    },

    delhi: {
        name: "Delhi Kitchen",
        cuisine: "North Indian, Chinese",
        location: "Delhi • 1.8 km away",
        rating: "★ 4.6",
        price: "₹220",
        delivery: "30 min"
    },

    asian: {
        name: "Asian Bowl",
        cuisine: "Chinese, Asian, Noodles",
        location: "Delhi • 2.8 km away",
        rating: "★ 4.4",
        price: "₹180",
        delivery: "25 min"
    }

};


// ===============================
// GET RESTAURANT FROM URL
// ===============================

const urlParams = new URLSearchParams(window.location.search);

const restaurantId = urlParams.get("restaurant");


// ===============================
// SHOW RESTAURANT DETAILS
// ===============================

if (
    restaurantId &&
    restaurantData[restaurantId]
) {

    const restaurant = restaurantData[restaurantId];

    const restaurantName =
        document.getElementById("restaurantName");

    const restaurantCuisine =
        document.getElementById("restaurantCuisine");

    const restaurantLocation =
        document.getElementById("restaurantLocation");

    const restaurantRating =
        document.getElementById("restaurantRating");

    const restaurantPrice =
        document.getElementById("restaurantPrice");

    const deliveryTime =
        document.getElementById("deliveryTime");


    if (restaurantName) {
        restaurantName.textContent =
            restaurant.name;
    }

    if (restaurantCuisine) {
        restaurantCuisine.textContent =
            restaurant.cuisine;
    }

    if (restaurantLocation) {
        restaurantLocation.textContent =
            restaurant.location;
    }

    if (restaurantRating) {
        restaurantRating.textContent =
            restaurant.rating;
    }

    if (restaurantPrice) {
        restaurantPrice.textContent =
            restaurant.price;
    }

    if (deliveryTime) {
        deliveryTime.textContent =
            restaurant.delivery;
    }

}


// ===============================
// MENU DATA
// ===============================

const menuData = {

    pizza: [

        {
            name: "Margherita Pizza",
            description:
                "Classic cheese pizza with fresh tomato sauce.",
            price: 199
        },

        {
            name: "Farmhouse Pizza",
            description:
                "Loaded with fresh vegetables and cheese.",
            price: 249
        },

        {
            name: "Cheese Burst Pizza",
            description:
                "Extra cheese with a delicious crispy base.",
            price: 299
        }

    ],


    burger: [

        {
            name: "Classic Burger",
            description:
                "Juicy burger with fresh vegetables and cheese.",
            price: 149
        },

        {
            name: "Cheese Burger",
            description:
                "Classic burger loaded with melted cheese.",
            price: 179
        },

        {
            name: "Double Patty Burger",
            description:
                "Two juicy patties with cheese and fresh vegetables.",
            price: 229
        }

    ],


    delhi: [

        {
            name: "Butter Paneer",
            description:
                "Creamy paneer cooked in a rich tomato gravy.",
            price: 219
        },

        {
            name: "Dal Makhani",
            description:
                "Slow-cooked black lentils with butter and cream.",
            price: 189
        },

        {
            name: "Veg Biryani",
            description:
                "Aromatic basmati rice with fresh vegetables.",
            price: 199
        }

    ],


    asian: [

        {
            name: "Hakka Noodles",
            description:
                "Stir-fried noodles with fresh vegetables.",
            price: 169
        },

        {
            name: "Manchurian",
            description:
                "Crispy vegetable balls in spicy Manchurian sauce.",
            price: 179
        },

        {
            name: "Schezwan Noodles",
            description:
                "Spicy noodles tossed in Schezwan sauce.",
            price: 189
        }

    ]

};


// ===============================
// SHOW MENU ITEMS
// ===============================

const menuContainer =
    document.getElementById("menuContainer");


if (
    menuContainer &&
    restaurantId &&
    menuData[restaurantId]
) {

    menuData[restaurantId].forEach(function (item) {

        const menuItem =
            document.createElement("div");

        menuItem.className = "menu-item";


        menuItem.innerHTML = `

            <div>

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ${item.description}
                </p>

                <strong>
                    ₹${item.price}
                </strong>

            </div>

            <button class="add-btn">
                ADD
            </button>

        `;


        menuContainer.appendChild(menuItem);

    });

}

// ===============================
// ADD TO CART
// ===============================

let cart = JSON.parse(localStorage.getItem("zomatoCart")) || [];

const addButtons = document.querySelectorAll(".add-btn");

addButtons.forEach(function (button, index) {

    button.addEventListener("click", function () {

        const restaurantMenu = menuData[restaurantId];

        const selectedItem = restaurantMenu[index];

        const existingItem = cart.find(function (item) {
            return item.name === selectedItem.name;
        });

        if (existingItem) {

            existingItem.quantity += 1;

        } else {

            cart.push({
                name: selectedItem.name,
                price: selectedItem.price,
                quantity: 1
            });

        }

        localStorage.setItem(
            "zomatoCart",
            JSON.stringify(cart)
        );

        alert(selectedItem.name + " added to cart!");

    });

});


// ===============================
// DISPLAY CART
// ===============================

const cartContainer =
    document.getElementById("cartContainer");

const cartTotal =
    document.getElementById("cartTotal");


if (cartContainer) {

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

    } else {

        let total = 0;

        cart.forEach(function (item, index) {

            total += item.price * item.quantity;


            const cartItem =
                document.createElement("div");

            cartItem.className = "cart-item";


            cartItem.innerHTML = `

                <div>

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ₹${item.price} × ${item.quantity}
                    </p>

                </div>


                <div class="quantity-controls">

                    <button
                        onclick="decreaseQuantity(${index})"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="increaseQuantity(${index})"
                    >
                        +
                    </button>

                </div>

            `;


            cartContainer.appendChild(cartItem);

        });


        cartTotal.textContent = total;

    }

}


// ===============================
// INCREASE QUANTITY
// ===============================

function increaseQuantity(index) {

    cart[index].quantity += 1;

    localStorage.setItem(
        "zomatoCart",
        JSON.stringify(cart)
    );

    location.reload();

}


// ===============================
// DECREASE QUANTITY
// ===============================

function decreaseQuantity(index) {

    cart[index].quantity -= 1;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    localStorage.setItem(
        "zomatoCart",
        JSON.stringify(cart)
    );

    location.reload();

}

// ===============================
// GO TO CHECKOUT
// ===============================

function goToCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }

    window.location.href = "checkout.html";

}


// ===============================
// SHOW CHECKOUT ITEMS
// ===============================

const checkoutItems =
    document.getElementById("checkoutItems");

const checkoutTotal =
    document.getElementById("checkoutTotal");


if (checkoutItems) {

    let total = 0;


    cart.forEach(function (item) {

        total += item.price * item.quantity;


        const checkoutItem =
            document.createElement("div");

        checkoutItem.className =
            "checkout-item";


        checkoutItem.innerHTML = `

            <div>

                <strong>
                    ${item.name}
                </strong>

                <p>
                    ₹${item.price} × ${item.quantity}
                </p>

            </div>

            <strong>
                ₹${item.price * item.quantity}
            </strong>

        `;


        checkoutItems.appendChild(checkoutItem);

    });


    checkoutTotal.textContent = total;

}


// ===============================
// PLACE ORDER
// ===============================

function placeOrder() {

    const name =
        document.getElementById("customerName").value.trim();

    const address =
        document.getElementById("customerAddress").value.trim();

    const phone =
        document.getElementById("customerPhone").value.trim();


    if (!name || !address || !phone) {

        alert("Please fill all delivery details.");

        return;

    }


    localStorage.removeItem("zomatoCart");


  window.location.href = "order-success.html";

}
 id="j8d4qx"
// ===============================
// NAVBAR CART COUNT
// ===============================

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");

    if (!cartCount) {
        return;
    }


    let totalItems = 0;

    cart.forEach(function (item) {

        totalItems += item.quantity;

    });


    cartCount.textContent = totalItems;

}


// ===============================
// GO TO CART
// ===============================

function goToCart() {

    window.location.href = "cart.html";

}


// Update cart count
updateCartCount();



