$(document).ready(function() {
    $('.up_list_element').mouseover(function() {
        $(this).find('.social_logo').css({
            'color': 'black',
            '-webkit-transition': 'color 0.2s ease-out',
            '-moz-transition': 'color 0.2s ease-out',
            '-o-transition': 'color 0.2s ease-out',
            'transition': 'color 0.2s ease-out'}
        );
    })
    $('.up_list_element').mouseout(function() {
        $(this).find('.social_logo').css({
            'color': '#a0a0a0',
            '-webkit-transition': 'color 0.4s ease-out',
            '-moz-transition': 'color 0.4s ease-out',
            '-o-transition': 'color 0.4s ease-out',
            'transition': 'color 0.4s ease-out'}
        );
    })

});