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

include_once("../business/ImagesServices.php");
$service=$_POST["service"];
switch($service){
    case "1":
    $consumer=new ImagesServices();
    $consumer->getFlickrNodes($_POST["ids"], $_POST["tags"], $_POST["lang"]);
    break;
    case "2":
    $consumer=new ImagesServices();
    $consumer->getInstagramNodes($_POST["account"]);
    break; 
}
?>