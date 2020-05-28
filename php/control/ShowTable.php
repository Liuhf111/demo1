<?php
function showtable_autoload($classname){
    if(!class_exists($classname)){
        // 内存不存在，尝试加载
        $file = '../entity/'.$classname . '.php';
        if(file_exists($file)) include $file;
    }
}
function showtable_autoload_tool($classname){
    if(!class_exists($classname)){
        // 内存不存在，尝试加载
        $file = '../tool/'.$classname . '.php';
        if(file_exists($file)) include $file;
    }
}
spl_autoload_register('showtable_autoload');
spl_autoload_register('showtable_autoload_tool');

class  ShowTable 
{
    static function Select($id){
        $sql = "SELECT T1,T2,T3,T4,T5,T6 FROM t_time WHERE tid = '" .$id. "'";
        $s = new Sql();
        $res = $s->read_one($sql);
        if($res){
            $obj = new TimeTable($id, $res);
            $obj->show();
        }
        else echo 'fail';
        $s->close();
    }
        
}
