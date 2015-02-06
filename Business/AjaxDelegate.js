var AjaxDelegate = {

    a_response: {},
    
    init: function () {
    },
    requestInfo: function ($url, $data, $type, $dataType, $callback) {
        AjaxDelegate.a_response = {};
        $.ajax({
            url: $url,
            data: $data,
            type: $type,
            dataType: $dataType,
            success: function (_data) {
                if (_data !=null) {
                    AjaxDelegate.a_response = _data;
                    $callback();
                    var evt = document.createEvent('Event');
                    evt.initEvent('REQUEST_SUCCESS_EVENT', true, false);
                    document.dispatchEvent(evt);
                   
                } else {
                    var evt = document.createEvent('Event');
                    evt.initEvent('REQUEST_FAULT_EVENT', true, false);
                    document.dispatchEvent(evt);
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log("Error: " + thrownError + ". Status: " + xhr.status);
                var evt = document.createEvent('Event');
                    evt.initEvent('REQUEST_FAULT_EVENT', true, false);
                    document.dispatchEvent(evt);
            }
        });
    }
};