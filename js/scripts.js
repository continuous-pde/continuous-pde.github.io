var slider_navier_25_4 = document.getElementById('slider-navier-25-4');
var img_placeholder_navier_25_4 = document.getElementById('slider-image-navier-25-4');

var slider_navier_05_1 = document.getElementById('slider-navier-05-1');
var img_placeholder_navier_05_1 = document.getElementById('slider-image-navier-05-1');

var PathImages_navier_25_4 = [];
for (var i = 0; i < 20; i++) {
    PathImages_navier_25_4.push("assets/navier_25_4/" + i + '.png');
}
var PathImages_navier_05_1 = [];
for (var i = 0; i < 20; i++) {
    PathImages_navier_05_1.push("assets/navier_05_1/" + i + '.png');
}

var Images_navier_25_4 = [];
var Images_navier_05_1 = [];
for (var i = 0; i < PathImages_navier_05_1.length; i++) {
    Images_navier_25_4[i] = new Image();
    Images_navier_25_4[i].src = PathImages_navier_25_4[i];
    Images_navier_05_1[i] = new Image();
    Images_navier_05_1[i].src = PathImages_navier_05_1[i];
};

img_placeholder_navier_25_4.src = Images_navier_25_4[0].src;
img_placeholder_navier_05_1.src = Images_navier_05_1[0].src;

function updateImage_navier_25_4() {
    var imageIndex = parseInt(slider_navier_25_4.value);
    img_placeholder_navier_25_4.src = Images_navier_25_4[imageIndex].src;
}
function updateImage_navier_05_1() {
    var imageIndex = parseInt(slider_navier_05_1.value);
    img_placeholder_navier_05_1.src = PathImages_navier_05_1[imageIndex];
}

slider_navier_25_4.addEventListener('input', updateImage_navier_25_4);
slider_navier_05_1.addEventListener('input', updateImage_navier_05_1);
