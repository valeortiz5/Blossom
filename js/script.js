/* =========================================
   VARIABLES
========================================= */

let cart = [];

let selectedColor = "Rosa";


/* =========================================
   AÑO AUTOMÁTICO
========================================= */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* =========================================
   CERRAR TOP BAR
========================================= */

const closeTopBar = document.getElementById("closeTopBar");

closeTopBar.addEventListener("click", function () {

    document.querySelector(".top-bar").style.display = "none";

});


/* =========================================
   MENÚ MÓVIL
========================================= */

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", function () {

    navbar.classList.toggle("open");

});


/* Cerrar menú al seleccionar una opción */

document.querySelectorAll(".navbar a").forEach(link => {

    link.addEventListener("click", function () {

        navbar.classList.remove("open");

    });

});


/* =========================================
   MODAL DISEÑAR ARREGLO
========================================= */

const designModal = document.getElementById("designModal");

const designBtn = document.getElementById("designBtn");

const closeModal = document.getElementById("closeModal");

designBtn.addEventListener("click", function () {

    designModal.classList.add("show");

});


closeModal.addEventListener("click", function () {

    designModal.classList.remove("show");

});


/* Cerrar modal haciendo click afuera */

designModal.addEventListener("click", function (event) {

    if (event.target === designModal) {

        designModal.classList.remove("show");

    }

});


/* =========================================
   PERSONALIZAR ARREGLO
========================================= */

const flowerSelect =
    document.getElementById("flowerSelect");

const arrangementSelect =
    document.getElementById("arrangementSelect");

const designResult =
    document.getElementById("designResult");


function updateDesign() {

    const flower = flowerSelect.value;

    const arrangement = arrangementSelect.value;

    designResult.textContent =
        `${arrangement} de ${flower.toLowerCase()} color ${selectedColor.toLowerCase()}`;

}


flowerSelect.addEventListener(
    "change",
    updateDesign
);


arrangementSelect.addEventListener(
    "change",
    updateDesign
);


/* =========================================
   COLORES
========================================= */

document.querySelectorAll(".color").forEach(color => {

    color.addEventListener("click", function () {

        document
            .querySelectorAll(".color")
            .forEach(item => {
                item.classList.remove("selected");
            });

        this.classList.add("selected");

        selectedColor = this.dataset.color;

        updateDesign();

    });

});


/* Seleccionar rosa inicialmente */

document
    .querySelector(".color.pink")
    .classList.add("selected");


/* =========================================
   FAVORITOS
========================================= */

document.querySelectorAll(".favorite").forEach(button => {

    button.addEventListener("click", function () {

        this.classList.toggle("active");

        if (this.classList.contains("active")) {

            this.textContent = "♥";

        } else {

            this.textContent = "♡";

        }

    });

});


/* =========================================
   AGREGAR PRODUCTOS AL CARRITO
========================================= */

document.querySelectorAll(".add-cart").forEach(button => {

    button.addEventListener("click", function () {

        const card =
            this.closest(".product-card");

        const name =
            card.querySelector("h3").textContent;

        const price =
            parseFloat(
                card.querySelector(".product-price")
                    .textContent
                    .replace("$", "")
            );

        const image =
            card.querySelector("img").src;


        addToCart(name, price, image);

    });

});


/* =========================================
   FUNCIÓN AGREGAR CARRITO
========================================= */

function addToCart(name, price, image) {

    const product = {

        name: name,

        price: price,

        image: image

    };


    cart.push(product);


    updateCart();


    /* Abrir carrito */

    document
        .getElementById("cartPanel")
        .classList.add("open");

}


