const INSERT_TO_DB = 'insert_to_DB.php';
const STATISTICS = 'statistics.php';

$(document).ready(function () {
    $('.container__form').submit(function (e) {
        e.preventDefault();
        const self = $(this);
        const selfVal = self.serialize();
        if (!selfVal) {
            $('.error-msg').text('Choose psycho-type!');
            return false;
        }
        $.ajax({
            type: 'POST',
            url: INSERT_TO_DB,
            data: selfVal,
            success: function (responseMsg) {
                if (responseMsg === 'ok') {
                    window.location = STATISTICS;
                } else {
                    console.log(responseMsg);
                }
            }
        });
    });
});