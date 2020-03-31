if (!(typeof FileReader !== "undefined"))
{
	//window.location.href="/replace_browser.html";
    need_browser=true;
}

var is_ie = !!window.MSStream;
var waiting=false;
var mesh=null;
var material=new THREE.MeshLambertMaterial({color:0x909090, overdraw: 1, wireframe: false, shading:THREE.FlatShading, vertexColors: THREE.FaceColors});
			
if (!is_ie)
//double side not supported on IE
material.side = THREE.DoubleSide;
			
var cancel_download=false;	
var max_file_size=100000000;
var mesh_color='#909090';
			
var xsize=0;
var ysize=0;
var zsize=0;
var vol=0;
var area=0;
var triangles_count=0;
var model_filename='';
var view_units=1; //mm
var bg_color=0xffffff;

function $id(id)
{
	return document.getElementById(id);
}
			
function handleDragOver(e)
{
	if (waiting) return;
			
	e.stopPropagation();
	e.preventDefault();
	e.dataTransfer.dropEffect = 'copy';			
}
			
function handleFileDrop(e)
{
	e.stopPropagation();
	e.preventDefault();
				
	if (waiting) return;
			
	//first, check if its a file
	if (e.dataTransfer.files.length>0)
	{
		if (e.dataTransfer.files[0].size>max_file_size)
		{
			alert('File is too big - maximum allowed size is 100mb');
			return false;
		}
					
		if (!supported_file_type(e.dataTransfer.files[0].name))
		{
			alert('File type is not supported');
			return false;
		}
		read_file(e.dataTransfer.files[0]);
	}
				
	else if (typeof e.dataTransfer.getData("Text") === 'string')
	{
		//check - maybe a url?
		read_from_url(e.dataTransfer.getData("Text"));
	}				
}
			
function supported_file_type (filename)
{
	switch (filename.split('.').pop().toLowerCase())
	{
		case 'stl':
		case 'obj':
		case 'vf':
			return true;
			break;
			
		default:
			return false;
	}	
}
			
function after_error()
{
	switch_view('drag');
	cancel_download=false;
	waiting=false;
	return false;
}
            
function baseName(str)
{
   var base = new String(str).substring(str.lastIndexOf('/') + 1); 
	if(base.lastIndexOf(".") != -1)       
		base = base.substring(0, base.lastIndexOf("."));
        return base;
}
			
function after_file_load(filename, s, examp = false)
{
	var vf_data;
	
	try
	{
		vf_data=parse_3d_file(filename, s);
	}
	catch(err)
	{
		vf_data="Error parsing the file";
	}
	
	if (typeof vf_data === 'string')
	{
		switch_view('drag');
		waiting=false;
		return;
	}
	
	if (mesh!=null) {scene.remove(mesh);mesh=null};
	
	var geo=new THREE.Geometry;
	geo.vertices=vf_data.vertices;
	geo.faces=vf_data.faces;				
	geo.computeBoundingBox();
		
	geo.computeCentroids();
	geo.computeFaceNormals();
	geo.computeVertexNormals();
	THREE.GeometryUtils.center(geo);
	mesh = new THREE.Mesh(geo, material);
	
	if (vf_data.colors)
		set_color($id('white_color'),'#FFFFFF');
	
	update_mesh_color();
	
	//renderer.setClearColor(bg_color, 0); //background
	set_color(null, bg_color, true); //background
	
	scene.add(mesh);
	
	directionalLight.position.x = geo.boundingBox.min.y * 2;
	directionalLight.position.y = geo.boundingBox.min.y * 2;
	directionalLight.position.z = geo.boundingBox.max.z * 2;

	pointLight.position.x = (geo.boundingBox.min.y+geo.boundingBox.max.y)/2;
	pointLight.position.y = (geo.boundingBox.min.y+geo.boundingBox.max.y)/2;
	pointLight.position.z = geo.boundingBox.max.z * 2;
				
	camera.position.set(0,0,Math.max(geo.boundingBox.max.x*3,geo.boundingBox.max.y*3,geo.boundingBox.max.z*3));
	controls.reset();
	switch_view('cjc');
				
	xsize=geo.boundingBox.max.x-geo.boundingBox.min.x;
	ysize=geo.boundingBox.max.y-geo.boundingBox.min.y;
	zsize=geo.boundingBox.max.z-geo.boundingBox.min.z;				
	vol_area=calc_vol_and_area(geo);
	vol=vol_area[0];
	area=vol_area[1];
	triangles_count=geo.faces.length;
	model_filename=filename;
	var fllname = baseName(model_filename);

    recalc_units();
                
    waiting=false
                
	$id('ifilename').innerHTML=filename.substr(0,20);
	$id('ifilename').style.visibility='visible';
}
			
function prepare_upload_file()
{
	if (waiting) return;
	if ($id('fileselect').value=='') return;
	
	//alert($id('fileselect').files[0]);
	upload_file($id('fileselect').files[0]);
}					