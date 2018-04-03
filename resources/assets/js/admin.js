window.$ = window.jQuery = require('jquery');

$(document).ready(function () {
    $('#show-profile-modal .dropdown-toggle').click(function () {
        $('#show-profile-modal').toggleClass('open')
    });

    $('#save-draft').click(function () {
        $('#draft').val('yes');
        $('.submit-btn').click();
    });

    $('.alert .close').click(function () {
        $(this).parent().remove()
    });

    $('.navbar-header .btn-link').click(function () {
        if ($(this).hasClass('is-active')) {
            $(this).removeClass('is-active')
            $('.app-container').removeClass('expanded')
        } else {
            $(this).addClass('is-active')
            $('.app-container').addClass('expanded')
        }
    })
});
