var DOMElements = {
    init: function () {
    },
    newDiv: function ($id, $stylesProperties, $class) {
        var div = document.createElement('div');
        if ($class != null || $class != undefined) {
            div.className = $class;
        } else {
            div.className = 'local_div';
        }
        div.id = $id;
        for (var i = 0; i < $stylesProperties.length; i++) {
            div.style[$stylesProperties[i].name] = $stylesProperties[i].value;
        }
        return div;
    },
    newLabel: function ($id, $stylesProperties, $text) {
        var div = document.createElement('div');
        div.id = $id;
        div.className = 'local_label';
        for (var i = 0; i < $stylesProperties.length; i++) {
            div.style[$stylesProperties[i].name] = $stylesProperties[i].value;
        }
        div.textContent = $text;
        return div;
    },
    newTextArea: function ($id, $stylesProperties, $readonly, $placeHolder) {
        var ta = document.createElement('textarea');
        ta.id = $id;
        ta.className = 'local_textarea';

        if ($readonly != null) {
            ta.readOnly = $readonly;
        }

        if ($placeHolder != null) {
            ta.placeholder = $placeHolder;
        }

        for (var i = 0; i < $stylesProperties.length; i++) {
            ta.style[$stylesProperties[i].name] = $stylesProperties[i].value;
        }
        return ta;
    },
    newTextField: function ($id, $stylesProperties, $readonly, $placeHolder, $restrict, $val, $class) {
        var ta = document.createElement('input');
        ta.id = $id;
        ta.className = 'local_textfield';

        if ($readonly != null) {
            ta.readOnly = $readonly;
        }

        if ($class != null) {
            ta.className = $class;
        }

        if ($placeHolder != null) {
            ta.placeholder = $placeHolder;
        }

        if ($val != null) {
            ta.value = $val;
        }

        for (var i = 0; i < $stylesProperties.length; i++) {
            ta.style[$stylesProperties[i].name] = $stylesProperties[i].value;
        }

        if ($restrict != undefined && $restrict !='') {
            FormsUtils.restrictFieldContent(ta, $restrict);
        }

        return ta;
    },
    newButton: function ($id, $stylesProperties, $label, $click, $class) {
        var btn = document.createElement('button');
        btn.id = $id;
        btn.className = 'local_btn';
        btn.textContent = $label;
        for (var i = 0; i < $stylesProperties.length; i++) {
            btn.style[$stylesProperties[i].name] = $stylesProperties[i].value;
        }

        btn.addEventListener('click', $click);

        if ($class != null) {
            btn.className = $class;
        }

        return btn;
    },
    newImage: function ($id, $stylesProperties, $source) {
        var im = document.createElement('img');
        im.setAttribute("src", $source);
        im.setAttribute("id", $id);
        im.className = 'local_image';
        for (var i = 0; i < $stylesProperties.length; i++) {
            im.style[$stylesProperties[i].name] = $stylesProperties[i].value;
        }
        return im;
    },
    newCombo: function ($id, $stylesProperties, $dataProvider, $dataField, $change, $class) {

        var combo = document.createElement('select');

        combo.id = $id;
        combo.className = 'local_combobox';
        for (var i = 0; i < $stylesProperties.length; i++) {
            combo.style[$stylesProperties[i].name] = $stylesProperties[i].value;
        }
        for (var j = 0; j < $dataProvider.length; j++) {
            var opt = document.createElement('option');
            opt.text = $dataProvider[j][$dataField];

            if ($dataProvider[j].value != undefined) {
                opt.value = $dataProvider[j].value;
            }

            if ($change != undefined || $change != null) {
                combo.addEventListener('change', $change);
            }

            if ($class != null) {
                combo.className = $class;
            }

            combo.add(opt);
        }

        return combo;
    },
    newDateRange: function ($n, $fromID, $toID) {
        var n = $n;
        $('#' + $fromID).datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            changeYear: true,
            numberOfMonths: 2,
            onClose: function (selectedDate) {
                $('#' + 'dateTo' + n + '_date').datepicker("option", "minDate", selectedDate);
            }

        });
        $('#' + $toID).datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            changeYear: true,
            numberOfMonths: 2,
            onClose: function (selectedDate) {
                $('#' + 'dateFrom' + n + '_date').datepicker("option", "maxDate", selectedDate);
            }
        });

        $('#' + $fromID).datepicker('option', 'dateFormat', 'yy-mm-dd');
        $('#' + $toID).datepicker('option', 'dateFormat', 'yy-mm-dd');

        $('#' + $fromID).datepicker('show');
    },
    removeElement: function ($id) {
        if (document.getElementById($id) != null) {
            DOMElements.removeAllChilds($id);
            var el = document.getElementById($id);
            el.parentNode.removeChild(el);
        }
    },
    removeAllChilds: function ($id) {
        var el = document.getElementById($id);
        for (var i = 0; i < el.childNodes.length; i++) {
            el.removeChild(el.childNodes[i]);
        }
    }
};