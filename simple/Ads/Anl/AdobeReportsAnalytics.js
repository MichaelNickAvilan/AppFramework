var AdobeReportsAnalytics={
	a_centinela:false,
	a_report_suite:'',
	
	initNew:function($reportsuite){
		if(AdobeReportsAnalytics.a_centinela==false){
			AdobeReportsAnalytics.a_centinela=true;
			DomUtils.loadScript('http://hechoparaliderar.com/api/js/AppFramework/Ads/Anl/AdobeLibs/VisitorAPI.js', function () {
				DomUtils.loadScript('http://hechoparaliderar.com/api/js/AppFramework/Ads/Anl/AdobeLibs/AppMeasurement.js', function () {
					console.log($reportsuite);
				});
			});	
		}
	},
	reportConversion:function($name,$form_name){
		DomUtils.loadScript('http://hechoparaliderar.com/api/js/AppFramework/Ads/Anl/AdobeLibs/legacy/VisitorAPI.js', function () {
			DomUtils.loadScript('http://hechoparaliderar.com/api/js/AppFramework/Ads/Anl/AdobeLibs/legacy/s_code.js', function () {
				var s_account=AdobeReportsAnalytics.a_report_suite;
				var s=s_gi(AdobeReportsAnalytics.a_report_suite); 
				
				var $prefix='';
				var $ctr = '';
		   		if (String(document.location.origin).indexOf('qacmsudi.edu') >= 0 ||
		            String(document.location.origin).indexOf('udelistmo') >= 0) {
			        $prefix = 'UDI';
			        $ctr='Panama';
			    }
			    if (String(document.location.origin).indexOf('qacmsusam.edu') >= 0 ||
			    	String(document.location.origin).indexOf('usanmarcos') >= 0 ||
		            String(document.location.origin).indexOf('usam.ac') >= 0) {
			        $prefix = 'USAM';
			        $ctr='Costa Rica';
			    }
			    if (String(document.location.origin).indexOf('qacmspoli.edu') >= 0 ||
		            String(document.location.origin).indexOf('poli.edu.co') >= 0 ||
		            String(document.location.origin).indexOf('10.60.52.25') >= 0) {
			        $prefix = 'POLI';
			        $ctr='Colombia';
			    }
			    
			    if (String(document.location.origin).indexOf('qacmsfuaa.edu') >= 0 ||
		            String(document.location.origin).indexOf('areandina.edu.co') >= 0 ||
            		String(document.location.origin).indexOf('areandina') >= 0) {
			        $prefix = 'FUAA';
			        $ctr='Colombia';
			    }
			    if (String(document.location.origin).indexOf('unitec') >= 0) {
			        $prefix = 'UNITEC';
			        $ctr='Colombia';
			    }
				
				s.charSet='ISO-8859-1'
				s.cookieDomainPeriods=3
				s.currencyCode='USD'
				s.trackDownloadLinks=true
				s.trackExternalLinks=true
				s.trackInlineStats=true
				s.linkDownloadFileTypes='exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx'
				s.linkInternalFilters='javascript:,www.whitneyintl.com'
				s.linkLeaveQueryString=false
				s.linkTrackVars='None'
				s.linkTrackEvents='None'
				s.campaign=DomUtils.getURLParam('cmpid');
				s.pageName=document.title+': LEAD COMPLETE';
				s.eVar25=navigator.language;
				s.eVar2=$name;
				s.eVar3=$form_name;
				s.eVar7=$ctr;
				s.eVar8=$form_name;
				s.events='event2,event3';
				s.channel=AdobeReportsAnalytics.getChannel(document.location.href);
				s.visitorNamespace='whitney';
				s.trackingServer='whitney.d1.sc.omtrdc.net';
				s_code = s.t();
				
				UniversalModel.a_sended_object={name:$name, formName:$form_name };
				Controller.eventDispatcherDelegate(document,'ADOBE_TAG_DIPATCHED');
			});
		});
	},
	initLegacy:function($reportsuite){
		DomUtils.loadScript('http://hechoparaliderar.com/api/js/AppFramework/Ads/Anl/AdobeLibs/legacy/VisitorAPI.js', function () {
			DomUtils.loadScript('http://hechoparaliderar.com/api/js/AppFramework/Ads/Anl/AdobeLibs/legacy/s_code.js', function () {
				AdobeReportsAnalytics.a_report_suite=$reportsuite;
				var s_account=$reportsuite;
				var s=s_gi(s_account)
				
				s.charSet='ISO-8859-1'
				s.cookieDomainPeriods=3
				s.currencyCode='USD'
				s.trackDownloadLinks=true
				s.trackExternalLinks=true
				s.trackInlineStats=true
				s.linkDownloadFileTypes='exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx'
				s.linkInternalFilters='javascript:,www.whitneyintl.com'
				s.linkLeaveQueryString=false
				s.linkTrackVars='None'
				s.linkTrackEvents='None'
				s.campaign=DomUtils.getURLParam('cmpid');
				s.pageName=document.title;
				s.eVar25=navigator.language;
				s.channel=AdobeReportsAnalytics.getChannel(document.location.href);
				
				s.visitorNamespace='whitney';
				s.trackingServer='whitney.d1.sc.omtrdc.net';
				s_code = s.t();
			});
		});
	},
	getChannel: function ($url) {

        var url = $url;
        url = url.replace('index.html/', '');
        url = url.replace('index.php/', '');
        url = url.replace('item/', '');
        url = url.replace('node/#', '');
        url = url.replace('#decano', '');
        url = url.replace('#trabajo', '');
        url = url.replace('/#', '');
        url = url.replace('.php/#', '');
        url = url.replace('.php#', '');
        url = url.replace('.php', '');
        url = url.replace('.html/#', '');
        url = url.replace('.html#', '');
        url = url.replace('.html', '');
        url = url.replace('http://', '');
        url = url.replace('https://', '');
        url = url.replace(window.location.hostname + '/', 'home|');

        url = url.split('');
        for (var i = 0; i < url.length; i++) {
            if (url[i] == '/') {
                url[i] = '|';
            }
        }

        return url.join('');
   }
};

