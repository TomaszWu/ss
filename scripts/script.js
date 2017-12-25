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

    // $('.make-it-fade').click(function () {
    //     $('.darkness').toggleClass('active-fade');
    // }

    $('.hamburger-nav').click(function(){
        $('body').toggleClass('nav_mobile_click').toggleClass('noScroll');
        $('.hamburger-nav').toggleClass('hamburger-nav_clicked');
        $('.darkness').toggleClass('active-fade');
        // $('.test').toggleClass('test2');
    })

    $('.side_menu_cross div').click(function(){
        $('body').toggleClass('nav_mobile_click').toggleClass('noScroll');
        $('.hamburger-nav').toggleClass('hamburger-nav_clicked');
        $('.darkness').toggleClass('active-fade');
        // $('.test').toggleClass('test2');
    })





    $.ajax({
        url: 'https://api.instagram.com/v1/users/self/media/recent/?access_token=5785778428.ff093f1.f21e2fef7d5f4bef97e36303fb73a856',
        type: 'GET',
        success: function(result) {
            var footerLi = $('.content-instagram');
            for(var i = 0; i < 6; i++){
                var pictueToAdd =
                    "<li>" +
                    "<div class='instagram-post'>" +
                        '<a href="' + result.data[i].link + '">' +
                        "<img src=" + result.data[i].images.low_resolution.url + ">" +
                        "<div class='instagram-details'>" +
                            "<div class='instagram-details-handler'>" +
                            "<i class=\"far fa-heart\"></i><span>" + result.data[i].likes.count + "</span>" +
                            "<i class=\"far fa-comments\"></i><span>" + result.data[i].comments.count + "</span>" +
                            "</div>" +
                        "</div>" +
                        "</a>"
                    "</div>" +
                    "</li>";
                footerLi.append(pictueToAdd);
            }

            var maxHeight = resizeInstagramHeight();
            var footerLiImg = $('.content-instagram li div img');

            $.when(footerLiImg.length === 6).then(function(){
                centerInstaragramPhotos(maxHeight);
            });
        }
    });

    $( window ).resize(function() {
        var maxHeight = resizeInstagramHeight();
        centerInstaragramPhotos(maxHeight);


    });

    function resizeInstagramHeight(){
        var maxHeight = Number.MAX_SAFE_INTEGER;
        var footerLiImg = $('.content-instagram li div img');

        for(var i = 0; i < footerLiImg.length; i++){
            if(footerLiImg[i].clientHeight < maxHeight){
                maxHeight = footerLiImg[i].clientHeight;
            }
        }
        $('.content-instagram').css('height', maxHeight);

        return maxHeight;
    }

    function centerInstaragramPhotos(maxHeight){
        var footerLiImg = $('.content-instagram li div img');

        for(var i = 0; i < footerLiImg.length; i++){
            if(footerLiImg[i].clientHeight !== maxHeight){
                var heightToResize = (footerLiImg[i].clientHeight - maxHeight) / 2;
                $(footerLiImg[i]).css({
                    'transform': 'translateY(-' + heightToResize + 'px)',
                    'top': heightToResize
                });
            }
        }
    }



});