var UniversalModel = {
	a_forms:'',
	socials_landings:'',
	a_country:'',
	a_programs:'',
	
	a_universities: [
		{name:'Fundacion Universitaria del Area Andina', code_university:'FUAA', country:'Colombia', code_country:'CO', language:[{code:'ESP'}]},
		{name:'Politecnico Grancolombiano', code_university:'POLI', country:'Colombia', code_country:'CO', language:[{code:'ESP'}]},
		{name:'Siglo 21', code_university:'SIGLO21', country:'Argentina', code_country:'AR', language:[{code:'ESP'}]},
		{name:'Universidad del Istmo', code_university:'UDI', country:'Panama', code_country:'PA', language:[{code:'ESP'}]},
		{name:'Instituto Profesional Providencia', code_university:'IPP', country:'Chile', code_country:'CL', language:[{code:'ESP'}]},
		{name:'Universidad Americana', code_university:'UA', country:'Paraguay',code_country:'PY', language:[{code:'ESP'}]},
		{name:'Universidad San Marcos', code_university:'USAM', country:'Costa Rica',code_country:'CR', language:[{code:'ESP'}]},
		{name:'UniJorge', code_university:'UJA', country:'Brazil',code_country:'BR' , language:[{code:'PORT'}]},
		{name:'Universidad Veiga de Almeida', code_university:'UVA', country:'Brazil',code_country:'BR', language:[{code:'PORT'}]}
		
	],
	
	a_countries_visitor:[
		{name_country:'Colombia',code_country:'CO',universities:['FUAA','POLI']},
		{name_country:'Argentina',code_country:'AR',universities:['SIGLO21']},
		{name_country:'Panama',code_country:'PA',universities:['UDI']},
		{name_country:'Chile',code_country:'CL',universities:['IPP']},
		{name_country:'Paraguay',code_country:'PY',universities:['UA']},
		{name_country:'Costa Rica',code_country:'CR',universities:['USAM']},
		{name_country:'Brazil',code_country:'BR',universities:['UJA','UVA']},
		{name_country:'Guatemala',code_country:'GT',universities:['UDI','USAM']},
		{name_country:'Nicaragua',code_country:'NI',universities:['UDI','USAM']},
		{name_country:'El Salvador',code_country:'SV',universities:['UDI','USAM']}
	],
	
    a_phones_validations: [
            {type:'MobilePhone', country:'Colombia',code_country:'CO',phone_digits:10,phone_start_numbers:[3], indicative:57},
		    {type:'MobilePhone', country:'Costa Rica',code_country:'CR',phone_digits:8,phone_start_numbers:[6,7,8], indicative:78},
		    {type:'MobilePhone', country:'Panama',code_country:'PA',phone_digits:9,phone_start_numbers:[6], indicative:507},
		    {type:'MobilePhone', country:'Chile',code_country:'CL',phone_digits:8,phone_start_numbers:[6,7,8,9], indicative:569},
		    {type:'MobilePhone', country:'Paraguay',code_country:'PY',phone_digits:9,phone_start_numbers:[9], indicative:"010"},
		    {type:'MobilePhone', country:'Brazil',code_country:'BR',phone_digits:9,phone_start_numbers:[2], indicative:"5521"},
			{type:'MobilePhone', country:'Guatemala',code_country:'GT',phone_digits:8,phone_start_numbers:[0,1,2,3,4,5,6,7,8,9], indicative:"502"},		
			{type:'MobilePhone', country:'Nicaragua',code_country:'NI',phone_digits:8,phone_start_numbers:[0,1,2,3,4,5,6,7,8,9], indicative:"505"},		
			{type:'MobilePhone', country:'El Salvador',code_country:'SV',phone_digits:8,phone_start_numbers:[0,1,2,3,4,5,6,7,8,9], indicative:"503"},
            
            {type:'Phone', country:'Colombia',code_country:'CO',phone_digits:7, indicative:57},
		    {type:'Phone', country:'Costa Rica',code_country:'CR',phone_digits:8, indicative:78},
		    {type:'Phone', country:'Panama',code_country:'PA',phone_digits:7, indicative:507},
		    {type:'Phone', country:'Chile',code_country:'CL',phone_digits:56},
		    {type:'Phone', country:'Paraguay',code_country:'PY',phone_digits:"010"}
    ],


    a_allowed_phones_types: [
        { label: 'USA', value: 'US' },
        { label: 'Colombia', value: 'CO' },
        { label: 'Costa Rica', value: 'CR' },
        { label: 'Panama', value: 'PA' },
        { label: 'Paraguay', value: 'PY' },
        { label: 'Chile', value: 'CH' },
        { label: 'Argentina', value: 'AR'}
    ],
    
    a_db_path:"../admin/com/php/proxys/",
	a_local_path:"../admin/com/php/proxys/",
	a_regional_service:"http://crm-integ.ilumno.com:8050/WS_Integrationcol/WS_Integration.asmx?WSDL",
	a_brasil_service:"http://crm-integ.ilumno.com:8050/WS_Integrationuva/WS_Integration.asmx?WSDL", 
	a_test_service:"http://crm-integ.ilumno.com:8050/WS_IntegrationColombia/WS_Integration.asmx?WSDL",
		
	a_data_proxy:'dataproxy.php',
	a_delegates_proxy:'delegatesproxy.php',
	a_users_proxy:'usersproxy.php',
	a_culture_proxy:'culturesproxy.php',
	a_section_proxy:'sectionsproxy.php',
	a_subSection_proxy:'subSectionsproxy.php',
	a_social_proxy:'socialsproxy.php',
	a_socialSection_proxy:'socialsSectionsproxy.php',
	a_superUsers_proxy:'superUsersproxy.php',
	a_landings_proxy:'landingsproxy.php',
	a_banners_proxy:'bannersproxy.php',
	a_forms_proxy:'formsproxy.php',
	a_formsLanding_proxy:'formsLandingproxy.php',
	a_leads_proxy:'leadsproxy.php',
	a_modules_proxy:'moduleproxy.php',
	a_posts_proxy:'postsproxy.php',


    init: function () {
        //Constructor
    }
};