/** 
  * @desc Stores the Events of the framework
  * @author Michael Avilán michael.avilan@gmail.com
*/

var Controller = {

    LIBS_LOADED_EVENT: 'LIBS_LOADED_EVENT',
    ADS_PLATFORM_READY_EVENT: 'ADS_PLATFORM_READY_EVENT',
    UTILS_PLATFORM_LOADED_EVENT: 'UTILS_PLATFORM_LOADED_EVENT',
    CRM_PLATFORM_LOADED_EVENT: 'CRM_PLATFORM_LOADED_EVENT',
    CMS_PLATFORM_LOADED_EVENT: 'CMS_PLATFORM_LOADED_EVENT',
    //GOOGLE EVENTS
    GOOGLE_ADWORDS_DISPATCHED_EVENT: 'GOOGLE_ADWORDS_DISPATCHED_EVENT',
    DOUBLE_CLICK_DISPATCHED_EVENT: 'DOUBLE_CLICK_DISPATCHED_EVENT',
    DOUBLE_CLICK_DSP_DISPATCHED_EVENT: 'DOUBLE_CLICK_DSP_DISPATCHED_EVENT',
    //FACEBOOK EVENTS
    FACEBOOK_CLASSICTAG_DISPATCHED_EVENT: 'FACEBOOK_CLASSICTAG_DISPATCHED_EVENT',
    FACEBOOK_AUDIENCETAG_DISPATCHED_EVENT:'FACEBOOK_AUDIENCETAG_DISPATCHED_EVENT',
    //SIZMEK EVENTS
    SIZMEK_COUNTER_DISPATCHED_EVENT: 'SIZMEK_COUNTER_DISPATCHED_EVENT',
    SIZMEK_REMARKETING_DISPATCHED_EVENT:'SIZMEK_REMARKETING_DISPATCHED_EVENT',
    SIZMEK_SALES_DISPATCHED_EVENT: 'SIZMEK_SALES_DISPATCHED_EVENT',
    //SOICOS EVENTS
    SOICOS_TAG_DISPATCHED_EVENT: 'SOICOS_TAG_DISPATCHED_EVENT',
    SOICOS_IMAGE_TAG_DISPATCHED_EVENT: 'SOICOS_IMAGE_TAG_DISPATCHED_EVENT',
    //YAHOO EVENTS
    YAHOO_TAG_DISPATCHED_EVENT: 'YAHOO_TAG_DISPATCHED_EVENT',
    //HAEDWAY EVENTS
    HAEDWAY_TAG_DISPACHED_EVENT: 'HAEDWAY_TAG_DISPACHED_EVENT',
    //DATAXU
    DATAXU_TAG_DISPACHED_EVENT: 'DATAXU_TAG_DISPACHED_EVENT ',
    //MEDIAMATH
    MEDIAMATH_TAG_DISPACHED_EVENT: 'MEDIAMATH_TAG_DISPACHED_EVENT ',
    //REDMAS
    REDMAS_TAG_DISPACHED_EVENT: 'REDMAS_TAG_DISPACHED_EVENT ',
    //INTERFACE EVENTS
    INTERFACE_LIBS_LOADED_EVENT:'INTERFACE_LIBS_LOADED_EVENT',
    BUSINESS_LIBS_LOADED_EVENT:'BUSINESS_LIBS_LOADED_EVENT',
    UTILS_LIBS_LOADED_EVENT: 'UTILS_LIBS_LOADED_EVENT',
    SEM_LIBS_LOADED_EVENT: 'SEM_LIBS_LOADED_EVENT',
    //ADOBE EVENTS
    ADOBE_TAG_DIPATCHED: 'ADOBE_TAG_DIPATCHED',

    /** @Constructor */
    init: function () {
    },
    /** Attach all the listeners of the App 
    * @param $listener
    * @param $event
    * @param $callback
    */
    addListener: function ($listener,$event,$callback) {
        if ($listener.addEventListener) {
            $listener.addEventListener($event, $callback);
            $listener.addEventListener($event, $callback);
        } else {
            $listener.attachEvent($event, $callback);
            $listener.attachEvent($event, $callback);
        }
    },
    /** Dispatch all the events of the App
    * @param {string} $dispatcher
    * @param {string} $event
    */
    eventDispatcherDelegate: function ($dispatcher, $event) {
        var evt = $dispatcher.createEvent('Event');
        evt.initEvent($event, true, false);
        $dispatcher.dispatchEvent(evt);
    }
};