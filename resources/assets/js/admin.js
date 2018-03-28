window.$ = window.jQuery = require('jquery');

$(document).ready(function () {
    $('#show-profile-modal .dropdown-toggle').click(function () {
        $('#show-profile-modal').toggleClass('open')
    });

    $('#save-draft').click(function () {
        $('#draft').val('yes');
        $('.submit-btn').click();
    });
});
