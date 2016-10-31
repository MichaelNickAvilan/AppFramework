<?php
date_default_timezone_set('Etc/UTC');
require_once("../libs/phpmailer/PHPMailerAutoload.php");
require_once("../config.php");
Class Mailer{
    public function sendGmailMessage($replyTo, $addressses, $subject, $body, $textVersion, $files=null){
        $config=new Config();
        $mail=new PHPMailer();
        $mail->isSMTP();
        // 0 = off (for production use)
        // 1 = client messages
        // 2 = client and server messages
        $mail->SMTPDebug = 0;
        $mail->Debugoutput = 'html';
        $mail->Host = 'smtp.gmail.com';
        $mail->Port = 587;
        $mail->SMTPSecure = 'tls';
        $mail->SMTPAuth = true;

        var_dump($config->getConfiguration()->mailParams->Gmail->mailUser);

        $mail->Username = $config->getConfiguration()->mailParams->Gmail->mailUser;
        $mail->Password = $config->getConfiguration()->mailParams->Gmail->mailPassword;
        $mail->setFrom($config->getConfiguration()->mailParams->Gmail->mailUser, $config->getConfiguration()->mailParams->Gmail->userName);
        $mail->addReplyTo($replyTo, $config->getConfiguration()->mailParams->Gmail->userName);
        $mailsTo="";
        $namesTo="";
        $i = 0;
        foreach($addressses as $address){
            $mail->addAddress($address->mail, $address->name);
        }
        $mail->Subject = $subject;
        $mail->isHTML(true);
        $mail->Body = $body;
        $mail->AltBody = $textVersion;
        if(isset($files)){
            foreach($files as $file){
                $mail->addAttachment($file);
            }
        }

        $response=new stdClass();
        if (!$mail->send()) {
            $response->success="false";
            $response->detail= $mail->ErrorInfo;
        } else {
            $response->success="true";
            $response->detail="Message sent!";
        }
        return json_encode($response);
    }
    public function sendSMTP($repplyTo, $addressses, $subject, $body, $textVersion, $files=null){
        date_default_timezone_set('Etc/UTC');
        $config=new Config();
        $mail = new PHPMailer();
        $mail->isSMTP();
        //Enable SMTP debugging
        // 0 = off (for production use)
        // 1 = client messages
        // 2 = client and server messages
        $mail->SMTPDebug = 0;
        $mail->Debugoutput = 'html';
        $mail->Host = $config->getConfiguration()->mailParams->SMTP->host;
        $mail->Port = $config->getConfiguration()->mailParams->SMTP->port;
        $mail->SMTPAuth = $config->getConfiguration()->mailParams->SMTP->auth;
        $mail->Username = $config->getConfiguration()->mailParams->SMTP->userName;
        $mail->Password = $config->getConfiguration()->mailParams->SMTP->password;
        $mail->setFrom($config->getConfiguration()->mailParams->SMTP->mailFrom, $config->getConfiguration()->mailParams->SMTP->mailFromName);
        $mail->addReplyTo($repplyTo->mail, $repplyTo->name);
        
        foreach($addressses as $address){
            $mail->addAddress($address->mail, $address->name);
        }

        $mail->Subject = $subject;
        $mail->isHTML(true);
        $mail->Body = $body;
        $mail->AltBody = $textVersion;
        
        if(isset($files)){
            foreach($files as $file){
                $mail->addAttachment($file);
            }
        }
        
        $response=new stdClass();
        if (!$mail->send()) {
            $response->success="false";
            $response->detail= $mail->ErrorInfo;
        } else {
            $response->success="true";
            $response->detail="Message sent!";
        }
        return json_encode($response);
    }
}
?>