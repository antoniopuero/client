<?php
header('Content-type: text/json');
$new_job =array(
    b => 'float',
	a => 'int',
	c => 'bool',
	d => 'blob',
	e => array(
        type => 'list_check',
		0 => 'el1',
		1 => 'el2',
		2 => 'el3'
		),
		f => array(
        type => 'list_option',
		0 => 'el1',
		1 => 'el2',
		2 => 'el3'
		)
	);
 echo json_encode($new_job);
?>