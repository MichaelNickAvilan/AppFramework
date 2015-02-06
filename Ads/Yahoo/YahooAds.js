/** 
  * @desc This file definess all the events that rules the API
  * @author Michael Avilán michael.avilan@gmail.com
*/

var YahooAds = {
    init: function () {
        //Constructor
    },
    yahooConversionTagDispatcher: function ($pixelId) {
        DomUtils.createBeacon('http://ads.yahoo.com/pixel?id=' + $pixelId + '&t=2', 1, 1);
    },
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