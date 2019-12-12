function do_resize()
{
    var height = isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight;
    var width = isNaN(window.innerWidth) ? window.clientWidth : window.innerWidth;
    height=Math.min(height,width-150);
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