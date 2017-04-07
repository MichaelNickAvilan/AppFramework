var Containers = {
    HGroup: function ($id, $childs, $props, $container, $click, $class) {

        var hg = DOMElements.newDiv($id, [], 'local_hgroup');
        var percent = (100 / $childs.length);
        if ($container != null) {
            document.getElementById($container).appendChild(hg);
        } else {
            $container = UniversalModel.a_main_container;
            $container.appendChild(hg);
        }

        for (var i = 0; i < $childs.length; i++) {
        	var centinela = false;
        	if($childs[i].props.length > 0){
        		for(var j=0; j < $childs[i].props.length; j++){
	        		if($childs[i].props[j].name === 'float'){
	        			centinela = true;
	        		}
	        	}
        	}
        	if(centinela === true){
        		 $childs[i].props.push({ name: 'margin-right', value: '5px' });	
        	}else{
        		$childs[i].props.push({ name: 'float', value: 'left' });	
        	} 

            if ($childs[i].type == 'VGroup') {
                Containers.VGroup($childs[i].id, $childs[i].childs, [], $id);
            } else {
                hg.appendChild(Containers.addElement($childs[i].type, $childs[i]));
            }
        }

        for (var j = 0; j < $props.length; j++) {
            hg.style[$props[j].name] = $props[j].value;
        }

        if ($click != undefined || $click != null) {
            hg.addEventListener('click', $click);
        }

        if ($class != null) {
            hg.className = $class;
        }
    },
    VGroup: function ($id, $childs, $props, $container,$click,$class) {
        var vg = DOMElements.newDiv($id, []);
        //div.className = 'local_label';
        if ($container != null) {
            document.getElementById($container).appendChild(vg);
        } else {
            $container = UniversalModel.a_main_container;
            $container.appendChild(vg);
        }
        for (var j = 0; j < $props.length; j++) {
            vg.style[$props[j].name] = $props[j].value;
        }

        for (var i = 0; i < $childs.length; i++) {

            $childs[i].props.push({ name: 'display', value: 'cell' });
            $childs[i].props.push({ name: 'float', value: 'left' });


            if ($childs[i].type == 'HGroup') {

                Containers.HGroup($childs[i].id, $childs[i].childs, $childs[i].props, $id);
            } else {
                try {
                	vg.appendChild(Containers.addElement($childs[i].type, $childs[i]));
                    $childs[i].props.push({ name: 'width', value: '100%' });
                } catch (e) {
                     console.log(e);
                } finally { 
                }
                
            }
        }

        if ($click != undefined || $click != null) {
            vg.addEventListener('click', $click);
        }

        if ($class != null) {
            vg.className = $class;
        }

    },
    Canvas: function ($childs, $props) {
        var childs = '';
        for (var i = 0; i < $childs.length; i++) {
            //Añadir estilo de posición absoluta
        }
    },
    addElement: function ($type, $element) {
        switch ($type) {
            case 'textarea':
                var ta = DOMElements.newTextArea($element.id, $element.props, $element.readonly, $element.placeholder);
                return ta;
                break;
            case 'textfield':
                var ta = DOMElements.newTextField($element.id, $element.props, $element.readonly, $element.placeholder, $element.restrict, $element.val, $element.className, $element.change);
                return ta;
                break;
            case 'button':
                var bn = DOMElements.newButton($element.id, $element.props, $element.label, $element.click, $element.className);
                return bn;
                break;
            case 'label':
                var bn = DOMElements.newLabel($element.id, $element.props, $element.text, $element.className);
                return bn;
                break;
            case 'image':
                var im = DOMElements.newImage($element.id, $element.props, $element.source);
                return im;
                break;
            case 'combobox':
                var im = DOMElements.newCombo($element.id, $element.props, $element.dataProvider, $element.labelField, $element.onchange, $element.className);
                return im;
                break;
            case 'fieldset':
                var fs = DOMElements.newRadiosCombo($element.id, $element.dataProvider);
                return fs;
            case 'div':
                var div = DOMElements.newDiv($element.id, $element.props, $element.className);
                return div;
                break;
            case 'radio':
                var div = DOMElements.newInputRadio($element.id, $element.link, $element.textIni, $element.textLink);
                return div;
                break;
            case 'checkbox':
                var checkbox = DOMElements.newCheckbox($element.id, $element.link, $element.textIni, $element.textLink);
                return checkbox;
                break;     

        }
    },
    propertyExist: function ($props, $name) {
        var exist = false;
        for (var i = 0; i < $props.length; i++) {
            if ($props[i].name == $name) {
                exist = true;
            }
        }
        return exist;
    }
};