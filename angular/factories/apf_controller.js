apf_app.factory('ApfController', function () {
    var ApfController = {
        a_app_events:[],
        addListener: function (listener, event, callback) {
            if (listener.addEventListener) {
                listener.addEventListener(event, callback);
            } else {
                listener.attachEvent(event, callback);
            }
        },
        sendEvent: function (dispatcher, event, args) {
            var evt = new CustomEvent('event', { 'detail': args });
            evt.initEvent(event, true, false);
            dispatcher.dispatchEvent(evt);
        }
    };
    return ApfController;
});