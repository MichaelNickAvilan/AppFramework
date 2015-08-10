/* global redirURL, targetWin, DomUtils */
/** 
  * @desc This file dispatchs the MediaMind tags
  * @author Michael Avilán michael.avilan@gmail.com
*/
var SizmekAds = {
    /**
     * Constructor method
     */
    init: function () {
        //Constructor
    },
    /**
     * Dispatch a counter tag to the Sizmek Platform
     * @param {string} $conversion_tag - Conversion tag ID
     */
    mediaMindCounterTagDispatcher: function ($conversion_tag) {
        var elem = document.createElement("SCRIPT");
        elem.src = "http://bs.serving-sys.com/BurstingPipe/ActivityServer.bs?cn=as&ActivityID=" + $conversion_tag +
            "&rnd=" + (Math.round(Math.random() * 1000000));
        document.body.appendChild(elem);
        if (typeof (redirURL) !== "undefined") {
            if (typeof (targetWin) === "undefined" || targetWin === "_blank") {
                window.open(redirURL);
            } else {
                DomUtils.redirectToURL(redirURL);
            }
        }
        var evt = document.createEvent('Event');
        evt.initEvent('SIZMEK_COUNTER_DISPATCHED_EVENT', true, false);
        document.dispatchEvent(evt);
    },
    /**
     * Dispatch a retargeting tag to the Sizmek Platform
     * @param {string} $tid - tid value
     * @param {string} $tval - tval value
     */
    mediaMindRetargetingTagDispatcher: function ($tid, $tval) {
        var image = new Image(1, 1);
        var elem = document.createElement("SCRIPT");
        var rand = (Math.round(Math.random() * 1000000));
        elem.src = 'HTTP://bs.serving-sys.com/Serving?CN=ntt&TID=' +
		$tid +
		'&TVAL=' + $tval +
		'&rnd=' + rand;
        document.body.appendChild(elem);
        DomUtils.createBeacon("HTTP://bs.serving-sys.com/Serving?CN=nttTID=" + $tid + "&TVAL=" + $tval + "ns=1", 1, 1);
        var evt = document.createEvent('Event');
        evt.initEvent('SIZMEK_REMARKETING_DISPATCHED_EVENT', true, false);
        document.dispatchEvent(evt);
    },
    /**
     * Dispatch a retargeting tag to the Sizmek Platform
     * @param {string} $activity_id - Activity ID
     * @param {string} $order_id - Order ID
     * @param {string} $product_id - Product ID
     * @param {string} $product_info - Product Info
     * @param {int} $quantity - Quantity products purchased
     */
    mediaMindSalesTagDispatcher: function ($activity_id, $order_id, $product_id, $product_info, $quantity) {
        var elem = document.createElement("SCRIPT");
        elem.src = 'HTTP://bs.serving-sys.com/Serving/ActivityServer.bs?cn=as&amp;ActivityID=' +
		$activity_id +
		'&rnd=' + (Math.round(Math.random() * 1000000)) +
		'&Value=1' +
		'&OrderID=' + $order_id +
		'&ProductID=' + $product_id +
		'&ProductInfo=' + $product_info +
		'&Quantity=' + $quantity;
        document.body.appendChild(elem);
        var evt = document.createEvent('Event');
        evt.initEvent('SIZMEK_SALES_DISPATCHED_EVENT', true, false);
        document.dispatchEvent(evt);
    },
    /**
     * Returns a stadard object to be used into the tagging engine
     * @param {string} $id
     * @param {string} $landing
     * @param {string} $condition
     * @param {string} $origin
     */
    getSizmekCounterObject: function ($id, $landing, $condition, $origin) {
        return {
            a_type: "MediaMind",
            byOrigin: true,
            origin: $origin,
            dispatchAt: $condition,
            landing: $landing,
            config: {
                id: $id
            }
        };
    },
    /**
     * Returns a stadard object to be used into the tagging engine
     * @param {string} $tid
     * @param {string} $tval
     * @param {string} $landing
     * @param {string} $condition
     * @param {string} $origin
     */
    getSizmekRemarketingObject: function ($tid, $tval, $landing, $condition, $origin) {
        return {
            a_type: "MediaMindRemarketing",
            byOrigin: false,
            origin: $origin,
            dispatchAt: $condition,
            landing: $landing,
            config: {
                tid: $tid,
                tval: $tval
            }
        };
    },
    /**
     * Returns a stadard object to be used into the tagging engine
     * @param {string} $id
     * @param {string} $order_id
     * @param {string} $product_id
     * @param {string} $product_id
     * @param {string} $product_info
     * @param {string} $quantity
     * @param {string} $landing
     * @param {string} $condition
     * @param {string} $origin
     */
    getSizmekSalesObject: function ($id, $order_id, $product_id, $product_info, $quantity, $landing, $condition, $origin) {
        return {
            a_type: "MediaMindSales",
            byOrigin: true,
            origin: $origin,
            dispatchAt: $condition,
            landing: $landing,
            config: {
                id: $id,
                orderID: $order_id,
                productID: $product_id,
                productInfo: $product_info,
                quantity: $quantity
            }
        };
    }
};