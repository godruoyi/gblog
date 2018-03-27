window.$ = window.jQuery = require('jquery');

$(document).ready(function () {
    $('#show-profile-modal .dropdown-toggle').click(function () {
        $('#show-profile-modal').toggleClass('open')
    });

    $('#reply_notice').click(function () {
        let input = document.getElementById('post-banner')
        input.click()
    });
});
