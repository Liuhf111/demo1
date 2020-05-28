<?php
function selecttable_autoload($classname){
    if(!class_exists($classname)){
        // 内存不存在，尝试加载
        $file = '../entity/'.$classname . '.php';
        if(file_exists($file)) include $file;
    }
}
function selecttable_autoload_tool($classname){
    if(!class_exists($classname)){
        // 内存不存在，尝试加载
        $file = '../tool/'.$classname . '.php';
        if(file_exists($file)) include $file;
    }
}
spl_autoload_register('selecttable_autoload');
spl_autoload_register('selecttable_autoload_tool');

class  SelectTable 
{
    private $id;
    private $obj;

    public function __construct($id){
        $this->id = $id;
    }

    public function SelectById(){
        $sql = "SELECT T1,T2,T3,T4,T5,T6 FROM t_time WHERE tid = '" .$this->id. "'";
        $s = new Sql();
        $res = $s->read_one($sql);
        if($res){
            $this->obj = new TimeTable($this->id, $res);
            $this->obj->show();
        }
        else echo 'fail';
    }
        
}
