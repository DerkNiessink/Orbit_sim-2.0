import { OrbitControls } from 'OrbitControls';
import * as THREE from 'three'
import { Object } from "./object.js"

/*Set up camera and renderer*/
const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(20))
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 5, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const controls = new OrbitControls( camera, renderer.domElement );


const objects = [
    new Object(3, 0x12EBCD, 0, false, new THREE.Vector3(30, 0, 0), new THREE.Vector3(0, 3, 0), 1),  
    new Object(1, 0x12EBCD, 0, false, new THREE.Vector3(25, 0, 0), new THREE.Vector3(0, 4, 0), 0.001),
    new Object(5, 0xfDB813, 0, 0x8ffB80, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), 100)
]
for (let object of objects) {
    scene.add(object.sphere)
    if (typeof object.light != "undefined") {
        scene.add( object.light )
    }
}

const ambientlight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientlight)

/*Line 
const materialLine = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 3 } );
let points = [];
points.push( sphere.position );
points.push( new THREE.Vector3( 0, 10, 0 ) );
const geometryLine = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( geometryLine, materialLine );
scene.add( line ); */


camera.position.set(10, 10, 50)
controls.update()


/*animate loop */
function animate() {
	requestAnimationFrame( animate )
    for (let object of objects) {
        object.updateObjectPosition(objects)
    }
    controls.update()
	renderer.render( scene, camera );
}
animate();