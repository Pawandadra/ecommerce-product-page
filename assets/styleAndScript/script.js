document.addEventListener("DOMContentLoaded", function () {
    let radios = document.querySelectorAll('input[type="radio"]'); 
    let images = document.getElementsByClassName("productMainImages");
    const cartBox = document.getElementById("cartBox");
    const emptyBox = document.getElementById("outerEmptyBox");
    const cartWithItems = document.getElementById("outerCheckoutBox");
    const discountPrice = 125.00;

    function updateOpacity() {
        radios.forEach(function(radio) {
            let wrapper = radio.closest('label').querySelector('.imageWrapper');
            let img = wrapper.querySelector('img');
            if (radio.checked) {
                img.style.opacity = "25%";
                wrapper.classList.add('selected');
            } else {
                img.style.opacity = "100%";
                wrapper.classList.remove('selected');
            }
        });
    }

    function updateImages() {
        // Hide all images
        for (let i = 0; i < images.length; i++) {
            images[i].classList.remove("show");
        }

        // Show the selected image
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                images[i].classList.add("show");
            }
        }
    }

    radios.forEach(function(radio) {
        radio.addEventListener('change', updateImages);
    });

    // Initial update in case a radio button is pre-selected
    updateImages();

    radios.forEach(function(radio) {
        radio.addEventListener('change', updateOpacity);
    });
    
    // Initial update in case a radio button is pre-selected
    updateOpacity();

    let i = 0;
    let quantity = 0;
    let cartQuantity = document.getElementsByClassName("quantity");
    let totalCost = 0;
    const updateDisplay = () => {
        document.getElementById("number").textContent = i;
    };

    window.increment = () => {
        i++;
        updateDisplay();
    };

    window.decrement = () => {
        if (i > 0) {
            i--;
        }
        updateDisplay();
    };

    window.addToCart = () => {
        if(i == 0){
            showErr();
        } else {
            quantity = i;
            for(let k=0; k<cartQuantity.length; k++){
                cartQuantity[k].innerHTML = quantity;
            }
            emptyBox.style.display = "none";
            cartWithItems.style.display = "flex";
            document.getElementById("cartNo").style.display = "block";
            finalPrice();
        }
    }

    window.finalPrice = () => {
        totalCost = quantity*discountPrice;
        document.getElementById("finalPrice").innerHTML = " $" + totalCost.toFixed(2);
    }
    // Initial display update
    updateDisplay();

    // Cart
    window.displayCart = () => {
        if(cartBox.classList.contains("visible")){
            cartBox.classList.remove("visible");
        } else {
            cartBox.classList.add("visible");
        }
    };

    document.addEventListener("click", function(event) {
        const cart = document.getElementById("cart");
        const cartBox = document.getElementById("cartBox");
        const addToCartBar = document.getElementById("addToCartBar");
        const noOfItems = document.getElementById("noOfItems");
        if (!cart.contains(event.target) &&
            !addToCartBar.contains(event.target) &&
            !cartBox.contains(event.target) &&
            !noOfItems.contains(event.target)) {
            cartBox.classList.remove("visible");
        }
    });

    let discountedPrice = "$" + discountPrice.toFixed(2);
    let priceElements = document.getElementsByClassName("discountedPrice");

    for (let j=0; j<priceElements.length; j++){
        priceElements[j].innerHTML = discountedPrice;
    }

    window.deleteItem = () => {
        emptyBox.style.display = "flex";
        cartWithItems.style.display = "none";
        document.getElementById("cartNo").style.display = "none";
        i = 0;
        updateDisplay();
    }

    function showErr() {
        const toastContainer = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.id = 'toastMsg';
        toast.innerHTML = `
            <span id="main">
                <span id="toastHeading">Error!</span>
            </span>
            <p id="toastSubheading">Quantity can't be <b>zero</b></p>
        `;
        toastContainer.appendChild(toast);

        setTimeout(function() {
            toast.style.top = '2rem';
        }, 100);
    
        setTimeout(function() {
            toast.style.top = '-7rem';
            setTimeout(function() {
                toast.remove();
            },500); 
        }, 3000);
    }
});

