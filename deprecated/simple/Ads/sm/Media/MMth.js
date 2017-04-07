/**
 * Class contains methods to send data to the Media Math Platform
 * @author Michael Nick Avilan Mora - michael.avilan@gmail.com
 * @class
 */

var MediaMath = {
    /** @constructor */
    init: function () {
    },
    /**
    * Dispatch a conversion tag to the Media Math Ads Platform
    * @param {int} $mt_id
    * @param {int} $mt_adid
    */
    mediaMathBeaconDispatcher: function ($mt_id, $mt_adid) {
        DomUtils.createBeacon('https://pixel.mathtag.com/event/js?mt_id=' + $mt_id + '&mt_adid=' + $mt_adid + '&v1=&v2=&v3=&s1=&s2=&s3=', 1, 1);
        Controller.eventDispatcherDelegate(document, Controller.MEDIAMATH_TAG_DISPACHED_EVENT);
    },
    /**
    * Returns a standard MediaMath Object to be used in to the Tagging Engine
    * @param {int} $mt_id
    * @param {int} $mt_adid
    */
    getMediaMathBeaconObject: function ($id, $adid, $landing, $condition, $origin) {
        return {
            a_type: "MediaMath",
            byOrigin: true,
            origin: $origin,
            dispatchAt: $condition,
            landing: $landing,
            config: {
                id: $id,
                adid: $adid
            }
        };
    }
};