var Alert = {
    init: function () {
    	
    	var elem =  document.createElement('div');
    	elem.id = 'customAlert';
     	document.body.appendChild(elem);
     	
      /*  var al = document.getElementById('alert_container');
        al.style.visibility = 'hidden';*/
        
    },
    show: function ($message, $type) {
        var al = document.getElementById('alert_container');
        var ms = document.getElementById('alert_message');
        var cl = document.getElementById('close_button');
        cl.style.visibility = 'visible';
        al.style.visibility = 'visible';
         ms.innerHTML = '';
        ms.textContent = $message;

        switch ($type) {
            case 'danger':
                al.style.backgroundColor = 'rgb(186, 3, 3)';
                al.style.color='white';
                break;
            case 'message':
                al.style.backgroundColor = 'rgb(200, 200, 200)';
                ms.style.color = 'black';
                break;
        }
    },
    hide: function () {
        var al = document.getElementById('alert_container');
        var cl = document.getElementById('close_button');
        al.style.visibility = 'hidden';
        cl.style.visibility = 'hidden';
    },
    showLoadingAlert: function ($type) {
        var al = document.getElementById('alert_container');
        var ms = document.getElementById('alert_message');
        var cl = document.getElementById('close_button');
        cl.style.visibility = 'hidden';
        
        al.style.zIndex = 9999;
        al.style.width = '100%';
        al.style.position ='absolute';
        
        al.style.backgroundColor = 'rgb(200, 200, 200)';
        ms.style.marginLeft ='40%';
        ms.innerHTML = 'Loading, please wait... <br/> <img src="com/images/ajax-loader.gif"/>';
        al.style.visibility = 'visible';
    },
    hideLoadingAlert:function(){
		try{
			$('#customAlert').dialog("close");
		}catch(e){
			document.getElementById('customAlert').innerHTML="";
		}finally{
		}
	},
    showLoadingAlertLightbox:function(){
		try{
			$("#customAlert").html("Loading, please wait...<br/><br/><div id='progressbar'></div>");
			var closeOnEscape = $( ".selector" ).dialog( "option", "closeOnEscape" );
	        $("#customAlert").dialog({ buttons: {
		        
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
		    console.log("Cargando");
		}catch(e){
			//document.getElementById("customAlert").innerHTML='<div style="margin-top:0px"><img src="images/ajax-loader.gif" style="margin-left: 5px; margin-top:20px; float:left"></div>';
		}finally{
		}
	},
    showLightboxAlert:function($field,$message){
    	try{
			$("#customAlert").html($message);
			
			var closeOnEscape = $( ".selector" ).dialog( "option", "closeOnEscape" );
        	$("#customAlert").dialog({ buttons: {
	             Ok: function() {
	               $( this ).dialog( "close" );
	               $("#"+$field).focus();
	             }
	           },
	           dialogClass: 'no-close','closeOnEscape': false,modal: true,open: function() {
			        $('.ui-widget-overlay').addClass('custom-overlay');
			    },
			    close: function() {
			    	console.log("Close");
			        $('.ui-widget-overlay').removeClass('custom-overlay');
			    }});   
			
		}catch(e){				
			document.getElementById("customAlert").innerHTML=$message;
			//document.getElementById("customAlert").innerHTML='<div class="alert alert-danger" role="alert">'+$message+'</div>';
		}finally{
			
		}
    	
   },
   	showTooltipAlert:function($id_element,$message){
		
		var obj = document.getElementsByTagName('label');
		for(var i=0; i < obj.length; i++){
			obj[i].style.width = '5em';
			obj[i].style.display = 'inline-block';
		}
		
		
		document.getElementById($id_element).title = $message;
		
		$( "#"+$id_element ).tooltip();
		$("#"+$id_element).focus();
		
		var centinela=0;
		setInterval(function() {
			centinela=centinela+1;
			if(centinela>=1){
				document.getElementById($id_element).title = '';
			}
	      // método que debe ejecutarse; 
	    },200);
		
	}
};