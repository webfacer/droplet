Physijs.scripts.worker = 'javascripts/plugins/threejs/physijs_worker.js';
Physijs.scripts.ammo = 'ammo.js';

var renderer, scene, camera, box, plane;

var viewPort =  {
    width   : 640,
    height  : 480
};

// Gameobject properties
var drop = {
    weight  : 1000,
    path    : 'assets/objects/charcters/',
    src     : null
};

// Level properties
var lvl = {
    gravity : 10,
    speed   : 100 // maximum speed = 100%
};


// all static object properties
var staticObjs = {
};


function init() 
{
    // Render Scene, Canvas and Camera setups
    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize( viewPort.width, viewPort.height );
    
    $container = $('#viewPort');
    $container.append( renderer.domElement );
    $canvas = $('canvas');
    $canvas.css('background-color', '#eebb00');
    
    scene = new Physijs.Scene;
    
    camera = new THREE.PerspectiveCamera(
        75,
        viewPort.width/viewPort.height,
        1,
        1000
    );
    
    render();
    
}

function render()
{
    scene.simulate(); // run physics
    renderer.render( scene, camera); // render the scene
    requestAnimationFrame( render );
}