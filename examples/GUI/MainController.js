app = angular.module('apf')
.controller('MainController', function ($scope, $compile, GUI) { 
    var container = GUI.dom.newDiv($scope, $compile, [],
        [{attribute:'id', value:'main-container'}]);
    document.body.appendChild(container);
    
    //Create a text field
    /*var textField = GUI.dom.newTextField($scope, $compile, [], [
        { attribute: 'ng-model', value: 'userName' },
        { attribute: 'ng-change', value: 'userNameChange()' },
        { attribute: 'type', value: 'text' },
        { attribute: 'required', value: 'required' }
    ]);
    container.appendChild(textField);
    $scope.userNameChange = function () {
        //console.log($scope.userName);
    };
    */
    /*
    //Create a Text Area
    var textArea = GUI.dom.newTextArea($scope, $compile, [], [
        { attribute: 'ng-model', value: 'userDescription' },
        { attribute: 'type', value: 'text' },
        { attribute: 'required', value: 'required' }
    ]);
    container.appendChild(textArea);
    */
    /*
    //Create a Checkbox
    var checkBox = GUI.dom.newCheckbox($scope, $compile, 'http://google.com',
        'Label', 'Ir a google', [],
        [ { attribute: 'ng-model', value: 'userTermsAceptance' } ]);
    container.appendChild(checkBox);
    */
    /*
    var fieldSet = GUI.dom.newRadiosFieldset($scope, $compile, 'fieldSet', [
        { label: 'Radio Uno', value: 'R1' },
        { label: 'Radio Dos', value: 'R2' },
        { label: 'Radio Tres', value: 'R3' }
    ], [], [{ attribute: 'ng-model', value: 'fieldSet' }]);
    container.appendChild(fieldSet);
    */
    
    //Create a Radio Button
    /*
    var radio = GUI.dom.newInputRadio($scope, $compile, 'NAME', 'LABEL', 'Valor1', [],
        [{
            attribute: 'ng-model',
            value: '{"name":"radio", "objectParams":{"name":""}, "simple":"radio.name"}'
        }]);
    container.appendChild(radio);
    */
    /*
    //Create a button
    var btn = GUI.dom.newButton($scope, $compile, [], [{ attribute: 'ng-click', value: 'clickButton()' }], 'Clickme');
    container.appendChild(btn);
    $scope.clickButton = function () {
        console.log('click');
    };
    */
    /*
    //Create an Image
    var img = GUI.dom.newImage($scope, $compile, [], [{ attribute: 'ng-src', value: 'data:image/png;base64,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' }]);
    container.appendChild(img);
    */
    /*
    //Create a combo box
    $scope.providers = [
        { name: 'uno', value: 'UNO', index: '1' },
        { name: 'dos', value: 'DOS', index: '2' },
        { name: 'tres', value: 'TRES', index: '3' }
    ];
    var combo = GUI.dom.newCombo($scope, $compile, 'providers', 'name', [],
        [{ attribute: 'ng-model', value: 'comboModel' }], 'Select one option');
    container.appendChild(combo);
    */
});