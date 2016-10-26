(function () {
    var apf_app = angular.module('ApfBusiness', []);
    apf_app.factory('TRANSACTION', function ($http) {
        var AjaxDelegate = {
            request: function (type, url, params, headers, callback) {
                $http({
                    url: url,
                    method: type,
                    data: AjaxDelegate.getEncodedString(params),
                    headers: headers
                }).success(function (_data) {
                    callback(_data);
                }).error(function () {
                    console.log('AJAX DELEGATE ERROR');
                });
            },
            getEncodedString: function (params) {
                var str = '';
                for (var name in params) {
                    str += name + '=' + encodeURIComponent(params[name]) + '&'
                }
                var pos = str.length;
                str = str.substring(0, pos - 1) + str.substring(pos, str.length);
                return str;
            },
        };
        var CSVReader = {
            loadCSV: function (path, char, callback) {
                AjaxDelegate.request('GET', path, [], [], function (data) {
                    callback(CSVReader.CSVToArray(data, char));
                });
            },
            CSVToArray: function (strData, strDelimiter) {
                strDelimiter = (strDelimiter || ",");
                var objPattern = new RegExp(
                    (
                        "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
                        "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
                        "([^\"\\" + strDelimiter + "\\r\\n]*))"
                    ),
                    "gi"
                    );
                var arrData = [[]];
                var arrMatches = null;
                while (arrMatches = objPattern.exec(strData)) {
                    var strMatchedDelimiter = arrMatches[1];
                    if (
                        strMatchedDelimiter.length &&
                        (strMatchedDelimiter != strDelimiter)
                        ) {
                        arrData.push([]);
                    }
                    if (arrMatches[2]) {
                        var strMatchedValue = arrMatches[2].replace(
                            new RegExp("\"\"", "g"),
                            "\""
                            );

                    } else {
                        var strMatchedValue = arrMatches[3];

                    }
                    arrData[arrData.length - 1].push(strMatchedValue);
                }

                return (arrData);
            }
        };
        var Oauth = {
            makeRequest: function (prefix, id, data, callback) {
                console.log(data);
                data.params = AjaxDelegate.getEncodedString(data.params)
                AjaxDelegate.request('POST', prefix + 'backend/php/poxies/oauth.php', {
                    info: window.btoa(JSON.stringify(
                        {
                            id: id,
                            data: data
                        }))
                }, {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Accept': 'application/json, text/javascript, */*; q=0.01'
                }, function (data) {
                   callback(JSON.parse(window.atob(data)));
                });
            }
        };
        return {
            ajax: AjaxDelegate,
            csv: CSVReader,
            oauth:Oauth
        };
    });
})();