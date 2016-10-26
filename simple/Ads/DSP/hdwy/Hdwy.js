/* global MediaMath, Controller */

/**
 * Class contains methods to send data to the Headway Platform and its alliates
 * @author Michael Nick Avilan Mora - michael.avilan@gmail.com
 * @deprecated
 */

var Haedway = {
    /** @constructor */
    init: function () {
    },
    /**
    * Dispatch a conversion tag to the Mediamath Platform (Ad Server)
    * @param {object} $mediamathObject
    */
    mediaMathDispatchDelegate: function ($mediamathObject) {
        MediaMath.mediaMathBeaconDispatcher($mediamathObject.id, $mediamathObject.mt_id);
        Controller.eventDispatcherDelegate(document, Controller.HAEDWAY_TAG_DISPACHED_EVENT);
    },
    /**
    * Gets a standard object for the TagingEngine
    * @param {string} $data
    * @param {string} $landing
    * @param {string} $condition
    * @param {string} $origin
    */
    getHaedwayObject: function ($data, $landing, $condition, $origin) {
        return {
            a_type: "HaedwayMediaMath",
            byOrigin: true,
            origin: $origin,
            dispatchAt: $condition,
            landing: $landing,
            config: {
                data: $data
            }
        };
    }
};