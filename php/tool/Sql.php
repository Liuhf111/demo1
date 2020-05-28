<?php
class Sql{
    private $host;
    private $port;
    private $user;
    private $pass;
    private $dbname;
    private $charset;

    public $errno;
    public $error;

    private $link;

    public $columns = 0;

    public $row = 0;

    public function __construct(array $info = array()){
        if(!array_key_exists('host', $info)) $info['host'] = 'localhost';
        if(!array_key_exists('port', $info)) $info['port'] = '3306';
        if(!array_key_exists('user', $info)) $info['user'] = 'root';
        if(!array_key_exists('pass', $info))  $info['pass'] = 'a1563437';
        if(!array_key_exists('dbname', $info))  $info['dbname']= 'order';
        if(!array_key_exists('charset', $info)) $info['charset'] = 'utf8';
        $this->host = $info['host'] ;
        $this->port = $info['port'] ;
        $this->user = $info['user'] ;
        $this->pass = $info['pass'] ;
        $this->dbname = $info['dbname'] ;
        $this->charset = $info['charset'] ;

        if(!$this->connect()) return;
        $this->charset();
    }

    private function connect(){
        $this->link = @mysqli_connect($this->host,$this->user,$this->pass,
        $this->dbname,$this->port);

        if(!$this->link){
            $this->errno = mysqli_connect_errno();
            $this->error = mysqli_connect_error();
            return false;
        }
        return true;
    }

    private function charset(){
        $res = mysqli_set_charset($this->link,$this->charset);

        if(!$res){
            $this->errno = mysqli_errno($this->link);
            $this->error = mysqli_error($this->link);
            return false;
        }
        return true;
    }

    private function check($sql){
        $res = mysqli_query($this->link,$sql);

        if(!$res){
            $this->errno = mysqli_errno($this->link);
            $this->error = mysqli_error($this->link);
            return false;
        }
        return $res;
    }

    public function write($sql){
        $res = $this->check($sql);

        return $res ? mysqli_affected_rows($this->link) : false;
    }

    public function insert_id(){
        return mysqli_insert_id($this->link);
    }

    public function read_one($sql){
        $res = $this->check($sql);

        if($res){
            $this->columns = @mysqli_field_count($this->link);
            return mysqli_fetch_assoc($res);
        } 
        return  $res;
    }

    public function read_all($sql){
        $res = $this->check($sql);
         
        if(!$res) return $res;

        $this->rows = @mysqli_num_rows($res);
        $this->columns = @mysqli_field_count($this->link);

        $list = array();
        while($row = mysqli_fetch_assoc($res)) array_push($list,$row) ;

        return $list;
    }
    
    public function close(){
        mysqli_close($this->link);
    }
}

?>