$(document).ready(function () {
    let topShow = 150;
    let delay = 1000;
    $(window).scroll(function () {
        if ($(this).scrollTop() > topShow) {
            $('#toTop__Btn').fadeIn();
        } else {
            $('#toTop__Btn').fadeOut();
        }
    });
    $('#toTop__Btn').click(function () {
        $('body, html').animate({scrollTop: 0}, delay);
    });


    $(".scrollToElem").click(function () {
        let elementClick = $(this).attr("href");
        let destination = $(elementClick).offset().top;
        $('html,body').animate({scrollTop: destination}, delay);
    });
});