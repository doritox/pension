document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Gallery Lightbox ---
    const galleryItems = document.querySelectorAll('#gallery .gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            const imgSrc = item.getAttribute('href');
            const imgAlt = item.querySelector('img').getAttribute('alt');
            
            // Defensive check: Ensure the library is loaded before using it.
            if (window.basicLightbox) {
                basicLightbox.create(`<img src="${imgSrc}" alt="${imgAlt}">`).show();
            }
        });
    });

    // --- Fade-in on Scroll Animation ---
    const fadeSections = document.querySelectorAll('.fade-in-section');
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id'); // למשל: "about", "gallery"
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const linkHref = link.getAttribute('href');
                    // הוספת 'active' אם הקישור תואם למזהה המקטע.
                    // מטפל גם במקרה מיוחד שבו קישור הבית הוא href="#" עבור מקטע "hero".
                    if (linkHref === `#${id}` || (id === 'hero' && linkHref === '#')) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px' });

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // --- Contact Form Validation ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            

            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const message = document.getElementById('message');
            

            let isValid = true;

            // פונקציית עזר להצגה/הסתרת שגיאות
            const setError = (input, isError) => {
                if (isError) {
                    input.classList.add('is-invalid');
                    isValid = false;
                } else {
                    input.classList.remove('is-invalid');
                }
            };

            // 1. בדיקת שם
            setError(name, name.value.trim() === '');

            // 2. בדיקת אימייל
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setError(email, !emailRegex.test(email.value.trim()));

            // 3. בדיקת טלפון (מספר בן 10 ספרות)
            const phoneRegex = /^\d{10}$/;
            setError(phone, !phoneRegex.test(phone.value.trim()));

            // 4. בדיקת הודעה
            setError(message, message.value.trim() === '');

            // אם הטופס אינו תקין, מנע שליחה
            if (!isValid) {
                e.preventDefault();
                console.log('הטופס אינו תקין.');
            } else {
                console.log('הטופס תקין. מאפשר שליחה...');
            }
        });
    }


});
