$(document).ready(function () {
    var top_show = 150;
    var delay = 500;
    $(window).scroll(function () {
        if ($(this).scrollTop() > top_show) $('#topBtn').fadeIn();
        else $('#topBtn').fadeOut();
    });
    $('#topBtn').click(function () {
        $('body, html').animate({
            scrollTop: 0
        }, delay);
    });
});
