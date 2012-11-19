<?php
$liteJobs = array(
		array(
            id => 13,
			name => 'jobset',
			type => 'set',
			subjobs => array(
				array(
                    id => 13.1,
					name => 'jobset',
					type => 'set'
				),
                array(
                    id => 13.2,
                    name => 'jobset',
                    type => 'set'
                ),
                array(
                    id => 13.3,
                    name => 'jobset',
                    type => 'set'
                )
			)
		),
		array(
            id => 14,
			name => 'workflow',
			type => 'workflow'
		)
	);
header('Content-type: text/json');
echo json_encode($liteJobs);
?>