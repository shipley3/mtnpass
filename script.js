// Define the variants for A/B testing
const variants = [
    {
        id: 'code',
        title: "Mountain<br />Pass 🏔️ 👨‍💻<br />Coding",
        tagline: "LEARN HOW TO CODE",
        message: "MASTER THE BASICS",
        subtitle: "5 LIVE CLASSES TO BUILD YOUR FIRST APP"
    },
    {
        id: 'ai',
        title: "Mountain<br />Pass 🏔️ 👨‍💻<br />Coding", 
        tagline: "LEARN HOW TO CODE WITH AI",
        message: "IF YOU CAN IMAGINE IT, YOU CAN BUILD IT",
        subtitle: "5 LIVE CLASSES TO MASTER CODING WITH AI"
    },
    {
        id: 'confidence',
        title: "Mountain<br />Pass 🏔️ 👨‍💻<br />Coding",
        tagline: "GAIN TECHNICAL CONFIDENCE", 
        message: "YOU BELONG IN TECH",
        subtitle: "5 LIVE CLASSES TO LEARN HOW TO CODE"
    }
];

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("js ready");

    // Email copy functionality
    const emailElement = document.querySelector('#copy-email');
    const copyIcon = document.querySelector('#copy-sticky');
    
    if (emailElement) {
        emailElement.addEventListener('click', copyFunc);
        emailElement.addEventListener('mousedown', changeIconDown);
        emailElement.addEventListener('mouseup', changeIconUp);
    }

    function copyFunc() {
        const emailText = 'PATRICK@MTNPASSCODE.COM';
        navigator.clipboard.writeText(emailText)
            .then(() => console.log("copied!"))
            .catch(err => console.error('Failed to copy text: ', err));
    }

    function changeIconDown() {
        if (copyIcon) {
            copyIcon.className = "bi bi-sticky-fill";
        }
    }

    function changeIconUp() {
        if (copyIcon) {
            setTimeout(function() {
                copyIcon.className = "bi bi-sticky";
            }, 300);
        }
    }

    // A/B Testing variant display
    function displayVariant() {
        const heroVariant = document.getElementById('hero-variant');
        if (heroVariant) {
            // Check URL parameters for variant
            const urlParams = new URLSearchParams(window.location.search);
            const variantId = urlParams.get('v');
            
            // Find the specified variant or get a random one
            let variant = variants.find(v => v.id === variantId);
            if (!variant) {
                variant = variants[Math.floor(Math.random() * variants.length)];
            }
            
            // Create the HTML
            const html = `
                <h1>${variant.title}</h1>
                <hr/>
                <p class="tagline">${variant.tagline}</p>
                <p>${variant.message}</p>
                <p class="subtitle">${variant.subtitle}</p>
                
                <div class="cta-button">
                    <a href="#signup" class="btn btn-secondary btn-lg">Get Started</a>
                </div>
            `;
            
            // Insert into the page
            heroVariant.innerHTML = html;
            
            // Track which variant was shown
            if (typeof gtag !== 'undefined') {
                gtag('event', 'variant_shown', {
                    'variant': variant.tagline,
                    'variant_id': variant.id
                });
            }
        }
    }

    // Call displayVariant on load
    displayVariant();

    // AI Popup functionality
    function showPopup() {
        const popup = document.getElementById('aiPopup');
        if (popup) {
            popup.style.display = 'block';
            
            popup.addEventListener('click', () => {
                popup.classList.add('hiding');
                setTimeout(() => {
                    popup.style.display = 'none';
                }, 300);
            });
        }
    }

    // Check if this is the survey page
    const isSurveyPage = document.querySelector('#surveyForm') !== null;

    // Show popup after 30 seconds on survey page
    if (isSurveyPage) {
        setTimeout(showPopup, 30000);
    }

    // Survey form functionality
    const surveyForm = document.querySelector('#surveyForm');
    if (surveyForm) {
        surveyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            fetch(surveyForm.action, {
                method: surveyForm.method,
                body: new FormData(surveyForm),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    surveyForm.reset();
                    showPopup(); // Show popup after successful submission
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }

    // Survey form functionality (only runs on survey page)
    const priorAttempt = document.getElementById('prior_attempt');
    const platformsContainer = document.getElementById('platforms_container');
    const otherPlatform = document.getElementById('other_platform');
    const otherPlatformText = document.getElementById('other_platform_text');

    // Handle showing/hiding platforms container
    if (priorAttempt && platformsContainer) {
        priorAttempt.addEventListener('change', function() {
            platformsContainer.style.display = this.value === 'yes' ? 'block' : 'none';
        });
    }

    // Handle other platform text input
    if (otherPlatform && otherPlatformText) {
        otherPlatform.addEventListener('change', function() {
            otherPlatformText.style.display = this.checked ? 'block' : 'none';
        });
    }

    // Handle role "Other" option
    const roleSelect = document.getElementById('role');
    const roleOther = document.getElementById('roleOther');
    
    if (roleSelect && roleOther) {
        roleSelect.addEventListener('change', function() {
            roleOther.style.display = this.value === 'other' ? 'block' : 'none';
        });
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