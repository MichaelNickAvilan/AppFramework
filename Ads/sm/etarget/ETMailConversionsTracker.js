var ETMailConversionsTracker={
	
	a_centinela:false,
	a_conversion_params:{},
	
	init:function(){
		ETMailConversionsTracker.addListeners();
		if(
			String(DomUtils.getURLParam('j')).length>0 &&
			String(DomUtils.getURLParam('e')).length>0 &&
			String(DomUtils.getURLParam('l')).length>0 &&
			String(DomUtils.getURLParam('u')).length>0 &&
			String(DomUtils.getURLParam('jb')).length>0 &&
			String(DomUtils.getURLParam('mid')).length>0
		){
			ETMailConversionsTracker.a_centinela=true;
			ETMailConversionsTracker.a_conversion_params.j=DomUtils.getURLParam('j');
			ETMailConversionsTracker.a_conversion_params.e=DomUtils.getURLParam('e');
			ETMailConversionsTracker.a_conversion_params.l=DomUtils.getURLParam('l');
			ETMailConversionsTracker.a_conversion_params.u=DomUtils.getURLParam('u');
			ETMailConversionsTracker.a_conversion_params.jb=DomUtils.getURLParam('jb');
			ETMailConversionsTracker.a_conversion_params.mid=DomUtils.getURLParam('mid');
			
			CampaignMonitor.createCookie('exact_target_integration',
			DomUtils.getURLParam('j')+','+
			DomUtils.getURLParam('e')+','+
			DomUtils.getURLParam('l')+','+
			DomUtils.getURLParam('u')+','+
			DomUtils.getURLParam('jb')+','+
			DomUtils.getURLParam('mid'),
			1
			);	
		}	
	},
	addListeners:function(){
		Controller.addListener(document,'CRM_DATA_SENDED',ETMailConversionsTracker.reportConversion);
	},
	reportConversion:function(){
		var url='';
		if(ETMailConversionsTracker.a_centinela==true){
			url='http://click.exacttarget.com/conversion.aspx?xml='+
			'<system>'+
				'<system_name>tracking</system_name>'+
				'<action>conversion</action>'+
				'<member_id>'+ETMailConversionsTracker.a_conversion_params.mid+'</member_id>'+
				'<job_id>'+ETMailConversionsTracker.a_conversion_params.j+'</job_id>'+
				'<email>'+ETMailConversionsTracker.a_conversion_params.e+'</email>'+
				'<list>'+ETMailConversionsTracker.a_conversion_params.l+'</list>'+
				'<original_link_id>'+ETMailConversionsTracker.a_conversion_params.u+'</original_link_id>'+
				'<BatchID>'+ETMailConversionsTracker.a_conversion_params.jb+'</BatchID>'+
				'<conversion_link_id>1</conversion_link_id>'+
				'<link_alias>'+document.title+'</link_alias>'+
				'<display_order>2</display_order>'+
				'<data_set></data_set>'+
			'</system>';
			DomUtils.createBeacon(url,1,1);
			Controller.eventDispatcherDelegate(document,'EXACT_TARGET_DISPATCHED_EVENT');
		}else{
			if(CampaignMonitor.getCookie('exact_target_integration').length>0){
				var config=CampaignMonitor.getCookie('exact_target_integration').split(',');
				url='http://click.exacttarget.com/conversion.aspx?xml='+
				'<system>'+
					'<system_name>tracking</system_name>'+
					'<action>conversion</action>'+
					'<member_id>'+config[5]+'</member_id>'+
					'<job_id>'+config[0]+'</job_id>'+
					'<email>'+config[1]+'</email>'+
					'<list>'+config[2]+'</list>'+
					'<original_link_id>'+config[3]+'</original_link_id>'+
					'<BatchID>'+config[4]+'</BatchID>'+
					'<conversion_link_id>1</conversion_link_id>'+
					'<link_alias>'+document.title+'</link_alias>'+
					'<display_order>2</display_order>'+
					'<data_set></data_set>'+
				'</system>';
				DomUtils.createBeacon(url,1,1);
				Controller.eventDispatcherDelegate(document,'EXACT_TARGET_DISPATCHED_EVENT');
			}
		}
	}
};
ETMailConversionsTracker.init();