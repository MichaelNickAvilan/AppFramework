/* global DomUtils, Controller, AppFrameworkModel */
/**
 * Class contains methods to send data to the Google Ads Platform and the Google AdServer Platform
 * @author Michael Nick Avilan Mora - michael.avilan@gmail.com
 */
var GoogleDoubleClick={
    /**
    * Constructor method
    */
    init:function(){
        //Constructor
    },
    /**
    * Dispatchs a Google Double Click tag (Ad Server)
    * @param {int}    $src
    * @param {string} $cat
    */
    doubleClickTagDispatcher: function ($src, $cat) {
        DomUtils.createBeacon('http://ad.doubleclick.net/activity;src=' + $src + ';type=invmedia;cat=' + $cat + ';ord=1?', 1, 1);
        Controller.eventDispatcherDelegate(document, Controller.DOUBLE_CLICK_DISPATCHED_EVENT);
    },
    /**
    * Dispatchs a Google Double Click FloodLight Tag (Ad Server)
    * @param {int}    $id
    * @param {string} $cat
    * @param {string} $type
    * @param {string} $renderCase
    */
    doubleClickFloodlightTagDispatcher: function ($id, $cat, $type, $renderCase) {
        switch ($renderCase) {
            case 'JavaScript':
                var axel = Math.random() + "";
                var a = axel * 10000000000000;
                DomUtils.createIframe(
                    'https://' + $id + '.fls.doubleclick.net/activityi;src=' + $id + ';type=' + $type + ';cat=' + $cat + ';ord=' + a + '?',
                    1, 1, 1, "none");
                Controller.eventDispatcherDelegate(document, Controller.DOUBLE_CLICK_DSP_DISPATCHED_EVENT);
            break;
            case 'Renderer':
            	var path = String(AppFrameworkModel.a_prefix).split('');
		var index = String(AppFrameworkModel.a_prefix).split('').length-1;
		var prefix='';
		var renderer = '';
		var url='';
		if(path[index]==='/'){
                    path.splice(index,1);
                    prefix=path.join('');
                    renderer='/AppFramework/Ads/SEM/renderers/GARenderer.php?';
		}
		url = prefix + renderer;
                var iframe = url +
                    'service=2' +
	  	    '&srcID=' + $id +
	  	    '&cat=' + $cat +
                    '&type=' + $type;
                DomUtils.createIframe(iframe, 1, 1, 1, "none");
                Controller.eventDispatcherDelegate(document, Controller.DOUBLE_CLICK_DSP_DISPATCHED_EVENT);
            break;
        }
    },
    /**
    * Returns an object with the TaggingEngine local standard
    * @param {int} $src
    * @param {string} $type 
    * @param {string} $landing
    * @param {string} $condition
    * @param {string} $origin
    */
    getDoubleClickTagObject: function ($src, $type, $landing, $condition, $origin) {
        return {
            a_type: "DoubleClick",
            byOrigin: true,
            origin: $origin,
            dispatchAt: $condition,
            landing: $landing,
            config: {
                src: $src,
                type: $type
            }
        };
    },
    /**
    * Returns an object with the TaggingEngine local standard
    * @param {string} $type 
    * @param {int} $src
    * @param {int} $cat
    * @param {string} $landing
    * @param {string} $condition
    * @param {string} $origin
    * @param {string} $renderCase
    */
    getDoubleClickFloodlightTagObject: function ($type, $src, $cat, $landing, $condition, $origin, $renderCase) {
        return {
            a_type: "DoubleClickFloodLigth",
            byOrigin: true,
            origin: $origin,
            dispatchAt: $condition,
            landing: $landing,
            config: {
                type: $type,
                cat: $cat,
                id: $src,
                renderCase: $renderCase
            }
        };
    }
};