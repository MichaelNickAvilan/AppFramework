var Mailer = {

    a_end_point: '',

    init: function ($lang) {
        switch ($lang) {
            case 'PHP':
                Mailer.a_end_point = AppFramework.a_prefix + 'AppFramework/Backend/PHP/proxys/mailproxy.php';
                break;
            case 'ASP':
                break;
            case 'JAVA':
                break;
            case 'ColdFusion':
                break;
        }
    },
    addListeners: function () {
    },
    sendGMAILMessage: function ($debug, $mailFrom, $mailFromName, $recipients, $lang, $subject, $body, $altBody, $callback) {
        console.log($recipients);
        Alert.showLoadingAlertLightbox();
        AjaxDelegate.requestInfo(
            Mailer.a_end_point,
            {
                service: 2,
                debug: $debug,
                mailFrom: $mailFrom,
                mailFromName:$mailFromName,
                recipients: $recipients,
                lang: $lang,
                subject: $subject,
                body: $body,
                altBody:$altBody
                
            }, 'post', 'json',
            function () {
                Alert.hideLoadingLightbox();
                $callback(AjaxDelegate.a_response);
            });
    },
    sendBasicMail: function ($mailForm, $recipients, $subject, $altBody, $callback) {
        Alert.showLoadingAlertLightbox();
        AjaxDelegate.requestInfo(
            Mailer.a_end_point,
            {
                service: 1,
                mailForm: $mailForm,
                recipients: JSON.stringify($recipients),
                lang: 'ESP',
                subject: $subject,
                altBody: $altBody
            }, 'post', 'json',
            function () {
                Alert.hideLoadingLightbox();
                $callback(AjaxDelegate.a_response);
            });
    },
    getRecipient: function ($mail, $name) {
        var recipient = { mail: $mail, name: $name };
        return recipient;
    },
    getMailObject: function ($to, $repply, $cc, $bcc, $files) {
        var recipients = {
            mails: { to: $to, repply: $repply, cc: $cc, bcc:$bcc, files:$files }
        };
        return recipients;
    },
    getTemplate: function ($template, $values) {
        var tmp = $template;
        for (var i = 0; i < $values.length; i++) {
            tmp = String(tmp).replace($values[i].field, $values[i].value);
        }
        return tmp;
    }
};