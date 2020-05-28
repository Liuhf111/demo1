<?php

function my_autoload($classname){
    if(!class_exists($classname)){
        // 内存不存在，尝试加载
        $file = $classname . '.php';
        if(file_exists($file)) include $file;
    }
}

class Student extends User{

    public function __construct($arr){

        $this->id = $arr['sid'];
        $this->name = $arr['name'];
        $this->dept = $arr['dept'];
        $this->sex = $arr['sex'];
        $this->tel = $arr['tel'];
        $this->password = $arr['password'];
    }

    public function show(){
        $msg = array('sid' => $this->id, 'name' => $this->name, 
    'dept' => $this->dept, 'sex' => $this->sex, 'tel' => $this->tel);
        echo json_encode($msg);
    }

}

?>