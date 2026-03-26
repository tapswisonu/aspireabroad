$(document).ready(function() {
    // GSAP Video-Like Scroll Experiences
    gsap.registerPlugin(ScrollTrigger);
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
        // Hero Video-Like Pin & Parallax
        var heroTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "+=80%",
                scrub: 1,
                pin: true
            }
        });
        
        heroTl.to(".hero .organic-shape", {
            y: 300,
            scale: 1.5,
            opacity: 0,
            duration: 1
        }, 0).to(".hero-content", {
            y: -150,
            opacity: 0,
            scale: 0.9,
            duration: 1
        }, 0);

        // About Section: Pin Image, stagger text
        var aboutTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".about",
                start: "top 60%",
                end: "bottom center",
                scrub: 1
            }
        });
        aboutTl.from(".about-img", { x: -100, opacity: 0, duration: 1 })
               .from(".about-content > *", { y: 50, opacity: 0, stagger: 0.2, duration: 1 }, "-=0.5");

        // Process Section: Slide image right, stagger text
        var processTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".process",
                start: "top 70%",
                end: "bottom center",
                scrub: 1
            }
        });
        processTl.from(".process-img", { x: 100, opacity: 0, duration: 1 })
                 .from(".process-content > *", { y: 50, opacity: 0, stagger: 0.2, duration: 1 }, "-=0.5");

        // Services Card Stagger
        gsap.from(".service-card", {
            y: 100,
            opacity: 0,
            stagger: 0.15,
            scrollTrigger: {
                trigger: ".services",
                start: "top 80%",
                end: "center center",
                scrub: 1
            }
        });
        
        // Highlight CTA Zoom
        gsap.from(".highlight-section", {
            scale: 0.8,
            opacity: 0.2,
            scrollTrigger: {
                trigger: ".highlight-section",
                start: "top bottom",
                end: "center center",
                scrub: 1
            }
        });

        // Vacancies grid
        gsap.from(".job-card", {
            y: 80,
            scale: 0.9,
            opacity: 0,
            stagger: 0.1,
            scrollTrigger: {
                trigger: ".vacancies",
                start: "top 85%",
                end: "center center",
                scrub: 1
            }
        });
    });

    // Mobile fallback
    mm.add("(max-width: 767px)", () => {
        gsap.utils.toArray('section').forEach(section => {
            gsap.from(section, {
                opacity: 0,
                y: 30,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%"
                }
            });
        });
    });

    // Sticky Header
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.header').addClass('sticky');
        } else {
            $('.header').removeClass('sticky');
        }
    });

    // Mobile Menu Toggle
    $('.mobile-menu-btn').click(function() {
        $('.nav-links').addClass('active');
        $('.nav-overlay').addClass('active');
        $('body').css('overflow', 'hidden');
    });

    // Close Mobile Menu
    $('.close-menu-btn, .nav-overlay, .nav-links a').click(function() {
        $('.nav-links').removeClass('active');
        $('.nav-overlay').removeClass('active');
        $('body').css('overflow', '');
    });

    // Typing Effect for Hero
    var i = 0;
    var txt = "Apply for Overseas Jobs with Trusted Manpower Experts";
    var speed = 50;

    function typing() {
        var heroTextElt = document.getElementById("hero-text");
        if (heroTextElt && i < txt.length) {
            heroTextElt.innerHTML += txt.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typing, 500);

    // Slick Slider for Testimonials
    $('.testimonial-slider').slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    // Counter Animation
    var counted = 0;
    $(window).scroll(function() {
        var statsSection = $('.statistics');
        if(statsSection.length === 0) return;
        
        var oTop = statsSection.offset().top - window.innerHeight;
        if (counted == 0 && $(window).scrollTop() > oTop) {
            $('.counter').each(function() {
                var $this = $(this),
                    countTo = $this.attr('data-target');
                $({ countNum: $this.text() }).animate({
                    countNum: countTo
                },
                {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $this.text(this.countNum);
                        if(this.countNum > 999) {
                            $this.text($this.text().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                        }
                    }
                });
            });
            counted = 1;
        }
    });

    // Contact Form Validation
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        var isValid = true;
        
        var name = $('#name').val().trim();
        var email = $('#email').val().trim();
        var phone = $('#phone').val().trim();
        var message = $('#message').val().trim();
        
        $('.error-msg').text('');
        
        if(name === "") {
            $('#nameError').text('Please enter your name.');
            isValid = false;
        }
        
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(email === "") {
            $('#emailError').text('Please enter your email.');
            isValid = false;
        } else if(!emailRegex.test(email)) {
            $('#emailError').text('Please enter a valid email address.');
            isValid = false;
        }
        
        if(phone === "") {
            $('#phoneError').text('Please enter your phone number.');
            isValid = false;
        }
        
        if(message === "") {
            $('#msgError').text('Please enter your message.');
            isValid = false;
        }
        
        if(isValid) {
            // Simulate form submission
            $('#formSuccess').fadeIn();
            $('#contactForm')[0].reset();
            setTimeout(function() {
                $('#formSuccess').fadeOut();
            }, 5000);
        }
    });

    // Vertical Scroll Indicator Logic
    $(window).scroll(function() {
        var scrollDistance = $(window).scrollTop();
        
        $('section').each(function(i) {
            if ($(this).position().top - 150 <= scrollDistance) {
                $('.scroll-nav a.active').removeClass('active');
                $('.scroll-nav a').eq(i).addClass('active');
            }
        });
        
        // Handle Home edge case (if at top)
        if (scrollDistance < 100) {
            $('.scroll-nav a.active').removeClass('active');
            $('.scroll-nav a:first-child').addClass('active');
        }
    });

    // Smooth scroll for scroll dots
    $('.scroll-nav a').on('click', function(e) {
        e.preventDefault();
        var targetNode = $($(this).attr('href'));
        if(targetNode.length) {
            $('html, body').animate({
                scrollTop: targetNode.offset().top - 70 // adjust for sticky header
            }, 600);
        }
    });

});
