app = angular.module('apf')
.controller('MainController', function ($scope, $compile, GUI) {
    var container = GUI.dom.newDiv('main-container');
    document.body.appendChild(container);

    var textField = GUI.dom.newTextField($scope, $compile, [], [
        { attribute: 'ng-model', value: 'userName' },
        { attribute: 'ng-change', value: 'userNameChange()' },
        { attribute: 'type', value: 'text' },
        { attribute: 'required', value: 'required' }
    ]);
    container.appendChild(textField);

    var textArea = GUI.dom.newTextArea($scope, $compile, [], [
        { attribute: 'ng-model', value: 'userDescription' },
        { attribute: 'type', value: 'text' },
        { attribute: 'required', value: 'required' }
    ]);
    container.appendChild(textArea);

    var checkBox = GUI.dom.newCheckbox($scope, $compile, 'http://google.com',
        'Label', 'Ir a google', [],
        [ { attribute: 'ng-model', value: 'userTermsAceptance' } ]);
    container.appendChild(checkBox);

    var fieldSet = GUI.dom.newRadiosFieldset($scope, $compile, 'fieldSet', [
        { label: 'Radio Uno', value: 'R1' },
        { label: 'Radio Dos', value: 'R2' },
        { label: 'Radio Tres', value: 'R3' }
    ], [], [{ attribute: 'ng-model', value: 'fieldSet' }]);
    container.appendChild(fieldSet);

    var radio = GUI.dom.newInputRadio($scope, $compile, 'NAME', 'LABEL', 'Valor1', [],
        [{
            attribute: 'ng-model',
            value: '{"name":"radio", "objectParams":{"name":""}, "simple":"radio.name"}'
        }]);
    container.appendChild(radio);

    $scope.userNameChange = function () {
        //console.log($scope.userName);
    }
});