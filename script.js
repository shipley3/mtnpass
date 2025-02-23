// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Email copy functionality
    const emailElement = document.querySelector('.email-text');
    const copyIcon = document.querySelector('.copy-icon');
    
    if (emailElement && copyIcon) {
        copyIcon.addEventListener('click', function() {
            navigator.clipboard.writeText(emailElement.textContent)
                .then(() => {
                    copyIcon.classList.remove('bi-clipboard');
                    copyIcon.classList.add('bi-clipboard-check');
                    
                    // Reset icon after 2 seconds
                    setTimeout(() => {
                        copyIcon.classList.remove('bi-clipboard-check');
                        copyIcon.classList.add('bi-clipboard');
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                });
        });
    }

    // AI Popup functionality
    const popup = document.getElementById('aiPopup');
    if (popup) {
        setTimeout(() => {
            popup.style.display = 'block';
            
            popup.addEventListener('click', () => {
                popup.classList.add('hiding');
                setTimeout(() => {
                    popup.style.display = 'none';
                }, 300);
            });
        }, 5000);
    }

    // Character limit functionality
    const inputs = {
        'name': 50,
        'email': 100,
        'message': 500
    };

    Object.entries(inputs).forEach(([inputId, maxLength]) => {
        const input = document.getElementById(inputId);
        const counter = document.getElementById(`${inputId}Count`);
        
        if (input && counter) {
            input.addEventListener('input', function() {
                const remaining = maxLength - this.value.length;
                counter.textContent = `${remaining} characters remaining`;
                
                // Add warning colors
                if (remaining <= 10) {
                    counter.className = 'char-count danger';
                } else if (remaining <= 20) {
                    counter.className = 'char-count warning';
                } else {
                    counter.className = 'char-count';
                }
            });
        }
    });
}); 