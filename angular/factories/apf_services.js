(function () {
    var apf_app = angular.module('ApfServices', ['ApfBusiness']);
    apf_app.factory('SRV', function (TRANSACTION) {
        var GeoInfo = {
            a_countries: [],
            a_subdivisions: [],
            getCountries: function (callback) {
                if (GeoInfo.a_countries.length === 0) {
                    TRANSACTION.csv.loadCSV(pr+'backend/datasets/ungeocodes/ISOCountryCodes081507.csv', ';', function (data) {
                        for (var i = 0; i < data.length; i++) {
                            var item = { code: '', countryName: '' };
                            item.code = String(data[i][0]).toUpperCase();
                            item.countryName = data[i][1];
                            GeoInfo.getStatesPerCountry(item, function (data) {
                                item = data;
                            });
                            GeoInfo.a_countries.push(item);

                        }
                        callback(GeoInfo.a_countries);
                    });
                } else {
                    callback(GeoInfo.a_countries);
                }
            },
            getStatesPerCountry: function (country, callback) {
                if (GeoInfo.a_subdivisions.length === 0) {
                    TRANSACTION.csv.loadCSV('backend/datasets/ungeocodes/subdivisioncodes.csv', ',', function (data) {
                        GeoInfo.a_subdivisions = data;
                        callback(GeoInfo.filterStates(country));
                    });
                } else {
                    callback(GeoInfo.filterStates(country));
                }

            },
            filterStates: function (country) {
                var states = [];
                for (var i = 0; i < GeoInfo.a_subdivisions.length; i++) {
                    if (GeoInfo.a_subdivisions[i][0] === country) {
                        var item = {
                            code: GeoInfo.a_subdivisions[i][1],
                            stateName: GeoInfo.a_subdivisions[i][2],
                            stateType: GeoInfo.a_subdivisions[i][3],
                            cities: []
                        };
                        states.push(item);
                    }
                }
                return states;
            },
            getCitiesPerState: function (country, state, callback) {
                TRANSACTION.csv.loadCSV('backend/datasets/ungeocodes/codespercountry/' + country + '.csv', ';', function (data) {
                    var items = [];
                    for (var i = 0; i < data.length; i++) {
                        if (data[i][4] === state) {
                            var item = {
                                code: data[i][1],
                                countryName: data[i][3],
                                coordinates: data[i][9]
                            };
                            items.push(item);
                        }
                    }
                    callback(items);
                });
            }
        };
        var InstagramInfo = {
            getAccountImages: function (prefix, ac, callback) {
                TRANSACTION.ajax.request('post',
                    prefix + 'backend/php/poxies/images.php',
                    {
                        service: 2,
                        account:ac
                    },
                    { 'Content-Type': 'application/x-www-form-urlencoded' }, function (data) {
                        callback(data);
                    });
            }
        };
        var FlickrInfo = {
            getNodes: function (pr, $ids, $tags, $tagmode, $lang, callback) {
                TRANSACTION.ajax.request('post',
                    pr+'backend/php/poxies/images.php',
                    {
                        service:1,
                        ids: $ids,
                        tags: $tags,
                        lang: $lang
                    },
                    { 'Content-Type': 'application/x-www-form-urlencoded' }, function (data) {
                        callback(JSON.parse(String(xml2json(APFPublic.parseXML(data))).split('undefined').join('')));
                    });
            }
        };
        var Mailer = {
            sendGmail: function (pr, rep, rec, subj, msg, txt, callback) {
                var request={
                    replyTo: rep,
                    mails: rec,
                    subject: subj,
                    body: msg,
                    textMessage: txt,
                    type: 'GMAIL'
                }
                TRANSACTION.ajax.request('post',
                    pr + 'backend/php/poxies/mail.php',
                    { info: window.btoa(JSON.stringify(request)) },
                    { 'Content-Type': 'application/x-www-form-urlencoded' }, function (data) {
                        callback(window.atob(data));
                    });
            },
            sendSMTP: function (pr, rep, rec, subj, msg, txt, callback) {
                var request = {
                    replyTo: rep,
                    mails: rec,
                    subject: subj,
                    body: msg,
                    textMessage: txt,
                    type: 'SMTP'
                }
                TRANSACTION.ajax.request('post',
                    pr + 'backend/php/poxies/mail.php',
                    { info: window.btoa(JSON.stringify(request)) },
                    { 'Content-Type': 'application/x-www-form-urlencoded' }, function (data) {
                        callback(window.atob(data));
                    });
            }
        };
        return {
            geo: GeoInfo,
            instaram: InstagramInfo,
            flickr: FlickrInfo,
            mail:Mailer
        };
    });
})();