<?php

function my_autoload($classname){
    if(!class_exists($classname)){
        // 内存不存在，尝试加载
        $file = $classname . '.php';
        if(file_exists($file)) include $file;
    }
}

class Teacher extends User{

    private $prof;
    private $room;

    public function __construct($arr){

        $this->prof = $arr['prof'];
        $this->id = $arr['tid'];
        $this->name = $arr['name'];
        $this->dept = $arr['dept'];
        $this->sex = $arr['sex'];
        $this->tel = $arr['tel'];
        $this->room = $arr['room'];
        $this->password = $arr['password'];
        
    }

    public function show(){
        $msg = array('tid' => $this->id, 'name' => $this->name, 
    'dept' => $this->dept, 'sex' => $this->sex, 'room' => $this->room,
    'prof' => $this->prof, 'tel' => $this->tel);
        echo json_encode($msg);
    }

}

?>