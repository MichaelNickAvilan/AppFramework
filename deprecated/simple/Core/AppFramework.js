/** 
  * Main file of the Unitec home
  * @author Michael Avilán michael.avilan@gmail.com
*/

var AppFramework = {
    a_prefix: '',
    a_main_script:'',
    /*
     * Constructor method
     */
    init: function ($prefix, $mainScript) {
        AppFramework.a_prefix = $prefix;
        AppFramework.a_main_script = $mainScript;
        AppFramework.includeURL(AppFramework.a_prefix + 'AppFramework/Utils/DomUtils.js', function () {
            DomUtils.init(function () {
                AppFramework.addListeners();
                AppFramework.loadLibsDelegate();
            });
        });
    },
    /*
     * Loads an external resource
     * @param {string} $url - Source path
     * @param {string} $callback
     */
    includeURL: function ($url, $callback) {
        var item = { url: $url, state: 'before' };
        var script = document.createElement("script");
        script.type = "text/javascript";
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" ||
	                script.readyState == "complete") {
                    script.onreadystatechange = null;
                    item.state = 'included';
                    $callback();
                }
            };
        } else {
            script.onload = function () {
                item.state = 'included';
                $callback();
            };
        }
        script.src = $url + '?cache=' + AppFramework.changeCache();
        document.getElementsByTagName("head")[0].appendChild(script);
    },
    changeCache: function () {
        var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v ', 'w', 'x',
		'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V ', 'W', 'X', 'Y', 'Z'];
        return Math.floor(Math.random() * (1000 - 0001 + 1)) + 0001 + letters[Math.floor(Math.random() * (51 - 0 + 1)) + 0];
    },
    /*
    * Load the Core libs
    */
    loadLibsDelegate: function () {
        DomUtils.includeLibs([
        'AppFramework/libs/jquery-ui-1.11.4/jquery-ui.min.js',
        'AppFramework/Core/InterfaceLibs.js',
        'AppFramework/Core/UtilsLibs.js',
        'AppFramework/Core/BusinessLibs.js',
        'AppFramework/Core/PerformanceMKTLibs.js'], '', AppFramework.a_prefix);
    },
    /*
     * Attach events to its listeners
     */
    addListeners: function () {
        Controller.addListener(document, Controller.LIBS_LOADED_EVENT, AppFramework.appReady);
        Controller.addListener(document, Controller.BUSINESS_LIBS_LOADED_EVENT, AppFramework.businessReady);
        Controller.addListener(document, Controller.INTERFACE_LIBS_LOADED_EVENT, AppFramework.interfaceReady);
        Controller.addListener(document, Controller.SEM_LIBS_LOADED_EVENT, AppFramework.semReady);
        Controller.addListener(document, Controller.UTILS_LIBS_LOADED_EVENT, AppFramework.utilsReady);
    },
    /*
     * Executes when the Business Libs are loaded into the app
     */
    businessReady: function () {
        InterfaceLibs.init();
    },
    /*
     * Executes when the Interface Libs are loaded into the app
     */
    interfaceReady: function () {
       PerformanceMKTLibs.init();
    },
    /*
     * Executes when the SEM Libs are loaded into the app
     */
    semReady: function () {
        UtilsLibs.init();
    },
    /*
     * Executes when the Main Libs are loaded into the app
     */
    appReady: function () {
        BusinessLibs.init();
    },
    /*
     * Executes when the Utils Libs are loaded into the app
     */
    utilsReady: function () {
        AppFramework.startApp();
    },
    
    /*
     * Executes when the AppFramework libs are loaded and ready to be used
     */
    startApp: function () {
        AppFramework.includeURL(AppFramework.a_main_script, function () {
            Alert.hideLoadingAlert();
        });
    }
};