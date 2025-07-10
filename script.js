document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
    });
    
    // Make cursor smaller when hovering over clickable elements
    const clickables = document.querySelectorAll('a, button, .gallery-item, input, textarea');
    clickables.forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(0.5)';
        });
        item.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Gallery items
    const gallery = document.querySelector('.gallery');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    // Sample gallery data (replace with your actual artwork data)
    const artworkData = [
        { id: 1, title: 'Portrait of Sarah', category: 'Portrait', imageUrl: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { id: 2, title: 'Old Man Wisdom', category: 'Portrait', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { id: 3, title: 'Mountain Landscape', category: 'Landscape', imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { id: 4, title: 'Urban Sketch', category: 'Cityscape', imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { id: 5, title: 'Still Life', category: 'Object', imageUrl: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { id: 6, title: 'Abstract Thoughts', category: 'Abstract', imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    ];
    
    // Function to create gallery items
    function createGalleryItems(items) {
        items.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item fade-in';
            galleryItem.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.title}">
                <div class="gallery-item-overlay">
                    <h3 class="gallery-item-title">${item.title}</h3>
                    <p class="gallery-item-category">${item.category}</p>
                </div>
            `;
            gallery.appendChild(galleryItem);
        });
    }
    
    // Initially load 4 items
    createGalleryItems(artworkData.slice(0, 4));
    
    // Load more items when button is clicked
    let currentItems = 4;
    loadMoreBtn.addEventListener('click', () => {
        const nextItems = artworkData.slice(currentItems, currentItems + 2);
        createGalleryItems(nextItems);
        currentItems += 2;
        
        // Hide button when all items are loaded
        if (currentItems >= artworkData.length) {
            loadMoreBtn.style.display = 'none';
        }
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.section-header, .step, .about-content, .contact-container').forEach(section => {
        observer.observe(section);
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For demo purposes, we'll just show an alert
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
});
