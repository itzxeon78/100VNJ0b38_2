var vn="Microsoft Internet Explorer";

function showFullPath(str){
	var fr =2;
	parent.frames[fr].document.open();
	parent.frames[fr].document.writeln(' <html xmlns="http://www.w3.org/1999/xhtml">');
	parent.frames[fr].document.writeln(' <head>');
	parent.frames[fr].document.writeln(' <meta http-equiv="Content-Type" content="text/html; charset=utf-8">');
	parent.frames[fr].document.writeln(' <title>Untitled Document</title>');
	parent.frames[fr].document.writeln(' <link href="zycss.css" rel="stylesheet" type="text/css" />');
	parent.frames[fr].document.writeln(' <link href="../zycss.css" rel="stylesheet" type="text/css" />');
	parent.frames[fr].document.writeln(' </head>');
	parent.frames[fr].document.writeln(' <body>');	
	parent.frames[fr].document.writeln(' <div class="fullpath"><span>'+str+'</span></div>');
	parent.frames[fr].document.writeln(' </body>');
	parent.frames[fr].document.writeln(' </html>');	
	parent.frames[fr].document.close();
}