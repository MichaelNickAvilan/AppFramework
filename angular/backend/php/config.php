<?php
class Config{
    public function getConfiguration(){
        //Crear un array de allowed URLs y sólo permitir el acceso a la URL del app
        $config=new StdClass();
        /******************************************************************/
        /* OAuth WsO2 Api Manager endpoints. Basic Authentication
        /******************************************************************/
        $config->OauthParams=new stdClass();
        $config->OauthParams->endPoints= array();
        /*<Object: RestDefinition>*/
        $endPointIlumno=new stdClass();
        $endPointIlumno->id="IDENTIFIER";
        $endPointIlumno->token_url="Authentication URL";
        $endPointIlumno->appUser="";
        $endPointIlumno->appPassword="";
        $endPointIlumno->basicToken="";
        $endPointIlumno->paths= array(
            "Endpoint URL"
        );
        array_push($config->OauthParams->endPoints, $endPointIlumno);
        /******************************************************************/
        /* MySQL
        /******************************************************************/
        /* MySQL params */
        $config->mySQLParams=new stdClass();
        $config->mySQLParams->host="";
        $config->mySQLParams->user="";
        $config->mySQLParams->pass="";
        $config->mySQLParams->db="";
        $table=new stdClass();
        $table->tableName="table";
        $table->columns=array("column1","column2","column3","column4");
        $forms=new stdClass();
        $config->mySQLParams->tables=array($table);
        $config->mySQLParams->templates=array(
            "INSERT INTO [table_name] [fields]",
            "SELECT * FROM [table_name]",
            "SELECT * FROM [table_name] WHERE [table_name].[column]='[value]'",
            "UPDATE [table_name] SET [fields] WHERE [table_name].[column]='[value]'",
            "DELETE FROM [table_name] WHERE [table_name].[column]='[value]'"
        );
        //Mejorar con tipos de datos para interpretar el mapa en la vista
        /******************************************************************/
        /* Mailer
        /******************************************************************/
        /* GMail params */
        $config->mailParams=new stdClass();
        $config->mailParams->Gmail=new stdClass();
        $config->mailParams->Gmail->mailUser="";
        $config->mailParams->Gmail->mailPassword="";
        $config->mailParams->Gmail->userName="test ";
        /* SMTP */
        $config->mailParams->SMTP=new stdClass();
        $config->mailParams->SMTP->host="";
        $config->mailParams->SMTP->port="";
        $config->mailParams->SMTP->auth=false;
        $config->mailParams->SMTP->userName="";
        $config->mailParams->SMTP->password="";

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