var Combos = {
    getCombo: function ($id) {
        var combo = document.getElementById($id);
        return combo;
    },
    populateCombo: function ($id, $items) {
        var combo = document.getElementById($id);
        combo.options.length = 0;
        for (var i = 0; i < $items.length; i++) {
            var opt = document.createElement('option');
            opt.text = $items[i].label;
            opt.value = $items[i].value;
            opt.id = $items[i].id;
            combo.add(opt);
        }
    }
};