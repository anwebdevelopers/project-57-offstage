$(function() {

    'use strict';

    //$('html').removeClass('no-js')


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
    //MENU TOGGLE
    //************************************************************

    $('.header__button-menu').click(function() {
        $(this).toggleClass('active');
        $('.menu').fadeToggle(500).css('display', 'flex');
        $('body').attr('data-color', $('.header__button-menu').hasClass('active') ? 'dark' : $('.section.active').attr('data-color'));
    });

});
