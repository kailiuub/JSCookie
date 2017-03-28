// existing manager user list JSON
var userdoc = {"userinfo": [
    {"name": "macy_kidman@aol.com", "password": "123K&abc"},
    {"name": "laura_lucky@aol.com", "password": "456K&bcd"},
    {"name": "april_smith@aol.com", "password": "789K&cde"}
    ]
    };

// manager name list XML
var xmlstring = "<managername>" +
    "<manager>" + 
    "<department>Sales</department>" +
    "<firstname>Macy</firstname>" + 
    "<lastname>Kidman</lastname>" + 
    "<active>n</active>" + 
    "</manager>" +
    "<manager>" + 
    "<department>Product Design</department>" +
    "<firstname>Laura</firstname>" + 
    "<lastname>Lucky</lastname>" + 
    "<active>y</active>" + 
    "</manager>" +
    "<manager>" + 
    "<department>Accounting</department>" +
    "<firstname>April</firstname>" + 
    "<lastname>Smith</lastname>" + 
    "<active>y</active>" + 
    "</manager>" +
    "<manager>" + 
    "<department>Engineering</department>" +
    "<firstname>Kevin</firstname>" + 
    "<lastname>Rice</lastname>" + 
    "<active>y</active>" + 
    "</manager>" +
    "<manager>" + 
    "<department>Advertisement</department>" +
    "<firstname>Tom</firstname>" + 
    "<lastname>Kart</lastname>" + 
    "<active>y</active>" + 
    "</manager>" +
    "<manager>" + 
    "<department>Safety</department>" +
    "<firstname>Richard</firstname>" + 
    "<lastname>Mason</lastname>" + 
    "<active>n</active>" + 
    "</manager>" +
    "</managername>";

