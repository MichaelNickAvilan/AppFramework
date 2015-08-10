/** 
  * @desc This file dispatchs the Soicos tags
  * @author Michael Avilán michael.avilan@gmail.com
*/

var SoicosAds = {

    a_soicos_pid: '',
    /** @constructor */
    init: function () {
    },
    /** 
    * Dispatch a Soicos tag
    * @param {string} $pid
    * @param {string} $type
    */
    soicosTagDispatcher: function ($pid, $type) {
        switch ($type) {
            case '1':
                SoicosAds.a_soicos_pid = $pid;
                DomUtils.loadScript("http://ad.soicos.com/soicosjs.php?s=.js",
                SoicosAds.soicosCallback);
                break;
            case '2':
                DomUtils.createBeacon('http://ad.soicos.com/conv.php?pid=' + $pid, 1, 1);
                Controller.eventDispatcherDelegate(document, Controller.SOICOS_IMAGE_TAG_DISPATCHER);
                break;
        }
    },
    /** 
    * Dispatch an event when the soicos libs are loaded
    */
    soicosCallback: function () {
        soicos.registerConversion({ pid: SoicosAds.a_soicos_pid, data: '' });
        Controller.eventDispatcherDelegate(document, Controller.SOICOS_TAG_DISPATCHER);
    },
    /** 
    * Return a standar soicos tag
    * @param {string} $pid
    * @param {string} $type
    * @param {string} $landing
    * @param {string} $condition
    * @param {string} $origin
    */
    getSoicosTagObject: function ($id, $type, $landing, $condition, $origin) {
        return {
            a_type: "SoicosTag",
            byOrigin: true,
            origin: $origin,
            dispatchAt: $condition,
            landing: $landing,
            config: {
                id: $id,
                type: $type
            }
        };
    }
};