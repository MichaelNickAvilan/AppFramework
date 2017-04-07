/**
 * @author Michael Avilán 
 * @since 1.0.0
 */
var InterfaceLibs = {
    a_counter: 0,
    a_libs: [
        'AppFramework/Interface/HTML/Alerts/Alert.js',
        'AppFramework/Interface/HTML/Combos/Combos.js',
        'AppFramework/Interface/HTML/TextFields/TextPerformance.js',
        'AppFramework/Interface/HTML/DOMElements.js',
        'AppFramework/Interface/Containers.js'
    ],
    /*
    * Inits the libs loading process
    */
    init: function () {
        InterfaceLibs.addListeners();
        InterfaceLibs.lcIncludeLibs(InterfaceLibs.a_libs);
    },
    /*
    * Attach the event to its listener
    */
    addListeners: function () {
        Controller.addListener(document, 'INTERFACE_LIBS_LOADED_EVENT', InterfaceLibs.libComplete);
    },
    /*
    * Order the loading of the libs
    * @param {string} $libs - Array of libs
    */
    lcIncludeLibs: function ($libs) {
        DomUtils.includeLibs($libs, 'INTERFACE_', AppFramework.a_prefix);
    },
    /*
    * Dispatch an event when the libs are loaded
    */
    libComplete: function () {
        //Add custom code to extend functionality
    }
};