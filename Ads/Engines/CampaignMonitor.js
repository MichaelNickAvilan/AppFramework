/* global DomUtils, response */

/**
    * CampaignMonitor, sinlgeton with methods to create and rewrite cookies to follow digital campaigns into a Website.
    * @author Michael Nick Avilan Mora - michael.avilan@gmail.com
    */
var CampaignMonitor = {

    a_campaign_var: 'cmpid',
    a_ck_name:'',
    a_centinela:false,

    /** Constructor method */
    init: function () {
        try{
            CampaignMonitor.a_ck_name = 
            String(window.location.pathname).split('/').join('').split('.com').
            join('').split('http:').join('').split('.').join('').toUpperCase();
            CampaignMonitor.checkCookie();
        }catch(e){}
        finally{}
    },
    /**
     * Assigns the URL variable name wich will contain the digital campaign data
     * @param {string} $name - URL variable name
     */
    setCampaignVariable: function ($name) {
        CampaignMonitor.a_campaign_var = $name;
    },
    /**
     * Creates a Cookie
     * @param {string} $cname - Cookie Name
     * @param {string} $cvalue - Cookie Value
     * @param {int} $exdays - Days of lifetime
     */
    createCookie: function ($cname, $cvalue, $exdays) {
        var d = new Date();
        $cvalue = JSON.stringify($cvalue);
        d.setTime(d.getTime() + ($exdays * 24 * 60 * 60 * 1000));
        var expires = 'expires=' + d.toUTCString();
        document.cookie = $cname + '=' + $cvalue + '; ' + expires;
    },
    /**
    * Gets the Cookie value if exist
    * @param {string} $cname - Cookie Name
    * @return {object} The cookie object
    */
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
    /** Checks if the campaign cookie exist, if not delegates its creation */
    checkCookie: function () {
    	if(CampaignMonitor.a_centinela==false){
    	    CampaignMonitor.a_centinela = true;
	    var ck = CampaignMonitor.getCookie(CampaignMonitor.a_ck_name);
	    if (ck != '') {
    	    var ck = JSON.parse(ck);
            if (ck.campaigns != undefined) {
                CampaignMonitor.addCampaigntoCK(ck, CampaignMonitor.getCampaignObject());
            } else {
                ck = { campaigns: [] };
	            CampaignMonitor.addCampaigntoCK(ck,CampaignMonitor.getCampaignObject());
            }
            CampaignMonitor.createCookie(CampaignMonitor.a_ck_name,
		CampaignMonitor.getCookieObject(ck.campaigns), 30);
	    } else {
	        CampaignMonitor.createCookie(CampaignMonitor.a_ck_name,
                    CampaignMonitor.getCookieObject([
                    CampaignMonitor.getCampaignObject()]),30);
	    }
        }    
    },
    /** Adds a campaign to the cookie object  
    * @param {string} $ck
    * @param {string} $campaign
    */
    addCampaigntoCK:function($ck, $campaign){
        if ($ck.campaigns.length == 4) {
            $ck.campaigns[0]=$ck.campaigns[1];
            $ck.campaigns[1]=$ck.campaigns[2];
            $ck.campaigns[2] = $ck.campaigns[3];
            $ck.campaigns[3] = $campaign;
    	}else{
            $ck.campaigns.push($campaign);
    	}
    },
    /** Gets the Campaign object if exist  */
    getCampaignObject: function () {
        var cmp = {};
        var cVar = '';
        if(CampaignMonitor.inIframe()==true){
            cVar = CampaignMonitor.getURLIframeParam(CampaignMonitor.a_campaign_var);
        } else {
            cVar=CampaignMonitor.getURLParam(CampaignMonitor.a_campaign_var);
        }
        if (cVar != null && String(cVar).length>0) {
            cmp = {
                cmpid: cVar,
                date: CampaignMonitor.getFormatedDate()
            };
        } else {
            cmp['cmpid'] = 'Organic';

            if (CampaignMonitor.inIframe() === true) {
                if (DomUtils.getURLIframeParam('gclid').length > 0) {
                    cmp['cmpid'] = 'autogen_Google_Texto_autogen';
                }
            } else {
                if (DomUtils.getURLParam('gclid').length > 0) {
                    cmp['cmpid'] = 'autogen_Google_Texto_autogen';
                }
            }
            cmp['date'] = CampaignMonitor.getFormatedDate();
        }
        return cmp;
    },
    /** Returns true if the site is currently loaded into an iFrame  */
    inIframe:function () {
        try {
            return window.self !== window.top;
	} catch (e) {
            return true;
	}
    },
    /**
    * Returns the standard campaign cookie object
    * @param {string} $campaigns - Array of campaigns
    * @return {object} The cookie object
    */
    getCookieObject: function ($campaigns) {
        var obj = { campaigns: $campaigns };
        return obj;
    },
    /** Returns a well formated date */
    getFormatedDate: function () {
        var d = new Date();
        var month = d.getMonth();
	    month = month + 1;
        return d.getFullYear() + '-' + month + '-' + d.getDate();
    },
    /**
    * Returns the CRM object with the MEDIO and DETALLEMEDIO
    * @return {object} CRM object
    */
    getCRMValues: function () {
    	var medio = CampaignMonitor.setCampaignAndDetail().medio;
       	var detallemedio = CampaignMonitor.setCampaignAndDetail().detalle_medio;
        var cmpid = CampaignMonitor.setCampaignAndDetail().tracking_code;
	if(cmpid==''){
            cmpid = 'Organic';
	}
	if (medio.length == 0) {
            medio = detallemedio = 'Organic';
        }	
        
        if(CampaignMonitor.inIframe()===true){
            if(DomUtils.getURLIframeParam('gclid').length>0){
                cmpid='autogen_Google_Texto_autogen';
                medio = 'Google';
                detallemedio = 'Texto';
            }
        }else{
            if(DomUtils.getURLParam('gclid').length>0){
                cmpid='autogen_Google_Texto_autogen';
                medio = 'Google';
                detallemedio = 'Texto';
            }
        }
        
	var description = CampaignMonitor.setCampaignAndDetail().descripcion;
	description = description.split(',');
	description = description.reverse();
	var description_local='';
	for(var i=0; i < description.length;i++){
            if(i<=5){
                if(i%2 == 0){
                    if(i==0){
                        description_local+=description[i]+',';
                    }else{
			description_local+=','+description[i]+',';
                    }
		}else{
                    description_local+=description[i];
		}
            }
	}
        return {
            CMPID: cmpid,
            MEDIO: medio,
            DETALLEMEDIO: detallemedio,
            DESCRIPCION: description_local//.setCampaignAndDetail().descripcion
        };
    },
    /**
    * Function to reports a conversion to Analytics platfoms (uncomplete)
    * @param {string} $name - name of the lead
    * @param {string} $lastName - lastname of the lead
    * @param {string} $mail - mail of the lead
    * @param {string} $client - name of the client
    * @param {string} $product - name of the product
    * @param {string} $product_detail - Id of the product
    * @param {string} $country - country code
    * @param {string} $media - Ad platform name
    * @param {string} $mediaDetail - Ad format
    */
    reportConversion: function ($name, $lastName, $mail, $client, $product, $product_detail, $country, $media, $mediaDetail) {
        
    },
    /** Function that fills the campaign and detail parameters of the cookie object 
    * @return {object} A cookie object
    */
    setCampaignAndDetail: function () {
        var campaigns = JSON.parse(CampaignMonitor.getCookie(CampaignMonitor.a_ck_name)).campaigns;
        var $param = '';
        console.log(19);
        if (campaigns.length > 1) {
            console.log(20);
            for (var s = 0; s < campaigns.length; s++) {
                console.log(21);
                if (campaigns[s].cmpid.length > 0 && campaigns[s].cmpid!='Organic') {
                    console.log(22);
                    $param = campaigns[s].cmpid;
                    s = campaigns.length;
                    console.log('S: ' + s + ' PARAM: ' + $param);
        	    }
            }
        } else {
            console.log(23);
            $param = campaigns[campaigns.length - 1].cmpid;
        }
        
        var campana = '';
        var medio = '';
        var tipoanuncio = '';
        var modalidad = '';
        var tracking_code = $param.split('');
        var _counter = 0;
        
        console.log('DEFT: '+$param);
        if ($param != 'Organic' && String($param).length>0) {
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
            return response;
        } else {
            var response={};
            if(CampaignMonitor.inIframe()===true){
                if(DomUtils.getURLIframeParam('gclid').length>0){
                    response['tracking_code']='autogen_Google_Texto_autogen';
                    response['medio']='Google';
                    response['detalle_medio']='Texto';
                    response['descripcion'] = CampaignMonitor.getHistoryString(JSON.parse(CampaignMonitor.getCookie(CampaignMonitor.a_ck_name)).campaigns);
                    return response;
                }else{
                    response['tracking_code']='Organic';
                    response['medio']='Organic';
                    response['detalle_medio']='Organic';
                    response['descripcion'] = CampaignMonitor.getHistoryString(JSON.parse(CampaignMonitor.getCookie(CampaignMonitor.a_ck_name)).campaigns);
                }
            }else{
                if(DomUtils.getURLParam('gclid').length>0){
                    response['tracking_code']='autogen_Google_Texto_autogen';
                    response['medio']='Google';
                    response['detalle_medio']='Texto';
                    response['descripcion'] = CampaignMonitor.getHistoryString(JSON.parse(CampaignMonitor.getCookie(CampaignMonitor.a_ck_name)).campaigns);
                    return response;
                }else{
                    response['tracking_code']='Organic';
                    response['medio']='Organic';
                    response['detalle_medio']='Organic';
                    response['descripcion'] = CampaignMonitor.getHistoryString(JSON.parse(CampaignMonitor.getCookie(CampaignMonitor.a_ck_name)).campaigns);
                    return response;
                }
            }
        }
        return response;
    },
    /** Function that return the campaigns hitory String 
    * @return {string} History string
    */
    getHistoryString: function ($cs) {
        var hs = [];
	var cmpid = '';
	var _counter = 0;
	var medio = '';
	var modalidad = '';
	var centinela=0;
	
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
        
        if(CampaignMonitor.inIframe()===true){
            if(DomUtils.getURLIframeParam('gclid').length>0){
                hs[0]=('autogen_Google_Texto_autogen,' + $cs[0].date);
            }else{
                hs[0]=('Organic,' + $cs[0].date);
            }
        }else{
            if(DomUtils.getURLParam('gclid').length>0){
                hs[0]=('autogen_Google_Texto_autogen,' + $cs[0].date);
            }else{
                hs[0]=('Organic,' + $cs[0].date);
            }
        }
                
	return String(hs);
    },
    /** Deletes the campaign cookie if exist */
    deleteCookie: function () {
        CampaignMonitor.createCookie(CampaignMonitor.a_ck_name, '', -1);
    },
    getURLIframeParam: function (name) {
        var url = (window.location != window.parent.location) ? document.referrer: document.location;
	var value = decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ""])[1].replace(/\+/g, '%20')) || null;
	    
	if (value == null) {
            return '';
	} else {
            return value;
	}
    },
    getURLParam: function (name) {
        var value = decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
        if (value == null) {
            return '';
        } else {
            return value;
        }
    }
};