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
1. Facebook Conversion Code
2. Facebook Audience Tag
*/

switch($service){
    case 1:
    $tag="
	<script>(function() {
		var _fbq = window._fbq || (window._fbq = []);
		if (!_fbq.loaded) {
		var fbds = document.createElement('script');
		fbds.async = true;
		fbds.src = '//connect.facebook.net/en_US/fbds.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(fbds, s);
		_fbq.loaded = true;
		}
		})();
	window._fbq = window._fbq || [];
	window._fbq.push(['track', '".$_GET["trackID"]."', {'value':'".$_GET["value"]."','currency':'".$_GET["currency"]."'}]);
	</script>
		<noscript><img height='1' width='1' alt='' style='display:none' 
		src='https://www.facebook.com/tr?ev=".$_GET["trackID"]."&amp;cd[value]=".$_GET["value"]."&
		amp;cd[currency]=".$_GET["currency"]."&amp;noscript=1' /></noscript>";
    break;
    case 2:
		
	
		
		
		
    break;   
}
echo $tag;
?>
</body>
</html>