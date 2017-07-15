$(function() {

    'use strict';

    //$('html').removeClass('no-js')




    //************************************************************
    //MENU TOGGLE
    //************************************************************

    $('.header__button-menu').click(function() {
        $(this).toggleClass('active');
        $('.menu').fadeToggle(500).css('display', 'flex');
        $('body').attr('data-color', $('.header__button-menu').hasClass('active') ? 'dark' : $('.section.active').attr('data-color'));
    });

    //************************************************************
    //MENU TOGGLE
    //************************************************************
    var menuNav = '<nav class="menu__nav"><ul>';
    $('.section').each(function() {
        var sectionName = $(this).attr('data-name'),
            href = sectionName.replace(/\s+/g, '-');
        menuNav += '<li><a href=\"#' + href + '\">' + sectionName + '</a></li>';
    });
    menuNav += "</ul></nav>";

    $('.menu').prepend(menuNav).on('click', 'a', function() {
        $('.header__button-menu').removeClass('active');
        $('.menu').fadeOut(500);
        if ($(window).width() <= 1400 || $(window).height() <= 760) {
            var thisSect = $('.section[data-name="' + $(this).attr('href').replace(/#+/g, '').replace(/-+/g, ' ') + '"]').offset().top;
            $('html, body').animate({scrollTop: thisSect }, ((Math.abs(thisSect - $(window).scrollTop()) * 0.1) + 600), 'swing');
        }
    });


    //************************************************************
    //SECTION SCROLL
    //************************************************************
    var scrollifyOpt = {
        section: '.section',
        sectionName: 'name',

        before: function(i, sections) {

            var sectionHref = sections[i].attr('data-name').replace(/\s+/g, '-'),
                sectionColor = sections[i].attr('data-color');

            $('.section').removeClass('active');
            sections[i].addClass('active');

            $('.pagination a').removeClass('active');
            $('.pagination').find('a[href=\"#' + sectionHref + '\"]').addClass('active');
            $('body').attr('data-color', sectionColor);
            console.log( );
            if (sections[i].index('.section') === sections.length - 1) {
                $('.footer__button-scroll-top').fadeIn();
                $('.footer__button-scroll-down').fadeOut();
            } else {
                $('.footer__button-scroll-down').fadeIn();
                $('.footer__button-scroll-top').fadeOut();
            }
        },
        afterRender: function(i, sections) {
            var pagination = '<div class=\"pagination\">',
                activeClass = '';
            $('.section').each(function(i) {
                activeClass = '';
                var sectionName = $(this).attr('data-name'),
                    href = sectionName.replace(/\s+/g, '-');
                if (i === 0) {
                    activeClass = 'active';
                }
                pagination += '<a class=\"' + activeClass + '\" href=\"#' + href + '\"></a>';
            });
            pagination += "</div>";
            $('body').prepend(pagination);


            $('.pagination a, .menu a').on('click', function() {
                $.scrollify.move($(this).attr('href'));
            });
            $('.footer__button-scroll-down').on('click', $.scrollify.next);
        }
    };

    function initialScroll(opt) {
        if ($(window).width() <= 1400 || $(window).height() <= 760) {
           $.scrollify.setOptions({setHeights:false});
           $.scrollify.disable();
           $('body').removeAttr('data-color')
           $('.section').removeAttr('style').removeClass('active');
        } else {
           $.scrollify(opt);
           $.scrollify.enable();
           $.scrollify.setOptions({setHeights:true});
        }
    }
    initialScroll(scrollifyOpt);


    //************************************************************
    //SLIDER
    //************************************************************
    var $speakersBox = $('.speakers__box');
    $speakersBox.addClass('owl-carousel');

    function speakersWrap(count) {
        $('.speakers__item').unwrap('.speakers__wrap');
        while ($speakersBox.children(':not(.speakers__wrap)').length) {
            $speakersBox.children(':not(.speakers__wrap):lt(' + count + ')').wrapAll('<div class="speakers__wrap">');
        }
    }

    function optionsOwl(count) {
        return {
            loop: true,
            items: 1,
            nav: true,
            navText: '',
            autoplayTimeout: 5000,
            autoplay: true,
            smartSpeed: 1200,
            //autoHeight: true,
            onInitialize: speakersWrap(count),
            onInitialized: function() {
                $.scrollify.update();
            }
        }
    }

    function initialOwl() {
        var w = $(window).width(),
            size = $speakersBox.attr('data-size');
        if (w <= 360 && size !== '360') {
            $speakersBox.trigger('destroy.owl.carousel').owlCarousel(optionsOwl(1)).attr('data-size', '360');
        } else if (w > 360 && w <= 640 && size !== '640') {
            $speakersBox.trigger('destroy.owl.carousel').owlCarousel(optionsOwl(2)).attr('data-size', '640');
        } else if (w > 640 && w <= 960 && size !== '960') {
            $speakersBox.trigger('destroy.owl.carousel').owlCarousel(optionsOwl(4)).attr('data-size', '960');
        } else if (w > 960 && size !== '960+') {
            $speakersBox.trigger('destroy.owl.carousel').owlCarousel(optionsOwl(9)).attr('data-size', '960+');
        }
    }
    initialOwl();
    $(window).resize(function() {
        initialOwl();
        initialScroll(scrollifyOpt);
    });

    //*****************************************************
    //GOOGLE MAP
    //*****************************************************
    if (typeof google === 'object' && typeof google.maps === 'object' && $('#map').length) {
        var markerPosition = new google.maps.LatLng(55.822248, 37.647106);

        function initMap() {
            var loc, map;

            loc = new google.maps.LatLng(55.822248, 37.647106);

            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: loc,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false
            });

            var marker = new google.maps.Marker({
                map: map,
                position: markerPosition,
                visible: true,
                icon: 'img/icon-map.png'
            });
        }
        initMap();
        google.maps.event.addDomListener(window, 'load', initMap);
    }

    //*******************************************************
    //Scroll Top Button
    //*******************************************************

    $('.footer__button-scroll-top').click(function() {
        $('html, body').animate({scrollTop: 0}, $(window).scrollTop() * 0.1 + 600, 'swing');
    });

    // $(window).scroll(function() {
    //     console.log( $(this).scrollTop());
    //     if ($(this).scrollTop() >= $('.footer').offset().top - $(this).height()) {
    //
    //         $('.footer__button-scroll-top').fadeIn();
    //         $('.footer__button-scroll-down').fadeOut();
    //     } else {
    //         $('.footer__button-scroll-down').fadeIn();
    //         $('.footer__button-scroll-top').fadeOut();
    //     }
    // });


    $('img, a').on('dragstart', function(event) {
        event.preventDefault();
    });

});
