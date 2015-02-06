/** 
  * @desc This file definess all the functionality to dispatch Google AdWords Tags
  * @author Michael Avilán michael.avilan@gmail.com
  * @required proxy.php
*/


var GoogleAds = {
    init: function () {
        //Constructor
    },
    googleAdWordsIframeConversionTracker: function ($conversion_id, $language, $conversion_format, $color, $label_id) {
        var iframe = 'http://hechoparaliderar.com/usam/com/AppFramework/Ads/SEM/renderers/GARenderer.php?' +
	  	'goo' + 'gle_conversion_id=' + $conversion_id +
	  	'&goo' + 'gle_conversion_language=' + $language +
	  	'&goo' + 'gle_conversion_format=' + $conversion_format +
	  	'&goo' + 'gle_conversion_color=' + $color +
	  	'&goo' + 'gle_conversion_label=' + $label_id +
	  	'&goo' + 'gle_conversion_value=1.00&google_conversion_currency=USD&google_remarketing_only=false';
        DomUtils.createIframe(iframe, 1, 1, 1, "none");
        var evt = document.createEvent('Event');
        evt.initEvent('GOOGLE_ADWORDS_DISPATCHED_EVENT', true, false);
        document.dispatchEvent(evt);
    },
    doubleClickTagDispatcher: function ($src, $cat) {
        DomUtils.createBeacon('http://ad.doubleclick.net/activity;src=' + $src + ';type=invmedia;cat=' + $cat + ';ord=1?', 1, 1);
        var evt = document.createEvent('Event');
        evt.initEvent('DOUBLE_CLICK_DISPATCHED_EVENT', true, false);
        document.dispatchEvent(evt);
    },
    doubleClickDSPTagDispatcher: function ($id, $cat, $type) {
        var axel = Math.random() + "";
        var a = axel * 10000000000000;
        DomUtils.createIframe(
	  		'https://' + $id + '.fls.doubleclick.net/activityi;src=' + $id + ';type=' + $type + ';cat=' + $cat + ';ord=' + a + '?',
	  		1, 1, 1, "none");
        var evt = document.createEvent('Event');
        evt.initEvent('DOUBLE_CLICK_DSP_DISPATCHED_EVENT', true, false);
        document.dispatchEvent(evt);
    },
    getGoogleAdWordsObject: function ($id, $label, $language, $value, $color, $format, $landing, $condition, $origin) {
        return {
            a_type: "GoogleAdWords",
            byOrigin: true,
            origin: $origin,
            dispatchAt: $condition,
            landing: $landing,
            config: {
                id: $id,
                label: $label,
                language: $language,
                value: $value,
                color: $color,
                format: $format
            }
        };
    },
    getDoubleClickTagObject: function ($src, $cat, $landing, $condition, $origin) {
        return {
            a_type: "DoubleClick",
            byOrigin: true,
            origin: $origin,
            dispatchAt: $condition,
            landing: $landing,
            config: {
                src: $src,
                cat: $cat
            }
        };
    },
    getDoubleClickDSPTagObject: function ($type, $src, $cat, $landing, $condition, $origin) {
        return {
            a_type: "DoubleClickDSP",
            byOrigin: true,
            origin: $origin,
            dispatchAt: $condition,
            landing: $landing,
            config: {
                type: $type,
                cat: $cat,
                id: $src
            }
        };
    }
};