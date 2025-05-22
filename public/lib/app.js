function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    var bh = dec2bin(h);
    var bm = dec2bin(m);
    var bs = dec2bin(s);

    bs = ret8bit(bs);
    bh = ret8bit(bh);
    bm = ret8bit(bm);

    document.getElementById('bin').innerHTML =
        bh + ":" + bm + ":" + bs;
   // document.getElementById('dec').innerHTML =
    //    h + ":" + m + ":" + s;

    var t = setTimeout(startTime, 1000);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
function dec2bin(dec){
    return (dec >>> 0).toString(2);
}
function ret8bit(bin){

    var lb = bin.toString().length;
    var fnls="";
    var fbs=bin;

    if(lb < 8){
        prp = 8-lb;
        //console.log(prp);
        for(i=0;i < prp;i++){
            fnls += "0" ;
            //console.log(fnls);
        }
        fbs = fnls + bin;

        return fbs;

    }
    else{
        return fbs;
    }
}
//..............................................ui handler.....................................................
function clearObject(object){
		var message = '';
		document.getElementById(object).innerHTML = message;		
}
//.................................................................................................
function redirect(url){    
        var http = new Http();
        http.redirectToUrl(url);       
}  


function form_search_check(){

    if(document.forms["search"].elements["search-query"].value=="") {
        window.alert("Nevyplnili jste text!");
        
    }
    
    else{
    
        document.forms["search"].submit();
    }

}
//.................................................................................................
function alertmsg(){

            var str = '<div style="background: red;color: white;padding: 10px;margin-bottom: 10px;margin-left: 0px;margin-right: 0px;v"><strong> \
            Omlouváme se ale registrace  je momentálně nedostupná z důvodu testování.O spuštění vás budeme informovat.Děkujeme za pochopení</strong></div>'; 
           var msg = new AppMessage(str,'appmessage');
           msg.show();

}
//.................................................................................................

function registerCheck(){

        var validator = new InputValidator();        
       	var email = document.getElementById('email');
        var pass = document.getElementById('pass');
    	var confirmpass = document.getElementById('confirmpass');
        var status1 = document.getElementById('status1');
        var status2 = document.getElementById('status2');
        var status3 = document.getElementById('status3');        
        var usrname = document.getElementById('usrname');
        var region = document.getElementById('region');
        var emailpublic = document.getElementById('emailpublic');
        var license = document.getElementById('license');
        
        
        email.style.border ='1px solid #cccccc';
        pass.style.border ='1px solid #cccccc';
        confirmpass.style.border ='1px solid #cccccc';
        usrname.style.border ='1px solid #cccccc';
        
        var formok = true;        
        
        if(validator.isEmail(email, "msgtext") == false ) {
            formok=false;
            email.style.border ='1px solid red';
        }
        if(validator.lengthRestriction(pass, 6,18) == false ) {
            formok=false;
            pass.style.border ='1px solid red';
        }
        if(validator.lengthRestriction(confirmpass, 6,18) == false ) {
            formok=false;
            confirmpass.style.border ='1px solid red';
        }
        if(pass.value != confirmpass.value ) {
            formok=false;
            
        }
        if ( (status1.checked == false ) && (status2.checked == false ) && (status3.checked == false ) ){
                formok=false;
        }
        if ( license.checked == false  ){
                formok=false;
                
                
        }
        if(validator.lengthRestriction(usrname, 1,30) == false ){
    	  	usrname.style.border ='1px solid red';
        	formok=false;
         }
        
        
        if(formok == true ) {
           
            document.forms["request"].submit();
        }
        else{
            
            var str2 = '<div class="warn"> \
            <table style="width: 100%;"> \
            <tr> \
            	<td style="text-align: left;padding-left: 10px;"><strong >Vyplnili jste špatně registrační údaje !</strong></td> \
            	<td style="text-align: right;padding: 3px;"><input type="button" class="button" value="Ok" onclick="javascript:clearObject(\'appmessage\');" /></td> \
            </tr> \
            </table> \
            </div>';
                
            var str = '<div style="background: red;color: white;padding: 10px;margin-bottom: 10px;"><strong>Vyplnili jste špatně registrační údaje !</strong></div>'; 
            var msg = new AppMessage(str2,'appmessage');
            msg.show();
           
        }

}
function htmlBanner(){
		var message = '';
		window.open("http://www.vozejkov.cz/views/templates/components/html_banner_html.php", "s_ram", "location=yes,status=no,width=400,height=400,resizable")		
}






   