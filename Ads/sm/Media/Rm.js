/**
 * Class contains methods to send data to the Red+ Platform
 * @author Michael Nick Avilan Mora - michael.avilan@gmail.com
 * @class
 */

var RedMas = {

    /** @constructor */
    init: function () {
    },
    /** 
    * Dispatch a RedMas tag
    * @param {string} $folder_id
    * @param {string} $script_id
    */
    dispatchRedMasTag: function ($folder_id, $script_id) {
        DomUtils.loadScript('http://weboptimizer.leadaki.com/weboptimizer/' + $folder_id + '/' + $script_id + '.js', function () {
            Controller.eventDispatcherDelegate(document, Controller.REDMAS_TAG_DISPACHED_EVENT);
        }); 
    },
    /** Returns a Standar RedMas Object 
    * @param $folder_id
    * @param $script_id
    * @param $landing
    * @param $condition
    * @param $origin
    */
    getRedMasObject: function ($folder_id, $script_id, $landing, $condition, $origin) {
        return {
            a_type: "RedMas",
            byOrigin: true,
            origin: $origin,
            dispatchAt: $condition,
            landing: $landing,
            config: {
                folder_id: $folder_id,
                script_id: $script_id
            }
        };
    }
};