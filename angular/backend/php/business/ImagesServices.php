<?php
class ImagesServices{
    public function getInstagramNodes($account){
        $html = file_get_contents("http://instagram.com/".$account."/");
        $html = strstr($html, '{"country_code');
        $html = strstr($html, '</script>', true);
        $html = substr($html, 0, -1);
        $nodes=json_decode($html);
        $nodes=$nodes->entry_data->ProfilePage[0]->user->media->nodes;
        return json_encode($nodes);	
    }
    public function getFlickrNodes($ids, $tags, $lang){
        $url="https://api.flickr.com/services/feeds/photos_public.gne?tags=".urlencode($tags)."&ids=".$ids."&lang=".$lang."&format=json";
        $curl = curl_init();
        curl_setopt_array($curl, array(
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => false,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_SSL_VERIFYPEER => FALSE,
        CURLOPT_CUSTOMREQUEST => "GET",
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);
        curl_close($curl);
        if ($err) {
            $error=new stdClass();
            $error->detail="cURL Error #:" . $err;
            return json_encode($err);
        } 
    }
};
?>