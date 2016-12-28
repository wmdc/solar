var scene = new THREE.Scene();

var aspect = window.innerWidth / window.innerHeight;

var camera = new THREE.PerspectiveCamera(
    50,
    aspect
);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var texture = new THREE.TextureLoader().load( "earth.jpg" );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;

var skyTexture = new THREE.TextureLoader().load("sky.jpg");
skyTexture.wrapS = THREE.RepeatWrapping;
skyTexture.wrapT = THREE.RepeatWrapping;

var moonTexture = new THREE.TextureLoader().load("moon.jpg");
moonTexture.wrapS = THREE.RepeatWrapping;
moonTexture.wrapT = THREE.RepeatWrapping;

var moonGeometry = new THREE.SphereGeometry(0.6, 16, 16);
var moonMaterial = new THREE.MeshBasicMaterial({ map: skyTexture });
var moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.x = 15;

var moonPivot = new THREE.Object3D();

var skyGeometry = new THREE.SphereGeometry(1000, 8, 8);
var skyMaterial = new THREE.MeshBasicMaterial({ map: skyTexture, side: THREE.BackSide });
var sky = new THREE.Mesh(skyGeometry, skyMaterial);
sky.position.z = 0;

scene.add(sky);

var geometry = new THREE.SphereGeometry(3, 32, 32);
var material = new THREE.MeshPhongMaterial({ map: texture });
var lineMaterial = new THREE.MeshBasicMaterial({
     wireframe: true,
     color: 0x222222
});

var cube = new THREE.Mesh( geometry, material );
var lineCube = new THREE.Mesh( geometry, lineMaterial );
cube.position.z += 80;
scene.add(cube);

moonPivot.add(moon);
cube.add(moonPivot);
// scene.add( lineCube );

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
    cube.rotation.y += 0.01;
    moonPivot.rotation.y += 0.01;
    lineCube.rotation.y += 0.001;

    renderer.render(scene, camera);
};

render();
