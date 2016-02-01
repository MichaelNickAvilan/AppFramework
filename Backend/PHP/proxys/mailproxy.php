<?php
/**
 * 
 * @package proxys
 * @author Michael Avilán - michael.avilan@gmail.com
 * @since 2014
 */

	require_once("../business/Mailer.php");
	
	$mail_consumer=new Mailer();
	
	/*
	 * 1. Send basic Email
	 * 2. Send gmail message
	 * 3. Send smtp email
	 * */
	
	if($_POST["service"]){
		$service=$_POST["service"];
	 	
	 	switch ($service){
			case "1":
				if(
				strlen($_POST["mailFrom"])>0 &&
				strlen($_POST["mailFromName"])>0 && 
				strlen($_POST["recipients"])>0 && 
				strlen($_POST["lang"])>0 &&
				strlen($_POST["subject"])>0 &&
				strlen($_POST["altBody"])>0){
					$mail_consumer->sendMail(
					$_POST["mailFrom"], 
					$_POST["mailFromName"], 
					$_POST["recipients"], 
					$_POST["lang"], 
					$_POST["subject"], 
					$_POST["altBody"]);
					echo($response);
				}else{
					echo '{"status":"fault","message":"Some fields are null","service":"1"}';
				}
			break;
			case "2":
				if(
				strlen($_POST["debug"])>0 &&
				strlen($_POST["mailFrom"])>0 &&
				strlen($_POST["mailFromName"])>0 && 
				strlen($_POST["recipients"])>0 &&
				strlen($_POST["lang"])>0 && 
				strlen($_POST["subject"])>0 && 
				strlen($_POST["body"])>0){
					$response=$mail_consumer->sendGmailMessage(
					$_POST["debug"], 
					$_POST["mailFrom"], 
					$_POST["mailFromName"], 
					$_POST["recipients"], 
					$_POST["lang"], 
					$_POST["subject"],
					$_POST["body"], 
					$_POST["altBody"]);
					echo($response);
				}else{
					echo '{"status":"fault","message":"Some fields are null","service":"1"}';
				}
			break;
			case "3":
				if(
				strlen($_POST["mainSMTPServer"])>0 && 
				strlen($_POST["backupSMTPServer"])>0 &&
				strlen($_POST["smtpAuth"])>0 && 
				strlen($_POST["SMTPuser"])>0 && 
				strlen($_POST["SMTPparrword"])>0 &&
				strlen($_POST["smtpSecure"])>0 && 
				strlen($_POST["port"])>0 && 
				strlen($_POST["mailFrom"])>0 &&
				strlen($_POST["mailFromName"])>0 &&
				strlen($_POST["recipients"])>0 &&
				strlen($_POST["attachments"])>0 &&
				strlen($_POST["isHTML"])>0 &&
				strlen($_POST["subject"])>0 &&
				strlen($_POST["body"])>0 &&
				strlen($_POST["isHTML"])>0 &&
				strlen($_POST["altBody"])>0 &&
				strlen($_POST["lang"])>0 &&
				strlen($_POST["debug"])>0){
					$mail_consumer->sendSMTPMail(
					$_POST["mainSMTPServer"], 
					$_POST["backupSMTPServer"], 
					$_POST["smtpAuth"], 
					$_POST["SMTPuser"], 
					$_POST["SMTPparrword"],
					$_POST["smtpSecure"], 
					$_POST["port"], 
					$_POST["mailFrom"], 
					$_POST["mailFromName"], 
					$_POST["recipients"],
					$_POST["attachments"], 
					$_POST["isHTML"], 
					$_POST["subject"], 
					$_POST["body"], 
					$_POST["isHTML"], 
					$_POST["altBody"], 
					$_POST["lang"], 
					$_POST["debug"]);
					echo($response);
				}else{
					echo '{"status":"fault","message":"Some fields are null","service":"1"}';
				}
			break;
	 	}
	}
 ?> 