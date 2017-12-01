const ARR_NAMES = ['Michael Johnson', 'Emma Williams', 'Daniel Brown', 'Sophia Bell', 'David Wilson'];

$(document).ready(function () {

    var containerForDropdown = $('.container-for-dropdown');
    var wrapperForDefaultOption = $('.wrapper-for-default-option');
    var textOfSelectOption = $('.text__select-option');
    var wrapperForArrow = $('.wrapper-for-arrow');
    var arrowIcon = $('.arrow__icon');
    var panel = $('.panel-for-dropdown');

    for (var i = 0, lengthOfArr = ARR_NAMES.length; i < lengthOfArr; i++) {
        var textOfOption = $('<div>').addClass('text__option').text(ARR_NAMES[i]);
        $('#wrapper-for-option__' + (i + 1)).append(textOfOption);
    }

    $('.wrapper-for-option').click(function () {
        var delay = 500;
        if (panel.is(":visible")) {
            var elementClick = $(this).html().split('<div class="wrapper-for-arrow">')[0];
            wrapperForDefaultOption.empty();
            wrapperForDefaultOption.append(elementClick, wrapperForArrow.append(arrowIcon));
            wrapperForDefaultOption.addClass('remove-border');
            panel.slideUp(delay);
        } else {
            wrapperForDefaultOption.empty();
            wrapperForDefaultOption.append(textOfSelectOption, wrapperForArrow.append(arrowIcon));
            $(this).removeClass('remove-border');
            panel.slideDown(delay);
        }
    });
});