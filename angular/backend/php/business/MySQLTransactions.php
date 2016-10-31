<?php

include_once("../config.php");

Class MySQLTransactions{

    public function queryDelegate($temp, $table, $column, $value, $fields){
        $config=new Config();
        $tables=$config->getConfiguration()->mySQLParams->tables;
        $template=$config->getConfiguration()->mySQLParams->templates[$temp];
        $response=new stdClass();
        $con=$this->connect($config);
        if((String)$column!="NULL"){
            $t=$this->getTable($tables, $table, $column);
            if($t!="Error" && $t!="Error Column"){
                $template=str_replace("[table_name]",$t->tableName,$template);
                $template=str_replace("[column]",$t->column,$template);
                $template=str_replace("[value]",$value,$template);
                
                if((int)$temp == 1 || (int)$temp == 2){
                    $Result = mysql_query( $template );
                    $response->success="true";
                    $response->data=$this->getRows($Result);
                    return json_encode($response);
                }else{
                    if((int)$temp == 3){
                        $template=str_replace("[fields]",$this->getSetFields($config, $table, $fields),$template);
                        $Result = mysql_query( $template );
                        $response->success="true";
                        $response->affected_rows=mysql_affected_rows();
                        return json_encode($response);
                    }else{
                        $template=str_replace("[table_name]",$t->tableName,$template);
                        $template=str_replace("[column]",$t->column,$template);
                        $template=str_replace("[value]",$value,$template);
                        $Result = mysql_query( $template );
                        if(mysql_affected_rows()==1){
                            $response->success="true";
                            $response->affected_rows=mysql_affected_rows();
                            return json_encode($response);
                        }else{
                            $response->success="false";
                            $response->detail="Database denied operation";
                            return json_encode($response);
                        }
                    }
                }
            }else{
                $response->success="false";
                $response->detail=$t;
                return json_encode($response);
            }
        }else{
            $t=$this->getTable($tables, $table);
            $template=str_replace("[table_name]",$t->tableName,$template);
            $template=str_replace("[fields]",$this->getInsertFields($config, $table, $fields),$template);
            $Result = mysql_query( $template );
            if(mysql_affected_rows()==1){
                $response->success="true";
                $response->affected_rows=mysql_affected_rows();
                $response->inserted_id=mysql_insert_id();
                return json_encode($response);
            }else{
                $response->success="false";
                $response->detail="Database denied operation";
                return json_encode($response);
            }
        }
    }
    private function getInsertFields($config, $table, $fields){
        $fields=json_decode($fields);
        $insertQuery="";
        $table=$this->getTable($config->getConfiguration()->mySQLParams->tables, $table);
        
        $numItems = count($fields);
        $i = 0;
        $fieldsQuery="(";
        $valuesQuery="(";
        foreach($fields as $field){
            if(++$i === $numItems) {
                $fieldsQuery.=$table->columns[$field->index]." ";
                $valuesQuery.="'".$field->value."' ";
            }else{
                $fieldsQuery.=$table->columns[$field->index].", ";
                $valuesQuery.="'".$field->value."', ";
            }
        }
        $fieldsQuery.=")";
        $valuesQuery.=")";
        $insertQuery=$fieldsQuery." VALUES ".$valuesQuery;
        return $insertQuery;
    }
    private function getSetFields($config, $table, $fields){
        $fields=json_decode($fields);
        $setQuery="";
        $table=$this->getTable($config->getConfiguration()->mySQLParams->tables, $table);
        
        $numItems = count($fields);
        $i = 0;
        foreach($fields as $field){
            if(++$i === $numItems) {
                $setQuery.=$table->columns[$field->index]."='".$field->value."' ";
            }else{
                $setQuery.=$table->columns[$field->index]."='".$field->value."', ";
            }
        }
        return $setQuery;
    }
    private function getRows($result){
        $rows=array();
        while ($row = mysql_fetch_object($result)){
            array_push($rows,$row);
        }
        return $rows;
    }
    private function connect($config){
        $con=mysql_connect(
            $config->getConfiguration()->mySQLParams->host, 
            $config->getConfiguration()->mySQLParams->user, 
            $config->getConfiguration()->mySQLParams->pass);  
		if (mysqli_connect_errno($con)){
			echo('{status:"failed",message:"'. mysqli_connect_error().'"}');
	    }else{
	    	mysql_select_db ($config->getConfiguration()->mySQLParams->db);
	    	return $con;
	    }
    }
    private function closeMySQLConnection($con){
        $con->close();
    }
    private function getTable($tables, $table, $column=NULL){
        
        if((int)$table<=count($tables)){
            $t=new stdClass();
            $t->tableName=$tables[(int)$table]->tableName;
            if(isset($column)){
                 if((int)$column <= count($tables[(int)$table]->columns)){
                    $t->column=$tables[(int)$table]->columns[$column];
                    return $t;
                }else{
                    return "Error: Column does not exists";
                }
            }else{
                return $tables[(int)$table];
            }
        }else{
            return "Error: Table does not exists";
        }
    }
}

$consumer=new MySQLTransactions();

//Insert Query
/*
$field1=new stdClass();
$field1->index=0;
$field1->value=2;
$field2=new stdClass();
$field2->index=1;
$field2->value=0;
$field3=new stdClass();
$field3->index=2;
$field3->value="2016-20-20";
$field4=new stdClass();
$field4->index=3;
$field4->value="TEST";
$field5=new stdClass();
$field5->index=4;
$field5->value="TEST CONTENT";
$fields=array($field1,$field2,$field3,$field4,$field5);
echo($consumer->queryDelegate(0,2,"NULL","NULL",json_encode($fields)));
*/
//Update query
/*
$field1=new stdClass();
$field1->index=1;
$field1->value="AvatarTest5";
$field2=new stdClass();
$field2->index="2";
$field2->value="avatar@ilumno.com";
$fields=array($field1,$field2);
echo($consumer->queryDelegate(3,0,0,3,json_encode($fields)));
*/
//Select Query Revisar
/*
echo($consumer->queryDelegate(2,3,1,600,"NULL")); 
*/
//Delete Query
/*
echo($consumer->queryDelegate(4,2,0,50,"NULL"));
*/
?>