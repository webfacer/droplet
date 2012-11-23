var scene = new THREE.Scene();
var cube;
var camera;
var render;

function init() {

	camera = new THREE.PerspectiveCamera(75, 650/365, 0.1, 1000);
	var container = $('#inmidstofwar');

	renderer = new THREE.WebGLRenderer();

	renderer.setSize(650, 365);

	container.append(renderer.domElement);

	var geometry = new THREE.CubeGeometry(1,1,1);
	var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
	cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	camera.position.z = 5;

	render();
}

function render() {
	requestAnimationFrame(render);
	cube.rotation.x += 0.1; cube.rotation.y += 0.1;
	renderer.render(scene, camera);
}
