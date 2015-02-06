var GeoUtil={
	
	a_deptos_container:"",
	a_cities_container:"",
	a_deptos:[],
	a_cities:[],
	a_selected_city:"N/A",
	a_selected_depto:"",
	a_selected_index:"",
	

	renderDynamicCombo:function($code_country,$csv,$deptos_container,$cities_container){
		
		GeoUtil.a_deptos_container=$deptos_container;
		GeoUtil.a_cities_container=$cities_container;
		
		if(String(document.location).indexOf("www")>-1){
			$csv="http://www."+$csv;
		}else{
			$csv="http://"+$csv;
		}
		
		
		switch($code_country){
			case "CO":
			CSVReaderUtil.loadCSV($csv,GeoUtil.renderDeptos);	
			break;
		}
		
		try{
			console.log("Ingresa");
			GeoUtil.renderDocs($code_country);		
		}catch(e){
		}finally{
		}
	},
	renderDocs:function($country){
		
		var _options="";
		
		switch($country){
			case "CO":
			_options+="<option value='CC'>CEDULA DE CIUDADANIA.</option>";
			_options+="<option value='CE'>CEDULA DE EXTRANJERIA</option>";
			_options+="<option value='TI'>TARJETA DE IDENTIDAD</option>";
			console.log(document.getElementById("types_combo"));
			$("#types_combo").html(_options);	
			$("#document_containerSuperior").html('<label><input id="documentSuperior_txt" class="js-signup-email" name="documento" type="text" placeholder="Documento" data-trigger="change" data-required="true"/></label>');
			$("#types_containerSuperior").html('<select id="types_comboSuperior" class="form-control"  onchange="CursoView.documentComboSelected();">'+_options+'</select>');	
			
		//
			break;
			/*case "BR":
			_options+="<option value='DNI'>DOCUMENTO DE IDENTIDADE</option>";
			_options+="<option value='DF'>DOCUMENTO FISCAL</option>";	
			console.log(document.getElementById("types_combo"));
			$("#types_combo").html(_options);
			$("#document_containerSuperior").html('<label><input id="documentSuperior_txt" class="js-signup-email" name="documento" type="text" placeholder="Documento" data-trigger="change" data-required="true"/></label>');
			//$("#types_containerSuperior").html('<select id="types_comboSuperior" class="form-control"  onchange="CursoView.documentComboSelected();">'+_options+'</select>');	
			break;*/
			default:
			$("#types_container").html("");
			$("#document_container").html("");
			$("#document_containerSuperior").html("");
			
			
		}
	},
	renderDeptos:function(){
		
		var listDeptos="<select id='deptos_combo' class='form-control'><option value='NULL'>Departamentos</option>";
		var listDeptosSuperior="<select id='deptos_comboSuperior' class='form-control'><option value='NULL'>Departamentos</option>";
		
		for(var i = 0; i < CSVReaderUtil.a_tags_definition.length-1; i++){
			GeoUtil.a_deptos.push(CSVReaderUtil.a_tags_definition[i][2]);
			GeoUtil.a_cities.push(CSVReaderUtil.a_tags_definition[i]);
		}
		
		GeoUtil.a_deptos=ArrayUtils.deleteDuplicates(GeoUtil.a_deptos);
			
		for(var x = 0; x< GeoUtil.a_deptos.length; x++){
			listDeptos+="<option>"+GeoUtil.a_deptos[x]+"</option>";	
			listDeptosSuperior+="<option>"+GeoUtil.a_deptos[x]+"</option>";	
		}
		
		listDeptos+="</select>";
		listDeptosSuperior+="</select>";
		$("#"+GeoUtil.a_deptos_container).html(listDeptos);
		
		try{
			$("#"+GeoUtil.a_deptos_container+"Superior").html(listDeptosSuperior);
		}catch(e){
		}finally{}
		
		
		if($("#deptos_combo").val()=="NULL"){
			$("#deptos_combo").change(function() {
				console.log("Ingresa");
					GeoUtil.a_selected_depto=$("#deptos_combo").val();
					GeoUtil.fillCitiesCombo();
			});
		}else{
			try{
				$("#cities_container").html('<option value="NULL" id="cities_combo">Ciudad</option>');
				$("#cities_containerSuperior").html('<option value="NULL" id="cities_comboSuperior">Ciudad</option>');
			}catch(e){
			}finally{
			}
		}
		
		try{
			if($("#deptos_comboSuperior").val()=="NULL"){
				$("#deptos_comboSuperior").change(function() {
					GeoUtil.a_selected_depto=$("#deptos_comboSuperior").val();
					GeoUtil.fillCitiesCombo();
				});
			}else{
				try{
					$("#cities_container").html('<option value="NULL" id="cities_combo">Ciudad</option>');
					$("#cities_containerSuperior").html('<option value="NULL" id="cities_comboSuperior">Ciudad</option>');
				}catch(e){
				}finally{
				}
			}
		}catch(e){
		}finally{
		}
			
	},
	fillCitiesCombo:function(){
		var listCities = "<select id='cities_combo' class='form-control'><option value='NULL'>Ciudad</option>";
		var listCitiesSuperior = "<select id='cities_comboSuperior' class='form-control'><option value='NULL'>Ciudad</option>";
		for (var z = 0; z < GeoUtil.a_cities.length; z++) {
			if (GeoUtil.a_cities[z][2] == GeoUtil.a_selected_depto) {
					listCities += "<option value="+GeoUtil.a_cities[z][1]+">"+GeoUtil.a_cities[z][0]+"</option>";
					listCitiesSuperior += "<option value="+GeoUtil.a_cities[z][1]+">"+GeoUtil.a_cities[z][0]+"</option>";
			}
		}
		
		listCities+="</select>";
		listCitiesSuperior+="</select>";
		$("#cities_container").html(listCities);
		
		
		try{
			$("#cities_containerSuperior").html(listCitiesSuperior);
			$('#deptos_combo').val(GeoUtil.a_selected_depto);
			$('#deptos_comboSuperior').val(GeoUtil.a_selected_depto);
		}catch(e){
		}finally{
		}	
		
		$("#cities_combo").change(function() {
			var city=document.getElementById("cities_combo");
			GeoUtil.a_selected_city=(city.options[city.selectedIndex].value);
			
			try{
				$('#cities_combo').val(GeoUtil.a_selected_city);
				$('#cities_comboSuperior').val(GeoUtil.a_selected_city);
			}catch(e){
			}finally{
			}
			
			EventBus.dispatch(EventsController.CITY_SELECTED_EVENT);
		});
		
		try{
			$("#cities_comboSuperior").change(function() {
				var city=document.getElementById("cities_comboSuperior");
				GeoUtil.a_selected_city=(city.options[city.selectedIndex].value);
				
				$('#cities_combo').val(GeoUtil.a_selected_city);
				
				EventBus.dispatch(EventsController.CITY_SELECTED_EVENT);
			});
		}catch(e){
		}finally{
		}
	}
};