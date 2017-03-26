function setCookie (ckname, ckvalue, expdays){
        var d = new Date ()
        d.setTime(d.getTime() + (expdays*24*60*60*1000)); 
        document.cookie = ckname + "=" + ckvalue + ";" + "expires = " + expdays + +";" + "path=/";
}
	
function readCookie (ckname) {
        var name = ckname + "=";
        var dc = decodeURIComponent(document.cookie);   //return username=jack
        var ac = dc.split(";");
        for (var i = 0; i<ac.length; i++){
            var c = ac[i];
            while (c.charAt(0) == ' ') {    // take out all the space before username=...
                c = c.substring(1); 
            }
            if (c.indexOf(name) == 0){                
                return c.substring(name.length, c.length);   
            }
        }
		return "";
	}
    
function checkCookie (){
        var username = readCookie("username");
        if (username != ""){
            alert("Welcome again " + username);
        }
        else {
            username = prompt ("please enter name");
            if (username != "" && username != null){
                setCookie("username", username, 165);
            }
        }
}
	
function deleteCookie(ckname, expdays){
        var d = new Date();
        d.setTime(d.getTime() - (expdays*24*60*60*1000));    // set cookie date to a previous date
        document.cookie = ckname + "=;" + "expires = " + expdays + +";" + "path=/";
}