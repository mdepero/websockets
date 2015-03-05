/* JavaScript for Game Controller
 *
 * All code by Matt DePero
 */

var xmlhttp;
if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari

	xmlhttp=new XMLHttpRequest();
}else{// code for IE6, IE5

	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}

function setColor(){
	var color = document.getElementById('color').value;
	xmlhttp.open("GET","http://107.10.18.206/serverfile.php?set&color=jf",true);
	xmlhttp.send();
}

function getColor(){
	xmlhttp.open("GET","http://107.10.18.206/serverfile.php?get&t=" + Math.random(),true);
	xmlhttp.send();
	document.getElementById("test").innerHTML=xmlhttp.responseText;
}