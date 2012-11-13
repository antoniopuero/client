<?php
    $jobs = array();
    for ($i = 0; $i < 300; $i += 1) {
        array_push($jobs, array('id' => $i, 'name' => 'job'.$i, 'type' => 1, 'parameters' => array('key1' => 'value1', 'key2' => 'value2', 'key3' => 'value3'), 'status' => 'in process'));
    }
header('Content-type: text/json');
echo json_encode($jobs);
?>