// Get all compare links
const compareLinks = document.querySelectorAll('.compare');
const modalOverlay = document.getElementById('modalOverlay');
const modalCard = document.getElementById('modalCard');
let selectedCarCard = null;

// Trim options based on configuration
const trimOptionsByConfig = {
    'LE Luxury Edition': ['2.0L 4-Cyl. Engine Front-Wheel Drive'],
    'SE Sport Edition': ['2.0L 4-Cyl. Engine Front-Wheel Drive'],
    'XLE Executive Luxury Edition': ['2.5 4-Cyl. Engine Front-Wheel Drive', '2.5 4-Cyl All-Wheel Drive'],
    'XSE Executive Sport Edition': ['2.5 4-Cyl. Engine Front-Wheel Drive', '2.5 4-Cyl All-Wheel Drive']
};

// Car configuration and trim data
const carOptions = {
    'Corolla': {
        configurations: ['LE Luxury Edition', 'SE Sport Edition', 'XLE Executive Luxury Edition', 'XSE Executive Sport Edition'],
        trims: []
    },
    'Corolla Hatchback': {
        configurations: ['LE Luxury Edition', 'SE Sport Edition', 'XLE Executive Luxury Edition', 'XSE Executive Sport Edition'],
        trims: []
    },
    'Camry': {
        configurations: ['LE Luxury Edition', 'SE Sport Edition', 'XLE Executive Luxury Edition', 'XSE Executive Sport Edition'],
        trims: []
    },
    'Toyota Crown': {
        configurations: ['LE Luxury Edition', 'SE Sport Edition', 'XLE Executive Luxury Edition', 'XSE Executive Sport Edition'],
        trims: []
    },
    'Mirai': {
        configurations: ['LE Luxury Edition', 'SE Sport Edition', 'XLE Executive Luxury Edition', 'XSE Executive Sport Edition'],
        trims: []
    },
    'GR86': {
        configurations: ['LE Luxury Edition', 'SE Sport Edition', 'XLE Executive Luxury Edition', 'XSE Executive Sport Edition'],
        trims: []
    },
    'GR Corolla': {
        configurations: ['LE Luxury Edition', 'SE Sport Edition', 'XLE Executive Luxury Edition', 'XSE Executive Sport Edition'],
        trims: []
    },
    'GR Supra': {
        configurations: ['LE Luxury Edition', 'SE Sport Edition', 'XLE Executive Luxury Edition', 'XSE Executive Sport Edition'],
        trims: []
    },
    'Sienna': {
        configurations: ['LE Luxury Edition', 'SE Sport Edition', 'XLE Executive Luxury Edition', 'XSE Executive Sport Edition'],
        trims: []
    },
    'Tacoma': {
        configurations: ['LE Luxury Edition', 'SE Sport Edition', 'XLE Executive Luxury Edition', 'XSE Executive Sport Edition'],
        trims: []
    },
    'Tundra': {
        configurations: ['LE Luxury Edition', 'SE Sport Edition', 'XLE Executive Luxury Edition', 'XSE Executive Sport Edition'],
        trims: []
    },
    'Highlander': {
        configurations: ['LE Luxury Edition', 'SE Sport Edition', 'XLE Executive Luxury Edition', 'XSE Executive Sport Edition'],
        trims: []
    },
    'Highlander Hybrid': {
        configurations: ['LE Luxury Edition', 'SE Sport Edition', 'XLE Executive Luxury Edition', 'XSE Executive Sport Edition'],
        trims: []
    },
    'Toyota Crown Signia': {
        configurations: ['LE Luxury Edition', 'SE Sport Edition', 'XLE Executive Luxury Edition', 'XSE Executive Sport Edition'],
        trims: []
    },
    'Land Cruiser': {
        configurations: ['LE Luxury Edition', 'SE Sport Edition', 'XLE Executive Luxury Edition', 'XSE Executive Sport Edition'],
        trims: []
    },
    'Sequoia': {
        configurations: ['LE Luxury Edition', 'SE Sport Edition', 'XLE Executive Luxury Edition', 'XSE Executive Sport Edition'],
        trims: []
    },
    'Corolla Hybrid': {
        configurations: ['LE Luxury Edition', 'SE Sport Edition', 'XLE Executive Luxury Edition', 'XSE Executive Sport Edition'],
        trims: []
    },
    'Tacoma i-FORCE MAX': {
        configurations: ['LE Luxury Edition', 'SE Sport Edition', 'XLE Executive Luxury Edition', 'XSE Executive Sport Edition'],
        trims: []
    },
    'Tundra i-FORCE MAX': {
        configurations: ['LE Luxury Edition', 'SE Sport Edition', 'XLE Executive Luxury Edition', 'XSE Executive Sport Edition'],
        trims: []
    }
};

