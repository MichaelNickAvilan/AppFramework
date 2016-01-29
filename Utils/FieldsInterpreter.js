var FieldsInterpreter = {
	ids_radiCheck:[],
    init: function () {
    },
    getFields: function ($fields, $prefix) {
        var items = [];
        for (var i = 0; i < $fields.length; i++) {
            $prefix = FieldsInterpreter.deleteCharacters($fields[i].name, '_');
            switch ($fields[i].type) {
                case 'COMBO':
                	var name=$fields[i].name;
                		if(String(name).indexOf('RENDERRADIO')>=0){
                			items.push({ type: 'label', id:FieldsInterpreter.deleteCharacters($fields[i].name,'_'),props: [],text:String($fields[i].name).split('RENDERRADIO').join('').split('_UNO').join('').toUpperCase()});
                			var options = $fields[i].options;
                			var ids_radio = [];
                			
                			items.push({type:'fieldset', id:'fieldset_'+i, dataProvider:$fields[i].options, props:[]});
                			if(String(name).indexOf('RENDERRADIO_UNO')>=0){
                				FieldsInterpreter.ids_radiCheck.push({ids:ids_radio,number:i});	
                			}
                		}else if(String(name).indexOf('RENDERCHECKBOX')>=0){
                			items.push({ type: 'label', id:FieldsInterpreter.deleteCharacters($fields[i].name,'_'),props: [{name:'float', value:'none'}],text:String($fields[i].name).split('RENDERCHECKBOX').join('').split('_UNO').join('').toUpperCase()});
                			var options = $fields[i].options;
                			var ids_check = [];
                			for(var j = 0; j < options.length;j++){
                				items.push({ type: 'checkbox', props:[], id:FieldsInterpreter.deleteCharacters(options[j].name+i+'_checkbox','_'), link:'', textIni: options[j].name, textLink:''});	
                				ids_check.push(FieldsInterpreter.deleteCharacters(options[j].name+i+'_checkbox','_'));	
                			}
                			if(String(name).indexOf('RENDERCHECKBOX_UNO')>=0){
                				FieldsInterpreter.ids_radiCheck.push({ids:ids_check,number:i});
                			}
                		}else{
	                		items.push({type: 'combobox', id: $prefix + i + '_combo', className:'form-control', props: [], labelField: 'name',dataProvider:$fields[i].options, name: $fields[i].name.toUpperCase()});	
	                		FieldsInterpreter.deleteCharacters($prefix + i + '_combo')
                		} 
                	               	
                    break;
                case 'TEXT':
                    if(String($fields[i].name).indexOf('NONE') >= 0){
                    	items.push({ type: 'label', id:FieldsInterpreter.deleteCharacters($fields[i].name+i+'_radio','_'), className:'form-control',props: [{name:'float', value:'none'}],text:String($fields[i].name).split('NONE').join('')});
                    }else{
                    	if ($fields[i].validate == 'email'){
	                        items.push({ type: 'textfield', id: $prefix + i + '_txt', className:'form-control', props: [], placeholder: $fields[i].name.toUpperCase(), validate: 'email'});
                    	} else {
                    	    if ($fields[i].restrict != undefined) {
                    	        items.push({ type: 'textfield', id: $prefix + i + '_txt', props: [], className: 'form-control', placeholder: $fields[i].name.toUpperCase(), restrict: $fields[i].restrict });
                    	    } else {
                    	        items.push({ type: 'textfield', id: $prefix + i + '_txt', props: [], className: 'form-control', placeholder: $fields[i].name.toUpperCase(), restrict: 'Letters' });
                    	    }
	                    }
                    }  
                    break;
                case 'TEXT AREA':
                    if (String($fields[i].name).indexOf('NONE') >= 0) {
                        items.push({ type: 'label', id: FieldsInterpreter.deleteCharacters($fields[i].name + i + '_radio', '_'), className: 'form-control', props: [{ name: 'float', value: 'none' }], text: String($fields[i].name).split('NONE').join('') });
                    } else {
                        items.push({ type: 'textarea', id: $prefix + i + '_txt', props: [], className: 'form-control', placeholder: $fields[i].name.toUpperCase(), restrict: 'Letters' });
                    }
                    break;
                case 'NUMBER':
                    items.push({ type: 'textfield', id: $prefix + i + '_txt', className:'form-control', props: [], placeholder: $fields[i].name.toUpperCase(), restrict: 'Numbers' });
                    break;
                case 'PHONE':
                    items.push({ type: 'textfield', id: $prefix + i + '_txt', className:'form-control', props: [], placeholder: $fields[i].name.toUpperCase(), validate: 'phone', country: $fields[i].country}); 
                    break;
                case 'DATE':
                    items.push({type: 'textfield', id: $prefix + i + '_dateRange', className:'form-control', props: [], placeholder: $fields[i].name.toUpperCase(), validate: 'date' });
                    break;
            }
        }

        return items;
    },
    deleteCharacters: function ($string, $param) {
        $string = FormsUtils.especialCharacters($string);
        $string = $string.split(' ').join('_');
        var characters = ['(', ')', "'", '"', 'á', 'é', 'í', 'ó', 'ú', 'ñ', '-', '.', '&', ',', ';', '¿', '?', '/'];
        var replace = [];
        for (var i = 0; i < characters.length; i++) {
            $string = $string.split(characters[i]).join('');
        }
        return $string.toLowerCase();
    },
    validateFields: function ($fields) {
    	var centinela=true;
        for (var i = 0; i < $fields.length; i++) {
        	if(String(TextPerformance.getValue($fields[i].id)).length>0){
        		if(TextPerformance.getValue($fields[i].id) === 'NULL'){
        			return { name: $fields[i].placeholder, success: false, type: 'textfield', message:'Debes seleccionar una opción en: '+$fields[i].name };
        		}else{
        			if(TextPerformance.getValue($fields[i].id) === 'NULL_TERMS'){
        			    return {
        			        name: $fields[i].placeholder, success: false, type: 'textfield',
        			        message: {
        			            esp: 'Debes aceptar términos y condiciones',
        			            eng: 'You must accept terms and conditions',
        			            port: 'Você deve aceitar os termos e condições'
        			        }
        			    };
        			}else{
        				if($fields[i].validate == 'email'){
	        				if (FormsUtils.validateMail($fields[i].id).valid == false) {
	        				    return {
	        				        name: $fields[i].placeholder, success: false, type: 'textfield',
	        				        message: {
	        				            esp: 'Debes ingresar un correo válido',
	        				            eng: 'You must enter a valid email',
	        				            port: 'Você deve digitar um e-mail válido'
	        				        }
	        				    };
		        			}
	        			}	
        			}
        		}
        	}else{
        	    return {
        	        name: $fields[i].placeholder, success: false, type: 'textfield', message: {
        	            esp: 'Debes llenar el campo: ' + $fields[i].placeholder,
        	            eng: 'You must fill in the field: ' + $fields[i].placeholder,
        	            port: 'Você deve preencher o campo: ' + $fields[i].placeholder
        	        }
        	    };
        	}
        }
        
        if(centinela === true){
        	return { name: '', success: true, type: 'textfield', message:'success' };
        }
    },
    getFieldObject: function ($type, $fieldId, $name, $value, $options) {
        var field = {};
        switch ($type) {
            case 'textfield':
                field = {
                    type: 'TEXT',
                    fieldId: $fieldId,
                    name: $name,
                    value: $value
                };
                break;
            case 'combobox':
                field = {
                    type: 'COMBO',
                    fieldId: $fieldId,
                    name: $name,
                    value: $value,
                    options: $options
                };
                break;
            case 'date':
                field = {
                    type: 'DATE',
                    fieldId: $fieldId,
                    name: $name,
                    value: $value
                };
                break;
        }
        return field;
    },
    getRegObject: function ($admins_id_admin, $date_form, $description_form, $id_form, $title_form, $fields_form) {
    	for(var i=0;i<$fields_form.length;i++){
    		$fields_form[i].value=TextPerformance.getValue($fields_form[i].id);
    	}
        var reg = {
            admins_id_admin: $admins_id_admin,
            date_form: $date_form,
            description_form: $description_form,
            id_form: $id_form,
            title_form:$title_form,
            fields_form:$fields_form
        }
        return reg;
    },
    cleanForm:function($fields_form){
    	for(var i=0;i<$fields_form.length;i++){
    		if($fields_form[i].type!='combobox'){
    			TextPerformance.getField($fields_form[i].id).value='';
    			$fields_form[i].value='';
    		}
    	}
    },
    createSpecialFields: function ($fields) {
        for (var i = 0; i < $fields.length; i++) {
            if ($fields[i].validate === 'date') {
                $('#' + $fields[i].id).datepicker();
            }
        }
    }
};