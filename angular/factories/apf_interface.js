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
            newDiv: function ($scope, $compile, styles, attributes) {
                return DomElements.newGlobalElement($scope, $compile, 'div', styles, attributes);
            },
            /** Returns a new <p> element. 
             * @param {scope} $scope Angular scope
             * @param {compile} $compile Angular compile
             * @param {array} styles Element styles
             * @param {array} attributes Element attributes
             * @param {string} text Text to render in the interface
             */
            newLabel: function ($scope, $compile, styles, attributes, text) {
                var label = DomElements.newGlobalElement($scope, $compile, 'p', styles, attributes);
                label.textContent = text;
                return label;
            },
            /** Returns a new <textarea> element. 
             * @param {scope} $scope Angular scope
             * @param {compile} $compile Angular compile
             * @param {array} styles Element styles
             * @param {array} attributes Element attributes
             */
            newTextArea: function ($scope, $compile, styles, attributes) {
                var textArea = DomElements.newGlobalElement($scope, $compile, 'textarea', styles, attributes);
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
                var textField = DomElements.newGlobalElement($scope, $compile, 'input', styles, attributes);
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
                attributes.push({ attribute: 'type', value: 'checkbox' });
                var checkbox = DomElements.newGlobalElement($scope, $compile, 'input', [], []);
                var span = DomElements.newGlobalElement($scope, $compile, 'div', [], []);
                var spanText = document.createTextNode(' ' + label + ' ');
                span.appendChild(checkbox);
                span.appendChild(spanText);
                if (href != '' && href != 'NULL') {
                    var a = DomElements.newGlobalElement($scope, $compile, 'a', [], [
                        { attribute: 'href', value: 'href' },
                        { attribute: 'target', value: '_blank' }
                    ]);
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
                var radio = DomElements.newGlobalElement($scope, $compile, 'input', [],
                    [
                        { attribute: 'type', value: 'radio' },
                        { attribute: 'name', value: name },
                        { attribute: 'value', value: value },
                        { attribute: 'id', value: DomElements.getTimeStampID() + '_radio' }
                    ]);
                var span = DomElements.newGlobalElement($scope, $compile, 'div', [], []);
                span.textContent = label;
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
                var fieldset = DomElements.newGlobalElement($scope, $compile, 'fieldset', [], []);
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
                if (styles != undefined) {
                    for (var i = 0; i < styles.length; i++) {
                        element.style[styles[i].style] = styles[i].value;
                    }
                }
            },
            newGlobalElement: function ($scope, $compile, tagName, styles, attributes) {
                var el = document.createElement(tagName);
                el.className = 'apf_' + tagName;
                DomElements.attachStyles(styles, el);
                if (attributes != undefined) {
                    if (attributes.length > 0) {
                        DomElements.attachAttributes($scope, $compile, attributes, el);
                    }
                }
                return el;
            }
        };
        var Containers = {
            newAccordion: function ($scope, $compile, containerID, engine, childs) {
                var id = DomElements.getTimeStampID();
                switch (engine) {
                    case 'JQUERYUI':
                        break;
                    case 'TWTBOOTSTRAP':
                        var el = document.getElementById(containerID);
                        el.appendChild(createBootstrapStructure(childs));
                        console.log(el);
                        function createBootstrapStructure(childs) {
                            var panelGroup = DomElements.newDiv([], [
                                { attribute: 'class', value: 'panel-group' },
                                { attribute: 'id', value: id+'_accordion' }
                            ]);
                            angular.forEach(childs, function (child, index) {
                                var panelDefault = DomElements.newDiv([], [
                                { attribute: 'class', value: 'panel panel-default' }
                                ]);
                                var panelHeading = DomElements.newDiv([], [
                                { attribute: 'class', value: 'panel-heading' }
                                ]);
                                var panelTitle = DomElements.newGlobalElement($scope, $compile, 'h4', [], []);
                                var panelLink = DomElements.newGlobalElement($scope, $compile, 'a', [], [
                                    { attribute: 'data-toggle', value: 'collapse'+id },
                                    { attribute: 'data-parent', value: '#' + id + '_accordion' },
                                    { attribute: 'href', value: '#collapse' + index }
                                ]);
                                panelLink.innerHTML = child.title;
                                panelTitle.appendChild(panelLink);
                                var panelBodyContainer = DomElements.newDiv([], [
                                { attribute: 'class', value: 'panel-collapse collapse in' },
                                { attribute: 'id', value: 'collapse'+id }
                                ]);
                                var panelBody = DomElements.newDiv([], [
                                { attribute: 'class', value: 'panel-body' }
                                ]);

                                panelDefault.appendChild(panelHeading);
                                panelHeading.appendChild(panelTitle);
                                panelTitle.appendChild(panelLink);
                                panelGroup.appendChild(panelDefault);
                                panelDefault.appendChild(panelBodyContainer);
                                panelBodyContainer.appendChild(panelBody);
                                panelGroup.appendChild(panelDefault);
                            });
                            return panelGroup;
                        }
                        break;
                }
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