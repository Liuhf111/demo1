<?php

function get_autoload($classname){
    if(!class_exists($classname)){
        // 内存不存在，尝试加载
        $file = '../entity/'.$classname . '.php';
        if(file_exists($file)) include $file;
    }
}
function get_autoload_tool($classname){
    if(!class_exists($classname)){
        // 内存不存在，尝试加载
        $file = '../tool/'.$classname . '.php';
        if(file_exists($file)) include $file;
    }
}
spl_autoload_register('get_autoload');
spl_autoload_register('get_autoload_tool');


class GetTeaMsg{
    
    private $id;
    private $a;   

    public function __construct($id){
        $this->id = $id;
    }

    public function Select(){
        $sql = "select * from t_user where tid = '". $this->id. "'";

        $obj = new Sql();
        $res = $obj->read_one($sql);

        $this->a = new Teacher($res);
        $this->a->show();

    }
}

?>