/* =========================================
   ACTUALIZAR CARRITO
========================================= */

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const cartTotal =
        document.getElementById("cartTotal");


    cartCount.textContent = cart.length;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Tu carrito está vacío 🌸
            </p>
        `;

        cartTotal.textContent = "0.00";

        return;
    }


    cartItems.innerHTML = "";


    let total = 0;


    cart.forEach((product, index) => {

        total += product.price;


        const item = document.createElement("div");

        item.classList.add("cart-item");


        item.innerHTML = `

            <img src="${product.image}"
                 alt="${product.name}">

            <div class="cart-item-info">

                <h4>${product.name}</h4>

                <p>$${product.price.toFixed(2)}</p>

            </div>

            <button
                class="remove-item"
                data-index="${index}">
                ×
            </button>

        `;


        cartItems.appendChild(item);

    });


    cartTotal.textContent =
        total.toFixed(2);


    /* Eventos para eliminar */

    document
        .querySelectorAll(".remove-item")
        .forEach(button => {

            button.addEventListener("click", function () {

                const index =
                    parseInt(this.dataset.index);

                cart.splice(index, 1);

                updateCart();

            });

        });

}


/* =========================================
   ABRIR / CERRAR CARRITO
========================================= */

const cartBtn =
    document.getElementById("cartBtn");

const cartPanel =
    document.getElementById("cartPanel");

const closeCart =
    document.getElementById("closeCart");


cartBtn.addEventListener("click", function () {

    cartPanel.classList.add("open");

});


closeCart.addEventListener("click", function () {

    cartPanel.classList.remove("open");

});


/* =========================================
   AGREGAR ARREGLO PERSONALIZADO
========================================= */

document
    .getElementById("addDesign")
    .addEventListener("click", function () {

        const flower =
            flowerSelect.value;

        const arrangement =
            arrangementSelect.value;


        const name =
            `${arrangement} personalizado de ${flower}`;


        const image =
            "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=600&q=80";


        /* Precio de ejemplo */

        const price = 42;


        addToCart(name, price, image);


        designModal.classList.remove("show");

    });


/* =========================================
   FILTRO DE OCASIONES
========================================= */

const occasions =
    document.querySelectorAll(".occasion");

const products =
    document.querySelectorAll(".product-card");


occasions.forEach(button => {

    button.addEventListener("click", function () {

        /* Quitar active */

        occasions.forEach(item => {

            item.classList.remove("active");

        });


        this.classList.add("active");


        const filter =
            this.dataset.filter;


        products.forEach(product => {

            const category =
                product.dataset.category;


            if (
                filter === "Todos" ||
                category === filter
            ) {

                product.classList.remove("hidden");

            } else {

                product.classList.add("hidden");

            }

        });

    });

});


/* =========================================
   BOTONES DE COLECCIONES
========================================= */

document
    .querySelectorAll(".collection-btn")
    .forEach(button => {

        button.addEventListener("click", function () {

            const category =
                this.dataset.category;


            document
                .querySelectorAll(".occasion")
                .forEach(occasion => {

                    occasion.classList.remove("active");

                    if (
                        occasion.dataset.filter === category
                    ) {

                        occasion.classList.add("active");

                    }

                });


            products.forEach(product => {

                if (
                    product.dataset.category === category
                ) {

                    product.classList.remove("hidden");

                } else {

                    product.classList.add("hidden");

                }

            });


            document
                .getElementById("tienda")
                .scrollIntoView({
                    behavior: "smooth"
                });

        });

    });


/* =========================================
   BUSCADOR
========================================= */

const searchBtn =
    document.getElementById("searchBtn");

const searchOverlay =
    document.getElementById("searchOverlay");

const closeSearch =
    document.getElementById("closeSearch");

const searchInput =
    document.getElementById("searchInput");

const searchMessage =
    document.getElementById("searchMessage");


searchBtn.addEventListener("click", function () {

    searchOverlay.classList.add("show");

    searchInput.focus();

});


closeSearch.addEventListener("click", function () {

    searchOverlay.classList.remove("show");

});


/* Buscar */

searchInput.addEventListener("input", function () {

    const search =
        this.value.toLowerCase().trim();


    if (search === "") {

        searchMessage.textContent = "";

        return;

    }


    let found = [];


    products.forEach(product => {

        const name =
            product.querySelector("h3")
                .textContent
                .toLowerCase();

        const category =
            product.dataset.category
                .toLowerCase();


        if (
            name.includes(search) ||
            category.includes(search)
        ) {

            found.push(
                product.querySelector("h3").textContent
            );

        }

    });


    if (found.length > 0) {

        searchMessage.innerHTML =
            `Encontramos: <strong>${found.join(", ")}</strong>`;

    } else {

        searchMessage.textContent =
            "No encontramos resultados. Prueba con otra palabra 🌸";

    }

});


/* =========================================
   NEWSLETTER
========================================= */

document
    .getElementById("newsletterForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();


        const email =
            document.getElementById("email").value;


        alert(
            `¡Gracias! ${email} ha sido suscrito a nuestro boletín 🌸`
        );


        this.reset();

    });


/* =========================================
   CUENTA
========================================= */

document
    .getElementById("accountBtn")
    .addEventListener("click", function () {

        alert(
            "La sección de cuenta estará disponible próximamente."
        );

    });