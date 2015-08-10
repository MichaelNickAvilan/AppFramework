/** 
  * @desc This file contains usefull methods to process arrays
  * @author Michael Avilán michael.avilan@gmail.com
*/

var ArrayUtils = {

    /** Constructor */
    init: function () {
    },
    /** Deletes duplicated elements into an array 
    * @param {array} $ar
    */
    deleteDuplicates: function ($ar) {
        var ya = false, v = "", aux = [].concat($ar), r = Array();
        for (var i in aux) { // 
            v = aux[i];
            ya = false;
            for (var a in aux) {
                if (v == aux[a]) {
                    if (ya == false) {
                        ya = true;
                    }
                    else {
                        aux[a] = "";
                    }
                }
            }
        }
        for (var a in aux) {
            if (aux[a] != "") {
                r.push(aux[a]);
            }
        }
        return r;
    },
    /** Returns an array with the repeated elements and the number of repetitions 
    * @param {array} $arr
    */
    countRepeatedElements:function($arr) {
        var a = [], b = [], prev;

        $arr.sort();
        for ( var i = 0; i < $arr.length; i++ ) {
            if ( $arr[i] !== prev ) {
                a.push($arr[i]);
                b.push(1);
            } else {
                b[b.length-1]++;
            }
            prev = $arr[i];
        }

        return [a, b];
    },
    // In evaluation to be deprecated
    parseToXML: function ($data) {
        if (window.ActiveXObject) {
            var doc = new ActiveXObject('Microsoft.XMLDOM');
            doc.async = 'false';
            doc.loadXML($data);
        } else {
            var parser = new DOMParser();
            var doc = parser.parseFromString($data, 'text/xml');
        }
        return doc;
    }
};
