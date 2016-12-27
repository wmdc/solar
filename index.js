var scene = new THREE.Scene();

var aspect = window.innerWidth / window.innerHeight;

var camera = new THREE.OrthographicCamera(
	-2 * aspect,
    2 * aspect,
    aspect,
	-aspect,
    0,
    100
);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var texture = new THREE.TextureLoader().load( "earth.jpg" );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;

var geometry = new THREE.SphereGeometry(1, 128, 128);
var material = new THREE.MeshPhongMaterial({ map: texture });
// var lineMaterial = new THREE.MeshBasicMaterial({
//     wireframe: true,
//     color: 0x000000
// });
var cube = new THREE.Mesh( geometry, material );
//var lineCube = new THREE.Mesh( geometry, lineMaterial );
scene.add( cube );
//scene.add( lineCube );

var ambLight = new THREE.AmbientLight(0x202020);
scene.add(ambLight);

var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-1, 0, 0);
scene.add(light);

camera.position.z = 2;

var render = function () {
    requestAnimationFrame( render );

//    cube.rotation.x += 0.01;
    cube.rotation.y += 0.001;

//    lineCube.rotation.x += 0.01;
//    lineCube.rotation.y += 0.001;

    renderer.render(scene, camera);
};

render();
