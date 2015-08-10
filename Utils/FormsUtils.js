/**
    * FormsUtils, sinlgeton with useful methods for form validations
    * @author Michael Nick Avilan Mora - michael.avilan@gmail.com
    */
var FormsUtils = {
    init: function () {
        FormsUtils.addListeners();
    },
    /**
    * Restricts a textfield content
    * @param {string}  $element - DOM TextField
    * @param {string}  $allow - Restrict option 
    */
    restrictFieldContent: function ($element, $allow) {    
    	
    	if($allow.limit){
    		if(String($allow.limit).length>0){
    			$element.setAttribute("maxlength", $allow.limit);	
    		}
    		FormsUtils.fieldRestrictDelegate($allow.option,$element);  		
    	}else{
    		FormsUtils.fieldRestrictDelegate($allow,$element);
    	}
    },
    /** 
    * Returns a random ID to avoid the JavaScript cache
    */
    changeCache:function(){
		var letters = ['a','b','c','d','e','f','g','h','i', 'j','k','l','m','n','o','p','q','r','s','t','u','v ','w','x',
		'y','z','A','B','C','D','E','F','G','H','I', 'J','K','L','M','N','O','P','Q','R','S','T','U','V ','W','X','Y','Z'];
		return Math.floor(Math.random() * (1000- 0001+ 1)) + 0001 + letters[Math.floor(Math.random() * (51- 0+ 1)) + 0];
	},
	validateFieldsAll:function($fields,$messages){
    	var centinela = false;
        var response = {valid:false,message:'',element:''};
        
        console.log($fields);
        console.log($messages);
        
    	for(var i=0; i < $fields.length; i ++){    		
    		if(String($fields[i]).indexOf('_text')>=0 || String($fields[i]).indexOf('_txt')>=0){
    			if(document.getElementById($fields[i]).value.length<3){ 
    				$("#"+$fields[i]).focus();
    				centinela = true;
    				response.element = $fields[i];
                   	response.message = $messages[i];
    			}else{
    				if(String($fields[i]).indexOf('mail')>=0 || String($fields[i]).indexOf('correo')>=0){
    					if(FormsUtils.validateMail($fields[i]).valid==false){
	    					centinela = true;
	    					response.element = $fields[i];
	    					response.message =(FormsUtils.validateMail($fields[i]).message);
	    					$("#"+$fields[i]).focus();
	    					
    					}    					
    				}
    			}
    		}
    		if(String($fields[i]).indexOf('_combo')>=0){
    			if(document.getElementById($fields[i]).value=='NULL'){
    				$("#"+$fields[i]).focus();
    				centinela = true;
    				response.element = $fields[i];
                	response.message = $messages[i];
    			}
    		}
    		
    		if(String($fields[i]).indexOf('_checkbox')>=0){
    			if($('#'+$fields[i]).is(':checked') == false){
    				$("#"+$fields[i]).focus();
    				centinela = true;
    				response.element = $fields[i];
                	response.message = $messages[i];
    			}
    		}
    	}
    	
    	if (centinela == false) {
            response.valid = true;
        }

        return response;
    },
    createJSONFields:function($fields,$names){
    	var obj={};
    	for(var i=0; i < $fields.length; i ++){    	
    		if(String($fields[i]).indexOf('_text')>=0 || String($fields[i]).indexOf('_txt')>=0){    							
				obj[$names[i]] = document.getElementById($fields[i]).value; 
    		}
    		if(String($fields[i]).indexOf('_combo')>=0){
    			var combo = document.getElementById($fields[i]);    			
    			obj[$names[i]] = combo.options[combo.selectedIndex].text;
    		}
    		if(String($fields[i]).indexOf('_checkbox')>=0){
    			obj[$names[i]] = document.getElementById($fields[i]).value;
    		}
    	}
    	
        return obj;
    },
    cleanForm:function($fields){
    	for(var i=0; i < $fields.length; i++){    		
    		if($fields[i].indexOf('combo')>=0){
    			document.getElementById($fields[i]).selectedIndex=0;  
    		}
    		if($fields[i].indexOf('_txt')>=0 || $fields[i].indexOf('_text')>=0 || String($fields[i]).indexOf('_text')>=0 ){
    			document.getElementById($fields[i]).value = '';  
    		}
    		if($fields[i].indexOf('_checkbox')>=0 || $fields[i].indexOf('radio')>=0){
    			$('#'+$fields[i]).attr('checked',false);
    		}
    	}
    },
    fieldRestrictDelegate: function ($option, $element) {
    	$element.addEventListener("keypress", function (e) {

            var AllowableCharacters = '';

            switch ($option) {
                case 'Letters':
                    AllowableCharacters = ' ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
                    break;
                case 'Numbers':
                    AllowableCharacters = '1234567890';
                    break;
                case 'NameCharacters':
                    AllowableCharacters = ' ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-.\'';
                    break;
                case 'NameCharactersAndNumbers':
                    AllowableCharacters = '1234567890 ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-.,;:';
                    break;
            }

            var k = e.which;

            if (k != 13 && k != 8 && k != 0) {
                if ((e.ctrlKey == false) && (e.altKey == false)) {
                    if (AllowableCharacters.indexOf(String.fromCharCode(k)) == -1) {
                        e.preventDefault();
                    }
                }
            }
        });
    },
    /**
    * Returns true if the email is well formed
    * @param {string} $mail - Email 
    */
    validateMail: function ($mail) {
        $mail = document.getElementById($mail).value;
        var response = { valid: false, message: '' };
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        response.valid = re.test($mail);

        if (response.valid == false) {
            response.message = 'Debes digitar un email válido';
        }
       
        return response;
    },
    getDate:function(){
		var currentdate = new Date(); 
			var datetime = currentdate.getFullYear() + "-"  
			+ (currentdate.getMonth()+1)  + "-" 
			+ currentdate.getDate() + " "
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();
            
            return datetime;
	},
    /** Returns AAAA-MM-DD formated Date */
    getFormatedDate: function () {
        var _date = new Date();
        var month = String((_date.getMonth() + 1));
        var day = String(_date.getDate());

        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }

        return _date.getFullYear() + "-" + month + "-" + day;
    },
    /**
    * Asign a value to a text field 
    * @param {array} $fields - Array of ids 
    * @param {array} $values - Array of values
    */
    cleanFields: function ($fields, $values) {
        if ($fields.length == $values.length) {
            for (var i = 0; i < $fields.length; i++) {
                document.getElementById($fields[i]).value = $values[i];
            }
        }
    },
    validateFields: function ($fields, $messages) {
    	console.log($fields);
    	console.log($messages);
        var centinela = false;
        var response = {valid:false,message:''};
        for (var i = 0; i < $fields.length; i++) {
            if (centinela == false) {
            	console.log($fields[i]);
                if (document.getElementById($fields[i]).value.length == 0) {
                    centinela = true;
                    response.message = $messages[i];
                }
            }
        }

        if (centinela == false) {
            response.valid = true;
        }

        return response;
    },
    validateCombos: function ($combos, $messages) {
        var centinela = false;
        var response = { valid: false, message: '' };
        for (var i = 0; i < $combos.length; i++) {
            if (centinela == false) {
                if (document.getElementById($combos[i]).value == "NULL") {
                    centinela = true;
                    response.message = $messages[i];
                }
            }
        }

        if (centinela == false) {
            response.valid = true;
        }

        return response;
    },
    replaceNewline:function($line){
		
		console.log($line);
		
		$line=$line.split(",").join("");
		
		$line=$line.replace("\n"," ");
		$line=$line.replace("\n"," ");
		$line=$line.replace("\n"," ");
		$line=$line.replace("\n"," ");
		$line=$line.replace("\n"," ");
		$line=$line.replace("\n"," ");
		$line=$line.replace("\n"," ");
		$line=$line.replace("\n"," ");
		$line=$line.replace("\n"," ");
		$line=$line.replace("\n"," ");
		
		return $line;
		
	}
};