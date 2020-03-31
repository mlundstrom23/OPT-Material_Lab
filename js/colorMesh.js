// Colors for mesh
function set_color_by_name(color, is_bg_color)
{
	is_bg_color=is_bg_color||false;
	switch (color.toLowerCase())
	{
		case "black":		set_color($id('black_color'),'#000000',is_bg_color); break;
		case "white":		set_color($id('white_color'),'#FFFFFF',is_bg_color); break;
		case "blue":		set_color($id('blue_color'),'#0000FF',is_bg_color); break;
		case "green":		set_color($id('green_color'),'#00FF00',is_bg_color); break;
		case "red":			set_color($id('red_color'),'#FF0000',is_bg_color); break;
		case "yellow":		set_color($id('yellow_color'),'#FFFF00',is_bg_color); break;
		case "gray":		set_color($id('gray_color'),'#909090',is_bg_color); break;
		case "azure":		set_color($id('azure_color'),'#00FFFF',is_bg_color); break;
		case "pink":		set_color($id('pink_color'),'#FF00FF',is_bg_color); break;
		case "purple":		set_color($id('purple_color'),'#703487',is_bg_color); break;
		case "darkblue":	set_color($id('darkblue_color'),'#102075',is_bg_color); break;
		case "brown":		set_color($id('brown_color'),'#654321',is_bg_color); break;
		case "transparent": set_color($id('white_color'),'transparent',true); break;					
		default:
			//any valid color value goes
			if (/^#[0-9A-F]{6}$/i.test(color))
				set_color($id('white_color'),color,is_bg_color);
	}
}
			
function set_color(o, o_color, is_bg_color)
{
	is_bg_color=is_bg_color||false;
	
	if (is_bg_color)
	{
		bg_color=o_color;
		if (o_color=='transparent')
			renderer.setClearColor(0x000000, 0);
		else
			renderer.setClearColor(o_color, 1);
		return;
	}
	
	c = $id('cpal').getElementsByTagName("div");
	
	var i=c.length;	
	while(i--)
	{
		if (c[i]==o)
			c[i].style.border="2px solid #012101";
		else
			c[i].style.border="2px solid transparent";
	}
					
	//mesh_color=o.style.background;
	mesh_color=o_color;
	update_mesh_color();
}
			
function update_mesh_color()
{
	if (mesh==null) return;
	mesh.material.color.set(parseInt(mesh_color.substr(1),16));
}

function set_shading(i)
{
	if (i==2)
		material.wireframe=true;
	else
	{
		material.wireframe=false;
		material.shading=((i==1)?THREE.SmoothShading:THREE.FlatShading);
		if (mesh!=null)
			mesh.geometry.normalsNeedUpdate = true;
	}
}