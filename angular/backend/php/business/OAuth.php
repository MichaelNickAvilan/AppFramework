<?php
include_once("../config.php");
Class OAuth{

    public function getToken($ID){
        $config=new Config();
        $params=$config->getOauthParams($ID);
        $url=$params->token_url."?grant_type=password&username=".$params->appUser."&password=".$params->appPassword;
        $header = array(
            "authorization: Basic ".$params->basicToken,
            "cache-control: no-cache"
          );
        $response = $this->requestTokensDelegate($url,$header);
        if($response->success==="true"){
           setcookie("apf_".$ID, json_encode($response->tokens), time() + (3600 * 30), "/");
           return json_encode($response);
        }else{
            return json_encode($response);
        }
    }
    public function apiRequest($ID, $serviceIndex, $data){
        $config=new Config();
        $response=$config->getService($ID, $serviceIndex);
        if($response->success==true){
            if(isset($_COOKIE["apf_".$ID])) {
                $tokens=json_decode($_COOKIE["apf_".$ID]);
                $header = array(
                    "authorization: Authorization Bearer ".$tokens->access_token,
                    "cache-control: no-cache"
                );
                return $this->requestDelegate($ID, $response->url, $header, $data);
            }else{
                $tokens=json_decode($this->getToken($ID));
                $header = array(
                    "authorization: Authorization Bearer ".$tokens->tokens->access_token,
                    "cache-control: no-cache"
                );
                return $this->requestDelegate($ID, $response->url, $header, $data);
            }
        }
    }
    private function requestDelegate($ID, $url, $header, $data){
        $curl = curl_init();
        curl_setopt_array($curl, array(
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_SSL_VERIFYHOST => false,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS =>$data,
        CURLOPT_HTTPHEADER => $header
        ));
        $response=curl_exec($curl);
        if(curl_getinfo($curl, CURLINFO_RESPONSE_CODE ) == 401){
           $tokens=json_decode($this->getToken($ID));
           $header = array(
                "authorization: Authorization Bearer ".$tokens->tokens->access_token,
                "cache-control: no-cache"
           );
           $this->requestDelegate($ID, $url, $header, $data);
        }else{
            return $response;
        }
	}
    private function requestTokensDelegate($url,$header){
        $curl = curl_init();
        curl_setopt_array($curl, array(
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_SSL_VERIFYHOST => false,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_HTTPHEADER => $header,
        ));
        $response = new stdClass();
        $response->tokens=json_decode(curl_exec($curl));
        $err = curl_error($curl);
        curl_close($curl);
        if ($err) {
            $error=new stdClass();
            $error->success="false";
            $error->detail= "CURL Error #:" . $err;
            return $error;
        } else {
            $response->success="true";
            return $response;
        }
	}
}
/*$consumer=new OAuth();
echo($consumer->apiRequest('ILUMNO', 0, "service=1&university=FUAA"));*/
?>