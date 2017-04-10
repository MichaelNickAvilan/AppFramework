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
                div.setAttribute('id', DomElements.getTimeStampID()+'_div');
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
                label.setAttribute('id', DomElements.getTimeStampID()+'_label');
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
                textArea.setAttribute('id', DomElements.getTimeStampID()+'_ta');
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
                textField.setAttribute('id', DomElements.getTimeStampID()+'_tf');
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
                checkbox.setAttribute('id', DomElements.getTimeStampID()+'_cb');
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
                radio.setAttribute('id', DomElements.getTimeStampID()+'_radio');
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
                fieldset.setAttribute('id', DomElements.getTimeStampID()+'_fset');
                for (var i = 0; i < radios.length; i++) {
                    var radio = DomElements.newInputRadio($scope, $compile, name, radios[i].label, radios[i].value, [], attributes);
                    fieldset.appendChild(radio);
                }
                DomElements.attachStyles(styles, fieldset);
                $compile(fieldset)($scope);
                return fieldset;
            },
            /** Returns a new button 
             * @param {scope} $scope Angular scope
             * @param {scope} $compile Angular compile
             * @param {array} styles Element styles
             * @param {array} attributes Element attributes
             * @param {string} Button text
             */
            newButton: function ($scope, $compile, styles, attributes, txt) {
                var btn = document.createElement('button');
                var text = document.createTextNode(txt);
                btn.appendChild(text);
                btn.setAttribute('id', DomElements.getTimeStampID()+'_btn');
                DomElements.attachAttributes($scope, $compile, attributes, btn);
                DomElements.attachStyles(styles);
                $compile(btn)($scope);
                return btn;
            },
            /** Returns a new image 
             * @param {scope} $scope Angular scope
             * @param {scope} $compile Angular compile
             * @param {array} styles Element styles
             * @param {array} attributes Element attributes
             */
            newImage: function ($scope, $compile, styles, attributes) {
                var im = document.createElement('img');
                im.setAttribute('id', DomElements.getTimeStampID()+'_img');
                DomElements.attachAttributes($scope, $compile, attributes, im);
                DomElements.attachStyles(styles);
                $compile(im)($scope);
                return im;
            },
            /** Returns a new combo 
             * @param {scope} $scope Angular scope
             * @param {scope} $compile Angular compile
             * @param {array} dataProvider Element options
             * @param {array} dataField options data field
             * @param {array} styles Element styles
             * @param {array} attributes Element attributes
             * @param {string} first option label
             */
            newCombo: function ($scope, $compile, dataProvider, dataField, styles, attributes, label) {
                var combo = document.createElement('select');
                attributes.push(
                    {
                        attribute: 'ng-options',
                        value:
                            'item.' + dataField +
                            ' for item in ' + dataProvider +
                            ' track by item.'+dataField
                    });
                var optionZero = { value: '' };
                optionZero[dataField] = label;
                combo.setAttribute('id', DomElements.getTimeStampID()+'_combo');
                $scope[dataProvider].splice(0, 0, optionZero);
                DomElements.attachAttributes($scope, $compile, attributes, combo);
                DomElements.attachStyles(styles);
                $scope[combo.getAttribute('ng-model')] = optionZero;
                $compile(combo)($scope);               
                return combo;
            },
            /** Returns a time stamp
             */
            getTimeStampID: function () {
                return Date.now();
            },
            /** Removes an element from the GUI
             * @param {string} id
             */
            removeElement: function (id) {
                if (document.getElementById(id) != null) {
                    DOMElements.removeAllChilds(id);
                    var el = document.getElementById(id);
                    el.parentNode.removeChild(el);
                }
            },
            /** Removes all element childs
             * @param {string} id
             */
            removeAllChilds: function (id) {
                var el = document.getElementById(id);
                angular.forEach(el.childNodes, function (childNode) {
                    el.removeChild(childNode);
                });
            },
            /** Set attributes of an element
             * @param {scope} $scope Angular scope
             * @param {scope} $compile Angular compile
             * @param {array} attributes
             * @param {object} GUI element
             */
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
                            if (attribute.attribute != 'ng-options') {
                                $scope[attribute.value] = null;
                            }
                        }
                    } else {
                        element.setAttribute(attribute.attribute, attribute.value);
                    }
                });
            },
            /** Set styles of an element
             * @param {array} styles
             * @param {object} GUI element
             */
            attachStyles: function (styles, element) {
                for (var i = 0; i < styles.length; i++) {
                    element.style[styles[i].style] = styles[i].value;
                }
            }
        };
        var Containers = {
            newAccordion: function ($scope, $compile, attributes, styles, childs, containerID) {
            },
            newControlBar: function () {
            },
            newCanvas: function () {
            },
            newDividedBox: function () {
            },
            newForm: function () {
            },
            newFormItem: function () {
            },
            newGrid: function () {
            },
            newGridItem: function () {
            },
            newHBox: function () {
            },
            newPanel: function () {
            },
            newTabNavigator: function () {
            },
            newTitleWindow: function () {
            },
            newViewStack: function () {
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