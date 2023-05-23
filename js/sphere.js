import * as THREE from 'https://unpkg.com/three@v0.120.0/build/three.module.js';

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

var spheres = [];




function updateLoadingAnimation(itemsLoaded, itemsTotal) {
    // Update the loading animation based on the progress
    // You can change the scale, color, or any other properties of the loading animation
    const progress = itemsLoaded / itemsTotal;
    loadingMesh.scale.set(progress, progress, progress);
}


function loadColors(fileURL, container) {
    // Set up the scene
    const width = container.clientWidth;
    const height = container.clientWidth;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(5, width / height, 0.5, 1000);
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(width, height);
    renderer.setClearColor(0xffffff); // Set the background color to white
    container.appendChild(renderer.domElement);

    camera.position.z = 20;
    camera.position.y = 10;
    camera.position.x = 10;
    camera.lookAt(0, 0, 0);

    var sphereGeometry = new THREE.SphereGeometry(10, 128, 64);
    sphereGeometry.mergeVertices();

    var loader = new THREE.FileLoader();

    loader.load(fileURL, (data) => {
        const colorsData = JSON.parse(data);
        var colors = colorsData.face_colors[0];
        var position = colorsData.vertices;
        for (let i = 0; i < sphereGeometry.faces.length; i++) {
            var l = sphereGeometry.faces[i].a;
            var m = sphereGeometry.faces[i].b;
            var n = sphereGeometry.faces[i].c;

            sphereGeometry.faces[i].vertexColors[0] = new THREE.Color(colors[l][0], colors[l][1], colors[l][2]);
            sphereGeometry.faces[i].vertexColors[1] = new THREE.Color(colors[m][0], colors[m][1], colors[m][2]);
            sphereGeometry.faces[i].vertexColors[2] = new THREE.Color(colors[n][0], colors[n][1], colors[n][2]);

            sphereGeometry.vertices[l].x = position[l][0];
            sphereGeometry.vertices[l].y = position[l][1];
            sphereGeometry.vertices[l].z = position[l][2];

            sphereGeometry.vertices[m].x = position[m][0];
            sphereGeometry.vertices[m].y = position[m][1];
            sphereGeometry.vertices[m].z = position[m][2];

            sphereGeometry.vertices[n].x = position[n][0];
            sphereGeometry.vertices[n].y = position[n][1];
            sphereGeometry.vertices[n].z = position[n][2];

        }
        const material = new THREE.MeshBasicMaterial({vertexColors: THREE.VertexColors});
        const sphere = new THREE.Mesh(sphereGeometry, material);
        scene.add(sphere);
        spheres.push(sphere);


        let isDragging = false;
        let previousMousePosition = {
            x: 0,
            y: 0
        };

        renderer.domElement.addEventListener('mousedown', (event) => {
            isDragging = true;
            previousMousePosition = {
                x: event.offsetX,
                y: event.offsetY,
            };
        });

        renderer.domElement.addEventListener('mouseup', (event) => {
            isDragging = false;
        });

        renderer.domElement.addEventListener('mousemove', (event) => {
            if (!isDragging) return;
            const deltaMove = {
                x: event.offsetX - previousMousePosition.x,
                y: event.offsetY - previousMousePosition.y
            };

            const deltaRotationQuaternion = new THREE.Quaternion()
                .setFromEuler(new THREE.Euler(
                    toRadians(deltaMove.y * 1),
                    toRadians(deltaMove.x * 1),
                    0,
                    'XYZ'
                ));
            for(let i = 0; i < spheres.length; i++){
                spheres[i].quaternion.multiplyQuaternions(deltaRotationQuaternion, spheres[i].quaternion);
            }
            previousMousePosition = {
                x: event.offsetX,
                y: event.offsetY
            };
        });


        var slider = document.getElementById('slider_shallow_05');

        function update() {
            var imageIndex = parseInt(slider.value);
            var colors = colorsData.face_colors[imageIndex];
            for (let i = 0; i < sphereGeometry.faces.length; i++) {
                var l = sphereGeometry.faces[i].a;
                var m = sphereGeometry.faces[i].b;
                var n = sphereGeometry.faces[i].c;
                sphereGeometry.faces[i].vertexColors[0] = new THREE.Color(colors[l][0], colors[l][1], colors[l][2]);
                sphereGeometry.faces[i].vertexColors[1] = new THREE.Color(colors[m][0], colors[m][1], colors[m][2]);
                sphereGeometry.faces[i].vertexColors[2] = new THREE.Color(colors[n][0], colors[n][1], colors[n][2]);
            }
            sphereGeometry.elementsNeedUpdate = true;
        }

        slider.addEventListener('input', update);

        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }

        animate();

        window.addEventListener('resize', () => {
            // update display width and height
            var width = container.clientWidth;
            var height = container.clientWidth;
            // update camera aspect
            camera.aspect = width / height
            camera.updateProjectionMatrix()
            // update renderer
            renderer.setSize(width, height)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            renderer.render(scene, camera)
        })

    });
}

var ground_truth_container = document.getElementById('gt_container_05');
loadColors('data/shallow_05_1/groundtruth.json', ground_truth_container);

var ours_container = document.getElementById('ours_container_05');
loadColors('data/shallow_05_1/gns.json', ours_container);

var dino_container = document.getElementById('dino_container_05');
loadColors('data/shallow_05_1/dino.json', dino_container);

var mgn_container = document.getElementById('mgn_container_05');
loadColors('data/shallow_05_1/mgn.json', mgn_container);

var magnet_container = document.getElementById('magnet_container_05');
loadColors('data/shallow_05_1/magnet.json', magnet_container);


