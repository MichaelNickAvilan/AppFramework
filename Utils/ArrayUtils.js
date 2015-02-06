var ArrayUtils = {
    init: function () {
    },
    deleteDuplicates: function (ar) {
        var ya = false, v = "", aux = [].concat(ar), r = Array();
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
    countRepeatedElements:function(arr) {
        var a = [], b = [], prev;

        arr.sort();
        for ( var i = 0; i < arr.length; i++ ) {
            if ( arr[i] !== prev ) {
                a.push(arr[i]);
                b.push(1);
            } else {
                b[b.length-1]++;
            }
            prev = arr[i];
        }

        return [a, b];
     }
};
