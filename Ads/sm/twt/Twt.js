/** 
  * @desc This file definess all the functionality to dispatch TwitterAds Tags
  * @author Michael Avilán michael.avilan@gmail.com
  * @required proxy.php
*/


var TwitterAds = {
    init: function () {
        //Constructor
    },
    twitterConversionTagDispatcher: function ($trackPid) {
        var iframe = PerformanceMKT.a_prefix+'/AppFramework/Ads/sm/renderers/TwitterRenderer.php?' +
	  	'trackPid=' + $trackPid;
        DomUtils.createIframe(iframe, 1, 1, 1, "none");
        Controller.eventDispatcherDelegate(document, Controller.TWITTER_AD_DISPATCHED_EVENT);
    },
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