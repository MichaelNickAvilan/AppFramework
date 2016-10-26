var TextPerformance = {
    init: function () {
    },
    getField: function ($id) {
        var el = document.getElementById($id);
        return el;
    },
    getValue: function ($id) {
        var el = document.getElementById($id);
        return el.value;
    },
    insertValue:function($id,$value){
    	var el = document.getElementById($id);
    	el.value=$value;
    }
};