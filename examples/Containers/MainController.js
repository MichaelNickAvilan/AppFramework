app = angular.module('apf')
.controller('MainController', function ($scope, $compile, GUI) {
    GUI.containers.newAccordion($scope, $compile, 'main-container', 'TWTBOOTSTRAP',
        [
            { title: 'uno' },
            { title: 'dos' },
            { title: 'tres' }
        ]);
});