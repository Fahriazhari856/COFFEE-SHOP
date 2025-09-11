        // Drink selection functionality
        function selectDrink(index) {
            const drinks = document.querySelectorAll('.drink-item');
            drinks.forEach((drink, i) => {
                drink.style.background = i === index 
                    ? 'rgba(255,255,255,0.3)' 
                    : 'rgba(255,255,255,0.1)';
            });
        }

        // Carousel functionality
        let currentSlide = 0;
        const totalSlides = 3;

        function changeSlide(index) {
            currentSlide = index;
            updateIndicators();
            
            // Here you could add actual slide content changes
            console.log(`Slide changed to: ${index}`);
        }

        function updateIndicators() {
            const indicators = document.querySelectorAll('.indicator');
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === currentSlide);
            });
        }

        // Auto-advance carousel
        function autoAdvance() {
            currentSlide = (currentSlide + 1) % totalSlides;
            changeSlide(currentSlide);
        }

        // Start auto-advance every 5 seconds
        setInterval(autoAdvance, 5000);

        // Filter functionality
        function setActiveFilter(button) {
            // Remove active class from all filter buttons
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Here you could add filtering logic
            console.log(`Filter selected: ${button.textContent}`);
        }

        // Navigation functionality
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all nav items
                document.querySelectorAll('.nav-item').forEach(nav => {
                    nav.classList.remove('active');
                });
                
                // Add active class to clicked item
                this.classList.add('active');
            });
        });

        // Search functionality
        document.querySelector('.search-box').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    console.log(`Searching for: ${searchTerm}`);
                    // Here you could add actual search logic
                    alert(`Searching for: ${searchTerm}`);
                }
            }
        });

        // Mobile menu toggle (if needed)
        function toggleMobileMenu() {
            const nav = document.querySelector('.nav-content');
            nav.style.display = nav.style.display === 'none' ? 'flex' : 'none';
        }

        // Smooth scrolling for anchor links
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

        // Add loading animation
        window.addEventListener('load', function() {
            document.body.style.opacity = '1';
            document.body.style.transition = 'opacity 0.3s ease-in-out';
        });

        // Add scroll effects
        window.addEventListener('scroll', function() {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
            } else {
                header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }
        });

        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            // Set initial drink selection
            selectDrink(0);
            
            // Add hover effects to drink items
            document.querySelectorAll('.drink-item').forEach(item => {
                item.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-5px) scale(1.05)';
                });
                
                item.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });
        });

        // Scroll functionality for product sections
        function scrollProducts(sectionId, direction) {
            const scrollContainer = document.getElementById(sectionId + '-scroll');
            const cardWidth = 200; // card width + gap
            const scrollAmount = cardWidth * 2; // scroll 2 cards at a time
            
            if (direction === 'left') {
                scrollContainer.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            } else {
                scrollContainer.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            }
            
            // Update navigation button states
            setTimeout(() => updateNavButtons(sectionId), 300);
        }

        // Update navigation button states based on scroll position
        function updateNavButtons(sectionId) {
            const scrollContainer = document.getElementById(sectionId + '-scroll');
            const section = scrollContainer.closest('.product-section');
            const prevBtn = section.querySelector('.nav-btn:first-child');
            const nextBtn = section.querySelector('.nav-btn:last-child');
            
            // Check if at beginning
            prevBtn.disabled = scrollContainer.scrollLeft <= 0;
            
            // Check if at end
            const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            nextBtn.disabled = scrollContainer.scrollLeft >= maxScroll - 10; // 10px threshold
        }

        // Initialize navigation buttons
        document.addEventListener('DOMContentLoaded', function() {
            updateNavButtons('cold-brew');
            updateNavButtons('lattes');
            
            // Add scroll listeners to update button states
            document.querySelectorAll('.products-scroll').forEach(container => {
                container.addEventListener('scroll', function() {
                    const sectionId = this.id.replace('-scroll', '');
                    updateNavButtons(sectionId);
                });
            });
        });

        // Toggle favorite status
        function toggleFavorite(btn, event) {
            event.stopPropagation(); // Prevent card click
            
            if (btn.classList.contains('liked')) {
                btn.classList.remove('liked');
                btn.textContent = '♡';
                btn.style.color = '#666';
            } else {
                btn.classList.add('liked');
                btn.textContent = '♥';
                btn.style.color = '#e74c3c';
            }
            
            // Add animation
            btn.style.transform = 'scale(1.3)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 200);
        }

        // Add to cart functionality
        function addToCart(btn, event) {
            event.stopPropagation(); // Prevent card click
            
            const productCard = btn.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            
            // Visual feedback
            btn.textContent = '✓';
            btn.classList.add('added');
            btn.style.transform = 'scale(1.2)';
            
            // Reset after 2 seconds
            setTimeout(() => {
                btn.textContent = '+';
                btn.classList.remove('added');
                btn.style.transform = 'scale(1)';
            }, 2000);
            
            // Animate card
            productCard.style.transform = 'scale(1.05)';
            setTimeout(() => {
                productCard.style.transform = 'scale(1)';
            }, 200);
            
            console.log(`Added to cart: ${productName} - ${productPrice}`);
            
            // You could also show a toast notification here
            showToast(`${productName} added to cart!`);
        }

        // Select product (card click)
        function selectProduct(card) {
            // Remove previous selections
            document.querySelectorAll('.product-card').forEach(c => {
                c.style.borderColor = '#f0f0f0';
                c.style.boxShadow = 'none';
            });
            
            // Highlight selected card
            card.style.borderColor = '#00754a';
            card.style.boxShadow = '0 0 0 2px rgba(0, 117, 74, 0.2)';
            
            const productName = card.querySelector('.product-name').textContent;
            console.log(`Selected product: ${productName}`);
        }

        // Toast notification
        function showToast(message) {
            // Remove existing toast
            const existingToast = document.querySelector('.toast');
            if (existingToast) {
                existingToast.remove();
            }
            
            // Create toast
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = message;
            toast.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                background-color: #00754a;
                color: white;
                padding: 12px 24px;
                border-radius: 25px;
                font-size: 14px;
                font-weight: 500;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            document.body.appendChild(toast);
            
            // Animate in
            setTimeout(() => {
                toast.style.opacity = '1';
            }, 100);
            
            // Remove after 3 seconds
            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }, 3000);
        }

        // Touch/swipe support for mobile
        let startX = 0;
        let scrollLeft = 0;

        document.querySelectorAll('.products-scroll').forEach(container => {
            container.addEventListener('touchstart', function(e) {
                startX = e.touches[0].pageX - this.offsetLeft;
                scrollLeft = this.scrollLeft;
            });

            container.addEventListener('touchmove', function(e) {
                if (!startX) return;
                
                e.preventDefault();
                const x = e.touches[0].pageX - this.offsetLeft;
                const walk = (x - startX) * 2; // Scroll speed multiplier
                this.scrollLeft = scrollLeft - walk;
            });

            container.addEventListener('touchend', function() {
                startX = 0;
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            const focusedSection = document.querySelector('.product-section:hover');
            if (!focusedSection) return;
            
            const sectionId = focusedSection.querySelector('.products-scroll').id.replace('-scroll', '');
            
            if (e.key === 'ArrowLeft') {
                scrollProducts(sectionId, 'left');
            } else if (e.key === 'ArrowRight') {
                scrollProducts(sectionId, 'right');
            }
        });

        // Auto-scroll functionality (optional)
        function autoScroll() {
            document.querySelectorAll('.products-scroll').forEach(container => {
                const maxScroll = container.scrollWidth - container.clientWidth;
                if (container.scrollLeft >= maxScroll - 10) {
                    container.scrollTo({
                        left: 0,
                        behavior: 'smooth'
                    });
                } else {
                    container.scrollBy({
                        left: 200,
                        behavior: 'smooth'
                    });
                }
            });
        }

        // Uncomment to enable auto-scroll every 10 seconds
        // setInterval(autoScroll, 10000);
        
  function scrollProducts(sectionId, direction) {
    // ambil elemen scroll berdasarkan ID
    const scrollContainer = document.getElementById(sectionId + "-scroll");

    if (!scrollContainer) return; // safety

    const scrollAmount = 250; // geser sejauh 250px per klik tombol

    if (direction === "left") {
      scrollContainer.scrollBy({
        left: -scrollAmount,
        behavior: "smooth"
      });
    } else if (direction === "right") {
      scrollContainer.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
      });
    }
  }
