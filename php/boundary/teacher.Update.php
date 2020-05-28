<?php
function tupdate_autoload($classname){
    if(!class_exists($classname)){
        // 内存不存在，尝试加载
        $file = '../control/' .$classname . '.php';
        if(file_exists($file)) include $file;
    }
}
spl_autoload_register('tupdate_autoload');

class Update{
    static function UpdateMyTable(){
        session_start();
        $id = $_SESSION['id'];
        $arr['t1'] = $_GET['T1'];
        $arr['t2'] = $_GET['T2'];
        $arr['t3'] = $_GET['T3'];
        $arr['t4'] = $_GET['T4'];
        $arr['t5'] = $_GET['T5'];
        $arr['t6'] = $_GET['T6'];
        $res = UpdateTable::DoUpdate($id,$arr);
        echo json_encode($res);
    }
}
Update::UpdateMyTable();

?>