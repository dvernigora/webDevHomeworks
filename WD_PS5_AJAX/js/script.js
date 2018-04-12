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

        if (!USER_NAME.match(/^[0-9a-zA-Zа-яА-Я]+$/) && USER_NAME) {
            errorMessage.text('Username must contain only alphanumeric characters')
            .addClass('animated rubberBand');
            return;
        }

        if (!USER_NAME || !USER_PASSWORD) {
            if (!USER_NAME) {
                USER_NAME_INPUT.addClass('animated shake');
            }
            if (!USER_PASSWORD) {
                USER_PASSWORD_INPUT.addClass('animated shake');
            }

            errorMessage.text('Username and password must be filled')
            .addClass('animated rubberBand');
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
                    SELF.addClass('animated bounceOutDown');
                    window.location = "chat.php";
                } else {
                    errorMessage.text(res.msg)
                    .addClass('animated rubberBand');
                }
            }
        });
        return;
    });
}

