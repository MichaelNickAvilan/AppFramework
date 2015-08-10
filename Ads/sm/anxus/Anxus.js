/* global DomUtils  */
/**
 * Class contains methods to send data to the App Nexus Platform
 * @author Michael Nick Avilan Mora - michael.avilan@gmail.com
 * @class
 */
var AppNexusAds = {
    /** @constructor */
    init: function () {
    },
    /**
    * Creates a beacon with the ADNSX standard
    * @param {int} $id The ADNSX tag ID
    */
    appNexusADNSXTagDispatcher: function ($id) {
        DomUtils.createBeacon('https://secure.adnxs.com/px?id=' + $id + '&t=2', 1, 1);
    },
    /**
    * Creates a beacon with the ADNSX lib standard
    * @param {int} $id The ADNSX tag ID
    */
    appNexusADNSXLibTagDispatcher: function ($id) {
        DomUtils.createBeacon('http://ib.adnxs.com/px?id=' + $id + '&t=2', 1, 1);
    },
    /**
    * Returns an object with the TaggingEngine local standard
    * @param {int} $id The ADNSX tag ID
    * @param {string} $tagType coul take 2 different values: appNexusADNSXTagDispatcher or appNexusADNSXLibTagDispatcher
    * @param {string} $landing
    * @param {string} $condition
    * @param {string} $origin
    */
    getAppNexusObject: function ($id, $tagType, $landing, $condition, $origin) {
    	if($tagType!=undefined){
    		return {
	            a_type: "AppNexus",
	            byOrigin: true,
	            origin: $origin,
	            dispatchAt: $condition,
	            landing: $landing,
	            config: {
	                id: $id,
	                tagType: $tagType
	            }
	        };	
    	}
    }
};