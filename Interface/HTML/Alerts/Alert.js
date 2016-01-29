var Alert = {
	init:function(){
	    Alert.addListeners();
	},

	addListeners: function () {
	    document.getElementById('alert-close').addEventListener('click', Alert.hide);
	},
	hide:function(){
	    var alert=document.getElementById('alert_container');
	    alert.style.visibility = 'hidden';
	},
	show:function($title,$description,$type){
	    var alert = document.getElementById('alert_container');
	    var alert_title = document.getElementById('alert-title');
	    var alert_description = document.getElementById('alert-description');

	    alert.style.visibility = 'visible';
	    alert_title.textContent = $title;
	    alert_description.textContent = $description;

	    switch ($type) {
	        case 'Error':
	            alert.style.backgroundColor = 'rgb(184, 2, 14)';
	            break;
	        case 'Alert':
	            alert.style.backgroundColor = 'rgb(248, 122, 0)';
	            break;
	        case 'Message':
	            alert.style.backgroundColor = 'rgb(5, 123, 69)';
	            break;
	    }

	},
	
	showCountrieSlected:function($countries,$callback,$name_button){
		
		var elemHTML = "<table style='font-size:11px;'><tr>";
		var counter = 1;
		for(var i=0; i < $countries.length; i++){			
			if(counter < 5){
				elemHTML+="<td class='td_custom'><center><a href='"+$countries[i].href+"'  style='font-size:10px;' class='img-country' >"+
				"<img class='custom' width='40' src='"+$countries[i].url+"'/><br/>"+$countries[i].name+"</a></center></td>";	
			}else{
				counter = 1;
				elemHTML+="<td class='td_custom'><center><a style='font-size:10px;' class='img-country' >"+
				"<img class='custom' width='40' src='"+$countries[i].url+"'/><br/>"+$countries[i].name+"</a></center></td>"+
				"</tr><tr>";	
			}
			counter++;
		}
		elemHTML+="</tr></table>";
		Alert.showLightboxMessageAlert(elemHTML,'',$callback,$name_button);
	},
	showCountriesAlert:function($container,$countries,$callback){
	    var rut = AppFramework.a_prefix+'AppFramework/images/';
	    var content = '<div id="flagGlobalContainer_div">';
	    for (var i = 0; i < $countries.length; i++) {
	        switch ($countries[i]) {
	            case 'CO':
	                content += '<div class="flagContainer_div"><img class="custom" width="40" src="' + rut + 'countries/colombia.png"/><br/>Colombia</a></center></td></div>';
	                break;
	            case 'ARG':
	                content += '<div class="flagContainer_div"><img class="custom" width="40" src="' + rut + 'countries/argentina.png"/><br/>Argentina</a></center></td></div>';
	                break;
	            case 'CR':
	                content += '<div class="flagContainer_div"><img class="custom" width="40" src="' + rut + 'countries/costarica.png"/><br/>Costa Rica</a></center></td></div>';
	                break;
	            case 'PA':
	                content += '<div class="flagContainer_div"><img class="custom" width="40" src="' + rut + 'countries/panama.png"/><br/>Panam&aacute;</a></center></td></div>';
	                break;
	            case 'CL':
	                content += '<div class="flagContainer_div"><img class="custom" width="40" src="' + rut + 'countries/chile.png"/><br/>Chile</a></center></td></div>';
	                break;
	            case 'PY':
	                content += '<div class="flagContainer_div"><img class="custom" width="40" src="' + rut + 'countries/paraguay.png"/><br/>Paraguay</a></center></td></div>';
	                break;
	            case 'BR':
	                content += '<div class="flagContainer_div"><img class="custom" width="40" src="' + rut + 'countries/brazil.png"/><br/>Brasil</a></center></td></div>';
	                break;
	            case 'GT':
	                content += '<div class="flagContainer_div"><img class="custom" width="40" src="' + rut + 'countries/guatemala.png"/><br/>Guatemala</a></center></td></div>';
	                break;
	            case 'NG':
	                content += '<div class="flagContainer_div"><img class="custom" width="40" src="' + rut + 'countries/nicaragua.png"/><br/>Nicaragua</a></center></td></div>';
	                break;
	            case 'SLV':
	                content += '<div class="flagContainer_div"><img class="custom" width="40" src="' + rut + 'countries/salvador.png"/><br/>El Salvador</a></center></td></div>';
	                break;
	            case 'HN':
	                content += '<div class="flagContainer_div"><img class="custom" width="40" src="' + rut + 'countries/honduras.png"/><br/>Honduras</a></center></td></div>';
	                break;
	            case 'USA':
	                content += '<div class="flagContainer_div"><img class="custom" width="40" src="' + rut + 'countries/usa.png"/><br/>USA</a></center></td></div>';
	                break;
	        }
	    }
	    content += '</div>';
		
		if($container == undefined || $container == ''){
			Alert.showLightboxAlert(content,'');
		}else{
		    $("#" + $container).html(content);
		}
		$(".flagContainer_div").click(function () {
		    $callback(Alert.getLang($(this).children()[0].src));
		});
		
	},
	getLang: function ($lang) {
	    var lang = '';
	    if (
            $lang.indexOf('colombia') >= 0 ||
            $lang.indexOf('panama') >= 0 ||
            $lang.indexOf('chile') >= 0 ||
            $lang.indexOf('paraguay') >= 0 ||
            $lang.indexOf('argentina') >= 0 ||
            $lang.indexOf('costarica') >= 0 ||
            $lang.indexOf('nicaragua') >= 0 ||
            $lang.indexOf('salvador') >= 0 ||
            $lang.indexOf('honduras') >= 0 ||
            $lang.indexOf('guatemala') >= 0
            ) {
	        lang = 'ESP';
	    }
	    if ($lang.indexOf('usa') >= 0) {
	        lang = 'ENG';
	    }
	    if ($lang.indexOf('brazil') >= 0) {
	        lang = 'PORT';
	    }
	    return lang;
	},
	showLoadingAlertLightbox:function(){		
		try{
			$("#customAlert").html("Cargando...<br/><br/><div id='progressbar'></div>");
			var closeOnEscape = $( ".selector" ).dialog( "option", "closeOnEscape" );
	        $("#customAlert").dialog({
	        buttons: {
	             
	        },
		     dialogClass: 'no-close','closeOnEscape': false,modal: true,open: function() {
				$('.ui-widget-overlay').addClass('custom-overlay');
			},
			close: function() {
				$('.ui-widget-overlay').removeClass('custom-overlay');
			}}); 
			
			$( "#progressbar" ).progressbar({
		      value: false
		    });
		    
		    $(".ui-dialog-titlebar").hide(); 
		   	 //console.log("Cargando");
		}catch(e){
			//document.getElementById("customAlert").innerHTML='<div style="margin-top:0px"><img src="images/ajax-loader.gif" style="margin-left: 5px; margin-top:20px; float:left"></div>';
		}finally{
		}
	},
	showLoadingAlert: function () {
	    var loading = document.getElementById('loading-container');
	    loading.style.visibility = 'visible';
	},
	hideLoadingLightbox:function(){
		try{
			$("#customAlert").dialog( "close" );
		}catch(e){
			
		}finally{}
		
		
	},
	hideLoadingAlert: function () {
	    var loading = document.getElementById('loading-container');
	    loading.style.visibility = 'hidden';
	},
	showLightboxAlert: function ($message, $title) {
	    $ = jQuery;
	    try{
			$("#customAlert").html($message);
			var closeOnEscape = $( ".selector" ).dialog( "option", "closeOnEscape" );
        	$("#customAlert").dialog({ 
	           dialogClass: 'no-close','closeOnEscape': false,modal: true,open: function() {
			        $('.ui-widget-overlay').addClass('custom-overlay');
			    },
			    buttons: {
	             Ok: function() {
	               $( this ).dialog( "close" );
	             }
	           },
			    close: function() {
			        $('.ui-widget-overlay').removeClass('custom-overlay');
			    }}).dialog("open");   
			if($title == undefined){
				$("span.ui-dialog-title").text('Mensaje'); 				
			}else{
				$("span.ui-dialog-title").text($title); 
			}	
			
			$(".ui-dialog-titlebar-close", ui.dialog || ui).hide(); 	
			}catch(e){		
			    console.log(e);
			}finally{
				$(".ui-dialog-titlebar").hide(); 	
				var bn= document.getElementsByClassName('ui-dialog-buttonset')[0]
				bn.style.float= "none";
				bn.style.textAlign= "center";
				var obj= document.getElementsByClassName('ui-corner-all')[0]
				obj.style.borderRadius= "10px";
				obj.style.borderColor= "white";
			}
    	
   },
   showLightboxMessageAlert: function ($message,$title,$callBack,$name) {
   		
    		try{
			$("#customAlert").html($message);
			
			var closeOnEscape = $( ".selector" ).dialog( "option", "closeOnEscape" );
        	$("#customAlert").dialog({ 
	           dialogClass: 'no-close','closeOnEscape': false,modal: true,open: function() {
			        $('.ui-widget-overlay').addClass('custom-overlay');
			    },
			    buttons: {
	             Ok: function() {
	             	if($callBack != undefined && $callBack != ''){
	             		$callBack();
	             	}else{
	             		$( this ).dialog( "close" );
	             	}
	             }
	           },
	           dialogClass: 'my-dialog',
			    close: function() {
			        $('.ui-widget-overlay').removeClass('custom-overlay');
			    }}).dialog("open");   
				
			if($title == undefined){
				$("span.ui-dialog-title").text('Mensaje'); 				
			}else{
				$("span.ui-dialog-title").text($title); 
			}	
			
			$(".ui-dialog-titlebar-close", ui.dialog || ui).hide(); 	
			
			
			}catch(e){		
			    console.log(e);
			}finally{
				$(".ui-dialog-titlebar").hide(); 	
				var bn= document.getElementsByClassName('ui-dialog-buttonset')[0]
				bn.style.float= "none";
				bn.style.textAlign= "center";
				var obj= document.getElementsByClassName('ui-corner-all')[0]
				obj.style.borderRadius= "10px";
				obj.style.borderColor= "white";
				
				
					if($name != undefined && $name != ''){
						$('.my-dialog .ui-button-text:contains(Ok)').text($name);
					}
				
			}
    	
   },
   showTooltipAlert:function($id_element,$message){	
		var obj = document.getElementsByTagName('label');
		for(var i=0; i < obj.length; i++){
			obj[i].style.width = '5em';
			obj[i].style.display = 'inline-block';
		}
		
		
		try{
	 		$e = $('#'+$id_element);
			$e.attr('data-original-title',$message);
	 	}catch(e){
	 		
	 	}finally{
	 		
		 }
		
		document.getElementById($id_element).title = $message;
		
		$( "#"+$id_element ).tooltip();
		$("#"+$id_element).focus();
		
		var centinela=0;
		
		 setTimeout(function(){ 
		 	document.getElementById($id_element).title = '';
		 	try{
		 		$e = $('#'+$id_element);
				$e.attr('data-original-title', $e.attr('title') || '').attr('title', '');
		 	}catch(e){
		 	}finally{
		 	}
		 	
		 	},500);
			
	}
};
Alert.init();