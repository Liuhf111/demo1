<?php
function teamsg_autoload($classname){
    if(!class_exists($classname)){
        // 内存不存在，尝试加载
        $file = '../control/' .$classname . '.php';
        if(file_exists($file)) include $file;
    }
}
spl_autoload_register('teamsg_autoload');

class GetMsg {

    static function DoGet(){
        session_start();
        $id = $_SESSION['id'];
        $role = $_SESSION['role'];
        if($role == 1){
            $obj = new GetStuMsg($id);
            $obj->Select();
        }
        else{
            $obj = new GetTeaMsg($id);
            $obj->Select();
        }
    }
}

GetMsg::DoGet();

?>