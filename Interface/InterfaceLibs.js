/** 
  * @desc This file loads all the Interface Scripts
  * @author Michael Avilán michael.avilan@gmail.com
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

    /** @Constructor method */
    init: function () {
        InterfaceLibs.addListeners();
        InterfaceLibs.lcIncludeLibs(InterfaceLibs.a_libs);
    },
    /** Attach the events to its listeners */
    addListeners: function () {
        Controller.addListener(document, 'INTERFACE_LIBS_LOADED_EVENT', InterfaceLibs.libComplete);
    },
    /** Include libs delegate 
    * @param {string} $libs
    */
    lcIncludeLibs: function ($libs) {
        DomUtils.includeLibs($libs, 'INTERFACE_', AppFrameworkModel.a_prefix);
    },
    libComplete: function () {
    }
};