<?php 

require "../libs/phpmailer/PHPMailerAutoload.php";

class Mailer
{
	public function sendMail($mailFrom, $mailFromName, $recipients, $lang, $subject, $altBody){
		$mail = new PHPMailer;
		// Add recipients
		for($i=0;$i<$recipients->mails->to.length;$i++){
			$mail->addAddress($recipients->mails->to[$i]->mail, $recipients->mails->to[$i]->name);
		}
		// Add Reply to
		for($j=0;$j<$recipients->mails->repply.length;$j++){
			$mail->addAddress($recipients->mails->repply[$j]->mail, $recipients->mails->repply[$j]->name);
		}
		// Add CC
		for($k=0;$k<$recipients->mails->cc.length;$k++){
			$mail->addAddress($recipients->mails->cc[$k]->mail, $recipients->mails->cc[$k]->name);
		}
		// Add BCC
		for($l=0;$l<$recipients->mails->bcc.length;$l++){
			$mail->addAddress($recipients->mails->bcc[$l]->mail, $recipients->mails->bcc[$l]->name);
		}
		// Add Attachments
		for($m=0;$m<$attachments->files.length;$m++){
			$mail->addAttachment($attachments->files[$m]->url, $attachments->files[$m]->name);
		}
		//Set the subject line
		$mail->Subject = $subject;
		$mail->Body    = $body;
		$mail->AltBody = $altBody;
		if(!$mail->send()) {
		    return json_encode($mail->ErrorInfo);
		} else {
			switch ($lang) {
				case 'ESP':
					return '{"status":"success", "message":"El mensaje ha sido enviado"}';		
					break;
				case 'PORT':
					return '{"status":"success", "message":"A mensagem foi enviada"}';
					break;
				
				default:
					return '{"status":"success", "message":"The email has been sent"}';
					break;
			}
		}
	}
	public function sendGmailMessage($debug, $mailFrom, $mailFromName, $recipients, $lang, $subject, $body, $altBody){
		require "../config.php";
		date_default_timezone_set('Etc/UTC');
		$mail = new PHPMailer;
		$mail->isSMTP();
		$mail->SMTPDebug = $debug;
		$mail->Debugoutput = 'html';
		$mail->Host = 'smtp.gmail.com';
		$mail->Port = 587;
		$mail->SMTPSecure = 'tls';
		$mail->SMTPAuth = true;
		$mail->Username = $gmailUser;
		$mail->Password = $gmailPassword;
		$mail->setFrom($mailFrom, $mailFromName);
		// Add recipients
		$recipients=json_decode($recipients);
		for($i=0;$i<count($recipients->mails->to);$i++){
			$mail->addAddress($recipients->mails->to[$i]->mail, $recipients->mails->to[$i]->name);
		}
		// Add Reply to
		for($j=0;$j<count($recipients->mails->repply);$j++){
			$mail->addAddress($recipients->mails->repply[$j]->mail, $recipients->mails->repply[$j]->name);
		}
		// Add CC
		for($k=0;$k<count($recipients->mails->cc);$k++){
			$mail->addAddress($recipients->mails->cc[$k]->mail, $recipients->mails->cc[$k]->name);
		}
		// Add BCC
		for($l=0;$l<count($recipients->mails->bcc);$l++){
			$mail->addAddress($recipients->mails->bcc[$l]->mail, $recipients->mails->bcc[$l]->name);
		}
		// Add Attachments
		for($m=0;$m<count($recipients->mails->files);$m++){
			$mail->addAttachment($recipients->mails->files[$m]->url, $attachments->files[$m]->name);
		}
		//Set the subject line
		$mail->Subject = $subject;
		$mail->Body    = $body;
		$mail->AltBody = $altBody;
		if(!$mail->send()) {
		    return json_encode($mail->ErrorInfo);
		} else {
			switch ($lang) {
				case 'ESP':
					return '{"status":"success", "message":"El mensaje ha sido enviado"}';		
					break;
				case 'PORT':
					return '{"status":"success", "message":"A mensagem foi enviada"}';
					break;
				
				default:
					return '{"status":"success", "message":"The email has been sent"}';
					break;
			}
		}
	}
	public function sendSMTPMail($mainSMTPServer, $backupSMTPServer, $smtpAuth, $SMTPuser, $SMTPparrword, $smtpSecure, $port, $mailFrom, $mailFromName, $recipients,
	$attachments, $isHTML, $subject, $body, $isHTML, $altBody, $lang, $debug){
		$mail = new PHPMailer;
		$mail->SMTPDebug = $debug;                               // Enable verbose debug output
		$mail->isSMTP();
		$mail->Host = $mainSMTPServer.";".$backupSMTPServer;  // Specify main and backup SMTP servers
		$mail->SMTPAuth = $smtpAuth;                          // Enable SMTP authentication
		$mail->Username = $SMTPuser;                 		  // SMTP username
		$mail->Password = $SMTPparrword;                      // SMTP password
		$mail->SMTPSecure = $smtpSecure;                      // Enable TLS encryption, `ssl` also accepted
		$mail->Port = $port;                                  // TCP port to connect to
		$mail->setFrom($mailFrom, $mailFromName);			  // Set the origin mail
		// Add recipients
		for($i=0;$i<$recipients->mails->to.length;$i++){
			$mail->addAddress($recipients->mails->to[$i]->mail, $recipients->mails->to[$i]->name);
		}
		// Add Reply to
		for($j=0;$j<$recipients->mails->repply.length;$j++){
			$mail->addAddress($recipients->mails->repply[$j]->mail, $recipients->mails->repply[$j]->name);
		}
		// Add CC
		for($k=0;$k<$recipients->mails->cc.length;$k++){
			$mail->addAddress($recipients->mails->cc[$k]->mail, $recipients->mails->cc[$k]->name);
		}
		// Add BCC
		for($l=0;$l<$recipients->mails->bcc.length;$l++){
			$mail->addAddress($recipients->mails->bcc[$l]->mail, $recipients->mails->bcc[$l]->name);
		}
		// Add Attachments
		for($m=0;$m<$attachments->files.length;$m++){
			$mail->addAttachment($attachments->files[$m]->url, $attachments->files[$m]->name);
		}
		$mail->isHTML($isHTML);                                  // Set email format to HTML
		
		$mail->Subject = $subject;
		$mail->Body    = $body;
		$mail->AltBody = $altBody;
		
		if(!$mail->send()) {
		    return json_encode($mail->ErrorInfo);
		} else {
			switch ($lang) {
				case 'ESP':
					return '{"status":"success", "message":"El mensaje ha sido enviado"}';		
					break;
				case 'PORT':
					return '{"status":"success", "message":"A mensagem foi enviada"}';
					break;
				default:
					return '{"status":"success", "message":"The email has been sent"}';
					break;
			}
		}
	}	
}
?>