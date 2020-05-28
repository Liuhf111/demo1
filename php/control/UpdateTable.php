<?php
function updatetable_autoload($classname){
    if(!class_exists($classname)){
        // 内存不存在，尝试加载
        $file = '../entity/'.$classname . '.php';
        if(file_exists($file)) include $file;
    }
}
function updatetable_autoload_tool($classname){
    if(!class_exists($classname)){
        // 内存不存在，尝试加载
        $file = '../tool/'.$classname . '.php';
        if(file_exists($file)) include $file;
    }
}
spl_autoload_register('updatetable_autoload');
spl_autoload_register('updatetable_autoload_tool');

class  UpdateTable 
{
    static function DoUpdate($id,$T){
        $sql = 'UPDATE t_time SET T1 = "' .$T['t1']. '"';
        for ($i=2; $i <= 6; $i++) { 
            $s = "T".$i;
            $time = $T['t'.$i];
            $sql = $sql.','.$s.' = "'.$time.'"';
        }
        $sql = $sql."WHERE tid = '".$id."'";

        $s = new Sql();
        $res = $s->write($sql);

        if($res != -1 ){
            $msg['state'] = 'ok';
        }
        else{
            $msg['state'] = 'no';
        }
        return $msg;

    }
}


