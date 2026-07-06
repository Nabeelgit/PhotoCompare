const img1Input = document.getElementById("image1");
const img2Input = document.getElementById("image2");

const photo1 = document.getElementById("photo1");
const photo2 = document.getElementById("photo2");

const slider = document.getElementById("opacitySlider");
const opacityValue = document.getElementById("opacityValue");

// Dimension controls
const dimensions1 = document.getElementById("dimensions1");
const dimensions2 = document.getElementById("dimensions2");

const widthSlider1 = document.getElementById("widthSlider1");
const widthInput1 = document.getElementById("widthInput1");
const heightSlider1 = document.getElementById("heightSlider1");
const heightInput1 = document.getElementById("heightInput1");

const widthSlider2 = document.getElementById("widthSlider2");
const widthInput2 = document.getElementById("widthInput2");
const heightSlider2 = document.getElementById("heightSlider2");
const heightInput2 = document.getElementById("heightInput2");

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

        if (which === 1) {

            dimensions1.style.display = "flex";

            widthSlider1.max = image.width;
            widthInput1.max = image.width;
            widthSlider1.value = image.width;
            widthInput1.value = image.width;

            heightSlider1.max = image.height;
            heightInput1.max = image.height;
            heightSlider1.value = image.height;
            heightInput1.value = image.height;

        } else {

            dimensions2.style.display = "flex";

            widthSlider2.max = image.width;
            widthInput2.max = image.width;
            widthSlider2.value = image.width;
            widthInput2.value = image.width;

            heightSlider2.max = image.height;
            heightInput2.max = image.height;
            heightSlider2.value = image.height;
            heightInput2.value = image.height;
        }

        // Only compare once both images are loaded
        if (original1 && original2) {
            resizeAndDisplay();
        }

    } catch (err) {
        input.classList.add("error");
        console.error(err);
    }
}

function syncControls(slider, input) {

    slider.addEventListener("input", () => {
        input.value = slider.value;

        if (original1 && original2)
            resizeAndDisplay();
    });

    input.addEventListener("input", () => {

        let value = Number(input.value);

        if (value < slider.min)
            value = slider.min;

        if (value > slider.max)
            value = slider.max;

        slider.value = value;
        input.value = value;

        if (original1 && original2)
            resizeAndDisplay();
    });

}


// -------------------------
// Resize Images
// -------------------------

function resizeAndDisplay() {

    const canvas1 = document.createElement("canvas");
    canvas1.width = Number(widthSlider1.value);
    canvas1.height = Number(heightSlider1.value);

    const ctx1 = canvas1.getContext("2d");
    ctx1.drawImage(
        original1,
        0,
        0,
        canvas1.width,
        canvas1.height
    );

    const canvas2 = document.createElement("canvas");
    canvas2.width = Number(widthSlider2.value);
    canvas2.height = Number(heightSlider2.value);

    const ctx2 = canvas2.getContext("2d");
    ctx2.drawImage(
        original2,
        0,
        0,
        canvas2.width,
        canvas2.height
    );

    photo1.src = canvas1.toDataURL("image/png");
    photo2.src = canvas2.toDataURL("image/png");
} 

// -------------------------
// Event Listeners
// -------------------------

img1Input.addEventListener("change", () => loadImage(img1Input, 1));
img2Input.addEventListener("change", () => loadImage(img2Input, 2));

syncControls(widthSlider1, widthInput1);
syncControls(heightSlider1, heightInput1);

syncControls(widthSlider2, widthInput2);
syncControls(heightSlider2, heightInput2);