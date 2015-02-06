var Dataxu={
	init:function(){
		
	},
	createBeacon:function($id){
		DomUtils.createBeacon('https://secure.adnxs.com/px?id='+$id+'&t=2', 1, 1);
	},
	createEcommerceBeacon:function($id){
		DomUtils.createBeacon('http://tags.w55c.net/rs?id='+$id+'&t=checkout&tx=$TRANSACTION_ID&sku=$SKUS&price=$price', 1, 1);
	},
	getDataxuBeacon:function($id,$landing, $condition, $origin){
		return {
            a_type: "DataxuBeacon",
            byOrigin: true,
            origin: $origin,
            dispatchAt: $condition,
            landing: $landing,
            config: {
                id: $id
            }
        };
	},
	getDataxuEcommerceBeacon:function($id,$landing, $condition, $origin){
		return {
            a_type: "DataxuEcommerceBeacon",
            byOrigin: true,
            origin: $origin,
            dispatchAt: $condition,
            landing: $landing,
            config: {
                id: $id
            }
        };
	}
};