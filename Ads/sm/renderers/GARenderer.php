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
1. Google Addwords
2. Google DoubleClick Floodlight
*/

switch($service){
    case 1:
        $tag=
        '<script type="text/javascript">
        /* <![CDATA[ */
        var google_conversion_id = '.$_GET["google_conversion_id"].';
        var google_conversion_language = "'.$_GET["google_conversion_language"].'";
        var google_conversion_format = "'.$_GET["google_conversion_format"].'";
        var google_conversion_color = "'.$_GET["google_conversion_color"].'";
        var google_conversion_label = "'.$_GET["google_conversion_label"].'";
        var google_remarketing_only = '.$_GET["google_remarketing_only"].';
        /* ]]> */
        </script>
        <script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js">
        </script>
        <noscript>
        <div style="display:inline;">
        <img height="1" width="1" style="border-style:none;" alt="" 
        src="//www.googleadservices.com/pagead/conversion/'.$_GET["google_conversion_id"].
        '/?label='.$_GET["google_conversion_label"].'&amp;guid=ON&amp;script=0"/>
        </div>
        </noscript>';
    break;
    case 2:
		$axel=((float)rand()/(float)getrandmax()) * 10000000000000;
        $id=$_GET["srcID"];
        $cat=$_GET["cat"];
        $type=$_GET["type"];
        $url="https://".$id.".fls.doubleclick.net/activityi;src=".$id.";type=".$type.";cat=".$cat.";ord=".$axel."?";
        $iframe='<iframe src="'.$url.'" width="1" height="1" frameborder="0" style="display:none"></iframe>';
		echo $iframe;
    break;   
}
echo $tag;
?>
</body>
</html>