/**
 * @author Michael Avilán 
 * @since 1.0.0
 */
var UtilsLibs = {
    a_counter: 0,
    a_libs: [
        'AppFramework/Utils/ArrayUtils.js',
        'AppFramework/Utils/FormsUtils.js',
        'AppFramework/Utils/EncodingUtils.js',
        'AppFramework/Utils/FieldsInterpreter.js'
    ],
    /*
    * Inits the libs loading process
    */
    init: function () {
        UtilsLibs.addListeners();
        UtilsLibs.lcIncludeLibs(UtilsLibs.a_libs);
    },
    /*
    * Attach the event to its listener
    */
    addListeners: function () {
        Controller.addListener(document, 'UTILS_LIBS_LOADED_EVENT', UtilsLibs.libComplete);
    },
    /*
    * Order the loading of the libs
    * @param {string} $libs - Array of libs
    */
    lcIncludeLibs: function ($libs) {
        DomUtils.includeLibs($libs, 'UTILS_', AppFramework.a_prefix);
    },
    /*
    * Dispatch an event when the libs are loaded
    */
    libComplete: function () {
        //Add custom code to extend functionality
    }
};