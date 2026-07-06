const img1 = document.getElementById("image1");
const img2 = document.getElementById("image2");

const slider = document.getElementById("opacitySlider");
const opacityValue = document.getElementById("opacityValue");
const photo2 = document.getElementById("photo2");

// Initialize slider
photo2.style.opacity = slider.value;
opacityValue.textContent = Math.round(slider.value * 100) + "%";

// Update opacity
slider.addEventListener("input", () => {
    photo2.style.opacity = slider.value;
    opacityValue.textContent = Math.round(slider.value * 100) + "%";
});

// Function to load an image and update the input style
function loadImage(input, imageId) {
    input.classList.remove("success", "error");

    const file = input.files[0];

    if (!file) {
        input.classList.add("error");
        return;
    }

    const img = document.getElementById(imageId);

    img.onload = () => {
        input.classList.add("success");
    };

    img.onerror = () => {
        input.classList.add("error");
    };

    img.src = URL.createObjectURL(file);
}

// File input listeners
img1.addEventListener("change", () => {
    loadImage(img1, "photo1");
});

img2.addEventListener("change", () => {
    loadImage(img2, "photo2");
});