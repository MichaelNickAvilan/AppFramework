/*
 Connection Interface for the POLI Website
 * */
var TagsManager={
	
	a_ga_centinela:false,
	a_lead:{},
	
	init:function(){
		TagsManager.addListeners();
		TagsManager.dispatchEventsByLink();
	},
	addListeners:function(){
		Controller.addListener(document, 'ADOBE_TAG_DIPATCHED', TagsManager.dispatchConversionEventsDelegate);
	},
	renderAnalyticsTags:function($tags){
		for(var i=0;i<$tags.length;i++){
			switch($tags[i].content_reg.fields_form[0].value){
				case 'GA':
				if(TagsManager.a_ga_centinela==false){
					TagsManager.a_ga_centinela=true;
					GoogleAnalytics.init($tags[i].content_reg.fields_form[1].value);
				}else{}
				break;
				case 'RyA':
				AdobeReportsAnalytics.initLegacy($tags[i].content_reg.fields_form[1].value);
				break;
				case 'GWMT':
				var meta = document.createElement('meta');
				meta.name = "google-site-verification";
				meta.content = $tags[i].content_reg.fields_form[1].value;
				document.getElementsByTagName('head')[0].appendChild(meta);
				break;
			}
		}
		
		TagManager.init('POLI');
	},
	renderTags:function($tags,$lead){
		CTECConsumer.a_sended_object.codigou='POLI';
		CTECConsumer.a_sended_object.tipoprograma=window.user.tipoprograma;
		CTECConsumer.a_sended_object.modalidad=window.user.modalidad;
		CTECConsumer.a_sended_object.programa=window.user.programa;
		Controller.eventDispatcherDelegate(document, 'CRM_DATA_SENDED');
		
	},
	dispatchEventsByLink:function(){
		var els = document.getElementsByTagName("a");
		for (var i = 0, l = els.length; i < l; i++) {
			var el = els[i];
			if (String(el.href).length>0) {
				Controller.addListener(el,'click', function(){
			    	if(ga!=undefined){
						ga('send', {
							'hitType': 'event',    
							'eventCategory': 'User Action: '+document.location.hostname,   
							'eventAction': 'Goto Page: '+document.location.pathname,      
							'eventLabel': el.href,
							'eventValue': 1
						    });
					}
			     });
			 }
		}	
	},
	dispatchConversionEventsDelegate:function(){
	}
};
TagsManager.init();