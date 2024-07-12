document.addEventListener("DOMContentLoaded", function () {
    let radios = document.querySelectorAll('input[type="radio"]'); 
    let images = document.getElementsByClassName("productMainImages");
     
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
            images[i].style.display = "none";
        }

        // Show the selected image
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                images[i].style.display = "block";
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

    let i = 1;

    const updateDisplay = () => {
        document.getElementById("number").textContent = i;
    };

    window.increment = () => {
        i++;
        updateDisplay();
    };

    window.decrement = () => {
        if (i > 1) {
            i--;
        }
        updateDisplay();
    };

    // Initial display update
    updateDisplay();
});

