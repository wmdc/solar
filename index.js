var scene = new THREE.Scene();

var aspect = window.innerWidth / window.innerHeight;

var camera = new THREE.PerspectiveCamera(
    45,
    aspect,
    1,
    1000
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

var moonGeometry = new THREE.SphereGeometry(0.2, 16, 16);
var moonMaterial = new THREE.MeshBasicMaterial({ map: skyTexture, side: THREE.DoubleSide });
var moon = new THREE.Mesh(moonGeometry, moonMaterial);

moon.position.x = 1.5;

var skyGeometry = new THREE.SphereGeometry(1.5, 16, 16);
var skyMaterial = new THREE.MeshBasicMaterial({ map: skyTexture, side: THREE.DoubleSide });
var sky = new THREE.Mesh(skyGeometry, skyMaterial);
sky.position.z = -5;

console.log(sky);
scene.add(sky);

var geometry = new THREE.SphereGeometry(0.8, 128, 128);
var material = new THREE.MeshPhongMaterial({ map: texture });
var lineMaterial = new THREE.MeshBasicMaterial({
     wireframe: true,
     color: 0x222222
});

var cube = new THREE.Mesh( geometry, material );
var lineCube = new THREE.Mesh( geometry, lineMaterial );
scene.add(cube);
cube.add(moon);
// scene.add( lineCube );

var ambLight = new THREE.AmbientLight(0x404040);
scene.add(ambLight);

var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-100, 0, -10);
scene.add(light);

// doesn't matter as much for orthographic, as long as the scene is inside the clipping planes
camera.position.z = 100;

var render = function () {
    requestAnimationFrame( render );


//    moon.rotation.x += 0.1;

    
//     cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

//    lineCube.rotation.x += 0.01;
    lineCube.rotation.y += 0.001;

    renderer.render(scene, camera);
};

render();
