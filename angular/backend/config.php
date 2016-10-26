<?php
class Config{
    public function getConfiguration(){
        //Crear un array de allowed URLs y sólo permitir el acceso a la URL del app
        $config=new StdClass();
        /******************************************************************/
        /* OAuth
        /******************************************************************/
        $config->OauthParams=new stdClass();
        $config->OauthParams->endPoints= array();
        /*<Object: RestDefinition>*/
        $endPoint=new stdClass();
        $endPoint->id="IDENTIFIER";
        $endPoint->token_url="TOKEN URL";
        $endPoint->appUser="";
        $endPoint->appPassword="";
        $endPoint->basicToken="";
        $endPoint->paths= array(
            "ENDPOINT URL"
        );
        array_push($config->OauthParams->endPoints, $endPoint);
        /******************************************************************/
        /* MySQL
        /******************************************************************/
        /* MySQL params */
        $config->mySQLParams=new stdClass();
        $config->mySQLParams->url="";
        $config->mySQLParams->user="";
        $config->mySQLParams->pass="";
        /******************************************************************/
        /* Mailer
        /******************************************************************/
        /* GMail params */
        $config->mailParams=new stdClass();
        $config->default="SMTP";
        $config->mailParams->Gmail=new stdClass();
        $config->mailParams->mailFrom="";
        $config->mailParams->mailName="";
        $config->mailParams->recipients="";
        $config->mailParams->lang="";
        $config->mailParams->subject="";
        $config->mailParams->body="";
        $config->mailParams->altBody="";
        /* SMTP */
        $config->mailParams->SMTP=new stdClass();
        $config->mailParams->SMTP->server="";
        $config->mailParams->SMTP->user="";
        $config->mailParams->SMTP->password="";
        $config->mailParams->SMTP->port="";
        $config->mailParams->SMTP->mailFrom="";
        $config->mailParams->SMTP->mailFromName="";
        $config->mailParams->SMTP->recipients="";
        $config->mailParams->SMTP->mailFrom="";
        $config->mailParams->SMTP->attachments="";
        $config->mailParams->SMTP->isHTML="";
        $config->mailParams->SMTP->subject="";
        $config->mailParams->SMTP->body="";
        $config->mailParams->SMTP->altBody="";
        /******************************************************************/
        /* Instagram
        /******************************************************************/
       $config->socialMedia->instagram=new stdClass();
       $config->socialMedia->instagram->account="INSTAGRAM ACCOUNT";

        return $config;
    }
    public function getOauthParams($ID){
        $config=$this->getConfiguration();
        foreach($config->OauthParams->endPoints as $ep){
            if($ep->id=$ID){
                return $ep;
            }
        }
    }
    public function getService($ID, $index){
        $response=new stdClass();
        $service=$this->getOauthParams($ID);
        if(count($service->paths)-1<=(int)$index){
            $response->success=true;
            $response->url=$service->paths[$index];
        }else{
            $response->success=false;
        }
        return $response;
    }
};
?>