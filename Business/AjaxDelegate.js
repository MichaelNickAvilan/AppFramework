/** 
  * @desc Makes the internal Ajax Requests
  * @author Michael Avilán michael.avilan@gmail.com
*/
var AjaxDelegate = {
	counter:0,
    a_response: {},
    
    /** @Constructor  */
    init: function () {
    },
    /** Makes an ajax request
    * @param {string} $url
    * @param {string} $data
    * @param {string} $type
    * @param {string} $dataType
    * @param {string} $callback
    */
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