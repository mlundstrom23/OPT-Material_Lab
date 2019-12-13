function do_resize()
{
    var height = isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight;
    var width = isNaN(window.innerWidth) ? window.clientWidth : window.innerWidth;
    height=Math.min(height,width-150);
    
    // Style for container *with* <script> tag before <head>
    $id('cjc').style.height='61%';
    $id('cjc').style.width='99%';
    $id('cjcwrap').style.height='61%';
    $id('cjcwrap').style.width='99%';
    $id('cjcdrag').style.top='40%';
    $id('cjcdrag').style.left='12%';
    $id('cjcpbar').style.top='38%';
    $id('cjcpbar').style.left='12%';
    $id('cjcproc').style.top='38%';
    $id('cjcproc').style.left='12%';

    // Style for container *without* <script> tag before <head>

    /*$id('cjc').style.height=(height-220)+'px';
	$id('cjc').style.width=(height-220)+'px';
	$id('cjcwrap').style.height=(height-220)+'px';
	$id('cjcwrap').style.width=(height-220)+'px';
	$id('cjcdrag').style.top=((height-320)/2)+'px';
	$id('cjcdrag').style.left=((height-570)/2)+'px';
	$id('cjcpbar').style.top=((height-345)/2)+'px';
	$id('cjcpbar').style.left=((height-570)/2)+'px';
	$id('cjcproc').style.top=((height-345)/2)+'px';
	$id('cjcproc').style.left=((height-570)/2)+'px';*/
								
	var rsize_width=$id("cjcwrap").getBoundingClientRect().width;
	var rsize_height=$id("cjcwrap").getBoundingClientRect().height;
	renderer.setSize(rsize_width-5, rsize_height-5);
}

function switch_view(v)
{
	$id('cjcdrag').style.display=((v=='drag')?'block':'none');
	$id('cjcpbar').style.display=((v=='pbar')?'block':'none');
	$id('cjcproc').style.display=((v=='proc')?'block':'none');
	$id('cjc').style.display=((v=='cjc')?'block':'none');
}

function view_example(ename)
{
	download_from_local('examples/'+ename, ename);
}

function reset()
{
	if (waiting) return;
	switch_view('drag');
	if (mesh!=null) {scene.remove(mesh);mesh=null;}
	$id('fileselect').value='';
}