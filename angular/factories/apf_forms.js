(function () {
    var apf_app = angular.module('ApfForms', ['ApfBusiness']);
    apf_app.factory('Forms', function (TRANSACTION) {
        var FormUtils = {
            restrictFieldContent: function (id, allow) {
                var element = document.getElementById(id);
                if (allow.limit) {
                    FormUtils.fieldRestrictDelegate(allow.option, element);
                    if (String(allow.limit).length > 0) {
                        element.setAttribute("maxlength", allow.limit);
                    }
                } else {
                    FormUtils.fieldRestrictDelegate(allow, element)
                }
            },
            fieldRestrictDelegate: function (option, element) {
                element.addEventListener("keypress", function (e) {
                    var AllowableCharacters = '';
                    switch (option) {
                        case 'LETTERS':
                            AllowableCharacters = ' ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
                            break;
                        case 'NUMBERS':
                            AllowableCharacters = '1234567890';
                            break;
                        case 'LETTERS+CHARS':
                            AllowableCharacters = ' ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-.';
                            break;
                        case 'LETTERS+CHARS+NUMBERS':
                            AllowableCharacters = '1234567890 ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-.,;:&';
                            break;
                    }
                    var k = e.which;

                    if (k != 13 && k != 8 && k != 0) {
                        if ((e.ctrlKey == false) && (e.altKey == false)) {
                            if (AllowableCharacters.indexOf(String.fromCharCode(k)) == -1) {
                                e.preventDefault();
                            }
                        }
                    }
                });
            },
            validateMail: function ($mail) {
                var response = { valid: false, message: '' };
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                response.valid = re.test($mail);
                if (response.valid == false) {
                    response.message = 'Debes digitar un email válido';
                }
                return response;
            }
        };
        return {
            utils: FormUtils
        };
    });
})();