//Generar caminos alternos de sobreescritura de los Scripts del POLI
//Trampa Sobreescritura de la clase de negocios local

var TagManagerBusiness={
	
	a_counter:0,
	
	setServerCRMValues:function($medio,$detallemedio,$descripcion,$callback){
		//document.location.origin+'/profiles/university/libraries/whitney/com/php/proxy.php',
		AjaxDelegate.requestInfo(
		    document.location.origin+'/profiles/university/libraries/whitney/com/php/proxy.php',
		    {
		    	service: 3,
		        medio: $medio,
		        detallemedio:$detallemedio,
		        descripcion:$descripcion
		    }, 'post', 'json',
		    function () {
		        $callback();
		    });
	},
	getLeadsRequest: function ($id_form, $callback) {
		if(TagManagerBusiness.a_counter<=1){
			TagManagerBusiness.a_counter++;
			AjaxDelegate.requestInfo(
		    document.location.origin+'/profiles/university/libraries/whitney/com/php/proxy.php',
		    {
		    	service: 1,
		        id_form: $id_form
		    }, 'post', 'json',
		    function () {
		        $callback();
		    });
		}
   },
   tester:function(){
   	console.log('Teeester');
   },
   duplicateLead:function($lead){
   		var $prefix='';
   		if (String(document.location.origin).indexOf('qacmsudi.edu') >= 0 ||
            String(document.location.origin).indexOf('udelistmo') >= 0) {
	        $prefix = 'UDI';
	    }
	    if (String(document.location.origin).indexOf('qacmsusam.edu') >= 0 ||
	    	String(document.location.origin).indexOf('usanmarcos') >= 0 ||
            String(document.location.origin).indexOf('usam.ac') >= 0) {
	        $prefix = 'USAM';
	    }
	    if (String(document.location.origin).indexOf('qacmspoli.edu') >= 0 ||
            String(document.location.origin).indexOf('poli.edu.co') >= 0 ||
            String(document.location.origin).indexOf('10.60.52.25') >= 0) {
	        $prefix = 'POLI';
	    }
   		
   		if (String(document.location.origin).indexOf('qacmsfuaa.edu') >= 0 ||
            String(document.location.origin).indexOf('areandina.edu.co') >= 0 ||
            String(document.location.origin).indexOf('areandina') >= 0) {
	        $prefix = 'FUAA';
	        $ctr='Colombia';
	    }
   	
	   	var data='{"id_form":"101","admins_id_admin":"11","title_form":"POLI: Leads",'+
		'"description_form":"Listado de Leads del Sitio Principal del POLI","fields_form":['+
			   	'{"type":"TEXT","fieldId":"fieldType1_combo","name":"Nombres","value":"'+$lead.nombre+'"},'+
			   	'{"type":"TEXT","fieldId":"fieldType2_combo","name":"Apellidos","value":"'+$lead.apellido+'"},'+
			   	'{"type":"TEXT","fieldId":"fieldType3_combo","name":"Mail","value":"'+$lead.mail+'"},'+
			   	'{"type":"TEXT","fieldId":"fieldType4_combo","name":"Ciudad","value":"'+$lead.ciudad+'"},'+
			   	'{"type":"TEXT","fieldId":"fieldType5_combo","name":"Direccion","value":"'+$lead.direccion+'"},'+
			   	'{"type":"TEXT","fieldId":"fieldType6_combo","name":"Tel1","value":"'+$lead.tel1+'"},'+
			   	'{"type":"TEXT","fieldId":"fieldType7_combo","name":"Tel2","value":"'+$lead.tel2+'"},'+
			   	'{"type":"TEXT","fieldId":"fieldType8_combo","name":"CampaÃ±a","value":"'+$lead.campana+'"},'+
			   	'{"type":"TEXT","fieldId":"fieldType9_combo","name":"CÃ³digo Carga","value":"'+$lead.codigocarga+'"},'+
			   	'{"type":"TEXT","fieldId":"fieldType10_combo","name":"DescripciÃ³n","value":"'+String($lead.descripcion).replace("/,/g", "_")+'"},'+
			   	'{"type":"TEXT","fieldId":"fieldType11_combo","name":"Detalle Medio","value":"'+String($lead.detallemedio).replace(',','..')+'"},'+
			   	'{"type":"TEXT","fieldId":"fieldType12_combo","name":"Detalle Prioridad","value":"'+$lead.detalleprioridad+'"},'+
			   	'{"type":"TEXT","fieldId":"fieldType13_combo","name":"Forma Ingreso","value":"'+$lead.formaingreso+'"},'+
			   	'{"type":"TEXT","fieldId":"fieldType14_combo","name":"Landing IP","value":"'+$lead.landingIP+'"},'+
			   	'{"type":"TEXT","fieldId":"fieldType15_combo","name":"Landing Content","value":"'+$lead.landingContent+'"},'+
			   	'{"type":"TEXT","fieldId":"fieldType16_combo","name":"Landing Medium","value":"'+$lead.landingMedium+'"},'+
			   	'{"type":"TEXT","fieldId":"fieldType17_combo","name":"Landing Name","value":"'+$lead.landingName+'"},'+
			   	'{"type":"TEXT","fieldId":"fieldType18_combo","name":"Landing Source","value":"'+$lead.landingSource+'"},'+
			   	'{"type":"TEXT","fieldId":"fieldType19_combo","name":"Landing Term","value":"'+$lead.landingTerm+'"},'+
			   	'{"type":"TEXT","fieldId":"fieldType20_combo","name":"Medio","value":"'+$lead.medio+'"},'+
			   	'{"type":"TEXT","fieldId":"fieldType21_combo","name":"Modalidad","value":"'+$lead.modalidad+'"},'+
			   	'{"type":"TEXT","fieldId":"fieldType22_combo","name":"Nombre Form","value":"Formulario Sitio Principal '+$prefix+'"},'+
			   	'{"type":"TEXT","fieldId":"fieldType23_combo","name":"Origen","value":"'+$lead.origen+'"},'+
			   	'{"type":"TEXT","fieldId":"fieldType24_combo","name":"Origen Real","value":"'+$lead.origen_real+'"},'+
			   	'{"type":"TEXT","fieldId":"fieldType25_combo","name":"Pais","value":"'+$lead.pais+'"},'+
			   	'{"type":"TEXT","fieldId":"fieldType26_combo","name":"Prioridad","value":"'+$lead.prioridad+'"},'+
			   	'{"type":"TEXT","fieldId":"fieldType27_combo","name":"Programa","value":"'+$lead.programa+'"},'+
			   	'{"type":"TEXT","fieldId":"fieldType28_combo","name":"Sede","value":"'+$lead.sede+'"},'+
			   	'{"type":"TEXT","fieldId":"fieldType29_combo","name":"Servicio","value":"'+$lead.service+'"},'+
			   	'{"type":"TEXT","fieldId":"fieldType30_combo","name":"Temporalidad","value":"'+$lead.temporalidad+'"},'+
			   	'{"type":"TEXT","fieldId":"fieldType31_combo","name":"Tipo Documento","value":"'+$lead.tipodoc+'"},'+
			   	'{"type":"TEXT","fieldId":"fieldType32_combo","name":"Tipo Oportunidad","value":"'+$lead.tipooportunidad+'"},'+
			   	'{"type":"TEXT","fieldId":"fieldType33_combo","name":"Tipo Programa","value":"'+$lead.tipoprograma+'"},'+
			   	'{"type":"TEXT","fieldId":"fieldType34_combo","name":"GUID CRM","value":"'+$lead.guid+'"},'+
			   	'{"type":"TEXT","fieldId":"fieldType35_combo","name":"Referidor","value":""},' +
		        '{"type":"TEXT","fieldId":"fieldType36_combo","name":"Universidad","value":"' + $prefix + '"}' +
	   	'],"date_form":"2015-04-30 00:00:00"}';
	   	
	   	AjaxDelegate.requestInfo(
		document.location.origin+'/profiles/university/libraries/whitney/com/php/proxy.php',
		{
			service: 2,
			forms_id_form: '101',
			forms_admins_id_admin:11,
			content_reg:data,
			date_reg:FormsUtils.getFormatedDate()
		}, 'post', 'json',
		function () {
			console.log('DIGILAB: LEAD STORED');
		});
   }
};