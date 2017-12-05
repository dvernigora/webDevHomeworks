const ARR_NAMES = ['Michael Johnson', 'Emma Williams', 'Daniel Brown', 'Sophia Bell', 'David Wilson'];

$(document).ready(function () {
    const containerForDropdown = $('.container-for-dropdown');
    const wrapperForDefaultOption = $('.wrapper-for-default-option');
    const wrapperForArrow = $('.wrapper-for-arrow');
    const arrowIcon = $('.arrow__icon');
    const panel = $('.panel-for-dropdown');
    const delayOfAnimation = 500;

    for (let i = 0, lengthOfArr = ARR_NAMES.length; i < lengthOfArr; i++) {
        let wrapperForOption = $('<div>').addClass('wrapper-for-option');
        let wrapperForIconOption = $('<div>').addClass('wrapper-for-icon__option');
        let iconOfOption = $('<img>').attr({'class': 'icon__option', 'src': ('icons/' + (i + 1) + '.png')});
        let textOfOption = $('<span>').addClass('text__option').text(ARR_NAMES[i]);
        if (i === lengthOfArr - 1) {
            wrapperForOption.addClass('remove-border');
        }
        panel.append(wrapperForOption.append(wrapperForIconOption.append(iconOfOption), textOfOption));
    }
    containerForDropdown.append(panel);
    $('body').append(containerForDropdown);

    $('.wrapper-for-option').click(function () {
        if (panel.is(':visible')) {
            wrapperForArrow.remove();
            let elementClick = $(this).html();
            wrapperForDefaultOption.empty();
            wrapperForDefaultOption.append(elementClick, wrapperForArrow.append(arrowIcon));
            panel.slideUp(delayOfAnimation);
            wrapperForDefaultOption.addClass('remove-border');
        } else {
            panel.slideDown(delayOfAnimation);
            wrapperForDefaultOption.removeClass('remove-border');
        }
    });

    $(document).click(function (event) {
        if (panel.is(':visible') && !$(event.target).closest('.container-for-dropdown').length) {
            panel.slideUp(delayOfAnimation);
            wrapperForDefaultOption.addClass('remove-border');
        }
    });
});
