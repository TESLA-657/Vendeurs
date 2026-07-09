console.log("Bienvenue sur SHOPY 🚀");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// -- Form handler (modular, saves locally and optionally forwards to Firebase)
const sellerForm = document.getElementById('sellerForm');
function showFormMessage(text, ok = true) {
    const msg = document.getElementById('message');
    if (!msg) return;
    msg.textContent = text;
    msg.style.color = ok ? '#2e8b57' : '#b03535';
}

function saveLocalSubmission(submission) {
    try {
        const key = 'shopy_submissions';
        const stored = JSON.parse(localStorage.getItem(key) || '[]');
        stored.push(submission);
        localStorage.setItem(key, JSON.stringify(stored));
        return true;
    } catch (err) {
        console.error('Local save failed', err);
        return false;
    }
}

if (sellerForm) {
    sellerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submission = {
            fullname: document.getElementById('fullname')?.value.trim() || '',
            shopname: document.getElementById('shopname')?.value.trim() || '',
            city: document.getElementById('city')?.value || '',
            whatsapp: document.getElementById('whatsapp')?.value.trim() || '',
            email: document.getElementById('email')?.value.trim() || '',
            category: document.getElementById('category')?.value || '',
            submittedAt: new Date().toISOString()
        };

        if (!submission.fullname || !submission.email) {
            showFormMessage('Veuillez renseigner au minimum le nom complet et l\'email.', false);
            return;
        }

        showFormMessage('Enregistrement en cours...');

        // If a sendToFirestore function is defined (from firebase-config.js), use it.
        if (window.sendToFirestore && typeof window.sendToFirestore === 'function') {
            try {
                await window.sendToFirestore(submission);
                saveLocalSubmission(submission);
                window.location.href = 'thank-you.html';
                return;
            } catch (err) {
                console.error('Firestore save failed', err);
                // fallback to local save
                saveLocalSubmission(submission);
                showFormMessage('Enregistré localement. Problème d\'envoi au serveur, vous serez contacté.', false);
                window.location.href = 'thank-you.html';
                return;
            }
        }

        // No firebase configured => save locally and redirect
        saveLocalSubmission(submission);
        window.location.href = 'thank-you.html';
    });
}