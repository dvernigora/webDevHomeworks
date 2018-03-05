const PATH_TO_PHP = 'insert_to_DB.php';
const STATISTICS = 'statistics.php';

$(document).ready(function () {
    $('.container__form').submit(function (e) {
        e.preventDefault();
        const SELF = $(this);
        const SELF_VALUES = SELF.serialize();
        if (!SELF_VALUES) {
            $('.error-msg').text('Choose psycho-type!');
            return false;
        }
        $.ajax({
            type: 'POST',
            url: PATH_TO_PHP,
            data: SELF_VALUES,
            success: function (responseMsg) {
                if (responseMsg) {
                    window.location = STATISTICS;
                }
            }
        });
    });
});