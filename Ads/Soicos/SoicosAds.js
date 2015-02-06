/** 
  * @desc This file dispatchs the Soicos tags
  * @author Michael Avilán michael.avilan@gmail.com
*/

var SoicosAds = {

    a_soicos_pid: '',

    init: function () {
    },
    soicosTagDispatcher: function ($pid) {
        SoicosAds.a_soicos_pid = $pid;
        DomUtils.loadScript("http://ad.soicos.com/soicosjs.php?s=.js",
		SoicosAds.soicosCallback);
    },
    soicosCallback: function () {
        soicos.registerConversion({ pid: SoicosAds.a_soicos_pid, data: '' });
        var evt = document.createEvent('Event');
        evt.initEvent('SOICOS_TAG_DISPATCHER', true, false);
        document.dispatchEvent(evt);
    },
    soicosImageTagDispatcher: function ($pid) {
        DomUtils.createBeacon('http://ad.soicos.com/conv.php?pid=' + $pid, 1, 1);
        var evt = document.createEvent('Event');
        evt.initEvent('SOICOS_IMAGE_TAG_DISPATCHER', true, false);
        document.dispatchEvent(evt);
    },
    getSoicosTagObject: function ($id, $landing, $condition, $origin) {
        return {
            a_type: "SoicosTag",
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