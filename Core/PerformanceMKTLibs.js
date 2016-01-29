/**
 * @author Michael Avilán 
 * @since 1.0.0
 */
var PerformanceMKTLibs = {
    a_counter: 0,
    a_libs: [
    	'AppFramework/Ads/Anl/GoogleAnalytics.js',
        'AppFramework/Ads/Anl/AdobeReportsAnalytics.js',
        'AppFramework/Ads/sm/anxus/Anxus.js',														   
        'AppFramework/Ads/sm/fb/fb.js',																  
        'AppFramework/Ads/sm/ggl/Ggl.js',															 
        'AppFramework/Ads/sm/scs/Scs.js',															  
        'AppFramework/Ads/sm/twt/Twt.js',															 
        'AppFramework/Ads/sm/yh/Yh.js',																 
        'AppFramework/Ads/sm/Media/Dtx.js',															  
        'AppFramework/Ads/sm/Media/MMth.js',														   
        'AppFramework/Ads/sm/Media/Rm.js',
        'AppFramework/Ads/sm/etarget/ETMailConversionsTracker.js',
        'AppFramework/Ads/Model/TagsModel.js',
        'AppFramework/Ads/Engines/CampaignMonitor.js',
        'AppFramework/Ads/Engines/TaggingEngine.js',
        'AppFramework/Ads/Engines/TagsManager.js',
        'AppFramework/Ads/Aservers/Szmk/Szmk.js',														
        'AppFramework/Ads/DSP/hdwy/Hdwy.js'
    ],
    /*
    * Inits the libs loading process
    */
    init: function () {
        PerformanceMKTLibs.addListeners();
        PerformanceMKTLibs.lcIncludeLibs(PerformanceMKTLibs.a_libs);
    },
    /*
    * Attach the event to its listener
    */
    addListeners: function () {
        Controller.addListener(document, 'SEM_LIBS_LOADED_EVENT', PerformanceMKTLibs.libComplete);
    },
   /*
   * Order the loading of the libs
   * @param {string} $libs - Array of libs
   */
    lcIncludeLibs: function ($libs) {
        DomUtils.includeLibs($libs, 'SEM_', AppFramework.a_prefix);
    },
    /*
    * Dispatch an event when the libs are loaded
    */
    libComplete: function () {
        //Add custom code to extend functionality
    }
};
