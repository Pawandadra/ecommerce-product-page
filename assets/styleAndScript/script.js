document.addEventListener("DOMContentLoaded", function () {
    let radios = document.querySelectorAll('input[type="radio"]'); 
    let images = document.getElementsByClassName("productMainImages");
    const cartBox = document.getElementById("cartBox");
    const emptyBox = document.getElementById("outerEmptyBox");
    const cartWithItems = document.getElementById("outerCheckoutBox");
    const mainImages = document.getElementById("productMainImages");
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxThumbnails = document.querySelectorAll('.lightbox-thumbnail');
    const discountPrice = 125.00;
    let currentImageIndex = 0;

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

    let currentMainImgIndex = 0;
    window.changeMainImg = (direction) => {
        if((currentMainImgIndex == 0 && direction == -1) ||
            (currentMainImgIndex == (images.length-1) && direction == 1)){
            return;
        }

        images[currentMainImgIndex].classList.remove("show");
        currentMainImgIndex += direction;
        images[currentMainImgIndex].classList.add("show");
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

    function openLightbox(event) {
        if (event.target.classList.contains('productMainImages')) {
            currentImageIndex = Array.from(images).indexOf(event.target);
            lightbox.style.display = 'grid';
            lightboxImg.src = event.target.src;
            updateLightboxThumbnails();
            checkViewport();
        }
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
    }

    function changeImage(direction) {
        currentImageIndex += direction;
        if (currentImageIndex < 0) {
            currentImageIndex = images.length - 1;
        } else if (currentImageIndex >= images.length) {
            currentImageIndex = 0;
        }
        lightboxImg.src = images[currentImageIndex].src;
        updateLightboxThumbnails();
    }

    function updateLightboxThumbnails() {
        lightboxThumbnails.forEach((thumbnail, index) => {
            if (index === currentImageIndex) {
                thumbnail.classList.add('selected');
            } else {
                thumbnail.classList.remove('selected');
            }
        });
    }

    function setImage(index) {
        currentImageIndex = index;
        lightboxImg.src = images[currentImageIndex].src;
        updateLightboxThumbnails();
    }
    
    mainImages.addEventListener('click', openLightbox);
    window.addEventListener('click', function(event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    window.closeLightbox = closeLightbox;
    window.changeImage = changeImage;
    window.setImage = setImage;
    
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

    const prev = document.getElementById("prev");
    const prevImg = document.getElementById("prevImg");
    const next = document.getElementById("next");
    const nextImg = document.getElementById("nextImg");
    const close = document.getElementById("close");
    const closeImg = document.getElementById("closeImg");
    const prevMain = document.getElementById("prevMain");
    const prevMainImg = document.getElementById("prevMainImg");
    const nextMain = document.getElementById("nextMain");
    const nextMainImg = document.getElementById("nextMainImg");
    const openMenu = document.getElementById("menu");
    const openMenuImg = document.getElementById("menuImg");
    const closeMenu = document.getElementById("closeMenu");
    const closeMenuImg = document.getElementById("closeMenuImg");
    
    const arrows = (eleId, event, imgId, fileName) => {
        eleId.addEventListener(event, function(){
            imgId.src = `./assets/images/${fileName}`;
        });
    }

    arrows(prev, "mouseenter", prevImg, "icon-previous-orange.svg");
    arrows(prev, "mouseleave", prevImg, "icon-previous.svg");

    arrows(next, "mouseenter", nextImg, "icon-next-orange.svg");
    arrows(next, "mouseleave", nextImg, "icon-next.svg");

    arrows(close, "mouseenter", closeImg, "icon-close-orange.svg");
    arrows(close, "mouseleave", closeImg, "icon-close.svg");

    arrows(prevMain, "mouseenter", prevMainImg, "icon-previous-orange.svg");
    arrows(prevMain, "mouseleave", prevMainImg, "icon-previous.svg");

    arrows(nextMain, "mouseenter", nextMainImg, "icon-next-orange.svg");
    arrows(nextMain, "mouseleave", nextMainImg, "icon-next.svg");

    arrows(openMenu, "mouseenter", openMenuImg, "icon-menu-orange.svg");
    arrows(openMenu, "mouseleave", openMenuImg, "icon-menu.svg");

    arrows(closeMenu, "mouseenter", closeMenuImg, "icon-close-orange.svg");
    arrows(closeMenu, "mouseleave", closeMenuImg, "icon-close.svg");



    const checkViewport = () => {
        const mainArrowBtn = document.getElementById("mainArrowBtn");
        if (window.matchMedia("(max-width: 768px)").matches) {
            mainArrowBtn.style.display = "flex";
            if(lightbox.style.display == "grid"){
                closeLightbox();
            }
        } else {
            mainArrowBtn.style.display = "none";
        }
    };
    
    checkViewport();
    window.addEventListener("resize", checkViewport);

    const menuContainer = document.getElementById("menuContainer");
    const menuSections = document.getElementById("menuSections");

    window.openMenu = () => {
        menuContainer.style.display = "flex";
        setTimeout(() => {
            menuSections.style.left = "0";
        }, 10);
    }

    window.closeMenu = () => {
        menuSections.style.left = "-100%";
        setTimeout(() => {
            menuContainer.style.display = "none";
        },500); 
    }
});