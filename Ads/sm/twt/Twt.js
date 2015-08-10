/** 
  * @desc This file definess all the functionality to dispatch TwitterAds Tags
  * @author Michael Avilán michael.avilan@gmail.com
  * @required proxy.php
*/

var TwitterAds = {
    /** @constructor */
    init: function () {
    },
    /**
    * Dispatch a Twitter tag
    * @param {string} $trackPid
    */ 
    twitterConversionTagDispatcher: function ($trackPid) {
        var iframe = PerformanceMKT.a_prefix+'/AppFramework/Ads/SEM/renderers/TwitterRenderer.php?' +
	  	'trackPid=' + $trackPid;
        DomUtils.createIframe(iframe, 1, 1, 1, "none");
        Controller.eventDispatcherDelegate(document, Controller.TWITTER_AD_DISPATCHED_EVENT);
    },
    /**
    * Returns a Standar Twitter Object
    * @param {string} $id
    * @param {string} $landing
    * @param {string} $condition
    * @param {string} $origin
    */
    getTwitterConversionObject: function ($id, $landing, $condition, $origin) {
        return {
            a_type: "TwitterAds",
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