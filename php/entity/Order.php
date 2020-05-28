<?php

class TimeTable{

    private $tid;
    private $sid;
    private $time;
    private $msg;
    private $tnote;
    private $snote;

    public function __construct($id,$arr){
        
        $this->tid = $id;
        $this->T = $arr;

    }

    public function show(){

        echo json_encode($this->T);

    }
}

?>