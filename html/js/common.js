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
    //SECTION SCROLL
    //************************************************************

    $.scrollify({
        section: '.section',
        sectionName : 'name',
        scrollbars: false,
        before: function(i, sections) {

            var sectionHref = sections[i].attr('data-name').replace(/\s+/g, '-'),
                sectionColor = sections[i].attr('data-color');

            $('.section').removeClass('active');
            sections[i].addClass('active');

            $('.pagination a').removeClass('active');
            $('.pagination').find('a[href=\"#' + sectionHref + '\"]').addClass('active');
            $('body').attr('data-color', sectionColor);
        },
        afterRender: function(i, sections) {
            var menuNav = '<nav class="menu__nav"><ul>',
                pagination = '<div class=\"pagination\">',
                activeClass = '';
            $('.section').each(function(i) {
                activeClass = '';
                var sectionName = $(this).attr('data-name'),
                href = sectionName.replace(/\s+/g, '-');
                if (i === 0) {
                    activeClass = 'active';
                }
                pagination += '<a class=\"' + activeClass + '\" href=\"#' + href + '\"></a>';
                menuNav += '<li><a class=\"' + activeClass + '\" href=\"#' + href + '\">' + sectionName + '</a></li>';
            });

            pagination += "</div>";
            menuNav += "</ul></nav>";

            $('body').prepend(pagination);
            $('.menu').prepend(menuNav);

            $('.pagination a, .menu a').on('click', function() {
                $.scrollify.move($(this).attr("href"));
                $('.header__button-menu').removeClass('active');
                $('.menu').fadeOut(500);
            });
            $('.footer__button-scroll').on('click', $.scrollify.next);
        }
    });

    //************************************************************
    //SLIDER
    //************************************************************
    var $speakersBox = $('.speakers__box');
    $speakersBox.addClass('owl-carousel');

    function speakersWrap(count) {
        $('.speakers__item').unwrap('.speakers__wrap');
        while( $speakersBox.children(':not(.speakers__wrap)' ).length){
            $speakersBox.children(':not(.speakers__wrap):lt('+ count +')').wrapAll('<div class="speakers__wrap">');
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
            autoHeight: true,
            onInitialize: speakersWrap(count),
            onInitialized: function() { $.scrollify.update(); }
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
        } else if (w > 960 && size !== '960+'){
            $speakersBox.trigger('destroy.owl.carousel').owlCarousel(optionsOwl(9)).attr('data-size', '960+');
        }
    }
    initialOwl();
    $(window).resize(function() {
        initialOwl();
    });

});