function regvalid() {
    var errmsg = "";   // save all error message
    var valid = true;  // flag for any error
    var message = document.getElementById("message");
    message.innerHTML = "";
    var username = document.getElementById("regname");
    var pwd1 = document.getElementById("regpwd1");
    var pwd2 = document.getElementById("regpwd2");
    var parser = new DOMParser();  // paser for XML
    
    try {
        // VALIDATE empty, duplicate, format (fullname + @aol.com), authority (must be manager name) of username
        if (username.value == "") {
            errmsg = "Username cannot be empty" + "<br>";
            valid = false;
        } 
        if (valid == true) {
            for (i in userdoc.userinfo) {
                if (username.value == userdoc.userinfo[i].name) {
                    errmsg = "Username " + username.value + " already registered" + "<br>";
                    valid = false;
                }
            }
        }
        if (valid == true) {
            // manager's authority
            if (!username.value.endsWith("@aol.com")){
                errmsg = "Use username@aol.com as username" + "<br>";
                valid = false;
            } else{    // if endsWith("aol.com")
                var ind = username.value.indexOf("@");
                var namestr = username.value.substr(0,ind);
                // parse XML for resconstruct username
                var xmldoc = parser.parseFromString(xmlstring, "text/xml");
                var firsts = xmldoc.getElementsByTagName("firstname");
                var lasts = xmldoc.getElementsByTagName("lastname");
                var actives = xmldoc.getElementsByTagName ("active");
                var str = "";
                for (j=0; j<firsts.length; j++) {
                    str = firsts[j].childNodes[0].nodeValue + "_" + lasts[j].childNodes[0].nodeValue;
                    str = str.toLowerCase();   // convert into lowercase before compare
                    if (namestr != str){
                        valid = false;    // temporarily false
                        errmsg = "Username format is firstname_lastname@aol.com" + "<br>";
                    } else if (actives[j].childNodes[0].nodeValue != "y") {  // check active for authority
                        errmsg = "Your authority is temporarily rejected" + "<br>";
                        valid = false;
                        break;
                    } else {
                        errmsg = "";
                        valid = true;   // overwrite valid=true, once found
                        break;    // break the loop right away
                    }
                } 
            }
        }
        
                  
        // VALIDATE format of PASSWORD 
        if (pwd1.value == "") {
            errmsg += "Password cannot be empty" + "<br>";
            valid = false;
        } else if (pwd1.value.length<8){      //verify "at least 8 characters"
            errmsg += "Password must contain at least 8 characters";
            valid = false;
        } else if (pwd1.value != pwd2.value) {
            errmsg += "Two passwords doesn't match" + "<br>";
            valid = false;        
        } else {
            //verify format "at least one special character" "combination of upper- and lower-case characters" "one or more digits"
            var re = /[~!@#$%^&*()_+]/;
            if (!re.test(pwd1.value)){
                errmsg += "Password must contain at least one special character among ~!@#$%^&*()_+" + "<br>";
                valid = false;               
            }
            re =/[A-Z]/;
            if (!re.test(pwd1.value)) {
                errmsg += "Password must contain at least one upper-case letter (A-Z)"  + "<br>";
                valid = false;
            }
            re = /[a-z]/;
            if (!re.test(pwd1.value)) {
                errmsg += "Password must contain at least one lower-case letter (a-z)"  + "<br>";
                valid = false;
            }
            re = /[0-9]/;
            if (!re.test(pwd1.value)) {
                errmsg += "Password must contain at least one number (0-9)"  + "<br>";
                valid = false;
            }
        }
        
        // THROW error
        if (valid == false) {
            throw errmsg;
        } 
    }
    catch (error) {
        message.innerHTML = error;
    }
    finally {
        if (valid == true){
            alert("User " + username.value + " registered successfully");
            document.getElementById("popout").style.display = "block";
            userdoc.userinfo.push({"name":username.value, "password":pwd1.value});   // add new record into the JSON array         
            username.value, pwd1.value, pwd2.value = "";
        }
    }    
}

function logvalid(){   //upon click login button
    var errname = ""; 
    var errpwd = "";
    var valid = true;  // flag for any error
    var msg = document.getElementById("msg");
    msg.innerHTML = "";
    var logname = document.getElementById("logname");
    var logpwd = document.getElementById("logpwd");
    try {
        // verify login name
        if (logname.value == "") {
            errname = "empty username" + "<br>";
            valid = false;
        } else {
            for (i in userdoc.userinfo) {
                if (logname.value != userdoc.userinfo[i].name) {
                    errname = "username does not exist" + "<br>";
                    valid = false; // temporarily set to false
                }
                else {
                    errname = "";
                    valid = true; // once matched, set to true
                    break;
                }            
            }
        }
        // verify login password
        if (logpwd.value == "") {
            errpwd = "empty password" + "<br>";
            valid = false; 
        } else {
            for (i in userdoc.userinfo) {
                if (logpwd.value != userdoc.userinfo[i].password) {
                    errpwd = "password is wrong" + "<br>";
                    valid = false; // temporarily set to false
                }
                else {
                    errpwd = "";
                    valid = true;  // once matched, set to true
                    break;
                }
            }
        }    
        if (valid == false) {
            throw errname+errpwd;
        }
    }
    catch (error) {
        msg.innerHTML = error;
        logname = "";
        logpwd = "";
    }
    finally {
        if (valid == true) {
            //hide login btn, cancel btn, remember me
            //show redirect btn and show view
            msg.style.color = "green";
            msg.innerHTML = "login is successful";
            document.getElementById("logbtn").style.display = "none";
            document.getElementById("cancelbtn").style.display = "none";
            document.getElementById("rem").style.display = "none";
            document.getElementById("infobtn").style.display = "inline-block";
            document.getElementById("infobtn").style.width = "auto";
            viewdata();
        }
    }        
}

// employee infomation list XML
var emstr = "<employeelist>" +
    "<employee>" + 
    "<department>Sales</department>" +
    "<firstname>Macy</firstname>" + 
    "<lastname>Kidman</lastname>" + 
    "</employee>"+
    "</employeelist>";

function viewdata() {
    var warning1 = document.getElementById("warning1");
    warning1.innerHTML = "";
    var warning2 = document.getElementById("warning2");
    warning2.innerHTML = "";
    var table = document.getElementById("emtable");
    var items = '<tr><th>First Name</th><th>Last Name</th><th>Department</th></tr>';
    var parser = new DOMParser();
    var xmldoc = parser.parseFromString(emstr, "text/xml");
    var firsts = xmldoc.getElementsByTagName("firstname");
    var lasts = xmldoc.getElementsByTagName("lastname");
    var departments = xmldoc.getElementsByTagName("department");
    var i;
    for (i=0; i<firsts.length; i++){
        items += "<tr><td>" + firsts[i].childNodes[0].nodeValue + 
            "</td><td>" + lasts[i].childNodes[0].nodeValue +
             "</td><td>" + departments[i].childNodes[0].nodeValue + "</td><tr>";
    }  
    table.innerHTML = items;
}
