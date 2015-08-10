/** 
  * @desc This file contains usefull methods to load external resources
  * @author Michael Avilán michael.avilan@gmail.com
*/

var DomUtils = {

    a_centinela: false,
    a_dom_helper: { callbackMethod: 'NULL' },

    /** Constructor method */
    init: function () {
        DomUtils.loadCore();
    },
    /** Method that loads the core libs of the AppFramework 
    * @param {string} $libs
    * @param {string} $prefix
    * @param {string} $dir
    */
    includeLibs: function ($libs, $prefix, $dir) {
    	var counter = 0;
        for (var i = 0; i < $libs.length; i++) {
            DomUtils.loadScript($dir+$libs[i], function () {
                counter++;
                if (counter == $libs.length) {
                	var evt = document.createEvent('Event');
                    evt.initEvent($prefix + 'LIBS_LOADED_EVENT', true, false);
                    document.dispatchEvent(evt);
                }
            });
        }
    },
    /** Loads the Main JS for every project "JSVAMain.js" this script must be created by the developer to be the Main file for the application */
    loadCore: function () {
    	var controller = '../../../AppFramework/Control/Controller.js';
    	var appFramework = '../../../AppFramework/Models/AppFrameworkModel.js';
    	var umodel = '../../../AppFramework/Models/UniversalModel.js';
        
        try {
        	$ = jQuery;
            DomUtils.loadLibsDelegate();
        } catch (e) {
			DomUtils.loadScript('https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js', function () {
                DomUtils.loadScript(controller, function () {
                    DomUtils.loadScript(appFramework, function () {
                        DomUtils.loadScript(umodel, function () {
                            DomUtils.loadScript('MainView.js', function () {
                                try {
                                    document.dispatchEvent(new Event('MAIN_LIB_LOADED_EVENT'));
                                } catch (e) {
                                    var evt = document.createEvent('Event');
                                    evt.initEvent('MAIN_LIB_LOADED_EVENT', true, false);
                                    document.dispatchEvent(evt);
                                } finally {
                                }
                            });
                        });
                    });
                });
            });
        } finally {
        }
    },
    /** Method that loads the core libs if the site has loaded already jQuery */
    loadLibsDelegate: function () {
        DomUtils.loadScript(controller, function () {
            DomUtils.loadScript(appFramework, function () {
                DomUtils.loadScript(umodel, function () {
                    DomUtils.loadScript('MainView.js', function () {
                        try {
                            document.dispatchEvent(new Event('MAIN_LIB_LOADED_EVENT'));
                        } catch (e) {
                            var evt = document.createEvent('Event');
                            evt.initEvent('MAIN_LIB_LOADED_EVENT', true, false);
                            document.dispatchEvent(evt);
                        } finally {
                        }
                    });
                });
            });
        });
    },
    /** Prevents the cache when the JS libs are loaded */
    changeCache:function(){
		var letters = ['a','b','c','d','e','f','g','h','i', 'j','k','l','m','n','o','p','q','r','s','t','u','v ','w','x',
		'y','z','A','B','C','D','E','F','G','H','I', 'J','K','L','M','N','O','P','Q','R','S','T','U','V ','W','X','Y','Z'];
		return Math.floor(Math.random() * (1000- 0001+ 1)) + 0001 + letters[Math.floor(Math.random() * (51- 0+ 1)) + 0];
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
    /** Creates an iFrame contained into a div
    * @param {string} $url - URL to be loaded into the iFrame
    * @param {array} $options - Array of styles of the container div
    * @param {string} $container - ID of the container into the DOM
    * @param {string} $id - iFrame ID
    * @param {string} $styles
    */
    createIframeWithContainer: function ($url, $options, $container, $id, $styles) {
    	
    	var iframe = $url;
        var ifrm = document.createElement("IFRAME");
        
        if($id == '' || $id == undefined || $id == 'N/A'){
        	
        }else{
        	ifrm.setAttribute("id", $id);
        }
        
        ifrm.setAttribute("src", iframe);
        
        for(var i=0; i < $options.length; i++){
        	ifrm.setAttribute($options[i].name,$options[i].value);
        }
        
        if($styles != undefined){
        	for(var i=0; i < $styles.length; i++){
	        	ifrm.style[$styles[i].name] = $styles[i].value;
	        }
        }
        
        if($container != ''){
        	var ct=document.getElementById($container);
        	 ct.appendChild(ifrm);        	
        }else{
        	document.body.appendChild(ifrm);
        }
        
       
    },
    /**
    * Loads a script dinamically 
    * @param {string} $url - Path to the Script
    * @param {string} $callback   - Function to execute when the script is loaded
    */
    loadScript: function ($url, $callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";

        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" ||
	                    script.readyState == "complete") {
                    script.onreadystatechange = null;
                    $callback();
                }
            };
        } else {
            script.onload = function () {
                $callback();
            };
        }

        script.src = $url+'?cache='+DomUtils.changeCache();
        document.getElementsByTagName("head")[0].appendChild(script);
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
    /**
    * Returns the value of an URL param 
    * @param {string} name - variable name
    */
    getURLIframeParam: function (name) {
		var url = (window.location != window.parent.location) ? document.referrer: document.location;
	    var value = decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ""])[1].replace(/\+/g, '%20')) || null;
	    
	    if (value == null) {
	        return '';
	    } else {
	        return value;
	    }
    },
    /** 
    * Returns true if the App is loaded into an iFrame
    */
	inIframe:function () {
	    try {
	        return window.self !== window.top;
	    } catch (e) {
	        return true;
	    }
	},
    /** Returns the iFrame parent URL */
	getParentURL:function(){
		var url = (window.location != window.parent.location) ? document.referrer: document.location;
		return url;
	},
    /** Returns the parent URL without URL Vars */
	getCleanParentURL:function(){
		var url=DomUtils.getParentURL();
		var splitter=url.split('');
		var clean_url='';
		for(var i=0;i<splitter.length;i++){
			if(splitter[i]!='?'){
				clean_url+=splitter[i];
			}else{
				i=splitter.lengt;
			}
    	}
    	return clean_url;
	},
};
DomUtils.init();

//External method to be deprecated
function include($url) {
    if (String($url).indexOf('.js')) {
        DomUtils.loadScript($url, function () {
            document.dispatchEvent(new Event('INCLUDE_COMPLETE'));
        });
    } else {
    }
}