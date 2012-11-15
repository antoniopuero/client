<?php include 'views/header.php'; ?>
	<div id='wrap'>
	<div id='form_container'>
            <form id ="new_project" name="data" method="post">
                <div id="tabs">
                    <ul class = "tabs">
                        <li><a href="#tabs-digits">Digits</a></li>
                        <li><a href="#tabs-lists">Option lists</a></li>
                        <li><a href="#tabs-other">Other</a></li>
                    </ul>
                    <div class="panes">
                        <div id="tabs-digits">
                        </div>
                        <div id="tabs-lists">
                        </div>
                        <div id="tabs-other">
                        </div>
                    </div>
                </div>
                <button class="send_button">Send</button>
            </form>
	</div>
	</div>
	<!--<script type="text/javascript">
	(function (Events) {
        Events.formConstruct($('#form_container'));
	})(Events);
	</script>-->
<?php include 'views/footer.php'; ?>