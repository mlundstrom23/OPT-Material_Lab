var scene = new THREE.Scene();
var is_webgl=webgl_Detector.webgl;
var renderer = is_webgl ? new THREE.WebGLRenderer({preserveDrawingBuffer:true, alpha:true}): new THREE.CanvasRenderer();
var mesh=null;
var ambientLight     = null;
var directionalLight = null;
var pointLight       = null;
var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10000);

do_resize();

renderer.setClearColor( bg_color, 1);
$id('cjc').appendChild(renderer.domElement);
camera.position.set(0,0,100);
scene.add(camera);			
	
ambientLight = new THREE.AmbientLight(0x202020);
camera.add(ambientLight);
			
directionalLight = new THREE.DirectionalLight(0xffffff, 0.75);
directionalLight.position.x = 1;
directionalLight.position.y = 1;
directionalLight.position.z = 2;
directionalLight.position.normalize();
camera.add(directionalLight);
    
pointLight = new THREE.PointLight(0xffffff, 0.3);
pointLight.position.x = 0;
pointLight.position.y = -25;
pointLight.position.z = 10;
camera.add(pointLight);			
			
function animate()
{
    requestAnimationFrame(animate);
	renderer.render(scene, camera);
	controls.update();
}			
			
var units_cookie=getCookie("units");
view_units=units_cookie=="in"?2:1;
$id("vunits").innerHTML=units_cookie=="in"?"in":"mm";
								
//this function is being called from outside (from embeded page)
function set_rotation(b)
{
	controls.autoRotate=b;
	animate();
}

function set_rotation1(b)
{
	if( b == 0)
		controls.autoRotate=true;
	else
		controls.autoRotate=false;
}
			
//this function is being called from outside (from embeded page)
function set_clean_mode(b)
{
	$id('titlet1').style.display=b?'none':'inline';
	$id('titlet2').style.display=b?'none':'inline';
	$id('pgt1').style.display=b?'none':'inline';
	$id('file_pbar').style.display=b?'none':'inline';
	$id('fcancel').style.display=b?'none':'inline';
	$id('prt1').style.display=b?'none':'inline';
}
			
//this function is being called from outside (from embeded page)
function set_noborder(b)
{
	$id('cjcwrap').style.border=(b?'none':'1px dashed #000000');
}				
			
var controls = new THREE.OrbitControls(camera, renderer.domElement);
	
if (is_webgl) {
	controls.autoRotate=true;
} else {
	 $id('rrotate2').checked=true; controls.autoRotate=false;
}
			
animate();
	
window.onresize=function()
{
	do_resize();
}

$id('cjcwrap').addEventListener('dragover', handleDragOver, false);
$id('cjcwrap').addEventListener('drop', handleFileDrop, false);
			
		
	
		
if (need_browser)
    alert('Your browser is too old and is not supported by this website. Please install a modern browser (Chrome is recommended).');
		
