/** 
  * @desc This file loads all the Business Scripts
  * @author Michael Avilán michael.avilan@gmail.com
*/
var BusinessLibs = {
    a_counter: 0,
    a_libs: [
        'AppFramework/Business/AjaxDelegate.js',
        'AppFramework/Business/CSVReader.js'
    ],
    /** @Constructor */
    init: function () {
        BusinessLibs.addListeners();
        BusinessLibs.lcIncludeLibs(BusinessLibs.a_libs);
    },
    /** Attach methods to its listeners */
    addListeners: function () {
        Controller.addListener(document, 'BUSINESS_LIBS_LOADED_EVENT', BusinessLibs.libComplete);
    },
    /** Include libs delegate 
    * @param {array} $libs 
    */
    lcIncludeLibs: function ($libs) {
        DomUtils.includeLibs($libs, 'BUSINESS_', AppFrameworkModel.a_prefix);
    },
    libComplete: function () {
    }
};
