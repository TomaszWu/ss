document.onreadystatechange = () => {
    if (document.readyState === 'complete') {

        scaleImg();

        $( window ).resize(function() {
                scaleImg();


        });

        $('.product-image-desktop ').on( "swipe", swipeHandler );

        // Callback function references the event target and adds the 'swipe' class to it
        function swipeHandler( event ){
            $( event.target ).addClass( "swipe" );
        }

        function scaleImg() {

            if (window.matchMedia('(min-width: 1000px)').matches) {

                $('.desktop').removeClass('displayNo');
                $('.mobile').addClass('displayNo');

                $('.product-image-desktop ')
                    .mousemove(function(e) {
                        if($(this).hasClass('product-image-desktop')){

                        var offset = $(this).offset();
                        var relativeX = (e.pageX - offset.left);
                        var relativeY = (e.pageY - offset.top);
                        var width = $(this).width();
                        var height = $(this).height();

                        var xIndex = width - relativeX;
                        var yIndex = height - relativeY;


                        $(this).css({
                            'transform':'scale(2) translate('+xIndex/4+'px,'+yIndex/4+'px)'
                        })
                        }


                    })
                    .mouseleave(function () {
                        $(this).css({
                            'transform':'scale(1) translate(0,0)'
                        })
                    })
                    .click(function () {

                        var index = $( ".product-image-desktop" ).index( this );




                        $('.handler-carousel').removeClass('displayNo');
                        $('.product-image-full-screen').eq(index).toggleClass('displayNo');
                        $('.carousel li ').eq(index).toggleClass('displayNo');


                        $(this).css({
                            'transform':'translate(0px,0px)'
                        })

                        if($(this).hasClass('product-image-desktop')){
                            $('body').toggleClass('noScroll');
                        }



                    })

            } else {

                $('.desktop').addClass('displayNo');
                $('.mobile').removeClass('displayNo');

            }

        }


        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

        });



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

            $('.hamburger-nav').click(function(){
                // $('body').toggleClass('test');
                $('body').toggleClass('nav_mobile_click').toggleClass('noScroll');
                $('.hamburger-nav').toggleClass('hamburger-nav_clicked');
                $('.darkness').toggleClass('active-fade');
            })

            $('.side_menu_cross div').click(function(){
                $('body').toggleClass('nav_mobile_click').toggleClass('noScroll');
                $('.hamburger-nav').toggleClass('hamburger-nav_clicked');
                $('.darkness').toggleClass('active-fade');
            })

        $('.thumbnails-photos ul li').mouseover(function (e) {

            var productImgs = $('.product-image-desktop');
            var index = $(this).index();
            var imgToHide = getActiveImage();


            for(var i = 0; i < productImgs.length; i++){
                if(i === imgToHide) {
                    productImgs[imgToHide].classList.remove('active');
                }

                if(i === index){
                    productImgs[index].classList.add('active');
                }
            }
        });

        function getActiveImage(){
            var productImgs = $('.product-image-desktop');
            for(var i = 0; i < productImgs.length; i++){
                if(productImgs[i].classList.contains('active')){
                    return i;
                }
            }
        }


        $('.carousel-close').click(function (e) {

            $(this).parent().addClass('displayNo');
            $('.product-image-full-screen').addClass('displayNo');
            $('.carousel li ').addClass('displayNo');
            $('body').toggleClass('noScroll');
        })
        ;

        $('.product-image-full-screen').click(function (e) {

            $('.handler-carousel').addClass('displayNo');
            $('.product-image-full-screen').addClass('displayNo');
            $('.carousel li ').addClass('displayNo');
            $('body').toggleClass('noScroll');
        })
        ;



        $('.arrow-rigth div ').click(function (e) {

        var carousel = $('.carousel li img');

        var index = getIndexOfActiveImg(carousel);

        var activeImg = carousel.eq(index);

        activeImg.toggleClass('displayNo');

        var nextImg = carousel.eq(0);

        if(index < carousel.length - 1){
            var nextImg = carousel.eq(index + 1)

        }

        nextImg.toggleClass('displayNo')

        });


        $('.arrow-left div ').click(function (e) {

            var carousel = $('.carousel li img');

            var index = getIndexOfActiveImg(carousel);

            var activeImg = carousel.eq(index);

            activeImg.toggleClass('displayNo');

            var nextImg = carousel.eq(index - 1);

            if(index < 0){
                var nextImg = carousel.eq(carousel.length - 1)

            }

            nextImg.toggleClass('displayNo')

        });






        function getIndexOfActiveImg(carousel) {


            for(var i = 0; i < carousel.length; i++ ){

                var activeImg = carousel.eq(i);

                if(!activeImg.hasClass('displayNo')){
                    return i;
                }

            }
        }


        $('.handler-carousel').mousemove(function(e) {

            var element = $(this).children().children().children().children();

            var offset = element.offset();
            var relativeY = (e.pageY - offset.top);
            var height = element.height();

            var yIndex = height/2 - relativeY;

            element.css({
                'transform':'translate(0px,'+((yIndex/10) - 2 )+'px)'
            })

        })
        ;

            $.ajax({
                url: 'https://api.instagram.com/v1/users/self/media/recent/?access_token=',
                type: 'GET',
                success: function(result) {
                    var footerLi = $('.content-instagram');
                    var j = 0;
                    for(var i = 0; i < result.data.length; i++){
                        if(result.data[i].images.low_resolution.height === 320 && j < 6){
                            var pictueToAdd =
                                "<li>" +
                                "<div class='instagram-post'>" +
                                    "<img src=" + result.data[i].images.low_resolution.url +

                                ">" +

                                    "<div class='instagram-details'>" +
                                        "<div class='instagram-details-handler'>" +
                                        "<i class=\"far fa-heart\"></i><span>" + result.data[i].likes.count + "</span>" +
                                        "<i class=\"far fa-comments\"></i><span>" + result.data[i].comments.count + "</span>" +
                                        "</div>" +
                                    "</div>" +
                                    "<a href=" + result.data[i].link + "></a>" +
                                "</div>" +
                                "</li>";
                            footerLi.append(pictueToAdd);
                            j = j + 1;
                        }
                    }

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
                $('.content-instagram').css('height', maxHeight * 2);

                return maxHeight;
            }

            function centerInstaragramPhotos(maxHeight){
                var footerLiImg = $('.content-instagram li div img');

                for(var i = 0; i < footerLiImg.length; i++){
                    if(footerLiImg[i].clientHeight !== maxHeight){
                        var heightToResize = (footerLiImg[i].clientHeight - maxHeight) / 2;
                        $(footerLiImg[i]).css({
                            'transform': 'translateY(-' + heightToResize + 'px)',
                            'top': heightToResize,
                        });
                    }
                }
            }

            window.addEventListener("load", function(event) {
            });

            var lazy = [];

            registerListener('load', setLazy);
            registerListener('load', lazyLoad);
            registerListener('scroll', lazyLoad);
            registerListener('resize', lazyLoad);


            function setLazy(){

                lazy = document.getElementsByClassName('product-image-main');

            }


            function lazyLoad(){

                for(var i=0; i<lazy.length; i++){
                    if(isInViewport(lazy[i])){
                        lazy[i].classList.add('lazy-visible');
                        lazy[i].parentElement.parentElement.parentElement.parentElement.classList.add('lazy-visible');
                        if (lazy[i].getAttribute('data-src')){
                            lazy[i].src = lazy[i].getAttribute('data-src');
                            lazy[i].removeAttribute('data-src');
                        }
                    }
                }

                cleanLazy();
            }

            function cleanLazy(){
                lazy = Array.prototype.filter.call(lazy, function(l){ return l.getAttribute('data-src');});
            }

            function isInViewport(el){
                var rect = el.getBoundingClientRect();

                return (
                    rect.bottom >= 0 &&
                    rect.right >= 0 &&
                    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.left <= (window.innerWidth || document.documentElement.clientWidth)
                );
            }

            function registerListener(event, func) {
                if (window.addEventListener) {
                    window.addEventListener(event, func);
                } else {
                    window.attachEvent('on' + event, func);
                }
            }


// drag carousel ////////////




    }
};