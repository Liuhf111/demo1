<?php
function tupdate_autoload($classname){
    if(!class_exists($classname)){
        // 内存不存在，尝试加载
        $file = '../control/' .$classname . '.php';
        if(file_exists($file)) include $file;
    }
}
spl_autoload_register('tupdate_autoload');

class SendOrder{
    static function UpdateTable(){
        session_start();
        $sid = $_SESSION['id'];
        $tid = $_GET['id'];
        $day = $_GET['day'];
        $time = 'T'.$_GET['time'];
        $msg = $_GET['msg'];
        // $id='1704001';$day='2';$time='T3';
        $exit = SelectOrder::SelectByDetail($sid,$day,$time);
        if($exit){
            $msg['state']='exit';
            echo json_encode($msg);
        }else {
            $res = StuOrder::DoUpdate($sid,$tid,$day,$time,$msg);
            echo json_encode($res);
        }
    }
}
SendOrder::UpdateTable();

?>