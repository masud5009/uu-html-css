$(function () {

    // Scroll animations (AOS), skipped for visitors who prefer reduced motion
    AOS.init({
        duration: 700,
        easing: 'ease-out-cubic',
        once: true,
        offset: 60,
        disable: function () { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
    });

    // Navbar gains a shadow once the page scrolls
    var $nav = $('.navbar');
    $(window).on('scroll', function () {
        $nav.toggleClass('scrolled', $(window).scrollTop() > 8);
    }).trigger('scroll');

    // Smooth-scroll for the scroll-down cue under the hero
    $('.scroll-cue').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top - 16 }, 500);
    });

    // Count-up for the headline numbers on the home page
    $('[data-count]').each(function () {
        var $el = $(this);
        $({ n: 0 }).animate({ n: Number($el.data('count')) }, {
            duration: 1200,
            easing: 'swing',
            step: function (now) { $el.text(Math.round(now)); }
        });
    });

    // Gallery lightbox (Bootstrap modal driven by jQuery)
    var $photos = $('.js-photo');
    if ($photos.length) {
        var $modal = $('#lightbox');
        var current = 0;

        var show = function (i) {
            current = (i + $photos.length) % $photos.length;
            var $p = $photos.eq(current);
            $modal.find('img').attr({ src: $p.attr('href'), alt: $p.find('img').attr('alt') });
            $modal.find('.js-caption').text($p.find('img').attr('alt'));
            $modal.find('.js-count').text((current + 1) + ' / ' + $photos.length);
        };

        $photos.on('click', function (e) {
            e.preventDefault();
            show($photos.index(this));
            bootstrap.Modal.getOrCreateInstance($modal[0]).show();
        });
        $modal.on('click', '.js-prev', function () { show(current - 1); });
        $modal.on('click', '.js-next', function () { show(current + 1); });
        $(document).on('keydown', function (e) {
            if (!$modal.hasClass('show')) return;
            if (e.key === 'ArrowLeft') show(current - 1);
            if (e.key === 'ArrowRight') show(current + 1);
        });
    }

    // Registration form: Bootstrap validation styles, then a confirmation panel
    $('#register-form').on('submit', function (e) {
        e.preventDefault();
        if (!this.checkValidity()) {
            $(this).addClass('was-validated');
            return;
        }
        $('.js-team').text($('#team-name').val());
        $('.js-captain').text($('#captain').val());
        $('#register-form').addClass('d-none');
        $('#register-done').removeClass('d-none');
        $('html, body').animate({ scrollTop: $('#register-done').offset().top - 120 }, 300);
    });

    $('.js-again').on('click', function () {
        $('#register-form').removeClass('was-validated d-none')[0].reset();
        $('#register-done').addClass('d-none');
    });
});
