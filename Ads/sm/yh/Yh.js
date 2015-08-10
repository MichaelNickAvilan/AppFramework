/** 
  * @desc This file definess all the events that rules the API
  * @author Michael Avilán michael.avilan@gmail.com
*/
var YahooAds = {
    /** @Constructor method */
    init: function () {
    },
    /** 
    * Dispatch a Yahoo conversion tag
    * $pixelId
    */
    yahooConversionTagDispatcher: function ($pixelId) {
        DomUtils.createBeacon('http://ads.yahoo.com/pixel?id=' + $pixelId + '&t=2', 1, 1);
        Controller.eventDispatcherDelegate(document, Controller.YAHOO_TAG_DISPATCHED_EVENT);
    },
    /**
    * Returns a Standar Yahoo Object
    * @param {string} $id
    * @param {string} $landing
    * @param {string} $condition
    * @param {string} $origin
    */
    getYahooTagObject: function ($id, $landing, $condition, $origin) {
        return {
            a_type: "YahooTag",
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