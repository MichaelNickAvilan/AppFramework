/** 
  * @desc This file contains the Tagging Engine logic
  * @author Michael Avilán michael.avilan@gmail.com
*/
var TaggingEngine = {

    a_dispatched_tags: [],

    init: function () {
        //Constructor
    },
    dispatchTagsDelegate: function ($landing, $condition, $origin) {
        for (var i = 0; i < TagsModel.a_tags.length; i++) {
            if (TagsModel.a_tags[i].landing == $landing) {
                if (TagsModel.a_tags[i].dispatchAt == $condition) {
                    if (TagsModel.a_tags[i].byOrigin == true) {
                        if (TagsModel.a_tags[i].origin == $origin) {
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
            case 'GoogleAdWords':
                GoogleAds.googleAdWordsConversionTracker($tag.config.id, $tag.config.language, $tag.config.format, $tag.config.color, $tag.config.label);
                break;
            case 'DoubleClick':
                GoogleAds.doubleClickTagDispatcher($tag.config.src, $tag.config.cat);
                break;
            case 'DoubleClickFloodLigth':
                GoogleAds.doubleClickFloodlightTagDispatcher($tag.config.id, $tag.config.cat,$tag.config.type, $tag.config.renderCase);
                break;
            case 'FacebookClassicTag':
                FacebookAds.facebookConversionTagDispatcher($tag.config.id, $tag.config.paramValue, $tag.config.currency, 'JavaScript');
                break;
            case 'FacebookAudienceTag':
                FacebookAds.facebookAudienceTagDispatcher($tag.config.id);
                break;
            case 'MediaMind':
                SizmekAds.mediaMindCounterTagDispatcher($tag.config.id);
                break;
            case 'MediaMindRemarketing':
                SizmekAds.mediaMindRetargetingTagDispatcher($tag.config.tid, $tag.config.tval);
                break;
            case 'MediaMindSales':
                SizmekAds.mediaMindSalesTagDispatcher($tag.config.id, $tag.config.orderID, $tag.config.productID, $tag.config.productInfo, $tag.config.quantity);
                break;
            case 'SoicosTag':
                SoicosAds.soicosTagDispatcher($tag.config.id, $tag.config.type);
                break;
            case 'YahooTag':
                YahooAds.yahooConversionTagDispatcher($tag.config.id);
                break;
            case 'DataxuDoubleClick':
                Dataxu.dataxuDoubleClickDelegate($tag.config.data);
                break;
            case 'DataxuAppNexus':
                Dataxu.dataxuAppNexusDelegate($tag.config.data);
                break;
            case 'DataxuW55':
            	try{
            		Dataxu.dataxuW55TagDispatcher($tag.config.id);
            	}catch(e){}
            	finally{}
                break;
            case 'AppNexus':
            	Dataxu.dataxuAppNexusDelegate($tag.config.data);   
                break;
            case 'TwitterAds':
                TwitterAds.twitterConversionTagDispatcher($tag.config.id);
                break;
            case 'HaedwayMediaMath':
                Haedway.mediaMathDispatchDelegate($tag.config.data.config);
                break;
            default:
                console.log('The requested tag does not exist in the API');
        }
    }
};