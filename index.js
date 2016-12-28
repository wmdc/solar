var SIZE_EARTH = 6;
var SIZE_MERCURY = SIZE_EARTH * 0.38;
var SIZE_MOON = SIZE_EARTH * 0.27;
var SIZE_SUN = SIZE_EARTH * 109 / 2; // reduce relative size

var POSITION_SUN_Z = -300;

var scene = new THREE.Scene();

var aspect = window.innerWidth / window.innerHeight;

var camera = new THREE.PerspectiveCamera(
    50,
    aspect,
    0.1,
    10000
);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var textures = {
    earth: new THREE.TextureLoader().load("earth.jpg"),
    mercury: new THREE.TextureLoader().load("mercury.jpg"),
    moon: new THREE.TextureLoader().load("moon.jpg"),
    sky: new THREE.TextureLoader().load("sky.jpg"),
    sun: new THREE.TextureLoader().load("sun.jpg")
};

var materials = {
    earth: new THREE.MeshPhongMaterial({ map: textures.earth }),
    mercury: new THREE.MeshPhongMaterial({ map: textures.mercury }),
    moon: new THREE.MeshPhongMaterial({ color: 0xAAAAAA, map: textures.moon }),
    sky: new THREE.MeshBasicMaterial({ color: 0x444444,
				       map: textures.sky,
				       side: THREE.BackSide }),
    sun: new THREE.MeshBasicMaterial({ map: textures.sun })
};

var sunGeometry = new THREE.SphereGeometry(SIZE_SUN / 4, 64, 64);
var sun = new THREE.Mesh(sunGeometry, materials.sun);
sun.position.z = POSITION_SUN_Z;
scene.add(sun);

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
earth.position.z = 300;
var earthPivot = new THREE.Object3D();
sun.add(earthPivot);
earthPivot.add(earth);

var mercuryGeometry = new THREE.SphereGeometry(SIZE_MERCURY, 32, 32);
var mercury = new THREE.Mesh( mercuryGeometry, materials.mercury);
mercury.position.z = 100;
mercury.position.x = 100;
var mercuryPivot = new THREE.Object3D();
sun.add(mercuryPivot);
mercuryPivot.add(mercury);

moonPivot.add(moon);
earth.add(moonPivot);

var ambLight = new THREE.AmbientLight(0x404040);
scene.add(ambLight);

var light = new THREE.PointLight(0xffffff, 1);
light.position.z = POSITION_SUN_Z;
scene.add(light);

// doesn't matter as much for orthographic, as long as the scene is inside the clipping planes
camera.position.z = 100;

var render = function () {
    requestAnimationFrame( render );

    sun.rotation.y += 0.0005; // approximate rotational effect on sun
    sky.rotation.y += 0.0001; // fake galaxy rotation for interest
    earth.rotation.y += 0.01; // earth rotation around axis
    earthPivot.rotation.y += 0.003; // earth revolution around sun
    mercury.rotation.y += 0.04; // mercury rotation around axis
    mercuryPivot.rotation.y += 0.01; // mercury revolution around sun
    moonPivot.rotation.y += 0.01; // moon revolution around earth

    renderer.render(scene, camera);
};

render();
