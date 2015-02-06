/** 
  * @desc This file is the bridge betwen the logic and the DOM container
  * @author Michael Avilán michael.avilan@gmail.com
*/

var DomUtils = {

    a_centinela: false,
    a_dom_helper: { callbackMethod: 'NULL' },

    init: function () {
        DomUtils.loadCore();
    },
    includeLibs: function ($libs) {
        var counter = 0;
        for (var i = 0; i < $libs.length; i++) {
            DomUtils.loadScriptAndCss($libs[i], function () {
                counter++;
                if (counter == $libs.length-1) {
                    var evt = document.createEvent('Event');
                    evt.initEvent('LIBS_LOADED_EVENT', true, false);
                    document.dispatchEvent(evt);
                    Alert.init();
                }
            });
        }
    },
    loadCore: function () {
        try {
            $ = jQuery;
        } catch (e) {
            DomUtils.loadScriptAndCss('https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js', function () {

                DomUtils.loadScriptAndCss('MainView.js', function () {
                    try {

                        var evt = document.createEvent('Event');
                        evt.initEvent('MAIN_LIB_LOADED_EVENT', true, false);
                        document.dispatchEvent(evt);
                    } catch (e) {
                        console.log('Try: ' + e);
                        var evt = document.createEvent('Event');
                        evt.initEvent('MAIN_LIB_LOADED_EVENT', true, false);
                        document.dispatchEvent(evt);
                    } finally {

                    }
                });

            });
        } finally {

        }
    },
    setHelperMethod: function ($method) {
        DomUtils.a_dom_helper = { callbackMethod: $method };
    },
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
    redirectToURL: function ($url) {
        document.location.href = $url;
        setTimeout(redirFunction, 1000);
    },
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
    loadScriptAndCss: function ($url, $callback) {
    	
    	if(String($url).indexOf('.css')>=0){
    		var css  = document.createElement('link');
    		css.rel  = 'stylesheet';
		    css.type = 'text/css';
		    css.href = $url;
		    
		    document.getElementsByTagName("head")[0].appendChild(css);
		    
    	}else{
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
	
	        script.src = $url;
	        document.getElementsByTagName("head")[0].appendChild(script);
    	}
    	
        
    },
    getURLParam: function (name) {
        var value = decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;

        if (value == null) {
            return '';
        } else {
            return value;
        }
    }
};
DomUtils.init();

function include($url) {
    if (String($url).indexOf('.js')) {
        DomUtils.loadScriptAndCss($url, function () {
            document.dispatchEvent(new Event('INCLUDE_COMPLETE'));
        });
    } else {
        //Show Errors
    }
}