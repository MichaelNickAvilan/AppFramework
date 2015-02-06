/** 
  * @desc This file dispatchs the MediaMind tags
  * @author Michael Avilán michael.avilan@gmail.com
*/
var SizmekAds = {
    init: function () {
        //Constructor
    },
    mediaMindCounterTagDispatcher: function ($conversion_tag) {
        var elem = document.createElement("SCRIPT");
        elem.src = "http://bs.serving-sys.com/BurstingPipe/ActivityServer.bs?cn=as&ActivityID=" + $conversion_tag +
		"&rnd=" + (Math.round(Math.random() * 1000000));
        document.body.appendChild(elem);

        if (typeof (redirURL) != "undefined") {
            if (typeof (targetWin) == "undefined" || targetWin == "_blank") {
                window.open(redirURL);
            } else {
                DomUtils.redirectToURL(redirURL);
            }
        }
        var evt = document.createEvent('Event');
        evt.initEvent('SIZMEK_COUNTER_DISPATCHED_EVENT', true, false);
        document.dispatchEvent(evt);
    },
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
    mediaMindSalesTagDispatcher: function ($conversion_tag, $order_id, $product_id, $product_info, $quantity) {
        var elem = document.createElement("SCRIPT");
        elem.src = 'HTTP://bs.serving-sys.com/Serving/ActivityServer.bs?cn=as&amp;ActivityID=' +
		$conversion_tag +
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
    getSizmekRemarketingObject: function ($tid, $tval, $landing, $condition, $origin) {
        return {
            a_type: "MediaMindRemarketing",
            byOrigin: false,
            origin: $origin,
            dispatchAt: $condition,
            landing: $landing,
            config: {
                tid: $tid,
                tval: $val
            }
        };
    },
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