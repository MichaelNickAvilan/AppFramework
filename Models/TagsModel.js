var TagsModel = {

    a_tags: [],

    init: function () {
        //Constructor
    },
    addTagToModel: function ($tag) {
        TagsModel.a_tags.push($tag);
    },
    printTags: function () {
        console.log(TagsModel.a_tags);
    }
};