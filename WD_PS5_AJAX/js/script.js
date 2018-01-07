$(document).ready(function () {
    drawColoredRow();
    authorization();
});

function drawColoredRow() {
    const ARR_OF_COLORS = ['#635960', '#8b8e59', '#eada7d', '#fffecd', '#7bc3ab'];
    const HEADER = $('header');
    const WRAPPER_FOR_COLORS = $('<div>').addClass('wrapper-for-colors');
    const ARR_LENGTH = ARR_OF_COLORS.length;
    for (let i = 0; i < 2; i++) {
        for (let indexOfColor in ARR_OF_COLORS) {
            indexOfColor = +indexOfColor;
            let colorContainer = $('<div>').addClass('container-for-color__header');
            if (i === 0 && indexOfColor === 0 || i === 1 && indexOfColor === (ARR_LENGTH - 1)) {
                colorContainer.css({'background-color': ARR_OF_COLORS[indexOfColor], 'width': '16.5%'});
            } else {
                colorContainer.css('background-color', ARR_OF_COLORS[indexOfColor]);
            }
            WRAPPER_FOR_COLORS.append(colorContainer);
        }
    }
    WRAPPER_FOR_COLORS.addClass('animated rubberBand');
    HEADER.append(WRAPPER_FOR_COLORS);
}

function authorization() {
    $('#login__form').submit(function () {
        const SELF = $(this);
        const SELF_VALUES = SELF.serialize();
        const USER_NAME_INPUT = $('#user-name');
        const USER_PASSWORD_INPUT = $('#user-password');
        const USER_NAME = USER_NAME_INPUT.val();
        const USER_PASSWORD = USER_PASSWORD_INPUT.val();
        let errorMessage = $('.error-message');

        console.log(SELF_VALUES);

        if (isEmptyStr(USER_NAME) || isEmptyStr(USER_PASSWORD)) {
            if (isEmptyStr(USER_NAME)) {
                addClassWithTimeout(USER_NAME_INPUT, 'animated shake');
            }
            if (isEmptyStr(USER_PASSWORD)) {
                addClassWithTimeout(USER_PASSWORD_INPUT, 'animated shake');
            }

            errorMessage.text('Username and password must be filled.');
            addClassWithTimeout(errorMessage, 'animated rubberBand');
            return false;
        }

        $.ajax({
            type: 'POST',
            url: 'login.php',
            data: SELF_VALUES,
            success: function (responseMsg) {
                if (responseMsg === 'registration confirmed') {
                    addClassWithTimeout(SELF, 'animated bounceOutDown');
                    window.location = "chat.html";
                } else if (responseMsg === 'Wrong password.') {
                    addClassWithTimeout(USER_PASSWORD_INPUT, 'animated shake');
                    errorMessage.text(responseMsg);
                    addClassWithTimeout(errorMessage, 'animated rubberBand');
                } else {
                    errorMessage.text(responseMsg);
                    addClassWithTimeout(errorMessage, 'animated rubberBand');
                }
            }
        });
        return false;
    });
}

function addClassWithTimeout(obj, nameOfClass) {
    if (obj.hasClass(nameOfClass)) {
        obj.removeClass(nameOfClass);
    }
    setTimeout(function () {
        obj.addClass(nameOfClass)
    }, 10);
}

function isEmptyStr(str) {
    return (!str || 0 === str.length);
}