var slider_navier_25_4 = document.getElementById('slider-navier-25-4');
var img_container_25_4 = document.getElementById('img-container-25-4');

var slider_navier_05_1 = document.getElementById('slider-navier-05-1');
var img_container_05_1 = document.getElementById('img-container-05-1');

var PathImages_navier_25_4 = [];
var PathImages_navier_05_1 = [];
for (var i = 0; i < 20; i++) {
    PathImages_navier_25_4.push("assets/navier_25_4/" + i + '.png');
    PathImages_navier_05_1.push("assets/navier_05_1/" + i + '.png');
}

var Images_navier_25_4 = [];
var Images_navier_05_1 = [];
for (var i = 0; i < PathImages_navier_05_1.length; i++) {
    img = document.createElement('img');
    img.src = PathImages_navier_25_4[i];
    img.style.width = '100%';
    img.style.height = 'auto';
    img.hidden = true;
    img_container_25_4.appendChild(img);
    Images_navier_25_4.push(img);

    img = document.createElement('img');
    img.src = PathImages_navier_05_1[i];
    img.style.width = '100%';
    img.style.height = 'auto';
    img.hidden = true;
    img_container_05_1.appendChild(img);
    Images_navier_05_1.push(img);
};

Images_navier_25_4[0].hidden = false;
Images_navier_05_1[0].hidden = false;

function updateImage_navier_25_4() {
    var imageIndex = parseInt(slider_navier_25_4.value);
    for (var i = 0; i < Images_navier_25_4.length; i++) {
        Images_navier_25_4[i].hidden = true;
    }
    Images_navier_25_4[imageIndex].hidden = false;
}

function updateImage_navier_05_1() {
    var imageIndex = parseInt(slider_navier_05_1.value);
    for (var i = 0; i < Images_navier_05_1.length; i++) {
        Images_navier_05_1[i].hidden = true;
    }
    Images_navier_05_1[imageIndex].hidden = false;
}

slider_navier_25_4.addEventListener('input', updateImage_navier_25_4);
slider_navier_05_1.addEventListener('input', updateImage_navier_05_1);
