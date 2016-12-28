var SIZE_EARTH = 3;
var SIZE_MOON = SIZE_EARTH * 0.27;

var scene = new THREE.Scene();

var aspect = window.innerWidth / window.innerHeight;

var camera = new THREE.PerspectiveCamera(
    50,
    aspect
);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var textures = {
    earth: new THREE.TextureLoader().load( "earth.jpg" ),
    moon: new THREE.TextureLoader().load("moon.jpg"),
    sky: new THREE.TextureLoader().load("sky.jpg"),
    sun: new THREE.TextureLoader().load("sun.jpg")
};

var materials = {
    earth: new THREE.MeshPhongMaterial({ map: textures.earth }),
    moon: new THREE.MeshPhongMaterial({ map: textures.moon }),
    sky: new THREE.MeshBasicMaterial({ map: textures.sky, side: THREE.BackSide }),
    sun: undefined
};

var moonGeometry = new THREE.SphereGeometry(SIZE_MOON, 16, 16);
var moon = new THREE.Mesh(moonGeometry, materials.moon);
moon.position.x = 10;

var moonPivot = new THREE.Object3D();

var skyGeometry = new THREE.SphereGeometry(1000, 8, 8);
var sky = new THREE.Mesh(skyGeometry, materials.sky);
sky.position.z = 0;

scene.add(sky);


var earthGeometry = new THREE.SphereGeometry(SIZE_EARTH, 32, 32);
var earth = new THREE.Mesh( earthGeometry, materials.earth);
earth.position.z += 80;
scene.add(earth);

moonPivot.add(moon);
earth.add(moonPivot);

var axis = new THREE.AxisHelper(10);
scene.add(axis);

var ambLight = new THREE.AmbientLight(0x404040);
scene.add(ambLight);

var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-100, 0, -10);
scene.add(light);

// doesn't matter as much for orthographic, as long as the scene is inside the clipping planes
camera.position.z = 100;

var render = function () {
    requestAnimationFrame( render );

    sky.rotation.y += 0.0001;
    earth.rotation.y += 0.01;
    moonPivot.rotation.y += 0.01;

    renderer.render(scene, camera);
};

render();
