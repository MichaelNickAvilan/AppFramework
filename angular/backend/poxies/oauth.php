<?php

if (isset($_SERVER['HTTP_ORIGIN'])){
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
}

include_once("../business/OAuth.php");

$info=json_decode(base64_decode($_POST["info"]));
//var_dump($info);
$consumer=new OAuth();

$response=new stdClass();
if(isset($info->id)){
    if(isset($info->data->endpoint)){
        if(isset($info->data->params)){
            $response->success="true";
            $response->data=json_decode($consumer->apiRequest($info->id, $info->data->endpoint, $info->data->params));
        }else{
            $response->success="false";
            $response->detail="The params are not set";
        }
    }else{
        $response->success="false";
        $response->detail="The endpoint is not set";
    }
}else{
    $response->success="false";
        $response->detail="The id not set";
}
echo(base64_encode(json_encode($response)));
?>