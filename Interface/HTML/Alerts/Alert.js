/**
    * Alert, sinlgeton with methods to render a Bootstrap Alert and Loading Bar in the DOM.
    * @author Michael Nick Avilan Mora - michael.avilan@gmail.com
    */
var Alert = {

    /** Constructor method */
    init: function () {
        Alert.addListeners();
    },
    /**
    * Attach the listeners to their events
    */
    addListeners: function () {
        document.getElementById('alert-close').addEventListener('click', Alert.hide);
    },
    /**
    * Hides the Alert container
    */
    hide: function () {
        var alert = document.getElementById('alert_container');
        alert.style.visibility = 'hidden';
    },
    /**
    * Displays an alert painted on the top of the screen
    * @param {string} $title - Alert title
    * @param {string} $description - Alert content
    * @param {string} $type - Type of Alert: Error, Alert, Message
    */
    show: function ($title, $description, $type) {
        var alert = document.getElementById('alert_container');
        var alert_title = document.getElementById('alert-title');
        var alert_description = document.getElementById('alert-description');

        alert.style.visibility = 'visible';
        alert_title.textContent = $title;
        alert_description.textContent = $description;

        switch ($type) {
            case 'Error':
                alert.style.backgroundColor = 'rgb(184, 2, 14)';
                break;
            case 'Alert':
                alert.style.backgroundColor = 'rgb(248, 122, 0)';
                break;
            case 'Message':
                alert.style.backgroundColor = 'rgb(5, 123, 69)';
                break;
        }

    },
    /**
    * Shows an Loading in a modal window 
    */
    showLoadingAlertLightbox: function () {
        try {
            $("#customAlert").html("Cargando...<br/><br/><div id='progressbar'></div>");
            var closeOnEscape = $(".selector").dialog("option", "closeOnEscape");
            $("#customAlert").dialog({
                buttons: {

                },
                dialogClass: 'no-close', 'closeOnEscape': false, modal: true, open: function () {
                    $('.ui-widget-overlay').addClass('custom-overlay');
                },
                close: function () {
                    $('.ui-widget-overlay').removeClass('custom-overlay');
                }
            });

            $("#progressbar").progressbar({
                value: false
            });

            $(".ui-dialog-titlebar").hide();
        } catch (e) {
        } finally {
        }
    },
    /** 
    * Displays a loading in the top of the DOM
    */
    showLoadingAlert: function () {
        var loading = document.getElementById('loading-container');
        loading.style.visibility = 'visible';
    },
    /** 
    * Hides a Loading modal window
    */
    hideLoadingLightbox: function () {
        try {
            $("#customAlert").dialog("close");
        } catch (e) {

        } finally { }


    },
    /** 
    * Hides a conventional loading
    */
    hideLoadingAlert: function () {
        var loading = document.getElementById('loading-container');
        loading.style.visibility = 'hidden';
    },
    /** 
    * Displays an Alert in a modal window
    * @param {string} $message
    * @param {string} $title
    */
    showLightboxAlert: function ($message, $title) {
        try {
            $("#customAlert").html($message);

            var closeOnEscape = $(".selector").dialog("option", "closeOnEscape");
            $("#customAlert").dialog({
                dialogClass: 'no-close', 'closeOnEscape': false, modal: true, open: function () {
                    $('.ui-widget-overlay').addClass('custom-overlay');
                },
                buttons: {
                    Ok: function () {
                        $(this).dialog("close");
                    }
                },
                close: function () {
                    $('.ui-widget-overlay').removeClass('custom-overlay');
                }
            }).dialog("open");

            if ($title == undefined) {
                $("span.ui-dialog-title").text('Mensaje');
            } else {
                $("span.ui-dialog-title").text($title);
            }

            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();

        } catch (e) {
        } finally {
            $(".ui-dialog-titlebar").hide();
            var bn = document.getElementsByClassName('ui-dialog-buttonset')[0]
            bn.style.float = "none";
            bn.style.textAlign = "center";
            var obj = document.getElementsByClassName('ui-corner-all')[0]
            obj.style.borderRadius = "10px";
            obj.style.borderColor = "white";
        }
    },
    /** 
    * Creates an Alert in a modal window and executes the callback method when the user clicks the ok button
    * @param {string} $title - Alert title
    * @param {string} $message - Alert content
    * @param {string} $callback - Callback method
    */
    showLightboxMessageAlert: function ($message, $title, $callBack) {

        try {
            $("#customAlert").html($message);

            var closeOnEscape = $(".selector").dialog("option", "closeOnEscape");
            $("#customAlert").dialog({
                dialogClass: 'no-close', 'closeOnEscape': false, modal: true, open: function () {
                    $('.ui-widget-overlay').addClass('custom-overlay');
                },
                buttons: {
                    Ok: function () {
                        if ($callBack == undefined) {
                            $(this).dialog("close");
                        } else {
                            $callBack();
                        }
                    }
                },
                close: function () {
                    $('.ui-widget-overlay').removeClass('custom-overlay');
                }
            }).dialog("open");

            if ($title == undefined) {
                $("span.ui-dialog-title").text('Mensaje');
            } else {
                $("span.ui-dialog-title").text($title);
            }

            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();


        } catch (e) {
        } finally {
            $(".ui-dialog-titlebar").hide();
            var bn = document.getElementsByClassName('ui-dialog-buttonset')[0]
            bn.style.float = "none";
            bn.style.textAlign = "center";
            var obj = document.getElementsByClassName('ui-corner-all')[0]
            obj.style.borderRadius = "10px";
            obj.style.borderColor = "white";
        }

    },
    /** 
    * Shows a tooltip Alert qhen a user leaves in blank the current input
    * @param {string} $id_element - ID of the input
    * @param {string} $message - Alert content
    */
    showTooltipAlert: function ($id_element, $message) {
        Alert.showLightboxAlert('mm', '');
        var obj = document.getElementsByTagName('label');
        for (var i = 0; i < obj.length; i++) {
            obj[i].style.width = '5em';
            obj[i].style.display = 'inline-block';
        }

        try {
            $e = $('#' + $id_element);
            $e.attr('data-original-title', $message);
        } catch (e) {
        } finally {
        }

        document.getElementById($id_element).title = $message;

        $("#" + $id_element).tooltip();
        $("#" + $id_element).focus();

        var centinela = 0;

        setTimeout(function () {
            document.getElementById($id_element).title = '';
            try {
                $e = $('#' + $id_element);
                $e.attr('data-original-title', $e.attr('title') || '').attr('title', '');
            } catch (e) {
            } finally {
            }

        }, 500);
    }
};
Alert.init();