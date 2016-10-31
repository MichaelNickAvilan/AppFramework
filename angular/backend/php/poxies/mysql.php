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

include_once("../business/MySQLTransactions.php");
$response=new stdClass();
if(isset($_POST["info"])){
    $info=json_decode(base64_decode($_POST["info"]));
    $consumer=new MySQLTransactions(); 
    $request=$consumer->queryDelegate($info->template, $info->table, $info->column, $info->value, $info->fields); 
    $response->success="true";
    $response->data=$request;
    echo(json_encode($response));
}else{
    $response->success="false";
    $response->detail="The info is not in the request";
    echo(json_encode($response));
}
?>