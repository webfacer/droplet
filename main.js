Physijs.scripts.worker = 'javascripts/plugins/threejs/physijs_worker.js';
Physijs.scripts.ammo = 'ammo.js';

var renderer, scene, camera, box, plane;

var viewPort =  {
    width   : 640,
    height  : 480
};

// Gameobject properties
var charObj = {
    weight  : 1000,
    path    : 'assets/objects/characters/',
    file     : null
};

// Level properties
var lvl = {
    gravity : 10,
    speed   : 100 // maximum speed = 100%
};


// all static object properties
var staticObjs = {
};

var drop, mesh, keyboard, cloud = [];


function init() 
{
    // Render Scene, Canvas and Camera setups
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize( viewPort.width, viewPort.height );

    $container = $('#viewPort');
    $container.append( renderer.domElement );
    $canvas = $('canvas');
    $canvas.css('background-color', '#eebb00');

    scene = new Physijs.Scene();

    // camera setting
    camera = new THREE.PerspectiveCamera(
        75,
        viewPort.width/viewPort.height,
        1,
        1000
    );

    camera.position.z = 40;

    // keyboard setup
    keyboard = new THREEx.KeyboardState();

    // character setup
    charObj.file = 'drop.js';
    var loader = new THREE.JSONLoader();
    loader.load( charObj.path+charObj.file , function( geometry, material ) {
        drop = new Physijs.ConvexMesh( geometry, new THREE.MeshFaceMaterial( material ) );
        scene.setGravity( 0, 10, 0 );
        scene.add( drop );

    	loadLevel();
        update();
    });
}

function loadLevel() {
    var geometry	= new THREE.CubeGeometry( 5, 2, 2 );
	var material	= new THREE.MeshBasicMaterial( { color : 0x000000, wireframe : true } );

	cloud[0]	= new THREE.Mesh( geometry, material );
	
	for( i = 1; i < 20; i++ ) {
		cloud[i]	= cloud[0].clone();
		cloud[i].position.set( THREE.Math.randFloat( -33, 33 ), -5, 0 );
		scene.add(cloud[i]);
	}
}

function update() {
    camera.position.y = drop.position.y;
	
	cloud[5].position.y = camera.position.y + 10;

    if( keyboard.pressed( 'A' ) ) {
        drop.position.x -= 1;
    }
    if( keyboard.pressed( 'D' ) ) {
        drop.position.x += 1;
    }

    drop.__dirtyPosition = true;
    scene.simulate(); // run physics
    render();
}

function render()
{
    renderer.render( scene, camera); // render the scene
    requestAnimationFrame( update );
}