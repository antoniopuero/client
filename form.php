<?php include 'views/header.php'; ?>
	<div id='form_container' class ="span9 offset1">
            <form id ="new_project" name="data" method="post">
                    <div id="tabs" class="tabbable span5">
                        <ul class="nav nav-tabs">
                            <li class="active"><a href="#tabs-digits" data-toggle="tab">Digits</a></li>
                            <li><a href="#tabs-lists" data-toggle="tab">Option lists</a></li>
                            <li><a href="#tabs-other" data-toggle="tab">Other</a></li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane active" id="tabs-digits">
                            </div>
                            <div class="tab-pane" id="tabs-lists">
                            </div>
                            <div class="tab-pane" id="tabs-other">
                            </div>
                        </div>
                    </div>
                    <div class="span3" id="profiles">
                        <b>Profiles: </b>
                        <select name="profiles">
                            <option name="user_settings" class="prf">&lt;user&gt;</option>
                        </select>
                    </div>
                    <div class="span9">
                    <button class="send_button btn btn-info">Send</button>
                    <button class="save_profile btn">Save profile</button>
                    </div>
            </form>
	</div>
<?php include 'views/footer.php'; ?>