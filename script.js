document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Cảm ơn bạn đã gửi thông tin. Chúng tôi sẽ liên hệ với bạn sớm nhất!');
            contactForm.reset();
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Tính toán vị trí cuộn có tính đến fixed header và breadcrumb
                const headerHeight = document.getElementById('fixed-header').offsetHeight;
                const breadcrumbHeight = document.getElementById('fixed-breadcrumb').offsetHeight;
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - breadcrumbHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Điều chỉnh padding-top của body khi resize window
    function adjustBodyPadding() {
        const headerHeight = document.getElementById('fixed-header').offsetHeight;
        const breadcrumbHeight = document.getElementById('fixed-breadcrumb').offsetHeight;
        document.body.style.paddingTop = (headerHeight + breadcrumbHeight) + 'px';
    }
    
    // Gọi hàm khi trang tải và khi resize window
    adjustBodyPadding();
    window.addEventListener('resize', adjustBodyPadding);
});