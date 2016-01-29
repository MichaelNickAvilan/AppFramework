/**
 * @author Michael Avilán 
 * @since 1.0.0
 */
var BusinessLibs = {
    a_counter: 0,
    a_libs: [
        'AppFramework/Business/AjaxDelegate.js',
        'AppFramework/Business/CSVReader.js'
    ],
    /*
    * Inits the libs loading process
    */
    init: function () {
        BusinessLibs.addListeners();
        BusinessLibs.lcIncludeLibs(BusinessLibs.a_libs);
    },
    /*
    * Attach the event to its listener
    */
    addListeners: function () {
        Controller.addListener(document, 'BUSINESS_LIBS_LOADED_EVENT', BusinessLibs.libComplete);
    },
    /*
    * Order the loading of the libs
    * @param {string} $libs - Array of libs
    */
    lcIncludeLibs: function ($libs) {
        DomUtils.includeLibs($libs, 'BUSINESS_', AppFramework.a_prefix);
    },
    /*
    * Dispatch an event when the libs are loaded
    */
    libComplete: function () {
        //Add custom code to extend functionality
    }
};