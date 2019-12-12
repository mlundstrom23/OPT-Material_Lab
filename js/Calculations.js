function set_view_units(v)
{
	view_units=v;
	$id("vunits").innerHTML=v=="1"?"mm":v=="2" ? "in" : "cm";
	$id("flvunits").value = $id("vunits").innerHTML;
	//setCookie("units", v=="1"?"mm":v=="2" ? "in" : "cm", 1000);
    //recalc_units();
}
			
function recalc_units()
{
	if (view_units==1) {
        set_vol_and_size(vol, xsize, ysize, zsize);
        set_printing_time(zsize);
    } else if (view_units==2) {
		//file in mm, view in inches
        set_vol_and_size(vol, xsize, ysize, zsize);
        set_printing_time(zsize);
    } else {
		//file in inches, view in mm
        set_vol_and_size(vol, xsize, ysize, zsize);
        set_printing_time(zsize);
    }    
}

// Calculations for Material Price dropdown
function re_real_price() 
{
    var x = document.getElementById('material1').value;
    var vl = vol.toFixed(2);
                    
		switch (x) 
		{
            case 'PCLG' : 
                var price = 59.90 * (vl/1000000);
                    document.getElementById('esprice1').innerHTML = '$' + price.toFixed(2) + ' USD';
                    break;    
            case 'PCTR' : 
                var price = 69.98 * (vl/1000000);
                    document.getElementById('esprice1').innerHTML = '$' + price.toFixed(2) + ' USD';
                    break;
            case 'P3D' :
                var price = 76.90 * (vl/1000000);
                    document.getElementById('esprice1').innerHTML = '$' + price.toFixed(2) + ' USD';
                    break;
            case 'BCO' :
                var price = 138.69 * (vl/1000000);
                    document.getElementById('esprice1').innerHTML = '$' + price.toFixed(2) + ' USD';
                    break;  
            case 'BCx5' :
                var price = 142.99 * (vl/1000000);
                    document.getElementById('esprice1').innerHTML = '$' + price.toFixed(2) + ' USD';
                    break;   
            case 'ZRS' :
                var price = 345.99 * (vl/1000000);
                    document.getElementById('esprice1').innerHTML = '$' + price.toFixed(2) + ' USD';
                    break;                   
        }
}

function calc_vol_and_area(geo)
{
	var x1,x2,x3,y1,y2,y3,z1,z2,z3,i;
	var len=geo.faces.length;
	var totalVolume=0;
	var totalArea=0;
	var a,b,c,s;
	
	for (i=0;i<len;i++)
	{
		x1=geo.vertices[geo.faces[i].a].x;
		y1=geo.vertices[geo.faces[i].a].y;
		z1=geo.vertices[geo.faces[i].a].z;
		x2=geo.vertices[geo.faces[i].b].x;
		y2=geo.vertices[geo.faces[i].b].y;
		z2=geo.vertices[geo.faces[i].b].z;
		x3=geo.vertices[geo.faces[i].c].x;
		y3=geo.vertices[geo.faces[i].c].y;
		z3=geo.vertices[geo.faces[i].c].z;
		
		totalVolume += 
			(-x3 * y2 * z1 + 
			x2 * y3 * z1 +
			x3 * y1 * z2 - 
			x1 * y3 * z2 - 
			x2 * y1 * z3 + 
			x1 * y2 * z3);
			
		a=geo.vertices[geo.faces[i].a].distanceTo(geo.vertices[geo.faces[i].b]);
		b=geo.vertices[geo.faces[i].b].distanceTo(geo.vertices[geo.faces[i].c]);
		c=geo.vertices[geo.faces[i].c].distanceTo(geo.vertices[geo.faces[i].a]);
		s=(a+b+c)/2;
		totalArea+=Math.sqrt(s*(s-a)*(s-b)*(s-c));
	}

	return [Math.abs(totalVolume/6), totalArea];
}
			
function numberWithCommas(x)
{
	var parts = x.toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return parts.join(".");
}

function set_vol_and_size(vol,xsize,ysize,zsize)
{
	var p=view_units==2?0:0;
	$id('ivol').innerHTML=numberWithCommas(vol.toFixed(p));
    $id('isize').innerHTML=numberWithCommas(xsize.toFixed(p))+' x '+numberWithCommas(ysize.toFixed(p))+' x '+numberWithCommas(zsize.toFixed(p));
	$id('flsize').value = $id('isize').innerHTML;
	$id('flvolume').value = $id('ivol').innerHTML;				
}
			
// Getting values for printing time
function set_printing_time(zsize)
{
    var p=view_units==2?0:0;
    var slider = document.getElementById("time");
    var output = document.getElementById("ispeed");
    var output1 = document.getElementById("itime");
    output1.innerHTML = (slider.value/10)*numberWithCommas(zsize.toFixed(p)) + " seconds"
    output.innerHTML = (slider.value/10) + " mm/sec";
            
    slider.oninput = function() {
        output1.innerHTML = (this.value/10)*numberWithCommas(zsize.toFixed(p)) + " seconds";
        output.innerHTML = (this.value/10) + " mm/sec";
    }
    $id('fltime').value = $id('itime').innerHTML;
}  