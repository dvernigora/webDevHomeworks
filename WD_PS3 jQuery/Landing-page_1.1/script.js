$(document).ready(function () {
    const btnToTop = $('#toTop__Btn');
    const htmlEndBody = $('body, html');
    const scrollToElem = $(".scrollToElem");
    const topShow = 150;
    const delay = 200;

    $(window).scroll(function () {
        if ($(this).scrollTop() > topShow) {
            btnToTop.fadeIn();
        } else {
            btnToTop.fadeOut();
        }
    });

    $(btnToTop).click(function () {
        btnToTop.prop('disabled', true);
        htmlEndBody.animate({scrollTop: 0}, delay, function () {btnToTop.prop('disabled', false);});
    });

    scrollToElem.click(function () {
        let elementClick = $(this).attr("href");
        let destination = $(elementClick).offset().top;
        htmlEndBody.animate({scrollTop: destination}, delay);
    });
});