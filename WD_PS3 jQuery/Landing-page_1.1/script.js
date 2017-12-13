$(document).ready(function () {
    const topShow = 150;
    const delay = 200;
    let isScrollToTop = false;

    $(window).scroll(function () {
        if ($(this).scrollTop() > topShow) {
            $('#toTop__Btn').fadeIn();
        } else {
            $('#toTop__Btn').fadeOut();
        }
    });

    $('#toTop__Btn').click(function () {
        if (!isScrollToTop) {
            isScrollToTop = true;
            $('body, html').animate({scrollTop: 0}, delay, function(){isScrollToTop = false;});
        }
    });

    $(".scrollToElem").click(function () {
        let elementClick = $(this).attr("href");
        let destination = $(elementClick).offset().top;
        $('html,body').animate({scrollTop: destination}, delay);
    });
});