const ARR_NAMES = ['Michael Johnson', 'Emma Williams', 'Daniel Brown', 'Sophia Bell', 'David Wilson'];

$(document).ready(function () {

    var containerForDropdown = $('<div>').addClass('container-for-dropdown');
    var wrapperForDefaultOption = $('<div>').addClass('wrapper-for-option remove-border');
    var textOfSelectOption = $('<span>').addClass('text__select-option').text('Select Friend');
    var wrapperForArrow = $('<div>').addClass('wrapper-for-arrow');
    var arrowIcon = $('<img>').attr({'class': 'arrow__icon', 'src': 'icons/arrow-down.png'});
    var panel = $('<div>').addClass('panel-for-dropdown');
    panel.css('display', 'none');

    containerForDropdown.append(wrapperForDefaultOption.append(textOfSelectOption, wrapperForArrow.append(arrowIcon)));

    for (var i = 0, lengthOfArr = ARR_NAMES.length; i < lengthOfArr; i++) {
        var wrapperForOption = $('<div>').addClass('wrapper-for-option');
        var wrapperForIconOption = $('<div>').addClass('wrapper-for-icon__option');
        var iconOfOption = $('<img>').attr({'class': 'icon__option', 'src': ('icons/' + (i + 1) + '.png')});
        var textOfOption = $('<span>').addClass('text__option').text(ARR_NAMES[i]);
        if (i === lengthOfArr - 1) {
            wrapperForOption.addClass('remove-border');
        }
        panel.append(wrapperForOption.append(wrapperForIconOption.append(iconOfOption), textOfOption));
    }
    containerForDropdown.append(panel);
    $('body').append(containerForDropdown);

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