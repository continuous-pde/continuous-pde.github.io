var slider_navier_25_4 = document.getElementById('slider-navier-25-4');
var sliderImage_navier_25_4 = document.getElementById('slider-image-navier-25-4');
var images_navier_25_4 = [];
for (var i = 0; i < 20; i++) {
    images_navier_25_4.push("assets/navier_25_4/" + i + '.png');
}
var imagePromises_navier_25_4 = images_navier_25_4.map(function (imagePath) {
    return new Promise(function (resolve, reject) {
        var image = new Image();
        image.onload = resolve;
        image.onerror = reject;
        image.src = imagePath;
    });
});

function updateImage_navier_25_4() {
    var imageIndex = parseInt(slider_navier_25_4.value);
    sliderImage_navier_25_4.src = images_navier_25_4[imageIndex];
}

slider_navier_25_4.addEventListener('input', updateImage_navier_25_4);
Promise.all(imagePromises_navier_25_4)
    .then(updateImage_navier_25_4)
    .catch(function (error) {
        console.error('Error loading images_navier_25_4:', error);
    });

//
//
//

var slider_navier_05_1 = document.getElementById('slider-navier-05-1');
var sliderImage_navier_05_1 = document.getElementById('slider-image-navier-05-1');
var images_navier_05_1 = [];
for (var i = 0; i < 20; i++) {
    images_navier_05_1.push("assets/navier_05_1/" + i + '.png');
}
var imagePromises_navier_05_1 = images_navier_05_1.map(function (imagePath) {
    return new Promise(function (resolve, reject) {
        var image = new Image();
        image.onload = resolve;
        image.onerror = reject;
        image.src = imagePath;
    });
});

function updateImage_navier_05_1() {
    var imageIndex = parseInt(slider_navier_05_1.value);
    sliderImage_navier_05_1.src = images_navier_05_1[imageIndex];
}

slider_navier_05_1.addEventListener('input', updateImage_navier_05_1);
Promise.all(imagePromises_navier_05_1)
    .then(updateImage_navier_05_1)
    .catch(function (error) {
        console.error('Error loading images_navier_05_1:', error);
    });

