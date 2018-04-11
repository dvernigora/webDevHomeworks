$(document).ready(function () {
    $('.wrapper-for-colors').addClass('animated rubberBand');
    authorization();
});

function authorization() {
    $('#login__form').submit(function (e) {
        e.preventDefault();
        const SELF = $(this);
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
            return;
        }

        const SELF_VALUES = SELF.serialize();
        $.ajax({
            type: 'POST',
            url: 'login.php',
            data: SELF_VALUES,
            success: function (response) {
                console.log(response);
                let res = JSON.parse(response);
                if (res.err) {
                    console.log(res.err);
                    return;
                }
                if (res.status) {
                    addClassWithTimeout(SELF, 'animated bounceOutDown');
                    window.location = "chat.php";
                } else {
                    errorMessage.text(res.msg);
                    addClassWithTimeout(errorMessage, 'animated rubberBand');
                }
            }
        });
        return;
    });
}

function addClassWithTimeout(obj, nameOfClass) {
    if (obj.hasClass(nameOfClass)) {
        obj.removeClass(nameOfClass);
    }
    obj.addClass(nameOfClass);
}

