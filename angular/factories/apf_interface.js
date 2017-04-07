/** Factory contains GUI singletons to build an interface declaratively.
 * @author Michael Avilan <michael.avilan@outlook.es>
 * @version 1.0
 */
(function () {
    var apf_app = angular.module('ApfInterface', []);
    apf_app.factory('GUI', function () {
        
        var DomElements = {
            /** Returns a new <div> element. 
             * @param {array} styles Element styles
             * @param {array} attributes Element attributes
             */
            newDiv: function (styles, attributes) {
                var div = document.createElement('div');
                div.className = 'apf_div';
                DomElements.attachStyles(styles, div);
                DomElements.attachAttributes(attributes, div);
                return div;
            },
            /** Returns a new <p> element. 
             * @param {scope} $scope Angular scope
             * @param {compile} $compile Angular compile
             * @param {array} styles Element styles
             * @param {array} attributes Element attributes
             * @param {string} text Text to render in the interface
             */
            newLabel: function (styles, attributes, text) {
                var label = document.createElement('p');
                label.className = 'apf_label';
                DomElements.attachStyles(styles, label);
                DomElements.attachAttributes(attributes, label);
                return label;
            },
            /** Returns a new <textarea> element. 
             * @param {scope} $scope Angular scope
             * @param {compile} $compile Angular compile
             * @param {array} styles Element styles
             * @param {array} attributes Element attributes
             */
            newTextArea: function ($scope, $compile, styles, attributes) {
                var textArea = document.createElement('textarea');
                textArea.className = 'apf_textarea';
                DomElements.attachStyles(styles, textArea);
                DomElements.attachAttributes($scope, $compile, attributes, textArea);
                $compile(textArea)($scope);
                return textArea;
            },
            /** Returns a new <textarea> element. 
             * @param {scope} $scope Angular scope
             * @param {compile} $compile Angular compile
             * @param {array} styles Element styles
             * @param {array} attributes Element attributes
             */
            newTextField: function ($scope, $compile, styles, attributes) {           
                var textField = document.createElement('input');
                textField.className = 'apf_textfield';
                DomElements.attachStyles(styles, textField);
                DomElements.attachAttributes($scope, $compile, attributes, textField);
                $compile(textField)($scope);
                return textField;
            },
            /** Returns a new checkbox element with label and link. 
             * @param {scope} $scope Angular scope
             * @param {scope} $compile Angular compile
             * @param {string} href Link to be applied over the hrefLabel text
             * @param {string} label Text to be rendered near the ckeckbox
             * @param {string} hrefLabel URL
             * @param {array} styles Element styles
             * @param {array} attributes Element attributes
             */
            newCheckbox: function ($scope, $compile, href, label, hrefLabel, styles, attributes) {
                var checkbox = document.createElement("input");
                checkbox.setAttribute("type", "checkbox");
                checkbox.className = 'apf_checkbox';
                var span = DomElements.newDiv([], []);
                var spanText = document.createTextNode(' ' + label + ' ');
                span.className = 'apf_span';
                span.appendChild(checkbox);
                span.appendChild(spanText);
                if (href != '' && href != 'NULL') {
                    var a = document.createElement('a');
                    a.setAttribute('href', href);
                    a.setAttribute('target', '_blank');
                    var aText = document.createTextNode(hrefLabel);
                    a.appendChild(aText);
                    span.appendChild(a);
                }
                DomElements.attachStyles(styles, span);
                DomElements.attachAttributes($scope, $compile, attributes, checkbox);
                $compile(checkbox)($scope);
                return span;
            },
            /** Returns a new input radio 
             * @param {scope} $scope Angular scope
             * @param {scope} $compile Angular compile
             * @param {string} name
             * @param {string} label
             * @param {string} value
             * @param {array} styles Element styles
             * @param {array} attributes Element attributes
             */
            newInputRadio: function ($scope, $compile, name, label, value, styles, attributes) {
                var container = DomElements.newDiv([], []);
                var radio = document.createElement("input");
                var span = DomElements.newDiv([], []);
                radio.name = name;
                radio.value = value;
                radio.className = 'apf_radio';
                span.className = 'apf_radio_span';
                span.textContent = label;
                radio.type = 'radio';
                container.appendChild(span);
                container.appendChild(radio);
                attributes.push({ attribute: 'value', value: value });
                DomElements.attachStyles(styles, container);
                DomElements.attachAttributes($scope, $compile, attributes, radio);
                $compile(container)($scope);
                return container;
            },
            /** Returns a new radios fieldset 
             * @param {scope} $scope Angular scope
             * @param {scope} $compile Angular compile
             * @param {string} name
             * @param {array} radios. A radio is a simple object like this: { label: 'Radio Uno', value: 'R1' }
             * @param {array} styles Element styles
             * @param {array} attributes Element attributes
             */
            newRadiosFieldset: function ($scope, $compile, name, radios, styles, attributes) {
                var fieldset = document.createElement("fieldset");
                fieldset.className = 'apf_fieldset';
                for (var i = 0; i < radios.length; i++) {
                    var radio = DomElements.newInputRadio($scope, $compile, name, radios[i].label, radios[i].value, [], attributes);
                    fieldset.appendChild(radio);
                }
                DomElements.attachStyles(styles, fieldset);
                //DomElements.attachAttributes($scope, $compile, attributes, fieldset);
                $compile(fieldset)($scope);
                return fieldset;
            },
            newButton: function (styles, attributes) {
                var btn = document.createElement('button');
                DomElements.attachAttributes(attributes);
                DomElements.attachStyles(styles);
                return btn;
            },
            newImage: function ($scope, $compile, styles, attributes) {
                var im = document.createElement('img');
                DomElements.attachAttributes(attributes);
                DomElements.attachStyles(styles);
                return im;
            },
            newCombo: function ($scope, $compile, dataProvider, dataField, styles, attributes) {
                var combo = document.createElement('select');
                DomElements.attachAttributes(attributes);
                DomElements.attachStyles(styles);

               for (var j = 0; j < dataProvider.length; j++) {
                    var opt = document.createElement('option');
                    opt.text = dataProvider[j][dataField];
                    if (dataProvider[j].value != undefined) {
                        opt.value = dataProvider[j].value;
                    }
                    combo.add(opt);
                }

                return combo;
            },
            removeElement: function (id) {
                if (document.getElementById(id) != null) {
                    DOMElements.removeAllChilds(id);
                    var el = document.getElementById(id);
                    el.parentNode.removeChild(el);
                }
            },
            removeAllChilds: function (id) {
                var el = document.getElementById(id);
                angular.forEach(el.childNodes, function (childNode) {
                    el.removeChild(childNode);
                });
            },
            attachAttributes: function ($scope, $compile, attributes, element) {
                angular.forEach(attributes, function (attribute) {
                    if (String(attribute.attribute).indexOf('ng-') >= 0) {
                        if (String(attribute.value).indexOf('{') >= 0) {
                            var obj = JSON.parse(attribute.value);
                            if ($scope[obj.name] === undefined) {
                                $scope[obj.name] = obj.objectParams;
                            }

                            element.setAttribute(attribute.attribute, obj.simple);
                        } else {
                            element.setAttribute(attribute.attribute, attribute.value);
                            $scope[attribute.value] = null;
                        }
                    } else {
                        element.setAttribute(attribute.attribute, attribute.value);
                    }
                });
            },
            attachStyles: function (styles, element) {
                /*for (var i = 0; i < styles.length; i++) {
                    element.style[styles[i].style] = styles[i].value;
                }*/
            }
        };
        var Containers = {
            horizontalContainer: function (id, childs, styles, attributes) {
                var container = DomElements.newDiv(styles, attributes);
                for (var i = 0; i < childs.length; i++) {
                    switch (childs[i].type) {
                        case 'HorizontalContainer':
                            break;
                        case 'VerticalContainer':
                            break;
                        case 'CanvasContainer':
                            break;
                    }
                }
                return container;
            },
            addDomElement: function (type, el) {
                switch (type) {
                    case 'div':
                        DomElements.newDiv(el.styles, el.attributes);
                        break;
                    case 'label':
                        DomElements.newLabel(el.styles, el.attributes, el.text);
                        break;
                    case 'textarea':
                        DomElements.newTextArea(el.styles, el.attributes);
                        break;
                    case 'textfield':
                        DomElements.newTextField(el.styles, el.attributes);
                        break;
                    case 'checkbox':
                        DomElements.newCheckbox(el.href, el.styles, el.attributes);
                        break;
                    case 'radio':
                        DomElements.newInputRadio(el.name,el.label, el.value, el.styles, el.attributes);
                        break;
                    case 'button':
                        DomElements.newButton(el.styles, el.attributes);
                        break;
                    case 'image':
                        DomElements.newImage(el.styles, el.attributes);
                        break;
                    case 'combo':
                        DomElements.newCombo(el.dataProvider, el.styles, el.attributes);
                        break;
                    case 'radiosfieldset':
                        DomElements.newRadiosFieldset(el.name, el.styles, el.attributes);
                        break;
                }
            }
        };
        return {
            dom: DomElements,
            containers:Containers
        };
    });
})();