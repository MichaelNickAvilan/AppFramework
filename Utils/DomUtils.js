/** 
  * @desc This file contains usefull methods to load external resources
  * @author Michael Avilán michael.avilan@gmail.com
*/

var DomUtils = {

    a_centinela: false,
    a_dom_helper: { callbackMethod: 'NULL' },
    a_libs_loaded: [],
    a_core_libs: [
        'AppFramework/Control/Controller.js',
        'AppFramework/Models/AppFrameworkModel.js',
        'AppFramework/Models/UniversalModel.js'
    ],
    a_callback: {},

    /** Constructor method */
    init: function ($callback) {
        DomUtils.a_callback = $callback;
        DomUtils.loadCore();
    },
    includeLibs: function ($libs, $prefix, $dir) {
        var counter = 0;
        for (var i = 0; i < $libs.length; i++) {
            AppFramework.includeURL($dir + $libs[i], function () {
                counter++;
                if (counter == $libs.length) {
                    var evt = document.createEvent('Event');
                    evt.initEvent($prefix + 'LIBS_LOADED_EVENT', true, false);
                    document.dispatchEvent(evt);
                    console.log($prefix + 'LIBS_LOADED_EVENT');
                }
            });
        }
    },
    /** Loads the Main JS for every project "JSVAMain.js" this script must be created by the developer to be the Main file for the application */
    loadCore: function () {
        AppFramework.includeURL(AppFramework.a_prefix + 'AppFramework/libs/jquery-1.12.0.min.js', function () {
            $ = jQuery;
            DomUtils.loadLibsDelegate();
        });
    },
    loadLibsDelegate: function () {
        var controller = AppFramework.a_prefix + DomUtils.a_core_libs[0];
        var appFramework = AppFramework.a_prefix + DomUtils.a_core_libs[1];
        var umodel = AppFramework.a_prefix + DomUtils.a_core_libs[2];
        AppFramework.includeURL(controller, function () {
            AppFramework.includeURL(appFramework, function () {
                AppFramework.includeURL(umodel, function () {
                    DomUtils.a_callback();
                });
            });
        });
    },
    /**
    * Creates an image beacon for every measurement platform for digital campaigns
    * @param {string} $url - Path of the beacon
    * @param {number}  $w - width of the image
    * @param {number}  $h - height of the image
    */
    createBeacon: function ($url, $w, $h) {
        var noscript = document.createElement('noscript');
        var image = new Image($w, $h);
        image.src = $url;
        try {
            $(this).parent().append(noscript);
            noscript.appendChild(image);
        } catch (e) {
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(noscript, s);
            noscript.appendChild(image);
        } finally {
        }
    },
    /**
    * Redirect the user to a new URL
    * @param {string} $url - Path to the site to redirect the user
    */
    redirectToURL: function ($url) {
        document.location.href = $url;
        setTimeout(redirFunction, 1000);
    },
    /**
    * Creates an iFrame 
    * @param {string} $url - URL to load in the iFrame
    * @param {string} $w   - iFrame width
    * @param {string} $h   - iFrame height
    * @param {string} $fb  - Frame border
    * @param {string} $d   - Display style
    */
    createIframe: function ($url, $w, $h, $fb, $d) {
        var iframe = $url;
        var ifrm = document.createElement("IFRAME");
        ifrm.setAttribute("src", iframe);
        ifrm.setAttribute("width", $w);
        ifrm.setAttribute("height", $h);
        ifrm.setAttribute("frameborder", $fb);
        ifrm.style.display = $d;
        document.body.appendChild(ifrm);
    },
    createIframeWithContainer: function ($url, $options, $container, $id, $styles) {

        var iframe = $url;
        var ifrm = document.createElement("IFRAME");

        if ($id == '' || $id == undefined || $id == 'N/A') {

        } else {
            ifrm.setAttribute("id", $id);
        }

        ifrm.setAttribute("src", iframe);

        for (var i = 0; i < $options.length; i++) {
            ifrm.setAttribute($options[i].name, $options[i].value);
        }

        if ($styles != undefined) {
            for (var i = 0; i < $styles.length; i++) {
                ifrm.style[$styles[i].name] = $styles[i].value;
            }
        }

        if ($container != '') {
            var ct = document.getElementById($container);
            ct.appendChild(ifrm);
        } else {
            document.body.appendChild(ifrm);
        }


    },
    /**
    * Returns the value of an URL param 
    * @param {string} name - variable name
    */
    getURLParam: function (name) {
        var value = decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;

        if (value == null) {
            return '';
        } else {
            return value;
        }
    },
    getURLIframeParam: function (name) {
        var url = (window.location != window.parent.location) ? document.referrer : document.location;
        var value = decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ""])[1].replace(/\+/g, '%20')) || null;

        if (value == null) {
            return '';
        } else {
            return value;
        }
    },
    inIframe: function () {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    },
    getParentURL: function () {
        var url = (window.location != window.parent.location) ? document.referrer : document.location;
        return url;
    },
    getCleanParentURL: function () {
        var url = DomUtils.getParentURL();
        var splitter = url.split('');
        var clean_url = '';
        for (var i = 0; i < splitter.length; i++) {
            if (splitter[i] != '?') {
                clean_url += splitter[i];
            } else {
                i = splitter.lengt;
            }

        }
        return clean_url;
    },
};