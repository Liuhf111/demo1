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

class  StuOrder 
{
    
    static function DoUpdate($sid,$id,$day,$time,$s_msg){
        $date = date('Y-m-d',(time()-((date('w',time())==0?7:date('w',time()))-$day)*24*3600));
        $sql = "SELECT " .$time. " FROM t_time WHERE tid = '" .$id. "'";
        $s = new Sql();
        $res = $s->read_one($sql);
        if(!$res){
            $msg['state'] = 'no';
            return $msg;
        }
        $str = $res[$time];
        $str[$day-1] = '2';
        $sql2 = "UPDATE t_time SET " .$time. "='".$str."' WHERE tid ='" .$id. "'";
        $res = $s->write($sql2);
        if($res == -1 ){
            $msg['state'] = 'no';
            return $msg;
        }
        $sql = "INSERT INTO orderlist() VALUES (NULL,'".$id."','".$sid."','".$day."','".$time."','".$date."', '".$s_msg."','','','1')";
        $res = $s->write($sql);
        if($res){
            $msg['state'] = 'ok';
        }
        else{
            $msg['state'] = 'no';
        }
        return $msg;
    }
}


