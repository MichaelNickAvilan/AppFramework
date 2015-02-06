var FormsUtils = {
    init: function () {
        FormsUtils.addListeners();
    },
    setDocumentation: function () {
    },
    restrictFieldContent: function ($element, $allow) {
        $element.addEventListener("keypress", function (e) {

            var AllowableCharacters = '';

            switch ($allow) {
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
                    AllowableCharacters = '1234567890 ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-\'';
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
    	/*
	 * 
	 *obtiene la capaña segun la universidad y el origen 
	 * 
	 * */
	getCampaignCode:function($university,$origin_lead){
		
		var _campaign="";
		var _response={};
		
		switch($university){
			
			case "POLI":
				switch($origin_lead){
					case "FIU": 
					_response={campaign:"7616",carga:3};
					break;
					case "UAX": 
					_response={campaign:"7616",carga:2};
					break;
					case "UTA":
					_response={campaign:"7616",carga:1};
					break;
					case "DELOITE":
					_response={campaign:"7616",carga:4};
					break;
				}
			break;
			case "FUAA":
				switch($origin_lead){
					case "FIU":
					//FormsUtils.a_origin="FIU";
					_response={campaign:"7618",carga:3};
					break;
					case "UAX":
					_response={campaign:"7618",carga:2};
					break;
					case "UTA":
					_response={campaign:"7618",carga:1};
					break;
					case "DELOITE":
					_response={campaign:"7618",carga:4};
					break;
					
				}
			break;
			case "UDI":
				switch($origin_lead){
					case "FIU":
					_response={campaign:"7846",carga:3};
					break;
					case "UAX":
					_response={campaign:"7846",carga:2};
					break;
					case "UTA":
					_response={campaign:"7846",carga:1};
					break;
					case "DELOITE":
					_response={campaign:"7846",carga:7};
					break;
				}
			break;
			case "UA": 
				switch($origin_lead){
					case "FIU":
					_response={campaign:"7865",carga:3};
					break;
					case "UAX":
					_response={campaign:"7865",carga:2};
					break;
					case "UTA":
					_response={campaign:"7865",carga:1};
					break;
					case "DELOITE":
					_response={campaign:"7865",carga:4};
					break;
				}
			break;
			case "USAM": 
				switch($origin_lead){
					case "FIU":
					_response={campaign:"7857",carga:3};
					break;
					case "UAX": 
					_response={campaign:"7857",carga:2};
					break;
					case "UTA": 
					_response={campaign:"7857",carga:1};
					break;
					case "DELOITE":
					_response={campaign:"7857",carga:7};
					break;
				}
			break;
			case "IPP": 
				switch($origin_lead){
					case "FIU":
					_response={campaign:"7848",carga:3};
					break;
					case "UAX":
					_response={campaign:"7848",carga:2};
					break;
					case "UTA":
					_response={campaign:"7848",carga:1};
					break;
					case "DELOITE":
					_response={campaign:"7848",carga:4};
					break;
				}
			break;
			case "UVA": 
				switch($origin_lead){
					case "FIU":
					_response={campaign:"7825",carga:3};
					break;
					case "UAX":
					_response={campaign:"7825",carga:8};
					break;
					case "UTA":
					_response={campaign:"7825",carga:7};
					break;
					case "DELOITE":
					_response={campaign:"7825",carga:11};
					break;
				}
			break;
			default:
			
			_response={campaign:"0000",carga:1};
		}
		return _response;
	},
    getOriginLead:function($country){
		var local_lead="";
		switch($country){
			case "Panama":
				local_lead="OL-2015";
			break;
			case "Paraguay":
				local_lead="OL-2015";
			break;
			case "Chile":
				local_lead="OL-2015";
			break;
			case "Costa Rica":
				local_lead="OL-2015";
			break;
			case "Colombia":
				local_lead="OL-2015";
			break;
			case "Brazil":
				local_lead="OLUVA-100";
			break;
			case "Brasil":
				local_lead="OLUVA-100";
			break;
		}
		return local_lead;
	},
    getURLParam:function(name) {
	  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
	},
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
    getDateTime:function(){
		var currentdate = new Date(); 
			var datetime = currentdate.getFullYear() + "-"  
			+ (currentdate.getMonth()+1)  + "-" 
			+ currentdate.getDate() + " "
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();
            
            return datetime;
	},
    getDate: function () {
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
    cleanForm:function($fields){
    	for(var i=0; i < $fields.length; i++){
    		    		
    		if($fields[i].indexOf('combo')>=0){
    			document.getElementById($fields[i]).selectedIndex = 0;  
    		}
    		if($fields[i].indexOf('_text')>=0){
    			document.getElementById($fields[i]).value = '';  
    		}
    		
    	}
    },
    replaceNewline:function($line){
		
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
		
	},
    validateAllFields:function($fields,$messages){
    	var centinela = false;
        var response = {valid:false,message:'',element:''};
        
    	for(var i=0; i < $fields.length; i ++){    		
    		if(String($fields[i]).indexOf('_text')>=0){
    			if(document.getElementById($fields[i]).value.length<3){ 
    				$("#"+$fields[i]).focus();
    				centinela = true;
    				response.element = $fields[i];
                   	response.message = $messages[i];
    			}else{
    				if(String($fields[i]).indexOf('mail')>=0){
    					if(FormsUtils.validateMail($fields[i]).valid == false){
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
    	}
    	
    	if (centinela == false) {
            response.valid = true;
        }

        return response;
    	
    	
    },	
    validatePhone: function ($type, $phone, $country) {
        var centinela = false;
        var response = { valid: false, message: '' };
        for (var i = 0; i < UniversalModel.a_phones_validations.length; i++) {
            if (UniversalModel.a_phones_validations[i].type == $type &&
               UniversalModel.a_phones_validations[i].code_country == $country) {
                for (var j = 0; j < UniversalModel.a_phones_validations[i].phone_start_numbers.length; j++) {
                    if (String($phone).split('')[0] == UniversalModel.a_phones_validations[i].phone_start_numbers[j]) {
                        if (String($phone).length == UniversalModel.a_phones_validations[i].phone_digits) {
                            centinela = true;
                            response.valid = true;
                        } else {
                            if ($type == 'MobilePhone') {
                                response.message = 'El número de celular debe tener ' + UniversalModel.a_phones_validations[i].phone_digits + ' digitos';
                            } else {
                                response.message = 'El número de teléfono fijo debe tener ' + UniversalModel.a_phones_validations[i].phone_digits + ' digitos';
                            }
                        }
                    } else {
                       // if (UniversalModel.a_phones_validations[i].phone_start_numbers.length > 1) {
                            if ($type == 'MobilePhone') {
                                response.message = 'El número de teléfono celular debe iniciar con uno de los siguientes números: ' + String(UniversalModel.a_phones_validations[i].phone_start_numbers + ' y debe tener ' + UniversalModel.a_phones_validations[i].phone_digits + ' digitos');
                            } else {
                                response.message = 'El número de teléfono fijo debe iniciar con uno de los siguientes números: ' + String(UniversalModel.a_phones_validations[i].phone_start_numbers + ' y debe tener ' + UniversalModel.a_phones_validations[i].phone_digits + ' digitos');
                            }
                     //   }
                    }
                }
            }
        }
        return response;
    }
};
