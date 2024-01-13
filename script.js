let img1 = document.getElementById('image1')
let img2 = document.getElementById('image2')

img1.onchange = evt => {
    const [file] = img1.files
    if (file) {
      document.getElementById("photo1").src = URL.createObjectURL(file)
    }
}
img2.onchange = evt => {
    const [file] = img2.files
    if (file) {
      document.getElementById("photo2").src = URL.createObjectURL(file)
    }
}