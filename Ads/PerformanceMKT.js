/* global DomUtils, Controller */
/** 
  * @desc This file loads all the SEM Scripts
  * @author Michael Avilán michael.avilan@gmail.com
*/
var PerformanceMKT = {
    a_counter: 0,
    a_libs: [
    	'AppFramework/Ads/Anl/GoogleAnalytics.js',
        'AppFramework/Ads/Anl/AdobeReportsAnalytics.js',
        'AppFramework/Ads/sm/anxus/Anxus.js',														   //AppNexus libs
        'AppFramework/Ads/sm/fb/fb.js',																   //Facebook libs
        'AppFramework/Ads/sm/ggl/Ggl.js',															   //Google libs
        'AppFramework/Ads/sm/scs/Scs.js',															   //Soicos libs
        'AppFramework/Ads/sm/twt/Twt.js',															   //Twitter libs
        'AppFramework/Ads/sm/yh/Yh.js',																   //Yahoo libs
        'AppFramework/Ads/sm/Media/Dtx.js',															   //Dataxu libs
        'AppFramework/Ads/sm/Media/MMth.js',														   //MediaMath libs
        'AppFramework/Ads/sm/Media/Rm.js',															   //RedMas libs
        'AppFramework/Ads/Model/TagsModel.js',
        'AppFramework/Ads/Engines/CampaignMonitor.js',
        'AppFramework/Ads/Engines/TaggingEngine.js',
        'AppFramework/Ads/Aservers/Szmk/Szmk.js',														//Sizmek  libs
        'AppFramework/Ads/DSP/hdwy/Hdwy.js'
    ],
    a_prefix:'../../../',
    
    /**
     * Constructor method
     */
    init: function () {
        PerformanceMKT.addListeners();
        PerformanceMKT.lcIncludeLibs(PerformanceMKT.a_libs);
    },
    /**
     * Attach events to their listeners
     */
    addListeners: function () {
        Controller.addListener(document, 'SEM_LIBS_LOADED_EVENT', PerformanceMKT.libComplete);
    },
    /**
     * Loads the SEM libs
     * @param {array} $libs - Array of libs
     */
    lcIncludeLibs: function ($libs) {
        DomUtils.includeLibs($libs, 'SEM_', AppFrameworkModel.a_prefix);
    },
    /**
     * Dispatch an event to inform that the PerformanceMKT libs are loaded
     */
    libComplete: function () {
        Controller.eventDispatcherDelegate(document, Controller.ADS_PLATFORM_READY_EVENT);
    }
};
