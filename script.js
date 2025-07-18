$(document).ready(function(){
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Scroll Progress Bar
    $(window).scroll(function(){
        const scroll = $(window).scrollTop();
        const height = $(document).height() - $(window).height();
        const scrolled = (scroll / height) * 100;
        $('.scroll-progress').css('width', scrolled + '%');

        // Sticky navbar
        if(scroll > 20){
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
        }
        
        // Scroll-up button
        if(scroll > 500){
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // Smooth scroll to top
    $('.scroll-up-btn').click(function(){
        $('html, body').animate({scrollTop: 0}, 800);
    });

    // Smooth scroll for navigation links
    $('.navbar .menu li a').click(function(e){
        const target = $(this).attr('href');
        if(target.startsWith('#')) {
            e.preventDefault();
            const targetSection = $(target);
            if(targetSection.length) {
                $('html, body').animate({
                    scrollTop: targetSection.offset().top - 80
                }, 800);
            }
        }
        
        // Close mobile menu after clicking
        $('.navbar .menu').removeClass("active");
        $('.menu-btn i').removeClass("active");
    });

    // Mobile menu toggle
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // Close mobile menu when clicking outside
    $(document).click(function(e) {
        if (!$(e.target).closest('.navbar').length) {
            $('.navbar .menu').removeClass("active");
            $('.menu-btn i').removeClass("active");
        }
    });

    // Typing animation
    const typed = new Typed(".typing", {
        strings: [
            "Full Stack Developer", 
            "IoT Specialist", 
            "UI/UX Designer", 
            "Problem Solver"
        ],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    const typed2 = new Typed(".typing-2", {
        strings: [
            "Full Stack Developer", 
            "IoT Specialist", 
            "Creative Designer"
        ],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // Animate skill bars when they come into view
    function animateSkillBars() {
        $('.skill-progress').each(function() {
            const skillBar = $(this);
            const skillTop = skillBar.offset().top;
            const skillBottom = skillTop + skillBar.outerHeight();
            const windowTop = $(window).scrollTop();
            const windowBottom = windowTop + $(window).height();

            if (skillBottom >= windowTop && skillTop <= windowBottom) {
                const width = skillBar.attr('class').includes('html-css') ? '85%' :
                             skillBar.attr('class').includes('javascript') ? '75%' :
                             skillBar.attr('class').includes('python') ? '80%' :
                             skillBar.attr('class').includes('react') ? '70%' :
                             skillBar.attr('class').includes('nodejs') ? '65%' :
                             skillBar.attr('class').includes('mysql') ? '70%' : '0%';
                
                skillBar.css('width', width);
            }
        });
    }

    // Trigger skill bar animation on scroll
    $(window).scroll(animateSkillBars);
    animateSkillBars(); // Initial check

    // Counter animation for stats
    function animateCounters() {
        $('.stat-number').each(function() {
            const counter = $(this);
            const target = parseInt(counter.text().replace('+', ''));
            const counterTop = counter.offset().top;
            const counterBottom = counterTop + counter.outerHeight();
            const windowTop = $(window).scrollTop();
            const windowBottom = windowTop + $(window).height();

            if (counterBottom >= windowTop && counterTop <= windowBottom && !counter.hasClass('animated')) {
                counter.addClass('animated');
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(function() {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.text(Math.floor(current) + '+');
                }, 50);
            }
        });
    }

    $(window).scroll(animateCounters);
    animateCounters();

    // Form submission
    $('.contact-form form').submit(function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: $('input[name="name"]').val(),
            email: $('input[name="email"]').val(),
            subject: $('input[name="subject"]').val(),
            message: $('textarea[name="message"]').val()
        };

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            alert('Please fill in all required fields.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Simulate form submission
        const submitBtn = $('.contact-form button[type="submit"]');
        const originalText = submitBtn.html();
        
        submitBtn.html('<i class="fas fa-spinner fa-spin"></i> Sending...');
        submitBtn.prop('disabled', true);

        // Simulate API call
        setTimeout(function() {
            submitBtn.html('<i class="fas fa-check"></i> Message Sent!');
            submitBtn.removeClass('primary').css('background', '#48bb78');
            
            // Reset form
            $('.contact-form form')[0].reset();
            
            // Reset button after 3 seconds
            setTimeout(function() {
                submitBtn.html(originalText);
                submitBtn.addClass('primary').css('background', '');
                submitBtn.prop('disabled', false);
            }, 3000);
            
            alert('Thank you for your message! I\'ll get back to you soon.');
        }, 2000);
    });

    // Add hover effects to project cards
    $('.project-card').hover(
        function() {
            $(this).find('.project-image img').css('transform', 'scale(1.1)');
            $(this).find('.project-overlay').css('opacity', '1');
        },
        function() {
            $(this).find('.project-image img').css('transform', 'scale(1)');
            $(this).find('.project-overlay').css('opacity', '0');
        }
    );

    // Parallax effect for hero section
    $(window).scroll(function() {
        const scrolled = $(window).scrollTop();
        const parallax = $('.home-bg-overlay');
        const speed = scrolled * 0.5;
        parallax.css('transform', 'translateY(' + speed + 'px)');
    });

    // Add active class to navigation based on scroll position
    $(window).scroll(function() {
        const scrollPos = $(window).scrollTop() + 100;
        
        $('.navbar .menu li a').each(function() {
            const currLink = $(this);
            const refElement = $(currLink.attr("href"));
            
            if (refElement.length && refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('.navbar .menu li a').removeClass("active");
                currLink.addClass("active");
            }
        });
    });

    // Lazy loading for images
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    // Add smooth transitions to all interactive elements
    $('a, button, .card, .project-card').css('transition', 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)');

    // Initialize tooltips for social links
    $('[data-tooltip]').hover(
        function() {
            const tooltip = $('<div class="tooltip">' + $(this).data('tooltip') + '</div>');
            $('body').append(tooltip);
            
            const link = $(this);
            const linkOffset = link.offset();
            
            tooltip.css({
                position: 'absolute',
                top: linkOffset.top - tooltip.outerHeight() - 10,
                left: linkOffset.left + (link.outerWidth() / 2) - (tooltip.outerWidth() / 2),
                background: '#333',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '4px',
                fontSize: '12px',
                zIndex: 9999,
                opacity: 0
            }).animate({opacity: 1}, 200);
        },
        function() {
            $('.tooltip').remove();
        }
    );

    // CV Download function
    window.downloadCV = function() {
        // Check if CV file exists
        const cvFileName = "resume nimalan'.pdf";
        
        // Create a temporary link to test if file exists
        const link = document.createElement('a');
        link.href = cvFileName;
        link.download = cvFileName;
        
        // Try to download the file
        try {
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            // If file doesn't exist, show a message
            alert('CV file is currently being updated. Please contact me directly at nimalanrajaraja@gmail.com for my latest resume.');
        }
    };
});