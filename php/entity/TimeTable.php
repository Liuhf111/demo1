<?php

class TimeTable{

    private $tid;
    private $T;

    public function __construct($id,$arr){
        
        $this->tid = $id;
        $this->T = $arr;

    }

    public function show(){

        echo json_encode($this->T);

    }
}

?>