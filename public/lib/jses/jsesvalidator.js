 

//.................................................................................................    
    
    function JSesValidator(){ 
        
     this.isEmpty = function(elem, helperMsg){
        	if(elem.value.length == 0){
            
        		return true;
        	}
            else{
              	return false;  
            }
        
        }
  
   
         this.isEmail = function(email, helperMsg){  
            
               var emailExp = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
               
                                             
                	if(email.value.match(emailExp)){
                		return true;
                	}else{
                	
                		return false;
                	}
      
        }

        this.isNumeric = function (elem, helperMsg){
            
        	var numericExpression = /^[0-9]+$/;
            	if(elem.value.match(numericExpression)){
            		return true;
            	}else{
            		alert(helperMsg);
            		elem.focus();
            		return false;
            	}
        }
        this.isAlphabet =function(elem, helperMsg){
            
            	var alphaExp = /^[a-zA-Z]+$/;
            	if(elem.value.match(alphaExp)){
            		return true;
            	}else{
            		alert(helperMsg);
            		elem.focus();
            		return false;
            	}
        }   
 
        this.madeSelection = function (elem, helperMsg){
            
        	if(elem.value == "Please Choose"){
        		alert(helperMsg);
        		elem.focus();
        		return false;
        	}else{
        		return true;
        	}
        }
        
        this.lengthRestriction = function(elem, min, max){
            
        	var uInput = elem.value;
        	if(uInput.length >= min && uInput.length <= max){
        		return true;
        	}else{
        		//alert("Please enter between " +min+ " and " +max+ " characters");
        		elem.focus();
        		return false;
        	}
        }    

    }
    
//.................................................................................................





