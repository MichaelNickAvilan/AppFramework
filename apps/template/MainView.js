DomUtils.includeLibs([
'https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js',
'../../Interface/InterfaceLibs.js',
'../../Utils/UtilsLibs.js',
'../../Business/BusinessLibs.js',
'../../Ads/PerformanceMKT.js'], '', '');

var MainView = {

    a_main_container: {},
    
    init: function () {
        MainView.addListeners();
    },
    addListeners: function () {
        Controller.addListener(document, Controller.LIBS_LOADED_EVENT, MainView.appReady);
        Controller.addListener(document, Controller.INTERFACE_LIBS_LOADED_EVENT, MainView.interfaceReady);
        Controller.addListener(document, Controller.BUSINESS_LIBS_LOADED_EVENT, MainView.businessReady);
        Controller.addListener(document, Controller.UTILS_LIBS_LOADED_EVENT, MainView.utilsReady);
        Controller.addListener(document, Controller.SEM_LIBS_LOADED_EVENT, MainView.startApp);
    },
    appReady: function () {
        UniversalModel.a_main_container = document.getElementById('mainContainer_div');
        AppFrameworkModel.a_prefix = '../../../';
        BusinessLibs.init();
    },
    setTags: function () {
        UtilsLibs.init();
    },
    utilsReady: function () {
        MainView.loadDataSource();
    },
    businessReady: function () {
        InterfaceLibs.init();  
    },
    interfaceReady: function () {
        PerformanceMKT.init();
    },
    startApp: function () {
        console.clear();
        //CampaignMonitor.init();
        //Desde esta función inicia la lógica de la aplicación
        //Constructor global
    }
};
MainView.init();