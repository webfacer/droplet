var scene;
var warfin;
var camera;
var render;

function init() {

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, 650/365, 0.1, 1000);
	var container = $('#inmidstofwar');

	renderer = new THREE.WebGLRenderer();

	renderer.setSize(650, 365);

	container.append(renderer.domElement);
	
	var loader = new THREE.JSONLoader();
	
	loader.load('https://raw.github.com/gnius/inmidstofwar/master/assets/objects/characters/warfin.js', function(geometry, material){
		warfin = new THREE.Mesh(geometry, material);
		scene.add(warfin);
	});

	camera.position.z = 5;

	render();
}

function render() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}
