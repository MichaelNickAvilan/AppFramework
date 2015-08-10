var UtilsLibs = {
    a_counter: 0,
    a_libs: [
        'AppFramework/Utils/ArrayUtils.js',
        'AppFramework/Utils/FormsUtils.js',
        'AppFramework/Utils/GeoUtils.js',
        'AppFramework/Utils/EncodingUtils.js'
    ],

    init: function () {
        UtilsLibs.addListeners();
        UtilsLibs.lcIncludeLibs(UtilsLibs.a_libs);
    },
    addListeners: function () {
        Controller.addListener(document, 'UTILS_LIBS_LOADED_EVENT', UtilsLibs.libComplete);
    },
    lcIncludeLibs: function ($libs) {
        DomUtils.includeLibs($libs, 'UTILS_', AppFrameworkModel.a_prefix);
    },
    libComplete: function () {
        Controller.eventDispatcherDelegate(document, Controller.UTILS_PLATFORM_LOADED_EVENT);
    }
};
