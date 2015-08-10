/* global Controller, DomUtils */
/**
 * Class contains methods to send data to the Facebook Ads Platform
 * @author Michael Nick Avilan Mora - michael.avilan@gmail.com
 * @class
 */

var FacebookAds = {
    /** @constructor */
    init: function () {
    },
    /**
    * Dispatch a conversion tag to the Facebook Ads Platform
    * @param {int} $id Facebook Tag track ID
    * @param {float} $value Facebook Tag value
    * @param {string} $currency Facebook Tag currency
    * @param {string} $renderCase especifies wich type of tag rendering will be used
    */
    facebookConversionTagDispatcher: function ($id, $value, $currency, $renderCase) {
        switch ($renderCase) {
            case 'JavaScript':
                var fb_param = {};
                fb_param.pixel_id = $id;
                fb_param.value = $value;
                fb_param.currency = $currency;
                var fpw = document.createElement('script');
                fpw.async = true;
                fpw.src = '//connect.facebook.net/en_US/fp.js';
                var ref = document.getElementsByTagName('script')[0];
                ref.parentNode.insertBefore(fpw, ref);
                DomUtils.createBeacon('https://www.facebook.com/offsite_event.php?id=' + $id +
                    '&amp;value=' + $value + '&amp;currency=USD', 1, 1);
                Controller.eventDispatcherDelegate(document, Controller.FACEBOOK_CLASSICTAG_DISPATCHED_EVENT);
                break;
            case 'Renderer':
                var iframe = PerformanceMKT.a_prefix + '/AppFramework/Ads/SEM/renderers/FacebookRenderer.php?' +
                'service=1' +
	  	        '&trackID=' + $id +
	  	        '&value=' + $value +
                '&currency=' + $currency;
                DomUtils.createIframe(iframe, 1, 1, 1, "none");
                Controller.eventDispatcherDelegate(document, Controller.FACEBOOK_CLASSICTAG_DISPATCHED_EVENT);
                break;
        }
    },
    /**
    * Dispatch an audience tag to the Facebook Ads Platform
    * @param {int} $id Facebook Audience Tag track ID
    */
    facebookAudienceTagDispatcher: function ($id) {
        var _fbq = window._fbq || (window._fbq = []);
        if (!_fbq.loaded) {
            var fbds = document.createElement('script');
            fbds.async = true;
            fbds.src = '//connect.facebook.net/en_US/fbds.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(fbds, s);
            _fbq.loaded = true;
        }
        _fbq.push(['addPixelId', $id]);
        window._fbq = window._fbq || [];
        window._fbq.push(['track', 'PixelInitialized', {}]);
        DomUtils.createBeacon('https://www.facebook.com/tr?id=' + $id + '&amp;ev=NoScript', 1, 1);
        Controller.eventDispatcherDelegate(document, Controller.FACEBOOK_AUDIENCETAG_DISPATCHED_EVENT);
    },
    /**
    * Returns an object with the TaggingEngine local standard
    * @param {int} $id Facebook Conversion Tag track ID
    * @param {float} $value
    * @param {string} $currency
    * @param {string} $landing
    * @param {string} $condition
    * @param {string} $origin
    */
    getFacebookConversionTagObject: function ($id, $value, $currency, $landing, $condition, $origin) {
        return {
            a_type: "FacebookClassicTag",
            byOrigin: true,
            origin: $origin,
            dispatchAt: $condition,
            landing: $landing,
            config: {
                id: $id,
                paramValue: $value,
                currency: $currency
            }
        };
    },
    /**
    * Returns an object with the TaggingEngine local standard
    * @param {int} $id Facebook Audience Tag track ID
    * @param {string} $landing
    * @param {string} $condition
    * @param {string} $origin
    */
    getFacebookAudienceTagObject: function ($id, $landing, $condition, $origin) {
        return {
            a_type: "FacebookAudienceTag",
            byOrigin: true,
            origin: $origin,
            dispatchAt: $condition,
            landing: $landing,
            config: {
                id: $id
            }
        };
    }
};