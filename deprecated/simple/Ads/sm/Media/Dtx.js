/**
 * Class contains methods to send data to the Dataxu Platform and it alliates
 * @author Michael Nick Avilan Mora - michael.avilan@gmail.com
 * @class
 */

var Dataxu = {
    /** @constructor */
	init:function(){
	},
    /**
    * Dispatch a conversion tag to the Google Double Click Platform (Ad Server)
    * @param {object} $GoogleDoubleClickObject
    */
	dataxuDoubleClickDelegate: function ($GoogleDoubleClickObject) {
	    GoogleAds.doubleClickFloodlightTagDispatcher(
            $GoogleDoubleClickObject.config.id,
            $GoogleDoubleClickObject.config.cat,
            $GoogleDoubleClickObject.config.type,
            $GoogleDoubleClickObject.config.renderCase);
	},
    /**
    * Dispatch a conversion tag to the AppNexus Platform
    * @param {object} $AppNexusObject
    */
	dataxuAppNexusDelegate: function ($AppNexusObject) {
	    switch ($AppNexusObject.config.tagType) {
	        case 'appNexusADNSXTagDispatcher':
	            AppNexusAds.appNexusADNSXTagDispatcher($AppNexusObject.config.id);
	            break;
	        case 'appNexusADNSXLibTagDispatcher':
	            AppNexusAds.appNexusADNSXLibTagDispatcher($AppNexusObject.config.id);
	            break;
	    }
	},
    /**
    * Dispatch a conversion tag to the Dataxu Platform 
    * @param {object} $id
    */
	dataxuW55TagDispatcher: function ($id) {
	    DomUtils.createBeacon('http://tags.w55c.net/rs?id=' + $id + '&t=checkout&tx=$TRANSACTION_ID&sku=$SKUS&price=$price', 1, 1);
	    Controller.eventDispatcherDelegate(document, Controller.DATAXU_TAG_DISPACHED_EVENT);
	},
    //Data is a Google Double Click Object
	getDataxuDoubleClick: function ($data, $landing, $condition, $origin) {
	    return {
	        a_type: "DataxuDoubleClick",
	        byOrigin: true,
	        origin: $origin,
	        dispatchAt: $condition,
	        landing: $landing,
	        config: {
	            data: $data
	        }
	    };
	},
    //Data is an AppNexus Object
	getDataxuAppNexus: function ($data, $landing, $condition, $origin) {
		return {
            a_type: "AppNexus",
            byOrigin: true,
            origin: $origin,
            dispatchAt: $condition,
            landing: $landing,
            config: {
                data: $data
            }
        };
	},
	getDataxuW55: function ($id, $landing, $condition, $origin) {
	    return {
	        a_type: "DataxuW55",
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