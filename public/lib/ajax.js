

function addAjComment(){
    
     var url1 = document.getElementById('odkaz').href;
     var loader = document.getElementById('loader');
     var img = "<img src=" + url1 + "views/images/ajax-loader.gif style=margin-top:20px; />"
     loader.innerHTML = img;
	 var ajaxRequest;
 
	try{
		ajaxRequest = new XMLHttpRequest();
	} catch (e){
		// Internet Explorer Browsers
		try{
			ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try{
				ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e){
				alert("Browser err!");
				return false;
			}
		}
	}
  
    //var comtext = document.getElementById('comtext').value;     
    //var comtext = tinyMCE.get('comtext').getContent();     
    //tinyMCE.triggerSave();
    //comtext = escape(comtext);
    //document.getElementById('appmessage').innerHTML = comtext;

    var comtext =  tinyMCE.activeEditor.getContent()
	var artid = document.getElementById('artid').value;
    var arturl = document.getElementById('arturl').value;
	var params = "artid=" + artid  + "&ajaxrequest=true" + "&comtext=" + comtext ;

	ajaxRequest.open("POST", url1 + "Articles/addComment/", true);
	ajaxRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset:UTF-8");
 // ajaxRequest.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
	ajaxRequest.setRequestHeader("Content-length", params.length);
	ajaxRequest.setRequestHeader("Connection", "close");
	ajaxRequest.onreadystatechange = function(){
		if(ajaxRequest.readyState == 4 && ajaxRequest.status == 200){

                    loader.innerHTML = '';
					var ajaxDisplay = document.getElementById('newcomments');
					ajaxDisplay.innerHTML += ajaxRequest.responseText;
                    document.getElementById('comtext').value = '';
                    
					comc = document.getElementById('comcount').value;
					comc = parseInt(comc);
					comc = comc + 1;
                	document.getElementById('comcount').value = comc;
                    
                    comc = document.getElementById('comcounts').value;
					comc = parseInt(comc);
					comc = comc + 1;
                	document.getElementById('comcounts').value = comc;
                 
			}
		}
	ajaxRequest.send(params); 
	
}

//.................................................................................................

function addThread(){

var url2 = document.getElementById('odkaz').href;
//var loader = document.getElementById('loader');
//var img = "<img src=" + url2 + "views/images/ajax-loader.gif style=margin:3px; />"
//loader.innerHTML = img;
var ajaxRequest;
         
	//var url2 = "http://www.vozejkov.cz/"; 
	
	try{
		ajaxRequest = new XMLHttpRequest();
	} catch (e){
		// Internet Explorer Browsers
		try{
			ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try{
				ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e){
				alert("Browser err!");
				return false;
			}
		}
	}
    
    var scid = document.getElementById('scid').value;
	var thtext = tinyMCE.get('thtext').getContent();
    var thname = document.getElementById('thname').value;
    
	var params = "scid=" + scid + "&thtext=" + thtext  + "&thname=" + thname  + "&ajaxrequest=true";

	ajaxRequest.open("POST", url2 + "Forum/addThread/", true);
	ajaxRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ajaxRequest.setRequestHeader("Content-length", params.length);
	ajaxRequest.setRequestHeader("Connection", "close");
	ajaxRequest.onreadystatechange = function(){
		if(ajaxRequest.readyState == 4 && ajaxRequest.status == 200){
		 
                    // loader.innerHTML = '';				
//                         var ajaxDisplay = document.getElementById('newthreads');                     
//						ajaxDisplay.innerHTML =   ajaxRequest.responseText + ajaxDisplay.innerHTML;
//                        document.getElementById('thtext').value = '';
//                        document.getElementById('thname').value = '';
                    
                    var ajaxDisplay = document.getElementById('appmessage');
					ajaxDisplay.innerHTML = ajaxRequest.responseText;
                    document.getElementById('thtext').value = '';
                    document.getElementById('thname').value = '';
                    window.location.href= url2 + "Forum/showthreads/" + scid + "/";                     
            
			}
		}
	ajaxRequest.send(params); 

}
//.................................................................................................

function addMessage(){

	var ajaxRequest;
    
     var url3 = document.getElementById('odkaz').href;
	//var url3 = "http://www.vozejkov.cz/";
	
	try{
		ajaxRequest = new XMLHttpRequest();
	} catch (e){
		// Internet Explorer Browsers
		try{
			ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try{
				ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e){
				alert("Browser err!");
				return false;
			}
		}
	}
    
    var scid = document.getElementById('scid').value;
    var thid = document.getElementById('thid').value;
//	var msgtext = document.getElementById('msgtext').value;
    var msgtext = tinyMCE.get('msgtext').getContent();              
	var params = "scid=" + scid + "&msgtext=" + msgtext  + "&thid=" + thid  + "&ajaxrequest=true";

	ajaxRequest.open("POST", url3 + "Forum/addMessage/", true);
	ajaxRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ajaxRequest.setRequestHeader("Content-length", params.length);
	ajaxRequest.setRequestHeader("Connection", "close");
	ajaxRequest.onreadystatechange = function(){
		if(ajaxRequest.readyState == 4 && ajaxRequest.status == 200){
		 

					var ajaxDisplay = document.getElementById('appmessage');
					ajaxDisplay.innerHTML = ajaxRequest.responseText;
                    document.getElementById('msgtext').value = '';                        
                    window.location.href= url3 + "Forum/showmessages/" + scid + "/"+ thid + "/";                         
            
			}
		}
	ajaxRequest.send(params); 
	
}
//.................................................................................................
