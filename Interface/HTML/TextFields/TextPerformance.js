/** 
  * @desc This manages the custom logic for the text input elements in the DOM
  * @author Michael Avilán michael.avilan@gmail.com
*/
var TextPerformance = {

    /** Constructor method */
    init: function () {
    },
    /** 
    * Returns the input by id
    * @param {string} $id - ID of the input
    */
    getField: function ($id) {
        var el = document.getElementById($id);
        return el;
    },
    /** 
    * Returns the value of an input element
    * @param {string} $id - ID of the input element
    */
    getValue: function ($id) {
        var el = document.getElementById($id);
        return el.value;
    },
    /** 
    * Insert a value to an input
    * @deprecated
    * @param {string} $id - ID of the input element
    * @param {string} $value - Value of the input element
    */
    insertValue:function($id,$value){
    	var el = document.getElementById($id);
    	el.value=$value;
    }
};