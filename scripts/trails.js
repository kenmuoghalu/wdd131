// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize trails page functionality
    initTrailsPage();
});

function initTrailsPage() {
    // Filter functionality for trails
    const filterButtons = document.querySelectorAll('.filter-btn');
    const trailCards = document.querySelectorAll('.trail-card');
    
    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const difficulty = this.getAttribute('data-difficulty');
            
            // Filter trail cards
            trailCards.forEach(card => {
                if (difficulty === 'all' || card.getAttribute('data-difficulty') === difficulty) {
                    card.style.display = 'block';
                    
                    // Add fade-in animation
                    card.style.animation = 'fadeIn 0.5s ease-in';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Trail statistics object
    const trailStats = {
        totalTrails: trailCards.length,
        byDifficulty: {
            easy: document.querySelectorAll('[data-difficulty="easy"]').length,
            moderate: document.querySelectorAll('[data-difficulty="moderate"]').length,
            difficult: document.querySelectorAll('[data-difficulty="difficult"]').length
        },
        getAverageLength: function() {
            let totalLength = 0;
            let count = 0;
            
            trailCards.forEach(card => {
                const lengthText = card.querySelector('strong:contains("Length")')?.nextSibling?.textContent;
                if (lengthText) {
                    const milesMatch = lengthText.match(/(\d+(?:\.\d+)?)\s*miles?/i);
                    if (milesMatch) {
                        totalLength += parseFloat(milesMatch[1]);
                        count++;
                    }
                }
            });
            
            return count > 0 ? (totalLength / count).toFixed(1) : 0;
        }
    };
    
    // Display trail statistics in console (for demonstration)
    console.log('Trail Statistics:', trailStats);
    console.log('Average trail length:', trailStats.getAverageLength(), 'miles');
    
    // Add intersection observer for lazy loading images
    if ('IntersectionObserver' in window) {
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
        
        // Observe all images with data-src attribute
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Add keyboard navigation to filter buttons
    filterButtons.forEach((button, index) => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight') {
                const nextIndex = (index + 1) % filterButtons.length;
                filterButtons[nextIndex].focus();
            } else if (e.key === 'ArrowLeft') {
                const prevIndex = (index - 1 + filterButtons.length) % filterButtons.length;
                filterButtons[prevIndex].focus();
            } else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// CSS animation for fadeIn (added dynamically)
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);