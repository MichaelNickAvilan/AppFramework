<!doctype html>
<html lang="us">
<head>
</head>
<body>
<?php
    
$service=$_GET["service"];
$tag ='';

/*
Services:
1. Twitter conversion tag
*/

switch($service){
    case 1:
    $tag='<script src="//platform.twitter.com/oct.js" type="text/javascript"></script>
    <script type="text/javascript">
    twttr.conversion.trackPid("'.$_GET["trackPid"].'");</script>
    <noscript>
    <img height="1" width="1" style="display:none;" alt="" src="https://analytics.twitter.com/i/adsct?txn_id='.$_GET["trackPid"].'&p_id=Twitter" />
    <img height="1" width="1" style="display:none;" alt="" src="//t.co/i/adsct?txn_id='.$_GET["trackPid"].'&p_id=Twitter" /></noscript>';
    break;
}
echo $tag;

?>
</body>
</html>