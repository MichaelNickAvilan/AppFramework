/* global DomUtils */
/**
 * Class contains methods to send data to the Google Ads Platform and the Google AdServer Platform
 * @author Michael Nick Avilan Mora - michael.avilan@gmail.com
 */
var AdobeRA={
    a_prefix:'',  
    a_report_suite:'',
    a_centinela:false,
    a_libs_loaded:false,
    a_config:{},
    
    /**
    * Configures the main settings of the Adobe Reports and Alaytics tag and delegates the libs loading process
    * @param {String} $reportsuite
    * @param {string} $charset 
    * @param {string} $cookieDomainPeriods
    * @param {string} $currencyCode
    * @param {string} $linkDownloadFileTypes
    * @param {string} $urlParam
    * @param {string} $linkInternalFilters
    * @param {string} $linkTrackVars
    * @param {string} $linkTrackEvents
    * @param {string} $visitorNamespace
    * @param {string} $trackingServer
    */
    init:function(
            $reportsuite, 
            $charset, 
            $cookieDomainPeriods,
            $currencyCode, 
            $linkDownloadFileTypes, 
            $urlParam,
            $linkInternalFilters, 
            $linkTrackVars, 
            $linkTrackEvents, 
            $visitorNamespace, 
            $trackingServer){
        AdobeRA.a_config['reportsuite']=$reportsuite;
        AdobeRA.a_config['charset']=$charset;
        AdobeRA.a_config['cookieDomainPeriods']=$cookieDomainPeriods;
        AdobeRA.a_config['currencyCode']=$currencyCode;
        AdobeRA.a_config['linkDownloadFileTypes']=$linkDownloadFileTypes;
        AdobeRA.a_config['urlParam']=$urlParam;
        AdobeRA.a_config['linkInternalFilters']=$linkInternalFilters;
        AdobeRA.a_config['linkTrackVars']=$linkTrackVars;
        AdobeRA.a_config['linkTrackEvents']=$linkTrackEvents;
        AdobeRA.a_config['visitorNamespace']=$visitorNamespace;
        AdobeRA.a_config['trackingServer']=$trackingServer;
        AdobeRA.addListeners();
    },
    /**
    * Add Listeners to Events
    */
    addListeners:function(){
        Controller.addListener(document, 'ADOBE_RA_LIBS_LOADED_EVENT', AdobeRA.configDelegate);
    },
    /**
    * Loads the Adobe Reports and Analytics Leagacy Libs
    */
    loadLibsDelegate:function(){
        DomUtils.loadScript(AdobeRA.a_prefix+'/AppFramework/Ads/Analytics/AdobeLibs/legacy/VisitorAPI.js', function () {
            DomUtils.loadScript(AdobeRA.a_prefix+'/AppFramework/Ads/Analytics/AdobeLibs/legacy/s_code.js', function () {
                Controller.eventDispatcherDelegate(document, 'ADOBE_RA_LIBS_LOADED_EVENT');
            });
        });
    },
    /**
    * Configures the main settings of the Adobe Reports and Alaytics tag and start the reporting process
    */
    configDelegate:function(){
        var s_account=AdobeRA.a_config['reportsuite'];
	var s=s_gi(s_account);
        
        AdobeRA.a_report_suite=AdobeRA.a_config['reportsuite'];
	s.charSet=AdobeRA.a_config['charset'];
	s.cookieDomainPeriods=AdobeRA.a_config['cookieDomainPeriods'];
	s.currencyCode=AdobeRA.a_config['currencyCode'];
	s.trackDownloadLinks=true;
	s.trackExternalLinks=true;
	s.trackInlineStats=true;
	s.linkDownloadFileTypes=AdobeRA.a_config['linkDownloadFileTypes'];
	s.linkInternalFilters=AdobeRA.a_config['linkInternalFilters'];
	s.linkLeaveQueryString=false;
	s.linkTrackVars=AdobeRA.a_config['linkTrackVars'];
	s.linkTrackEvents=AdobeRA.a_config['linkTrackEvents'];
	s.campaign=AdobeRA.a_config['urlParam'];
	s.pageName=document.title;
	s.eVar25=navigator.language;
	s.channel=AdobeRA.getChannel(document.location.href);
	s.visitorNamespace=AdobeRA.a_config['visitorNamespace'];
	s.trackingServer=AdobeRA.a_config['trackingServer'];
	s_code = s.t();
        
    },
    /**
    * Returns a well formatted channel
    * @param {string} $url
    * @param {string} $replaceConditions
    */
    getChannel: function ($url, $replaceConditions) {
        var url = $url;
        for(var i=0;i<$replaceConditions.length;i++){
            url = url.replace($replaceConditions[i], '');
        }
        url = url.split('');
        for (var i = 0; i < url.length; i++) {
            if (url[i] === '/') {
                url[i] = '|';
            }
        }
        return url.join('');
   }
};