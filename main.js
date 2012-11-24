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
	
	loader.load({ model : 'https://raw.github.com/gnius/inmidstofwar/master/assets/objects/characters/warfin.js', callback : loadObject});

	camera.position.z = 5;

	render();
}

function render() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}


function loadObject( geometry ) {

	geometry.materials[0][0].shading = THREE.FlatShading;
	geometry.materials[0][0].morphTargets = true;

	var material = new THREE.MeshFaceMaterial();

	mesh = new THREE.Mesh( geometry, material );

	scene.add( mesh );
}
