<?php
///Uncomment only for test
/*if (isset($_SERVER['HTTP_ORIGIN'])){
	header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');  
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS'){
	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])){
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
	}
    if(isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])){
    	header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }
	
	exit(0);
}*/

include_once("../business/Mailer.php");

$info=json_decode(base64_decode($_POST["info"]));
//var_dump($info);
$response=new stdClass();
if(isset($info->subject)){
    if(isset($info->body)){
        if(isset($info->textMessage)){
            if(isset($info->mails)){
                if(isset($info->type)){
                    switch($info->type){
                        case "GMAIL":
                        $mailer=new Mailer();
                        echo($mailer->sendGmailMessage($info->replyTo, $info->mails, $info->subject, $info->body, $info->textMessage));
                        break;
                        case "SMTP":
                        $mailer=new Mailer();
                        echo($mailer->sendSMTP($info->replyTo, $info->mails, $info->subject, $info->body, $info->textMessage));
                        break;
                    }
                }else{
                    $response->success="false";
                    $response->error="The type is not set";
                }
            }else{
                $response->success="false";
                $response->error="Are not mails into the request";
            }
        }else{
            $response->success="false";
            $response->error="The text message is not set";
        }
    }else{
        $response->success="false";
        $response->error="The body is not set";
    }
}else{
    $response->success="false";
    $response->error="The subject is not set";
}

?>