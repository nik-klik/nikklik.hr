(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

    // Mailto helpers for static forms
    var buildMailtoLink = function (data) {
        var params = new URLSearchParams();
        if (data.subject) {
            params.append('subject', data.subject);
        }
        if (data.body) {
            params.append('body', data.body);
        }
        var query = params.toString();
        return 'mailto:' + data.recipient + (query ? '?' + query : '');
    };

    var buildFormPayload = function (form) {
        var formType = form.getAttribute('data-mailto-form');
        var recipient = form.getAttribute('data-recipient') || 'info@nikklik.hr';
        var defaultSubject = form.getAttribute('data-default-subject') || 'Upit s web stranice';
        var data = new FormData(form);
        var trim = function (value) {
            return (value || '').trim();
        };
        if (formType === 'quote') {
            var body = [];
            var fullName = trim(data.get('fullName'));
            var email = trim(data.get('email'));
            var phone = trim(data.get('phone'));
            var service = trim(data.get('service'));
            var message = trim(data.get('message'));
            if (fullName) {
                body.push('Ime: ' + fullName);
            }
            if (email) {
                body.push('Email: ' + email);
            }
            if (phone) {
                body.push('Telefon: ' + phone);
            }
            if (service) {
                body.push('Usluga: ' + service);
            }
            if (message) {
                body.push('Poruka: ' + message);
            }
            return {
                recipient: recipient,
                subject: defaultSubject,
                body: body.join('\n')
            };
        }
        if (formType === 'contact') {
            var contactBody = [];
            var contactName = trim(data.get('fullName'));
            var contactEmail = trim(data.get('email'));
            var contactMessage = trim(data.get('message'));
            if (contactName) {
                contactBody.push('Ime: ' + contactName);
            }
            if (contactEmail) {
                contactBody.push('Email: ' + contactEmail);
            }
            if (contactMessage) {
                contactBody.push('Poruka: ' + contactMessage);
            }
            return {
                recipient: recipient,
                subject: trim(data.get('subject')) || defaultSubject,
                body: contactBody.join('\n')
            };
        }
        return null;
    };

    var initMailtoForms = function () {
        var forms = document.querySelectorAll('.mailto-form');
        if (!forms.length) {
            return;
        }
        forms.forEach(function (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                var payload = buildFormPayload(form);
                if (!payload) {
                    return;
                }
                window.location.href = buildMailtoLink(payload);
            });
        });
    };

    initMailtoForms();

    
})(jQuery);
