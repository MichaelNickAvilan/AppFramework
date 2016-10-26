(function () {
    var apf_app = angular.module('ApfCampaignMonitor', []);
    apf_app.factory('CMP', function () {
        var CampaignMonitor = {
            a_campaign_var: '',
            a_ck_id: '',
            a_centinela: false,

            init: function (cmpVar, cookieID) {
                CampaignMonitor.a_campaign_var = cmpVar;
                CampaignMonitor.a_ck_id = cookieID;
                CampaignMonitor.checkCookie();
            },
            checkCookie: function () {
                if (CampaignMonitor.a_centinela === false) {
                    CampaignMonitor.a_centinela = true;
                    var ck = CampaignMonitor.getCookie(CampaignMonitor.a_ck_id);
                    if (ck != '') {
                        var ck = JSON.parse(ck);
                        if (ck.campaigns != undefined) {
                            CampaignMonitor.addCampaigntoCK(ck, CampaignMonitor.getCampaignObject());
                        } else {
                            ck = { campaigns: [] };
                            CampaignMonitor.addCampaigntoCK(ck, CampaignMonitor.getCampaignObject());
                        }
                        CampaignMonitor.createCampaignsCookie(CampaignMonitor.a_ck_id, CampaignMonitor.getCookieObject(ck.campaigns), 30);
                    } else {
                        CampaignMonitor.createCampaignsCookie(CampaignMonitor.a_ck_id,
                            CampaignMonitor.getCookieObject([
                            CampaignMonitor.getCampaignObject()]), 30);
                    }
                }
            },
            getCookie: function (cname) {
                var name = cname + '=';
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') c = c.substring(1);
                    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
                }
                return '';
            },
            getCookieObject: function (cmps) {
                var obj = { campaigns: cmps };
                return obj;
            },
            getCampaignObject: function () {
                var cmp = {};
                var cObj = {
                    utm_source: 'Organic',
                    utm_medium: 'Organic',
                    utm_campaign: 'autogen',
                    utm_term: 'autogen',
                    utm_content: 'autogen',
                };
                var cVar = '';

                if (
                    APFPublic.getGlobalURLParam('utm_source') != null ||
                    APFPublic.getGlobalURLParam('utm_medium') != null ||
                    APFPublic.getGlobalURLParam('utm_campaign') != null ||
                    APFPublic.getGlobalURLParam('utm_term') != null ||
                    APFPublic.getGlobalURLParam('utm_content') != null) {
                    cObj = {
                        utm_source: APFPublic.getGlobalURLParam('utm_source'),
                        utm_medium: APFPublic.getGlobalURLParam('utm_medium'),
                        utm_campaign: APFPublic.getGlobalURLParam('utm_campaign'),
                        utm_term: APFPublic.getGlobalURLParam('utm_term'),
                        utm_content: APFPublic.getGlobalURLParam('utm_content'),
                    };

                    cVar = JSON.stringify(cObj);
                } else {
                    if (APFPublic.getGlobalURLParam(CampaignMonitor.a_campaign_var) != null) {
                        var items = String(APFPublic.getGlobalURLParam(CampaignMonitor.a_campaign_var)).split('_');
                        cObj = {
                            utm_source: items[1],
                            utm_medium: items[2],
                            utm_campaign: items[0],
                            utm_term: items[3],
                            utm_content: items[0] + '_' + items[3],
                        };
                        cVar = JSON.stringify(cObj);
                    } else {
                        cVar = JSON.stringify(cObj);
                    }
                }

                if (cVar != null && String(cVar).length > 0) {
                    cmp = {
                        cmpid: cObj,
                        date: APFPublic.getFormatedDate()
                    };
                } else {
                    cObj = {
                        utm_source: 'Google',
                        utm_medium: 'cpc',
                        utm_campaign: 'autogen',
                        utm_term: 'autogen',
                        utm_content: 'autogen',
                    };
                    if (APFPublic.isAppInIFrame() === true) {
                        if (APFPublic.getIFrameURLParam('gclid') != null) {
                            cmp['cmpid'] = cObj;
                        }
                    } else {
                        if (APFPublic.getURLParam('gclid') != null) {
                            cmp['cmpid'] = cObj;
                        }
                    }
                    cmp['date'] = APFPublic.getFormatedDate();
                }
                return cmp;
            },
            createCampaignsCookie: function (cname, cvalue, exdays) {
                var d = new Date();
                cvalue = JSON.stringify(cvalue);
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = 'expires=' + d.toUTCString();
                document.cookie = cname + '=' + cvalue + '; ' + expires;
            },
            addCampaigntoCK: function (ck, campaign) {
                if (ck.campaigns.length == 4) {
                    ck.campaigns[0] = ck.campaigns[1];
                    ck.campaigns[1] = ck.campaigns[2];
                    ck.campaigns[2] = ck.campaigns[3];
                    ck.campaigns[3] = campaign;
                } else {
                    ck.campaigns.push(campaign);
                }
            },
            getCampaignsValues: function () {
                var contents = JSON.parse(CampaignMonitor.getCookie(CampaignMonitor.a_ck_id)).campaigns;
                var campaigns =
                    {
                        cmps: contents,
                        last: contents[contents.length - 1],
                        funnel: CampaignMonitor.getFunnel(contents)
                    };
                JSON.parse(CampaignMonitor.getCookie(CampaignMonitor.a_ck_id)).campaigns;
                return campaigns;
            },
            getFunnel: function (cmps) {
                var arr = [];
                for (var i = 0; i < cmps.length; i++) {
                    var cmpid = cmps[i].cmpid.utm_campaign +
                    '_' + cmps[i].cmpid.utm_source +
                    '_' + cmps[i].cmpid.utm_medium +
                    '_' + cmps[i].cmpid.utm_term;
                    arr.push(cmpid);
                    arr.push(cmps[i].date);
                }
                return arr.toString();
            }
        };
        return CampaignMonitor;
    });
})();