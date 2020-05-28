<?php

function tupdate_autoload($classname){
    if(!class_exists($classname)){
        // 内存不存在，尝试加载
        $file = '../control/' .$classname . '.php';
        if(file_exists($file)) include $file;
    }
}
spl_autoload_register('tupdate_autoload');

class ShowOrder
{
    static function DoShow(){
        session_start();
        $id = $_SESSION['id'];
        $func = $_GET['func'];
        if($func == 1){
            $find = $_GET['find'];
            $t = 'tid';
            if($find == 1) {
                SelectOrder::SelectAll($id,$t);
            }
            else {
                SelectOrder::SelectValid($id,$t);
            }
        }
        elseif ($func == 2) {
            $id = $_GET['id'];
        
            $obj = new GetStuMsg($id);
            $obj->Select();
        }        
    }
}
ShowOrder::DoShow();

?>