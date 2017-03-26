function loadxml() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(this.readyState == 4 && this.status == 200){
			parsing(this);
		}
	};
	xmlhttp.open("GET","profile.xml",true);
	xmlhttp.send();
}

function parsing(xml) {
	var xmldoc = xml.responseXML;
	var table = "<tr><th>ID</th><th>Name</th><th>Title</th><th>Age</th><th>Gender</th></tr>";
	var i;
	var worker = document.getElementsByTagName("worker");
	alert(worker.getElementsByTagName('name')[0].childNodes[0].nodeValue);
	for (i=0; i<worker.length; i++) {
		table += "<tr><td>worker[i].getElementsByTagName('id')[0].childNodes[0].nodeValue</td>" +
			"<td>worker[i].getElementsByTagName('name')[0].childNodes[0].nodeValue</td>" +
			"<td>worker[i].getElementsByTagName('title')[0].childNodes[0].nodeValue</td>" +
			"<td>worker[i].getElementsByTagName('age')[0].childNodes[0].nodeValue</td>" +
			"<td>worker[i].getElementsByTagName('gender')[0].childNodes[0].nodeValue</td></tr>";
	}
	document.getElementById("profile").innerHTML = table;
}