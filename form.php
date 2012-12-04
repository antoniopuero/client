<?php include 'views/header.php'; ?>
	<div id='form_container'>
        <div><em>You can change default profile on profiles tab</em></div>
            <form id ="new_project" name="data" method="post">
                    <div id="tabs">
                        <ul class = "tabs">
                            <li><a href="#tabs-digits">Digits</a></li>
                            <li><a href="#tabs-lists">Option lists</a></li>
                            <li><a href="#tabs-other">Other</a></li>
                            <li><a href="#tabs-profiles">Profiles</a></li>
                        </ul>
                        <div class="panes">
                            <div id="tabs-digits">
                            </div>
                            <div id="tabs-lists">
                            </div>
                            <div id="tabs-other">
                            </div>
                            <div id="tabs-profiles">
                                <b>Profiles: </b>
                                <select name="profiles">
                                    <option name="user_settings" class="prf">&lt;user&gt;</option>
                                </select>
                            </div>
                        </div>
                    </div>
                <button class="send_button btn btn-info">Send</button>
                <button class="save_profile btn">Save profile</button>
            </form>
	</div>
<?php include 'views/footer.php'; ?>