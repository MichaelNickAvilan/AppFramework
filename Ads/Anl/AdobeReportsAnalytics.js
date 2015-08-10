/* global DomUtils, Controller */
/** 
  * @desc This launch the Adobe Reports & Analytics tag
  * @author Michael Avilán michael.avilan@gmail.com
*/
var AdobeReportsAnalytics = {

	a_centinela:false,
	a_report_suite: '',

    /**
    * Inits the New libraries of Adobe R&A
    * @param {string} $reportsuite - ID of an account in R&A
    */
	initNew:function($reportsuite){
		if(AdobeReportsAnalytics.a_centinela==false){
			AdobeReportsAnalytics.a_centinela=true;
			DomUtils.loadScript('AppFramework/Ads/Anl/AdobeLibs/VisitorAPI.js', function () {
				DomUtils.loadScript('AppFramework/Ads/Anl/AdobeLibs/AppMeasurement.js', function () {
					console.log($reportsuite);
				});
			});	
		}
	},
    /**
    * Reports a converiosn to the Adobe R&A platform
    * @param {string} $name - Name of the user
    * @param {string} $form_name - Name of the form
    * @param {string} $namespace - Namespace
    * @param {string} $trackingServer - Tracking Server
    * @param {string} $country - Country code
    * @param {string} $charSet 
    * @param {string} $currencyCode
    */
	reportConversion:function($name, $form_name, $namespace, $trackingServer, $country, $charSet, $currencyCode){
		DomUtils.loadScript('AppFramework/Ads/Anl/AdobeLibs/legacy/VisitorAPI.js', function () {
			DomUtils.loadScript('AppFramework/Ads/Analytics/Anl/legacy/s_code.js', function () {
				var s_account=AdobeReportsAnalytics.a_report_suite;
				var s=s_gi(AdobeReportsAnalytics.a_report_suite);
				
				s.charSet = $charSet;
				s.cookieDomainPeriods=3;
				s.currencyCode = $currencyCode;
				s.trackDownloadLinks=true;
				s.trackExternalLinks=true;
				s.trackInlineStats=true;
				s.linkDownloadFileTypes='exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx';
				s.linkInternalFilters='javascript:';
				s.linkLeaveQueryString=false;
				s.linkTrackVars='None';
				s.linkTrackEvents='None';
				s.campaign=DomUtils.getURLParam('cmpid');
				s.pageName=document.title+': INSERT REGISTER COMPLETE';
				s.eVar25=navigator.language;
				s.eVar2=$name;
				s.eVar3=$form_name;
				s.eVar7 = $country;
				s.eVar8=$form_name;
				s.events='event2,event3';
				s.channel=AdobeReportsAnalytics.getChannel(document.location.href);
				s.visitorNamespace = $namespace;
				s.trackingServer = $trackingServer;
				s_code = s.t();
				
				UniversalModel.a_sended_object={name:$name, formName:$form_name };
				Controller.eventDispatcherDelegate(document, Controller.ADOBE_TAG_DIPATCHED);
			});
		});
	},
    /**
    * Inits the Javascript legacy libraries of Adobe R&A
    * @param {string} $reportsuite - Id of an account in R&A
    * @param {string} $nameSpace - Name Space
    * @param {string} $trackingServer
    * @param {string} $currencyCode
    * @param {string} $charSet
    */
	initLegacy: function ($reportsuite, $nameSpace, $trackingServer, $currencyCode, $charSet) {
		DomUtils.loadScript('AppFramework/Ads/Anl/AdobeLibs/legacy/VisitorAPI.js', function () {
			DomUtils.loadScript('AppFramework/Ads/Anl/AdobeLibs/legacy/s_code.js', function () {
				AdobeReportsAnalytics.a_report_suite=$reportsuite;
				var s_account=$reportsuite;
				var s=s_gi(s_account);
				
				s.charSet = $charSet;
				s.cookieDomainPeriods=3;
				s.currencyCode = currencyCode;
				s.trackDownloadLinks=true;
				s.trackExternalLinks=true;
				s.trackInlineStats=true;
				s.linkDownloadFileTypes='exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx';
				s.linkInternalFilters='javascript:';
				s.linkLeaveQueryString=false;
				s.linkTrackVars='None';
				s.linkTrackEvents='None';
				s.campaign=DomUtils.getURLParam('cmpid');
				s.pageName=document.title;
				s.eVar25=navigator.language;
				s.channel=AdobeReportsAnalytics.getChannel(document.location.href);
				
				s.visitorNamespace = $nameSpace;
				s.trackingServer = $trackingServer;
				s_code = s.t();
			});
		});
	},
    /**
    * Returns a well formed channel
    * @param {string} $url
    */
	getChannel: function ($url) {

        var url = $url;
        url = url.replace('index.html/', '');
        url = url.replace('index.php/', '');
        url = url.replace('item/', '');
        url = url.replace('node/#', '');
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