$(document).ready(function () {
    $('.wrapper-for-colors').addClass('animated rubberBand');
    authorization();
});

function authorization() {
    $('#login__form').submit(function (e) {
        e.preventDefault();
        const SELF = $(this);
        const SELF_VALUES = SELF.serialize();
        const USER_NAME_INPUT = $('#user-name');
        const USER_PASSWORD_INPUT = $('#user-password');
        const USER_NAME = USER_NAME_INPUT.val();
        const USER_PASSWORD = USER_PASSWORD_INPUT.val();
        let errorMessage = $('.error-message');

        if (!USER_NAME || !USER_PASSWORD) {
            if (!USER_NAME) {
                addClassWithTimeout(USER_NAME_INPUT, 'animated shake');
            }
            if (!USER_PASSWORD) {
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
                    window.location = "chat.php";
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
    obj.addClass(nameOfClass)
}

