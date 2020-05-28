<?php

function tupdate_autoload($classname){
    if(!class_exists($classname)){
        // 内存不存在，尝试加载
        $file = '../control/' .$classname . '.php';
        if(file_exists($file)) include $file;
    }
}
spl_autoload_register('tupdate_autoload');

class StuShowTable{

    static function DoGet(){
        session_start();
        $id = $_GET['id'];
        ShowTable::Select($id);
    }
}
StuShowTable::DoGet();

?>