<!doctype html>
<html lang="us">
<head>
</head>
<body>
<?php


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

echo $tag;
?>
</body>
</html>