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

class SelectTea
{
    static function SelectByDept($dept,$prof){
        $obj = new Sql();
        if($dept != "all" && $prof != "all")
            $sql = "SELECT * FROM t_user WHERE dept='".$dept."' and prof='".$prof."' ORDER BY tid";
        elseif($dept == "all" && $prof == "all")
            $sql = "SELECT * FROM t_user  ORDER BY tid";
        elseif ($dept == "all") 
            $sql = "SELECT * FROM t_user WHERE prof='".$prof."' ORDER BY tid";
        elseif ($prof == "all") 
            $sql = "SELECT * FROM t_user WHERE dept='".$dept."' ORDER BY tid";
        $res = $obj->read_all($sql);
        if($res){
            echo json_encode($res);
        }
        $obj->close();
    } 
    static function SelectByName($name){
        $obj = new Sql();
        $sql = "SELECT * FROM t_user WHERE name LIKE '%".$name."%' ORDER BY tid";
        $res = $obj->read_all($sql);
        if($res){
            echo json_encode($res);
        }
        $obj->close();
    }
    static function SelectByTime($day,$time){
        $obj = new Sql();
        switch ($day) {
            case '1': $str = '1%'; break;
            case '2': $str = '_1%'; break;
            case '3': $str = '__1%'; break;
            case '4': $str = '___1%'; break;
            case '5': $str = '%1'; break;
        }
        $sql = "SELECT tid FROM t_time WHERE ".$time." LIKE '".$str."' ORDER BY tid";
        $res = $obj->read_all($sql);
        $list = array();
        foreach ($res as $id => $numb) {
           foreach ($res[$id] as $key => $value) {
               $sql2 = "SELECT * FROM t_user WHERE tid = '".$value."'";
               $res2 = $obj->read_one($sql2);
               if($res2){
                    array_push($list,$res2);
                }
           }
        }
        echo json_encode($list);
        $obj->close();
    }
}


?>