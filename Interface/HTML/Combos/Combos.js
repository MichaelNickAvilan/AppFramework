/** 
  * @desc This manages the custom logic for the select elements in the DOM
  * @author Michael Avilán michael.avilan@gmail.com
*/
var Combos = {
    /** Returns a select element if exists */
    getCombo: function ($id) {
        var combo = document.getElementById($id);
        return combo;
    },
    /** Returns an option by ID 
    * @param {string} $id - ID of the option
    */
    getOption:function($id){
    	var option_selected = document.getElementById($id);
    	option_selected = option_selected.options[option_selected.selectedIndex];    	
    	return option_selected;
    },
    /**
    * @param {string} $id - ID of the select element
    * @param {string} $items - Array of options objects 
    */
    populateCombo: function ($id, $items) {
        var combo = document.getElementById($id);
        combo.options.length = 0;
        for (var i = 0; i < $items.length; i++) {
            var opt = document.createElement('option');
            opt.text = $items[i].label;
            opt.value = $items[i].value;
            opt.id = $items[i].id;
            combo.add(opt);
        }
    },
    /** 
    * Returns the selected option 
    * @param {string} $id - ID of the select element
    */
    getSelectedItem: function ($id) {
        var combo = document.getElementById($id);
        return combo.options[combo.selectedIndex];
    },
    /** 
    * Returns the selected index of a combo
    * @param {string} $id - ID of the select element
    */
    getSelectedIndex: function ($id) {
        var combo = document.getElementById($id);
        return combo.selectedIndex;
    }
};