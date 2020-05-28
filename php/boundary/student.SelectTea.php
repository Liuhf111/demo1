<?php

function teamsg_autoload($classname){
    if(!class_exists($classname)){
        // 内存不存在，尝试加载
        $file = '../control/' .$classname . '.php';
        if(file_exists($file)) include $file;
    }
}
spl_autoload_register('teamsg_autoload');

class  SelectTeacher
{
    public function main(){
        session_start();
        $find = $_POST["find"];
        // $find = 3;
        if($find == 1){
            $dept = $_POST["dept"];
            $prof = $_POST["profession"];
            // $dept='all';
            // $prof='all';
            SelectTea::SelectByDept($dept,$prof);
        }
        elseif($find == 2){
            $name = $_POST["name"];
            // $name='古';
            SelectTea::SelectByName($name);
        }
        else{
            $day = $_POST["day"];
            $time = $_POST["time"];
            // $day=1;
            // $time='T1';
            SelectTea::SelectByTime($day,$time);
        }

    }
}

$obj = new SelectTeacher();
$obj->main();
?>