var CTECConsumer = {

    a_sended_object: {},
    a_server_guid:'',

    init: function () {
        UniversalModel.a_urls_sources = [
            { client: 'Regional', url: 'http://crm-integ.ilumno.com:8050/WS_Integrationcol/WS_Integration.asmx?WSDL' },
            { client: 'Brasil UVA', url: 'http://crm-integ.ilumno.com:8050/WS_Integrationuva/WS_Integration.asmx?WSDL' },
            { client: 'Test', url: 'http://crm-integ.ilumno.com:8050/WS_IntegrationColombia/WS_Integration.asmx?WSDL' },
            { client: 'DataProxy', url: 'http://hechoparaliderar.com/api/php/proxys/dataproxy.php' },
            { client: 'FuaaProxy', url: 'com/php/fuaaproxy.php' }
        ];

        UniversalModel.a_phones_validations=[
            {type:'MobilePhone', country:'Colombia',code_country:'CO',phone_digits:10,phone_start_numbers:[3], indicative:57},
		    {type:'MobilePhone', country:'Costa Rica',code_country:'CR',phone_digits:8,phone_start_numbers:[6,7,8], indicative:78},
		    {type:'MobilePhone', country:'Panama',code_country:'PA',phone_digits:9,phone_start_numbers:[6], indicative:507},
		    {type:'MobilePhone', country:'Chile',code_country:'CL',phone_digits:8,phone_start_numbers:[6,7,8,9], indicative:569},
		    {type:'MobilePhone', country:'Paraguay',code_country:'PY',phone_digits:9,phone_start_numbers:[9], indicative:"010"},
		    {type:'MobilePhone', country:'Brazil',code_country:'BR',phone_digits:9,phone_start_numbers:[2], indicative:"5521"},
            
            {type:'Phone', country:'Colombia',code_country:'CO',phone_digits:7, indicative:57},
		    {type:'Phone', country:'Costa Rica',code_country:'CR',phone_digits:8, indicative:78},
		    {type:'Phone', country:'Panama',code_country:'PA',phone_digits:7, indicative:507},
		    {type:'Phone', country:'Chile',code_country:'CL',phone_digits:56},
		    {type:'Phone', country:'Paraguay',code_country:'PY',phone_digits:"010"}
        ];
    },
    addListeners: function () {
    },
    sendDataToCRM: function (
        $cedula, $nombres, $apellidos,
		$pais, $ciudad, $programa,
		$tel1, $tel2, $mail, $origen,
		$campana, $codigou, $modalidad,
		$prioridad, $detalleprioridad,
        $tipodoc, $direccion, $tipoprograma,
		$tipooportunidad, $codigocarga,
		$formaingreso, $sede, $temporalidad,
		$medio, $detallemedio, $landingContent,
		$ladingIP, $landingMedium, $landingName,
		$landingSource, $landingTerm, $url,
		$cmpid, $nombre_form, $origen_real,$description) {
			
			Alert.showLoadingAlertLightbox();

        var _data = {
            'service': 1, 'cedula': $cedula, 'nombre': $nombres, 'apellidos': $apellidos,
            'pais': $pais, 'ciudad': $ciudad, 'programa': $programa, 'tel1': $tel1,
            'tel2': $tel2, 'mail': $mail, 'origen': $origen, 'campana': $campana,
            'codigou': $codigou, 'modalidad': $modalidad, 'prioridad': $prioridad,
            'detalleprioridad': $detalleprioridad, 'tipodoc': $tipodoc, 'direccion': $direccion,
            'tipoprograma': $tipoprograma, 'tipooportunidad': $tipooportunidad, 'codigocarga': $codigocarga,
            'formaingreso': $formaingreso, 'sede': $sede, 'temporalidad': $temporalidad,
            'medio': $medio, 'detallemedio': $detallemedio, 'landingContent': $landingContent,
            'ladingIP': $ladingIP, 'landingMedium': $landingMedium, 'landingName': $landingName,
            'landingSource': 'N/A', 'landingTerm': $landingTerm, 'url': $url,
            'cmpid': $cmpid, 'nombre_form': $nombre_form, 'origen_real': $origen_real,
            'urlLanding': window.location.href, 'descripcion': $description
        };
        
        
        console.log(_data);
        
        CTECConsumer.a_sended_object = _data;

        try {
            $.ajax({
                url: 'http://hechoparaliderar.com/api/php/proxys/dataproxy.php',
                data: CTECConsumer.a_sended_object,
                type: 'post',
                dataType: 'json',
                success: function (_data) {
                	var evt = document.createEvent('Event');
                    evt.initEvent('CRM_DATA_SENDED', true, false);
                    document.dispatchEvent(evt);
                 //   document.dispatchEvent(new Event('CRM_DATA_SENDED'))        
                    CTECConsumer.a_server_guid = _data.server;
                   
                   
                   	Alert.hideLoadingAlert();
                   	
                    Alert.showLightboxAlert(_data.message,'');
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    Alert.showLightboxAlert("Error: "+thrownError+". Status: "+xhr.status, '');
                    EventBus.dispatch(new Event('LEAD_FAULT_EVENT'));
                }
            });
        } catch (e) {
            //Intentar método alterno de envío
        } finally {
        }


    },
    getURL: function ($client) {
        var url = '';
        for (var i = 0; i < UniversalModel.a_urls_sources.length; i++) {
            if (UniversalModel.a_urls_sources[i].client == $client) {
                url = UniversalModel.a_urls_sources[i].url;
            }
        }

        return url;
    }
};
CTECConsumer.init();