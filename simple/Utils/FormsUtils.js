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
    		FormsUtils.fieldRestrictDelegate($allow,$element)
    	}
    },
    especialCharacters:function($string){
    	
    	var characters = ['á','é','í','ó','ú','ñ','Á','É','Í','Ó','Ú','Ñ'];
        var characChan = ['a','e','i','o','u','n','A','E','I','O','U','N'];
        
        for(var i = 0; i < characters.length; i++){
        	$string = $string.split(characters[i]).join(characChan[i]);
        }
    	return $string.toLowerCase();
    	
    },
    changeCache:function(){
		var letters = ['a','b','c','d','e','f','g','h','i', 'j','k','l','m','n','o','p','q','r','s','t','u','v ','w','x',
		'y','z','A','B','C','D','E','F','G','H','I', 'J','K','L','M','N','O','P','Q','R','S','T','U','V ','W','X','Y','Z'];
		return Math.floor(Math.random() * (1000- 0001+ 1)) + 0001 + letters[Math.floor(Math.random() * (51- 0+ 1)) + 0];
	},
	orderArray:function($arr,$name){
		var name_obj = $name;
        var arr_order = [];
        for(var i=0; i < $arr.length; i++){
            if(typeof $arr[i] == "object"){
                arr_order.push($arr[i][name_obj]);
            }
        }
	
        arr_order = arr_order.sort(); 
        var arr_return = [];
        for(var i=0; i < arr_order.length; i++){    
            for(var j=0; j < $arr.length; j++){  
               if(arr_order[i] === $arr[j][name_obj]){
               		//$arr[j][name_obj] = FormsUtils.orderLetters($arr[j][name_obj]);
                    arr_return.push($arr[j]);
               }
            }
        }

        return arr_return;

    },
    loadDeptos: function ($url, $id_comboDepto, $id_comboCity) {
        console.log(0);
		CSVReader.loadCSV($url, function(){
		    console.log(1);
		    var a_deptosCSV = CSVReader.a_data;
			var deptos = [];
			for(var i = 0; i < a_deptosCSV.length-1; i++){
				deptos.push(a_deptosCSV[i][2]);
			}
			deptos = ArrayUtils.deleteDuplicates(deptos);
			deptos = deptos.sort();
			var deptos_list = [{label:'Departamentos',value:'NULL'}];
			for(var i=0; i < deptos.length; i++){
				deptos[i] = deptos[i].split('atilde').join('á').split('etilde').join('é').split('itilde').join('í').split('otilde').join('ó').split('utilde').join('ú').split('ntilde').join('ñ');
				deptos_list.push({label:FormsUtils.orderLetters(deptos[i]),value:deptos[i]});
			}
			Combos.populateCombo($id_comboDepto,deptos_list);
			document.getElementById($id_comboDepto).addEventListener('change', function(){				
				var cities=[{label:'Ciudad',value:'NULL'}];				
				for(var i=0; i < a_deptosCSV.length; i++){
					if(a_deptosCSV[i][2] == $(this).val()){
						a_deptosCSV[i][0] = a_deptosCSV[i][0].split('atilde').join('á').split('etilde').join('é').split('itilde').join('í').split('otilde').join('ó').split('utilde').join('ú').split('ntilde').join('ñ');
						cities.push({label:FormsUtils.orderLetters(a_deptosCSV[i][0]),value:a_deptosCSV[i][0],id:a_deptosCSV[i][1]});
					}
				}
				Combos.populateCombo($id_comboCity,cities);
			});
		});
	},
	orderLetters:function($name){
    	
    	var name = $name.split(' ');
    	var nameComplete = '';
    	for(var i = 0; i < name.length; i++){
    		var letters = name[i].length;
    		if(letters > 3){
    			for(var j = 0; j < name[i].length; j++){
    				if(j == 0){
    					nameComplete += name[i][j].toUpperCase();
    				}else{
    					nameComplete += name[i][j].toLowerCase();
    				}
    			}
    		}else{
    			nameComplete += name[i].toLowerCase();
    		}
    		nameComplete += ' ';
    	}
    	
    	
    	var characters = ['atilde','etilde','itilde','otilde','utilde','ntilde',
    	'Atilde','Etilde','Itilde','Otilde','Utilde','Ntilde'];
    	var characChan = ['á','é','í','ó','ú','ñ','A','E','I','O','U','N'];
        
        
        for(var i = 0; i < characters.length; i++){
        	nameComplete = nameComplete.split(characters[i]).join(characChan[i]);
        }
    	
    	return nameComplete;
    	
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
    validarut:function(rut){
    	if (rut.toString().trim() != '' && rut.toString().indexOf('-') > 0) {
        var caracteres = new Array();
        var serie = new Array(2, 3, 4, 5, 6, 7);
        var dig = rut.toString().substr(rut.toString().length - 1, 1);
        rut = rut.toString().substr(0, rut.toString().length - 2);
 
        for (var i = 0; i < rut.length; i++) {
            caracteres[i] = parseInt(rut.charAt((rut.length - (i + 1))));
        }
 
        var sumatoria = 0;
        var k = 0;
        var resto = 0;
 
        for (var j = 0; j < caracteres.length; j++) {
            if (k == 6) {
                k = 0;
            }
            sumatoria += parseInt(caracteres[j]) * parseInt(serie[k]);
            k++;
        }
 
        resto = sumatoria % 11;
        dv = 11 - resto;
 
        if (dv == 10) {
            dv = "K";
        }
        else if (dv == 11) {
            dv = 0;
        }
 
        if (dv.toString().trim().toUpperCase() == dig.toString().trim().toUpperCase())
            return true;
        else
            return false;
    }
    else {
        return false;
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
                    AllowableCharacters = ' ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-.';
                    break;
                case 'NameCharactersAndNumbers':
                    AllowableCharacters = '1234567890 ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-.,;:&';
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
    getCampaignCodeByCountry:function($country,$university){
		var _response={};
		switch($university){
			case "UDI":
				switch($country){
					case'GT':
						_response={campaign:"7846",carga:11};
					break;
					case'NI':
						_response={campaign:"7846",carga:12};
					break;
					case'SV':
						_response={campaign:"7846",carga:13};
					break;
					
					
				}
			break;
			case "USAM":
				switch($country){
					case'GT':
						_response={campaign:"7857",carga:11};
					break;
					case'NI':
						_response={campaign:"7857",carga:12};
					break;
					case'SV':
						_response={campaign:"7857",carga:13};
					break;
					
				}
			break;
			default:
				
				_response={campaign:"0000",carga:1};
		}
		
		return _response;
			
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
		
		$line=$line.split(",").join("").split('"').join("");
		
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
	setCampaignAndDetail:function($param){
	   var campana="";
	   var medio="";
	   var tipoAnuncio="";
	   var modalidad="";
	   var tipoanuncio="";
	   var tracking_code=$param.split("");
	   var _counter=0;
	
	   if($param!="Organic"){
	   	for(var i=0;i<tracking_code.length;i++){
		    if(tracking_code[i]=="_"){
		     _counter++;
		    }else{
		     if(_counter<1){
		      campana+=tracking_code[i];
		     }
		     if(_counter>=1 && _counter<2){
		      medio+=tracking_code[i];
		     }
		     if(_counter>=2 && _counter<3){
		      modalidad+=tracking_code[i];
		     }
		     if(_counter>=3 && _counter<4){
		      tipoanuncio+=tracking_code[i];
		     }
		    }
		   }
		   
		   var response={
		    tracking_code:tracking_code.join(""),
		    medio:medio,
		    modalidad:tipoanuncio,
		    detalle_medio:modalidad
		   };
	   }else{
	   		var response={
		    tracking_code:"Organic",
		    medio:"Organic",
		    modalidad:"Organic",
		    detalle_medio:"Organic"
		   };
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
                        if (UniversalModel.a_phones_validations[i].phone_start_numbers.length > 0) {
                            if ($type == 'MobilePhone') {
                                response.message = 'El número de teléfono celular debe iniciar con uno de los siguientes números: ' + String(UniversalModel.a_phones_validations[i].phone_start_numbers + ' y debe tener ' + UniversalModel.a_phones_validations[i].phone_digits + ' digitos');
                            } else {
                                response.message = 'El número de teléfono fijo debe iniciar con uno de los siguientes números: ' + String(UniversalModel.a_phones_validations[i].phone_start_numbers + ' y debe tener ' + UniversalModel.a_phones_validations[i].phone_digits + ' digitos');
                            }
                        }
                    }
                }
            }
        }
        return response;
    }
};