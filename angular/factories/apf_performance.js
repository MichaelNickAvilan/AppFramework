(function () {
    var apf_app = angular.module('ApfPerformance', []);
    apf_app.factory('SEM', function () {

        var PerformanceUtils = {
            newBeacon: function ($url, $w, $h) {
                var noscript = document.createElement('noscript');
                var image = new Image($w, $h);
                image.src = $url;
                try {
                    $(this).parent().append(noscript);
                    noscript.appendChild(image);
                } catch (e) {
                    var s = document.getElementsByTagName('script')[0];
                    s.parentNode.insertBefore(noscript, s);
                    noscript.appendChild(image);
                } finally {
                }
            },
            newIFrame: function (src, width, height, frameborder, display) {
                var ifrm = document.createElement("IFRAME");
                ifrm.setAttribute("src", src);
                ifrm.setAttribute("width", width);
                ifrm.setAttribute("height", height);
                ifrm.setAttribute("frameborder", frameborder);
                ifrm.style.display = display;
                document.body.appendChild(ifrm);
            },
            createCookie: function (cname, cvalue, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = 'expires=' + d.toUTCString();
                document.cookie = cname + '=' + cvalue + '; ' + expires;
            },
            loadScript: function (url, callback) {
                var item = { url: url, state: 'before' };
                var script = document.createElement("script");
                script.type = "text/javascript";
                if (script.readyState) {
                    script.onreadystatechange = function () {
                        if (script.readyState == "loaded" ||
                            script.readyState == "complete") {
                            script.onreadystatechange = null;
                            item.state = 'included';
                            callback();
                        }
                    };
                } else {
                    script.onload = function () {
                        item.state = 'included';
                        callback();
                    };
                }
                script.src = url;
                document.getElementsByTagName("head")[0].appendChild(script);
            }
        };

        var GoogleInterface = {
            GAInstall: function (webPropertyID) {
                (function (i, s, o, g, r, a, m) {
                    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
                        (i[r].q = i[r].q || []).push(arguments)
                    }, i[r].l = 1 * new Date(); a = s.createElement(o),
                     m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
                })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
                ga('create', webPropertyID, 'auto');
                ga('send', 'pageview');
            },
            GABasicEvent: function (eventCategory, eventAction, eventLabel, eventValue) {
                ga('send', {
                    'hitType': 'event',
                    'eventCategory': eventCategory,
                    'eventAction': eventAction,
                    'eventLabel': eventLabel,
                    'eventValue': eventValue
                });
            },
            GTMEvent: function (events) {
                var superEvent = {};
                for (var i = 0; i < events.length; i++) {
                    superEvent[events[i].name] = events[i].value;
                }
                dataLayer.push(superEvent);
            },
            GDCTag: function (type, data) {
                switch (type) {
                    case 'classic':
                        PerformanceUtils.newBeacon('http://ad.doubleclick.net/activity;src=' +
                            data.src + ';type=invmedia;cat=' + data.cat + ';ord=1?', 1, 1);
                        break;
                    case 'floodlight':
                        var axel = Math.random() + '';
                        var a = axel * 10000000000000;
                        PerformanceUtils.newIFrame(
                            'https://' + data.id + '.fls.doubleclick.net/activityi;src=' +
                            data.id + ';type=' + data.type + ';cat=' + data.cat + ';ord=' + a + '?',
                            1, 1, 1, 'none');
                        break;
                    default:
                        break;
                }
            },
            GAdwordsTag: function (id, label_id, value) {
                PerformanceUtils.newBeacon('https://www.googleadservices.com/pagead/conversion/' + id + '/?label=' + label_id + '&guid=ON&script=0&value=' + value);
            }
        };

        var AdobeMKTCloud = {
            a_prefix: '',
            a_report_suite: '',
            a_centinela: false,
            a_libs_loaded: false,
            a_config: {},

            init: function (reportsuite, charset, cookieDomainPeriods, currencyCode, linkDownloadFileTypes, urlParam, linkInternalFilters, linkTrackVars, linkTrackEvents, visitorNamespace, trackingServer) {
                AdobeMKTCloud.a_config['reportsuite'] = reportsuite;
                AdobeMKTCloud.a_config['charset'] = charset;
                AdobeMKTCloud.a_config['cookieDomainPeriods'] = cookieDomainPeriods;
                AdobeMKTCloud.a_config['currencyCode'] = currencyCode;
                AdobeMKTCloud.a_config['linkDownloadFileTypes'] = linkDownloadFileTypes;
                AdobeMKTCloud.a_config['urlParam'] = urlParam;
                AdobeMKTCloud.a_config['linkInternalFilters'] = linkInternalFilters;
                AdobeMKTCloud.a_config['linkTrackVars'] = linkTrackVars;
                AdobeMKTCloud.a_config['linkTrackEvents'] = linkTrackEvents;
                AdobeMKTCloud.a_config['visitorNamespace'] = visitorNamespace;
                AdobeMKTCloud.a_config['trackingServer'] = trackingServer;
                
                var s_account = AdobeMKTCloud.a_config['reportsuite'];
                var s = s_gi(s_account);
                AdobeMKTCloud.a_report_suite = AdobeMKTCloud.a_config['reportsuite'];
                s.charSet = AdobeMKTCloud.a_config['charset'];
                s.cookieDomainPeriods = AdobeMKTCloud.a_config['cookieDomainPeriods'];
                s.currencyCode = AdobeMKTCloud.a_config['currencyCode'];
                s.trackDownloadLinks = true;
                s.trackExternalLinks = true;
                s.trackInlineStats = true;
                s.linkDownloadFileTypes = AdobeMKTCloud.a_config['linkDownloadFileTypes'];
                s.linkInternalFilters = AdobeMKTCloud.a_config['linkInternalFilters'];
                s.linkLeaveQueryString = false;
                s.linkTrackVars = AdobeMKTCloud.a_config['linkTrackVars'];
                s.linkTrackEvents = AdobeMKTCloud.a_config['linkTrackEvents'];
                s.campaign = AdobeMKTCloud.a_config['urlParam'];
                s.pageName = document.title;
                s.eVar25 = navigator.language;
                s.channel = AdobeMKTCloud.getChannel(document.location.href, []);
                s.visitorNamespace = AdobeMKTCloud.a_config['visitorNamespace'];
                s.trackingServer = AdobeMKTCloud.a_config['trackingServer'];
                s_code = s.t();
            },
            getChannel: function ($url, $replaceConditions) {
                var url = $url;
                for (var i = 0; i < $replaceConditions.length; i++) {
                    url = url.replace($replaceConditions[i], '');
                }
                url = url.split('');
                for (var i = 0; i < url.length; i++) {
                    if (url[i] === '/') {
                        url[i] = '|';
                    }
                }
                return url.join('');
            }
        };

        var Sizmek = {
            counterTag: function (ActivityID) {
                var elem = document.createElement("SCRIPT");
                elem.src = "http://bs.serving-sys.com/BurstingPipe/ActivityServer.bs?cn=as&ActivityID=" + ActivityID +
                    "&rnd=" + (Math.round(Math.random() * 1000000));
                document.body.appendChild(elem);
            },
            rmTag: function (TID, TVAL) {
                var image = new Image(1, 1);
                var elem = document.createElement("SCRIPT");
                var rand = (Math.round(Math.random() * 1000000));
                elem.src = 'HTTP://bs.serving-sys.com/Serving?CN=ntt&TID=' +
                TID + '&TVAL=' + TVAL + '&rnd=' + rand;
                document.body.appendChild(elem);
                PerformanceUtils.newBeacon("HTTP://bs.serving-sys.com/Serving?CN=nttTID=" + TID + "&TVAL=" + TVAL + "ns=1", 1, 1);
            },
            salesTag: function (ActivityID, OrderID, ProductID, ProductInfo, Quantity) {
                var elem = document.createElement("SCRIPT");
                elem.src = 'HTTP://bs.serving-sys.com/Serving/ActivityServer.bs?cn=as&amp;ActivityID=' +
                ActivityID +
                '&rnd=' + (Math.round(Math.random() * 1000000)) +
                '&Value=1' +
                '&OrderID=' + OrderID +
                '&ProductID=' + ProductID +
                '&ProductInfo=' + ProductInfo +
                '&Quantity=' + Quantity;
                document.body.appendChild(elem);
            }
        };

        var SalesForce = {

            a_centinela: false,
            a_conversion_params: {},

            ETStartConvTracker: function () {
                if (
                String(APFPublic.getURLParam('j')).length > 0 &&
                String(APFPublic.getURLParam('e')).length > 0 &&
                String(APFPublic.getURLParam('l')).length > 0 &&
                String(APFPublic.getURLParam('u')).length > 0 &&
                String(APFPublic.getURLParam('jb')).length > 0 &&
                String(APFPublic.getURLParam('mid')).length > 0
            ) {
                    SalesForce.a_centinela = true;
                    SalesForce.a_conversion_params.j = APFPublic.getURLParam('j');
                    SalesForce.a_conversion_params.e = APFPublic.getURLParam('e');
                    SalesForce.a_conversion_params.l = APFPublic.getURLParam('l');
                    SalesForce.a_conversion_params.u = APFPublic.getURLParam('u');
                    SalesForce.a_conversion_params.jb = APFPublic.getURLParam('jb');
                    SalesForce.a_conversion_params.mid = APFPublic.getURLParam('mid');

                    PerformanceUtils.createCookie('exact_target_integration',
                    APFPublic.getURLParam('j') + ',' +
                    APFPublic.getURLParam('e') + ',' +
                    APFPublic.getURLParam('l') + ',' +
                    APFPublic.getURLParam('u') + ',' +
                    APFPublic.getURLParam('jb') + ',' +
                    APFPublic.getURLParam('mid'),
                    1
                    );
                }
            },
            ETReportConv: function () {
                var url = '';
                if (SalesForce.a_centinela == true) {
                    url = 'http://click.exacttarget.com/conversion.aspx?xml=' +
                    '<system>' +
                        '<system_name>tracking</system_name>' +
                        '<action>conversion</action>' +
                        '<member_id>' + SalesForce.a_conversion_params.mid + '</member_id>' +
                        '<job_id>' + SalesForce.a_conversion_params.j + '</job_id>' +
                        '<email>' + SalesForce.a_conversion_params.e + '</email>' +
                        '<list>' + SalesForce.a_conversion_params.l + '</list>' +
                        '<original_link_id>' + SalesForce.a_conversion_params.u + '</original_link_id>' +
                        '<BatchID>' + SalesForce.a_conversion_params.jb + '</BatchID>' +
                        '<conversion_link_id>1</conversion_link_id>' +
                        '<link_alias>' + document.title + '</link_alias>' +
                        '<display_order>2</display_order>' +
                        '<data_set></data_set>' +
                    '</system>';
                    PerformanceUtils.newBeacon(url, 1, 1);
                } else {
                    if (PerformanceUtils.getCookie('exact_target_integration').length > 0) {
                        var config = PerformanceUtils.getCookie('exact_target_integration').split(',');
                        url = 'http://click.exacttarget.com/conversion.aspx?xml=' +
                        '<system>' +
                            '<system_name>tracking</system_name>' +
                            '<action>conversion</action>' +
                            '<member_id>' + config[5] + '</member_id>' +
                            '<job_id>' + config[0] + '</job_id>' +
                            '<email>' + config[1] + '</email>' +
                            '<list>' + config[2] + '</list>' +
                            '<original_link_id>' + config[3] + '</original_link_id>' +
                            '<BatchID>' + config[4] + '</BatchID>' +
                            '<conversion_link_id>1</conversion_link_id>' +
                            '<link_alias>' + document.title + '</link_alias>' +
                            '<display_order>2</display_order>' +
                            '<data_set></data_set>' +
                        '</system>';
                        PerformanceUtils.newBeacon(url, 1, 1);
                    }
                }
            }
        };

        var Soicos = {
            a_soicos_pid: '',
            newTag: function (type, id) {
                switch (type) {
                    case 'script':
                        Soicos.a_soicos_pid = id;
                        PerformanceUtils.loadScript("http://ad.soicos.com/soicosjs.php?s=.js",
                        function () {
                            soicos.registerConversion({ pid: Soicos.a_soicos_pid, data: '' });
                        });
                        break;
                    case 'beacon':
                        PerformanceUtils.newBeacon('http://ad.soicos.com/conv.php?pid=' + id, 1, 1);
                        break;
                }
            }
        };

        var MediaMath = {
            newMathTag: function (mt_id, mt_adid) {
                PerformanceUtils.newBeacon('https://pixel.mathtag.com/event/js?mt_id=' + mt_id + '&mt_adid=' + mt_adid + '&v1=&v2=&v3=&s1=&s2=&s3=', 1, 1);
            }
        };

        var LeadAki = {
            webOptimizerTag: function (folder_id, script_id) {
                PerformanceUtils.loadScript('http://weboptimizer.leadaki.com/weboptimizer/' + folder_id + '/' + script_id + '.js',
                        function () { });
            }
        };

        var DataXu = {
            newW55Tag: function (id) {
                PerformanceUtils.newBeacon('http://tags.w55c.net/rs?id=' + id + '&t=checkout&tx=$TRANSACTION_ID&sku=$SKUS&price=$price', 1, 1);
            }
        };

        var Yahoo = {
            newConversionTag: function (id) {
                PerformanceUtils.newBeacon('http://ads.yahoo.com/pixel?id=' + id + '&t=2', 1, 1);
            }
        };

        return {
            google: GoogleInterface,
            adobe: AdobeMKTCloud,
            sizmek: Sizmek,
            salesforce: SalesForce,
            soicos: Soicos,
            mediamath: MediaMath,
            dataxu: DataXu,
            leadaki: LeadAki,
            yahoo: Yahoo
        };
    });
})();