// Function to clone and display car card in modal
function showModal(carCard) {
    // Remove selected class from previously selected card
    if (selectedCarCard) {
        selectedCarCard.classList.remove('selected');
    }
    
    // Add selected class to current card
    carCard.classList.add('selected');
    selectedCarCard = carCard;
    
    // Clone the car card content
    const clonedCard = carCard.cloneNode(true);
    
    // Remove the compare link from the clone
    const compareLink = clonedCard.querySelector('.compare');
    if (compareLink) {
        compareLink.remove();
    }
    
    // Clear modal card and add cloned content
    modalCard.innerHTML = '';
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = '×';
    closeBtn.onclick = closeModal;
    
    // Add all cloned content
    modalCard.appendChild(closeBtn);
    
    // Move all children from cloned card to modal card
    while (clonedCard.firstChild) {
        modalCard.appendChild(clonedCard.firstChild);
    }
    
    // Get car name from h3 element
    const carName = modalCard.querySelector('h3').textContent.trim();
    const options = carOptions[carName] || { configurations: [], trims: [] };
    
    // Debug: Log if options are found
    if (!carOptions[carName]) {
        console.warn('Car name not found in carOptions:', carName);
    }
    
    // Find price-mpg-container and insert dropdowns after it
    const priceMpgContainer = modalCard.querySelector('.price-mpg-container');
    if (priceMpgContainer) {
        // Create configuration dropdown
        const configContainer = document.createElement('div');
        configContainer.className = 'dropdown-container';
        
        const configLabel = document.createElement('label');
        configLabel.textContent = 'Configuration';
        configLabel.className = 'dropdown-label';
        
        const configSelect = document.createElement('select');
        configSelect.className = 'dropdown-select';
        configSelect.id = 'configSelect';
        
        // Add default option
        const defaultConfigOption = document.createElement('option');
        defaultConfigOption.value = '';
        defaultConfigOption.textContent = 'Select Configuration';
        configSelect.appendChild(defaultConfigOption);
        
        // Add configuration options
        if (options.configurations && options.configurations.length > 0) {
            options.configurations.forEach(config => {
                const option = document.createElement('option');
                option.value = config;
                option.textContent = config;
                configSelect.appendChild(option);
            });
        } else {
            // Fallback: Add default options if none found
            const defaultOptions = ['LE Luxury Edition', 'SE Sport Edition', 'XLE Executive Luxury Edition', 'XSE Executive Sport Edition'];
            defaultOptions.forEach(config => {
                const option = document.createElement('option');
                option.value = config;
                option.textContent = config;
                configSelect.appendChild(option);
            });
        }
        
        configContainer.appendChild(configLabel);
        configContainer.appendChild(configSelect);
        
        // Create trim dropdown
        const trimContainer = document.createElement('div');
        trimContainer.className = 'dropdown-container';
        
        const trimLabel = document.createElement('label');
        trimLabel.textContent = 'Trim';
        trimLabel.className = 'dropdown-label';
        
        const trimSelect = document.createElement('select');
        trimSelect.className = 'dropdown-select';
        trimSelect.id = 'trimSelect';
        
        // Add default option
        const defaultTrimOption = document.createElement('option');
        defaultTrimOption.value = '';
        defaultTrimOption.textContent = 'Select Trim';
        trimSelect.appendChild(defaultTrimOption);
        
        // Trim options will be populated dynamically based on configuration selection
        
        trimContainer.appendChild(trimLabel);
        trimContainer.appendChild(trimSelect);
        
        // Function to update trim dropdown based on configuration selection
        const updateTrimDropdown = function(selectedConfig) {
            console.log('Updating trim dropdown for:', selectedConfig); // Debug
            // Clear existing options
            trimSelect.innerHTML = '';
            const defaultTrimOption = document.createElement('option');
            defaultTrimOption.value = '';
            defaultTrimOption.textContent = 'Select Trim';
            trimSelect.appendChild(defaultTrimOption);
            
            // Get trim options for selected configuration
            const trims = trimOptionsByConfig[selectedConfig] || [];
            console.log('Trim options found:', trims); // Debug
            console.log('trimOptionsByConfig:', trimOptionsByConfig); // Debug
            
            // Add trim options
            if (trims.length > 0) {
                trims.forEach(trim => {
                    const option = document.createElement('option');
                    option.value = trim;
                    option.textContent = trim;
                    trimSelect.appendChild(option);
                });
                console.log('Trim options added to dropdown'); // Debug
            } else {
                console.log('No trim options found for configuration:', selectedConfig); // Debug
            }
        };
        
        // Add event listener to configuration dropdown
        configSelect.addEventListener('change', function(e) {
            const selectedConfig = this.value;
            console.log('Configuration changed to:', selectedConfig); // Debug
            console.log('trimSelect element:', trimSelect); // Debug
            if (selectedConfig) {
                updateTrimDropdown(selectedConfig);
            } else {
                // Clear trim dropdown if no configuration is selected
                trimSelect.innerHTML = '';
                const defaultTrimOption = document.createElement('option');
                defaultTrimOption.value = '';
                defaultTrimOption.textContent = 'Select Trim';
                trimSelect.appendChild(defaultTrimOption);
            }
        });
        
        // Create Compare button
        const compareButton = document.createElement('button');
        compareButton.className = 'compare-button';
        compareButton.textContent = 'Compare';
        compareButton.onclick = function() {
            // Navigate to a new page (you can customize the URL)
            window.location.href = 'compare.html';
        };
        
        // Insert dropdowns and button after price-mpg-container
        priceMpgContainer.parentNode.insertBefore(configContainer, priceMpgContainer.nextSibling);
        configContainer.parentNode.insertBefore(trimContainer, configContainer.nextSibling);
        trimContainer.parentNode.insertBefore(compareButton, trimContainer.nextSibling);
    }
    
    // Show modal with animation
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Function to close modal
function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    
    // Remove selected class from the card
    if (selectedCarCard) {
        selectedCarCard.classList.remove('selected');
        selectedCarCard = null;
    }
}

// Add click event listeners to all car cards
document.addEventListener('DOMContentLoaded', function() {
    const carCards = document.querySelectorAll('.car-card');
    carCards.forEach(card => {
        // Add click listener to the entire card
        card.addEventListener('click', function(e) {
            // Only trigger if not clicking directly on the compare link
            if (!e.target.classList.contains('compare') && !e.target.closest('.compare')) {
                showModal(this);
            }
        });
        
        // Add click listener to compare links (to prevent double-triggering)
        const compareLink = card.querySelector('.compare');
        if (compareLink) {
            compareLink.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation(); // Prevent triggering the car card click
                showModal(card);
            });
        }
    });
});

// Close modal when clicking on overlay (but not on the card itself)
modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});

// Slideshow functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabLinks = document.querySelectorAll('.tab-link');
    const slides = document.querySelectorAll('.slide');
    
    // Handle tab clicks
    tabLinks.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the slide index from data attribute
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            
            // Remove active class from all tabs and slides
            tabLinks.forEach(t => t.classList.remove('active'));
            slides.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding slide
            this.classList.add('active');
            slides[slideIndex].classList.add('active');
        });
    });
});