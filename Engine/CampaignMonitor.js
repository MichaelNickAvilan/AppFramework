/** 
  * @desc This file defines all the rules to track the users behavior  during 
  * @author Michael Avilán michael.avilan@gmail.com
*/
var CampaignMonitor = {

    a_campaign_var: 'cmpid',
    a_ck_name:'usamilumnock',

    init: function () {
        //Constructor
        CampaignMonitor.checkCookie();
    },
    addListeners: function () {
        EventBus.addEventListener(AdPlatformsController.LIBRARIES_LOADED_EVENT, CampaignMonitor.checkCookie);
    },
    setCampaignVariable: function () {
        CampaignMonitor.a_campaign_var = $name;
    },
    createCookie: function ($cname, $cvalue, $exdays) {
        var d = new Date();
        $cvalue = JSON.stringify($cvalue);
        d.setTime(d.getTime() + ($exdays * 24 * 60 * 60 * 1000));
        var expires = 'expires=' + d.toUTCString();
        document.cookie = $cname + '=' + $cvalue + '; ' + expires;
    },
    getCookie: function ($cname) {
        var name = $cname + '=';
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return '';
    },
    checkCookie: function () {
        var ck = CampaignMonitor.getCookie(CampaignMonitor.a_ck_name);
        if (ck != '') {
            var ck = JSON.parse(ck);

            if (ck.campaigns != undefined) {
                ck.campaigns.push(CampaignMonitor.getCampaignObject());
            } else {
                ck = { campaigns: [] };
                ck.campaigns.push(CampaignMonitor.getCampaignObject());
            }
            CampaignMonitor.createCookie(CampaignMonitor.a_ck_name,
				CampaignMonitor.getCookieObject(ck.campaigns), 30);
        } else {
            CampaignMonitor.createCookie(CampaignMonitor.a_ck_name,
				CampaignMonitor.getCookieObject([
					CampaignMonitor.getCampaignObject()
				]),
				30);
        }
    },
    getCampaignObject: function () {
        var cmp = {};
        if (DomUtils.getURLParam(CampaignMonitor.a_campaign_var) != null) {
            cmp = {
                cmpid: DomUtils.getURLParam(CampaignMonitor.a_campaign_var),
                date: CampaignMonitor.getFormatedDate(),
                url: document.location.href
            };
        } else {
            cmp = {
                cmpid: 'Organic',
                date: CampaignMonitor.getFormatedDate(),
                url: document.location.href
            };
        }
        return cmp;
    },
    getCookieObject: function ($campaigns) {
        var obj = { campaigns: $campaigns };
        return obj;
    },
    getFormatedDate: function () {
        var d = new Date();
        return d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
    },
    getCRMValues: function () {
        var medio = CampaignMonitor.setCampaignAndDetail().medio;
        var detallemedio = CampaignMonitor.setCampaignAndDetail().detalle_medio;

        if (medio.length == 0) {
            medio = detallemedio = 'Organic';
        }

        return {
            MEDIO: medio,
            DETALLEMEDIO: detallemedio,
            DESCRIPCION: CampaignMonitor.setCampaignAndDetail().descripcion
        };
    },
    reportConversion: function ($nombre, $apellido, $correo, $cliente, $producto, $detalle_producto, $pais, $medio, $detalleMedio) {
        console.log('Report Conversion Complete');
    },
    setCampaignAndDetail: function () {

        var campaigns = JSON.parse(CampaignMonitor.getCookie(CampaignMonitor.a_ck_name)).campaigns;
        var $param = campaigns[campaigns.length - 1].cmpid;
        var campana = '';
        var medio = '';
        var tipoanuncio = '';
        var modalidad = '';
        var tracking_code = $param.split('');
        var _counter = 0;

        if ($param != 'Organic') {
            for (var i = 0; i < tracking_code.length; i++) {
                if (tracking_code[i] == '_') {
                    _counter++;
                } else {
                    if (_counter < 1) {
                        campana += tracking_code[i];
                    }
                    if (_counter >= 1 && _counter < 2) {
                        medio += tracking_code[i];
                    }
                    if (_counter >= 2 && _counter < 3) {
                        modalidad += tracking_code[i];
                    }
                    if (_counter >= 3 && _counter < 4) {
                        tipoanuncio += tracking_code[i];
                    }
                }
            }

            var response = {
                tracking_code: tracking_code.join(''),
                medio: medio,
                detalle_medio: modalidad,
                descripcion: CampaignMonitor.getHistoryString(JSON.parse(CampaignMonitor.getCookie(CampaignMonitor.a_ck_name)).campaigns)
            };
        } else {
            var response = {
                tracking_code: 'Organic',
                medio: 'Organic',
                detalle_medio: 'Organic',
                descripcion: CampaignMonitor.getHistoryString(JSON.parse(CampaignMonitor.getCookie(CampaignMonitor.a_ck_name)).campaigns)
            };
        }

        return response;

    },
    getHistoryString: function ($cs) {
        var hs = [];
        var cmpid = '';
        var _counter = 0;
        var medio = '';
        var modalidad = '';
        for (var i = 0; i < $cs.length; i++) {
            for (var j = 0; j < String($cs[i].cmpid).length; j++) {

                if (String($cs[i].cmpid)[j] == '_') {
                    _counter++;
                } else {
                    if (_counter >= 1 && _counter < 2) {
                        medio += String($cs[i].cmpid)[j];
                    }
                    if (_counter >= 2 && _counter < 3) {
                        modalidad += String($cs[i].cmpid)[j];
                    }
                }
            }

            if (medio.length > 1 && modalidad.length > 1) {
                hs.push(medio + '_' + modalidad + ',' + $cs[i].date);
            } else {
                hs.push('Organic,' + $cs[i].date);
            }

            _counter = 0;
            medio = '';
            modalidad = '';
        }

        return String(hs);
    },
    deleteCookie: function () {
        CampaignMonitor.createCookie(CampaignMonitor.a_ck_name, '', -1);
    }
};
CampaignMonitor.init();