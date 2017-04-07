var APFPublic = {
    getGlobalURLParam: function (param) {
        var value = '';
        if (APFPublic.isAppInIFrame() === true) {
            value = APFPublic.getIFrameURLParam(param);
        } else {
            value = APFPublic.getURLParam(param);
        }
        return value;
    },
    getURLParam: function (param) {
        var value = decodeURIComponent((new RegExp('[?|&]' + param + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
        return value;
    },
    getIFrameURLParam: function (param) {
        var url = (window.location != window.parent.location) ? document.referrer : document.location;
        var value = decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ""])[1].replace(/\+/g, '%20')) || null;
        if (value === null) {
            return '';
        } else {
            return value;
        }
    },
    isAppInIFrame: function () {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    },
    getFormatedDate: function () {
        var d = new Date();
        var month = d.getMonth();
        month = month + 1;
        return d.getFullYear() + '-' + month + '-' + d.getDate();
    },
    deleteArrayDuplicates: function (collection) {
        var items = [];
        angular.forEach(collection, function (item) {
            if (items.indexOf(item) == -1) {
                items.push(item);
            }
        });
        return items;
    },
    parseXML: function (xml) {
        var dom = null;
        if (window.DOMParser) {
            try {
                dom = (new DOMParser()).parseFromString(xml, "text/xml");
            }
            catch (e) { dom = null; }
        }
        else if (window.ActiveXObject) {
            try {
                dom = new ActiveXObject('Microsoft.XMLDOM');
                dom.async = false;
                if (!dom.loadXML(xml)) // parse error ..

                    window.alert(dom.parseError.reason + dom.parseError.srcText);
            }
            catch (e) { dom = null; }
        }
        else
            alert("cannot parse xml string!");
        return dom;
    }
};