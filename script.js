const img1Input = document.getElementById("image1");
const img2Input = document.getElementById("image2");

const photo1 = document.getElementById("photo1");
const photo2 = document.getElementById("photo2");

const slider = document.getElementById("opacitySlider");
const opacityValue = document.getElementById("opacityValue");

let original1 = null;
let original2 = null;

// -------------------------
// Opacity Slider
// -------------------------

photo2.style.opacity = slider.value;
opacityValue.textContent = Math.round(slider.value * 100) + "%";

slider.addEventListener("input", () => {
    photo2.style.opacity = slider.value;
    opacityValue.textContent = Math.round(slider.value * 100) + "%";
});

// -------------------------
// Image Loading
// -------------------------

function readImage(file) {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => resolve(img);
        img.onerror = () => reject();

        img.src = URL.createObjectURL(file);
    });
}

async function loadImage(input, which) {
    input.classList.remove("success", "error");

    const file = input.files[0];

    if (!file) {
        input.classList.add("error");
        return;
    }

    try {
        const image = await readImage(file);

        if (which === 1) {
            original1 = image;
        } else {
            original2 = image;
        }

        input.classList.add("success");

        // Only compare once both images are loaded
        if (original1 && original2) {
            resizeAndDisplay();
        }

    } catch (err) {
        input.classList.add("error");
        console.error(err);
    }
}

// -------------------------
// Resize Images
// -------------------------

function resizeAndDisplay() {

    // Resize both images to the smaller dimensions
    const width = Math.min(original1.width, original2.width);
    const height = Math.min(original1.height, original2.height);

    const canvas1 = document.createElement("canvas");
    canvas1.width = width;
    canvas1.height = height;

    const ctx1 = canvas1.getContext("2d");
    ctx1.drawImage(original1, 0, 0, width, height);

    const canvas2 = document.createElement("canvas");
    canvas2.width = width;
    canvas2.height = height;

    const ctx2 = canvas2.getContext("2d");
    ctx2.drawImage(original2, 0, 0, width, height);

    photo1.src = canvas1.toDataURL("image/png");
    photo2.src = canvas2.toDataURL("image/png");
}

// -------------------------
// Event Listeners
// -------------------------

img1Input.addEventListener("change", () => loadImage(img1Input, 1));
img2Input.addEventListener("change", () => loadImage(img2Input, 2));