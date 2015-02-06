/** 
  * @desc This file contains the Tagging Engine logic
  * @author Michael Avilán michael.avilan@gmail.com
*/
var TaggingEngine = {
	
	a_dispatched_tags:[],
	
    init: function () {
        //Constructor
    },
    dispatchTagsDelegate: function ($origin, $condition, $landing) {
        console.log(1);
        for (var i = 0; i < TagsModel.a_tags.length; i++) {
            console.log(2+":"+$landing+":"+TagsModel.a_tags[i].landing);
            if (TagsModel.a_tags[i].landing == $landing) {
                console.log(3);
                if (TagsModel.a_tags[i].dispatchAt == $condition) {
                    console.log(4+":"+TagsModel.a_tags[i].byOrigin);
                    if (TagsModel.a_tags[i].byOrigin == true) {
                        console.log(5);
                        if (TagsModel.a_tags[i].origin == $origin) {
                            console.log(6);
                            TaggingEngine.dispatchTags(TagsModel.a_tags[i]);
                        }
                    }
                }
            }
        }
    },
    dispatchTags: function ($tag) {
        var type = $tag.a_type;
        TaggingEngine.a_dispatched_tags.push($tag);
        console.log(type);
        switch (type) {
            case "GoogleAdWords":
                GoogleAds.googleAdWordsIframeConversionTracker($tag.config.id, $tag.config.language, $tag.config.format, $tag.config.color, $tag.config.label);
                break;
            case "DoubleClick":
                GoogleAds.doubleClickTagDispatcher($tag.config.src, $tag.config.cat);
                break;
            case "DoubleClickDSP":
                GoogleAds.doubleClickDSPTagDispatcher($tag.config.id, $tag.config.cat, $tag.config.type);
                break;
            case "FacebookClassicTag":
                FacebookAds.facebookClassicTagDispatcher($tag.config.id, $tag.config.paramValue, $tag.config.currency);
                break;
            case "FacebookAudienceTag":
                FacebookAds.facebookAudienceTagDispatcher($tag.config.id);
                break;
            case "MediaMind":
                SizmekAds.mediaMindCounterTagDispatcher($tag.config.id);
                break;
            case "MediaMindRemarketing":
                SizmekAds.mediaMindRetargetingTagDispatcher($tag.config.tid, $tag.config.tval);
                break;
            case "MediaMindSales":
                SizmekAds.mediaMindSalesTagDispatcher($tag.config.id, $tag.config.orderID, $tag.config.productID, $tag.config.productInfo, $tag.config.quantity);
                break;
            case "SoicosTag":
                SoicosAds.soicosTagDispatcher($tag.config.id);
                break;
            case "YahooTag":
                YahooAds.yahooConversionTagDispatcher($tag.config.id);
                break;
            case "DataxuBeacon":
                Dataxu.createBeacon($tag.config.id);
                break;
            case "DataxuEcommerceBeacon":
                Dataxu.createEcommerceBeacon($tag.config.id);
                break;
            default:
                console.log('The requested tag doen not exist in the API');
        }
    }
};