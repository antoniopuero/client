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
		),
    profiles => array(
        profile1 => array(
            b => 128.9,
            a => 25,
            c => true,
            d => "Some text here",
            e => array('el1', 'el2'),
            f => array('el2', 'el3')
            ),
        profile2 => array(
            b => 300.25,
            a => 40,
            c => true,
            d => "Some text here",
            e => array('el1', 'el2'),
            f => array('el2', 'el3')
        ),
        profile3 => array(
            b => 181.3,
            a => 5,
            c => false,
            d => "Some text here",
            e => array('el2', 'el3'),
            f => array('el2')
        )
    )
);
 echo json_encode($new_job);
?>