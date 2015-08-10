/** 
  * @desc This file contains the logic to read CSV files and convert into an array of arrays
  * @author Michael Avilán michael.avilan@gmail.com
*/
var CSVReader = {

    a_data: [],

    /** Cosntructor method */
    init: function () {
    },
    /** Read the CSV content
    * @param $path
    * @param $callback
    */
    loadCSV: function ($path, $callback) {
        $ = jQuery;
        $.ajax({
            url: $path,
            type: 'get',
            success: function (_data) {
                CSVReader.a_data = (CSVReader.CSVToArray(_data, ","));
                $callback();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log("Error: " + thrownError + ". Status: " + xhr.status);
            }
        });
    },
    /** Converts the CSV content to an Array 
    * @param strData
    * @param strDelimiter
    */
    CSVToArray: function (strData, strDelimiter) {
        strDelimiter = (strDelimiter || ",");
        var objPattern = new RegExp(
    		(
    			"(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
    			"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
    			"([^\"\\" + strDelimiter + "\\r\\n]*))"
    		),
    		"gi"
    		);

        var arrData = [[]];
        var arrMatches = null;
        while (arrMatches = objPattern.exec(strData)) {
            var strMatchedDelimiter = arrMatches[1];

            if (
    			strMatchedDelimiter.length &&
    			(strMatchedDelimiter != strDelimiter)
    			) {
                arrData.push([]);
            }
            if (arrMatches[2]) {
                var strMatchedValue = arrMatches[2].replace(
    				new RegExp("\"\"", "g"),
    				"\""
    				);

            } else {
                var strMatchedValue = arrMatches[3];

            }
            arrData[arrData.length - 1].push(strMatchedValue);
        }

        return (arrData);
    }
};
