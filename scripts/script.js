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

    $('.product .content a').mouseover(function() {
        $(this).parent().parent().css({
            'border': '1px solid black'}
        );
    })
    $('.product .content a').mouseout(function() {
        $(this).parent().parent().css({
            'border': '1px solid white'}
        );
    })


    $.ajax({
        url: 'https://api.instagram.com/v1/users/self/media/recent/?access_token=',
        type: 'GET',
        success: function(result) {
            var footerLi = $('.content-instagram');
            for(var i = 0; i < 6; i++){
                var pictueToAdd = "<li><img src=" + result.data[i].images.low_resolution.url + "></li>";
                footerLi.append(pictueToAdd);
            }
        }
    });


    $( window ).resize(function() {
        var minHeight = 111111110;
        var footerLi = $('.content-instagram li img');
        for(var i = 0; i < footerLi.length; i++){
            if(footerLi[i].clientHeight < minHeight){
                minHeight = footerLi[i].clientHeight;
            }

        }
        $('.content-instagram').css('height', minHeight);
    });

});