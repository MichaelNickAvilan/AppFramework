/** 
  * @desc This file contains the tags to dispatch in to the application
  * @author Michael Avilán michael.avilan@gmail.com
*/
var TagsModel = {
    a_tags: [],

    /** Constructor method */
    init: function () {
        var origin = document.location.href;
        TagsModel.a_tags = [
           /* GoogleAds.getGoogleAdWordsObject('993176020', 'HkIACLb1jFkQ1NPK2QM', 'en', '1.00', 'ffffff', '2', 'COND1', 'COND2', COND3),
            FacebookAds.getFacebookConversionTagObject('6023649315844', '0.00', 'USD', 'COND1', 'COND2', COND3),
            Haedway.getHaedwayObject(MediaMath.getMediaMathBeaconObject('688818', '136423', 'COND1', 'COND2', COND3), 'COND1', 'COND2', COND3),
            SoicosAds.getSoicosTagObject('4343','1','COND1', 'COND2', COND3),
            Dataxu.getDataxuDoubleClick(GoogleAds.getDoubleClickFloodlightTagObject('invmedia', '4368523', 
            'ecbqvutn', 'COND1', 'COND2', COND3, 'Renderer'), 'COND1', 'COND2', COND3),
            TwitterAds.getTwitterConversionObject('l5hd0', 'COND1', 'COND2', COND3)*/
        ]
    },
    /** Ads a tag object ti the current model */
    addTagToModel: function ($tag) {
        TagsModel.a_tags.push($tag);
    },
    /** prints in console all the tags contained into the model */
    printTags: function () {
        console.log(TagsModel.a_tags);
    }
};

