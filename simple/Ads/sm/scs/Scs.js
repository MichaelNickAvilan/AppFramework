/** 
  * @desc This file dispatchs the Soicos tags
  * @author Michael Avilán michael.avilan@gmail.com
*/

var SoicosAds = {

    a_soicos_pid: '',

    init: function () {
    },
    soicosTagDispatcher: function ($pid, $type) {
        /*
        1. Tag
        2. Image
        */
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
    soicosCallback: function () {
        soicos.registerConversion({ pid: SoicosAds.a_soicos_pid, data: '' });
        Controller.eventDispatcherDelegate(document, Controller.SOICOS_TAG_DISPATCHER);
    },
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