<?php

function sel_autoload($classname){
    if(!class_exists($classname)){
        // 内存不存在，尝试加载
        $file = '../entity/'. $classname . '.php';
        if(file_exists($file)) include $file;
    }
}
function sel_autoload_tool($classname){
    if(!class_exists($classname)){
        // 内存不存在，尝试加载
        $file = '../tool/'.$classname . '.php';
        if(file_exists($file)) include $file;
    }
}
spl_autoload_register('sel_autoload');
spl_autoload_register('sel_autoload_tool');

class SelectUser{
    
    private $id;
    private $password;
    private $role;

    public function __construct($id,$password,$role){
        $this->id = $id;
        $this->password = $password;
        $this->role = $role;
    }
    public function Select(){

        if($this->role == '1'){
            $index = 'sid';
            $table = 's_user';
        }
        else{
            $index = 'tid';
            $table = 't_user';
        }

        $sql = "select * from ".$table." where ".$index." = '".$this->id."' and password = '".$this->password."'";

        $obj = new Sql();
        $res = $obj->read_one($sql);

        if($res){
            return $res['name'];
        }
        return false;
    }
}

?>