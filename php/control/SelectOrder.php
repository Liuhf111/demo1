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

class SelectOrder
{
    static function SelectAll($id,$t){
        $obj = new Sql();
        $sql = "SELECT * FROM  orderlist WHERE ".$t." ='".$id."' ORDER BY date,T";
        $res = $obj->read_all($sql);
        if($res){
            echo json_encode($res);
        }
        $obj->close();
    } 
    static function SelectValid($id,$t){
        $obj = new Sql();
        $sql = "SELECT * FROM  orderlist WHERE ".$t." ='".$id."' and state='1' ORDER BY date,T";
        $res = $obj->read_all($sql);
        if($res){
            echo json_encode($res);
        }
        $obj->close();
    }
    static function SelectByDetail($sid,$day,$time){
        $obj = new Sql();
        $sql = "SELECT * FROM  orderlist WHERE sid='".$sid."' and day='".$day."' and T ='".$time."' and state='1' ";
        $res = $obj->read_one($sql);
        return $res;
    }
}
?>