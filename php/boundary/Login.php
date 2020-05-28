<?php
function log_autoload($classname){
    if(!class_exists($classname)){
        // 内存不存在，尝试加载
        $file = '../control/' .$classname . '.php';
        if(file_exists($file)) include $file;
    }
}
spl_autoload_register('log_autoload');

class Login
{
    static function UserLogin(){
        session_start();
        $id = $_POST['username'];
        $password = $_POST['password'];
        $role = $_POST['role'];

        $_SESSION["id"] = $id;
        $_SESSION['role'] = $role;

        $obj = new SelectUser($id,$password,$role);
        $res = $obj->Select();
        if($res) {
            $msg = array('state' => 'ok');
            if($role == 1){
                $msg['url'] = 'student.html';
            }
            else {
                $msg['url'] = 'teacher.html';
            }
        }
        else    $msg = array('state' => 'no' );

        echo json_encode($msg);

        $_SESSION['name'] = $res;
    }
}

Login::UserLogin();

?>