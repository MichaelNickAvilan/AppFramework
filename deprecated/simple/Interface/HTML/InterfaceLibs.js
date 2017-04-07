var InterfaceLibs = {
    a_counter: 0,
    a_libs: [
        'AppFramework/Alerts/Alert.js',
        'AppFramework/Combos/Combos.js',
        'AppFramework/TextFields/TextPerformance.js',
        'AppFramework/DomElements.js',
    ],

    init: function () {
        InterfaceLibs.addListeners();
        InterfaceLibs.lcIncludeLibs(InterfaceLibs.a_libs);
    },
    addListeners: function () {
        Controller.addListener(document, 'SEM_LIBS_LOADED_EVENT', InterfaceLibs.libComplete);
    },
    lcIncludeLibs: function ($libs) {
        DomUtils.includeLibs($libs, 'SEM_', AppFrameworkModel.a_prefix);
    },
    libComplete: function () {
        Controller.eventDispatcherDelegate(document, Controller.ADS_PLATFORM_READY_EVENT);
    }
};