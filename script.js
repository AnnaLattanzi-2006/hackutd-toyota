// Get all compare links
const compareLinks = document.querySelectorAll('.compare');
const modalOverlay = document.getElementById('modalOverlay');
const modalCard = document.getElementById('modalCard');
let selectedCarCard = null;

// Car configuration and trim data
const carOptions = {
    'Corolla': {
        configurations: [],
        trims: []
    },
    'Corolla Hatchback': {
        configurations: [],
        trims: []
    },
    'Camry': {
        configurations: [],
        trims: []
    },
    'Toyota Crown': {
        configurations: [],
        trims: []
    },
    'Mirai': {
        configurations: [],
        trims: []
    },
    'GR86': {
        configurations: [],
        trims: []
    },
    'GR Corolla': {
        configurations: [],
        trims: []
    },
    'GR Supra': {
        configurations: [],
        trims: []
    },
    'Sienna': {
        configurations: [],
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
        options.configurations.forEach(config => {
            const option = document.createElement('option');
            option.value = config;
            option.textContent = config;
            configSelect.appendChild(option);
        });
        
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
        
        // Add trim options
        options.trims.forEach(trim => {
            const option = document.createElement('option');
            option.value = trim;
            option.textContent = trim;
            trimSelect.appendChild(option);
        });
        
        trimContainer.appendChild(trimLabel);
        trimContainer.appendChild(trimSelect);
        
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

// Add click event listeners to all compare links
compareLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const carCard = this.closest('.car-card');
        showModal(carCard);
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