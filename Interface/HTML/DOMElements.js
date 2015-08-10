/**
    * DOMElements, sinlgeton with methods to create HTML elements.
    * @author Michael Nick Avilan Mora - michael.avilan@gmail.com
    */
var DOMElements = {
    /** Constructor */
    init: function () {
    },
    /**
    * Creates a new DIV
    * @param {string}  $id - Id of the DIV
    * @param {array}   $stylesProperties - Array of CSS properties
    */
    newDiv: function ($id, $stylesProperties) {
        var div = document.createElement('div');
        div.className = 'local_div';
        div.id = $id;
        for (var i = 0; i < $stylesProperties.length; i++) {
            div.style[$stylesProperties[i].name] = $stylesProperties[i].value;
        }
        return div;
    },
    /**
    * Creates a new label
    * @param {string}  $id - Id of the LABEL
    * @param {array}   $stylesProperties - Array of CSS properties
    * @param {string}  $text - Text to display
    */
    newLabel: function ($id, $stylesProperties, $text, $class) {
        var div = document.createElement('div');
        div.id = $id;
        
        if($class!=null && $class!=undefined){
        	div.className = $class;
        }else{
        	div.className = 'local_label';
        }
        
        for (var i = 0; i < $stylesProperties.length; i++) {
            div.style[$stylesProperties[i].name] = $stylesProperties[i].value;
        }
        div.textContent = $text;
        return div;
    },
    /**
    * Creates a new label
    * @param {string}  $id - Id of the LABEL
    * @param {array}   $stylesProperties - Array of CSS properties
    * @param {string}  $text - Text to display
    * @param {string}  $placeHolder - Text to display in the placeholder
    */
    newTextArea: function ($id, $stylesProperties, $readonly, $placeHolder,$className) {
        var ta = document.createElement('textarea');
        ta.id = $id;
       
        
        if($className != undefined && $className != null && $className != ''){
        	 ta.className = $className;
        }else{
        	  ta.className = 'local_textarea';
        }
        

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
    /**
    * Creates a new TextField
    * @param {string}  $id - Id of the TEXTFIELD
    * @param {array}   $stylesProperties - Array of CSS properties
    * @param {string}  $readonly - If set to true the user will can not modify the content
    * @param {string}  $placeHolder - Text to display in the placeholder
    * @param {string}  $restrict - Restricts the content to restrict the TEXTFIELD content
    */
    newTextField: function ($id, $stylesProperties, $readonly, $placeHolder, $restrict, $val, $className, $change) {
        var ta = document.createElement('input');
        ta.id = $id;
        
        if($className != undefined && $className != null && $className != ''){
        	 ta.className = $className;
        }else{
        	 ta.className = 'local_textfield';
        }
       
        if ($readonly != null) {
            ta.readOnly = $readonly;
        }

        if ($placeHolder != null) {
            ta.placeholder = $placeHolder;
        }

        for (var i = 0; i < $stylesProperties.length; i++) {
            ta.style[$stylesProperties[i].name] = $stylesProperties[i].value;
        }

        if ($restrict != undefined && $restrict != '') {
            FormsUtils.restrictFieldContent(ta, $restrict);
        }

        if ($change != undefined && $change != '') {
            ta.addEventListener('change', function () {
                $change($id);
            });
        }

        return ta;
    },
    /** 
    * Returns a checkbox 
    * @param {string} $id
    * @param {string} $link
    * @param {string} $textIni
    * @param {string} $textLink
    */
    newCheckbox:function($id, $link, $textIni, $textLink){
     	     	
     	var ch = document.createElement("INPUT");
		ch.setAttribute("type", "checkbox");
		ch.id = $id;
		
		span = document.createElement('span');
		
    	var sptxt = document.createTextNode(' '+$textIni+' ');	
		
		if($link != ''){
			var a = document.createElement('a');
			a.setAttribute('href', $link);
    		a.setAttribute('target', '_blank');
    		var atxt = document.createTextNode($textLink);  
    		a.appendChild(atxt);  		
		}
		
		span.appendChild(ch);   
		span.appendChild(sptxt);
		span.appendChild(a);
		   	
    	return span;
    	
    	
    }, 
    /**
    * Creates a new Button
    * @param {string}  $id - Id of the BUTTON
    * @param {array}   $stylesProperties - Array of CSS properties
    * @param {string}  $label - Label
    * @param {string}  $click - callback function to the onclick event
    */
    newButton: function ($id, $stylesProperties, $label, $click, $className) {
        var btn = document.createElement('button');
        btn.id = $id;
        if($className != undefined && $className != null && $className != ''){
        	 btn.className = $className;
        }else{
        	 btn.className = 'local_btn';
        }
       
        btn.textContent = $label;
        for (var i = 0; i < $stylesProperties.length; i++) {
            btn.style[$stylesProperties[i].name] = $stylesProperties[i].value;
        }

        btn.addEventListener('click', function () {
            $click();
        })

        return btn;
    },
    /**
    * Creates a new Image
    * @param {string}  $id - Id of the IMAGE
    * @param {array}   $stylesProperties - Array of CSS properties
    * @param {string}  $source - Path of the image
    */
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
    /** 
    * Returns a LI element
    * @param $id_li
    * @param $styles
    * @param $class
    */
    newLI:function($id_li,$styles,$class){
    	var li = document.createElement('LI');
    	if($id_li == undefined || $id_li == null){
    		
    	}else{
    		li.id = $id_li;	
    	}
    	
    	if($class != '' && $class != undefined){
    		li.className = $class;
    	}
    	
    	if($styles.length > 0){
	    	for(var i = 0; i < $styles.length; i++){
	    		li.style[$styles[i].name] = $styles[i].value;
	    	}
    	}
    	
    	return li;
    },
    /**
    * Creates a new Combobox
    * @param {string}  $id - Id of the COMBO
    * @param {array}   $stylesProperties - Array of CSS properties
    * @param {array}  $dataProvider - Array of objects to populate the COMBO
    * @param {object}  $change - onchange function
    */
    newCombo: function ($id, $stylesProperties, $dataProvider, $dataField, $change, $Class) {
	
        var combo = document.createElement('select');

        combo.id = $id;
        if($Class == undefined || $Class == null){
        	combo.className = 'local_combobox';	
        }else{
        	combo.className = $Class;
        }
        
        if($stylesProperties.length > 0){
        	for (var i = 0; i < $stylesProperties.length; i++) {
	            combo.style[$stylesProperties[i].name] = $stylesProperties[i].value;
	        }
        }

        if ($change != undefined || $change != null || $change != '') {
            combo.addEventListener('change', $change);
        }
        
        if($dataProvider.length >0){
        	for (var j = 0; j < $dataProvider.length; j++) {
	            var opt = document.createElement('option');
	            opt.text = $dataProvider[j][$dataField];
	
	            if ($dataProvider[j].value != undefined) {
	                opt.value = $dataProvider[j].value;
	            }

	            if ($dataProvider[j].id != undefined) {
	                opt.id = $dataProvider[j].id;
	            }
	            combo.add(opt);
	        }
        }
        
        return combo;
    },
    /**
    * Removes an element from the DOM
    * $id - ID of the element
    */
    removeElement: function ($id) {
        if (document.getElementById($id) != null) {
            DOMElements.removeAllChilds($id);
            var el = document.getElementById($id);
            el.parentNode.removeChild(el);
        }
    },
    /**
    * Removes all chids of a container
    * $id - Container ID
    */
    removeAllChilds: function ($id) {
        var el = document.getElementById($id);
        for (var i = 0; i < el.childNodes.length; i++) {
            el.removeChild(el.childNodes[i]);
        }
    }
};