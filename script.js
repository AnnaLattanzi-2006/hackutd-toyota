// Get all compare links
const compareLinks = document.querySelectorAll('.compare');
const modalOverlay = document.getElementById('modalOverlay');
const modalCard = document.getElementById('modalCard');
let selectedCarCard = null;

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

