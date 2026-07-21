
// DARK MODE

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle?.querySelector("i");

// Lire le thème sauvegardé au chargement
if (localStorage.getItem("theme") === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    if (themeIcon) {
        themeIcon.classList.remove("bi-moon-fill");
        themeIcon.classList.add("bi-sun-fill");
    }
}

// Basculer le thème au clic
if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
// Basculer le thème
        if (currentTheme === "dark") {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
            if (themeIcon) {
                themeIcon.classList.remove("bi-sun-fill");
                themeIcon.classList.add("bi-moon-fill");
            }
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            if (themeIcon) {
                themeIcon.classList.remove("bi-moon-fill");
                themeIcon.classList.add("bi-sun-fill");
            }
        }
    });
}


// NAVBAR — changement de style au scroll


const navbar = document.getElementById("navbar");
// Ajouter ou retirer la classe "scrolled" selon la position du scroll
window.addEventListener("scroll", () => {
    if (navbar && window.scrollY > 80) {
        navbar.classList.add("scrolled");
    } else if (navbar) {
        navbar.classList.remove("scrolled");
    }
});


// HAMBURGER — menu mobile


const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
// Toggle menu and icon
if (hamburger) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("open");

        const icon = hamburger.querySelector("i");
        if (navLinks.classList.contains("open")) {
            icon.classList.remove("bi-list");
            icon.classList.add("bi-x-lg");
        } else {
            icon.classList.remove("bi-x-lg");
            icon.classList.add("bi-list");
        }
    });
}


// BOUTON RETOUR EN HAUT
 

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (backToTop && window.scrollY > 300) {
        backToTop.classList.add("show");
    } else if (backToTop) {
        backToTop.classList.remove("show");
    }
});
// Clic sur le bouton pour remonter en haut
if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


// ANNÉE DYNAMIQUE — footer


const yearSpan = document.getElementById("year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}


// COMPTE À REBOURS


const countdownDate = new Date("2026-10-15T09:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (document.getElementById("days")) {
        document.getElementById("days").textContent = days < 10 ? "0" + days : days;
        document.getElementById("hours").textContent = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").textContent = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").textContent = seconds < 10 ? "0" + seconds : seconds;
    }
}
// Mettre à jour le compte à rebours toutes les secondes
setInterval(updateCountdown, 1000);
updateCountdown();
// ONGLETS PROGRAMME

const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const day = btn.dataset.day;

        // Enlever active partout
        tabBtns.forEach(b => b.classList.remove("active"));
        tabContents.forEach(c => c.classList.remove("active"));

        // Ajouter active sur ce qui est cliqué
        btn.classList.add("active");
        document.getElementById(day).classList.add("active");
    });
});

// COMPTEURS ANIMÉS AU SCROLL

const counters = document.querySelectorAll(".counter");
// Fonction pour animer les compteurs
function startCounters() {
    counters.forEach(counter => {
        if (counter.dataset.animated) return;
        counter.dataset.animated = "true";

        const target = parseInt(counter.dataset.target);
        let count = 0;

        function updateCounter() {
            const increment = Math.ceil(target / 100);

            if (count < target) {
                count += increment;
                if (count > target) count = target;
                counter.textContent = count;
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        }

        updateCounter();
    });
}
// Observer pour déclencher l'animation des compteurs lorsque la section est visible
const statsSection = document.querySelector(".stats");

if (statsSection) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounters();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    statsObserver.observe(statsSection);
}

// ANIMATIONS FADE-IN AU SCROLL

const fadeSections = document.querySelectorAll(".fade-section");

fadeSections.forEach(section => {
    section.classList.add("animate");
});

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

fadeSections.forEach(section => {
    fadeObserver.observe(section);
});
// FILTRAGE DYNAMIQUE DES INTERVENANTS
 

const filtreBtns = document.querySelectorAll(".filtre-btn");
const intervenantCards = document.querySelectorAll(".intervenant-card");

filtreBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const filtre = btn.dataset.filtre;

        // Bouton actif
        filtreBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // Afficher ou cacher les cards
        intervenantCards.forEach(card => {
            if (filtre === "tous" || card.dataset.filtre === filtre) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
}); 
 
// VALIDATION FORMULAIRE DE CONTACT

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Récupérer les valeurs
        const nom = document.getElementById("nom").value.trim();
        const email = document.getElementById("email").value.trim();
        const telephone = document.getElementById("telephone").value.trim();
        const participation = document.getElementById("participation").value;
        const pays = document.getElementById("pays").value;
        const message = document.getElementById("message").value.trim();

        // Vider les erreurs précédentes
        document.getElementById("nomError").textContent = "";
        document.getElementById("emailError").textContent = "";
        document.getElementById("telephoneError").textContent = "";
        document.getElementById("participationError").textContent = "";
        document.getElementById("paysError").textContent = "";
        document.getElementById("messageError").textContent = "";

        // Retirer les classes valid/invalid
        document.querySelectorAll(".form-group input, .form-group select, .form-group textarea").forEach(el => {
            el.classList.remove("valid", "invalid");
        });

        let isValid = true;

        // Vérification nom
        if (nom === "") {
            document.getElementById("nomError").textContent = "Veuillez entrer votre nom complet";
            document.getElementById("nom").classList.add("invalid");
            isValid = false;
        } else {
            document.getElementById("nom").classList.add("valid");
        }

        // Vérification email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === "") {
            document.getElementById("emailError").textContent = "Veuillez entrer votre email";
            document.getElementById("email").classList.add("invalid");
            isValid = false;
        } else if (!emailRegex.test(email)) {
            document.getElementById("emailError").textContent = "Format email invalide";
            document.getElementById("email").classList.add("invalid");
            isValid = false;
        } else {
            document.getElementById("email").classList.add("valid");
        }

        // Vérification téléphone — minimum 8 chiffres
        const phoneRegex = /\d{8,}/;
        if (telephone === "") {
            document.getElementById("telephoneError").textContent = "Veuillez entrer votre téléphone";
            document.getElementById("telephone").classList.add("invalid");
            isValid = false;
        } else if (!phoneRegex.test(telephone.replace(/\s/g, ""))) {
            document.getElementById("telephoneError").textContent = "Minimum 8 chiffres requis";
            document.getElementById("telephone").classList.add("invalid");
            isValid = false;
        } else {
            document.getElementById("telephone").classList.add("valid");
        }

        // Vérification type de participation
        if (participation === "") {
            document.getElementById("participationError").textContent = "Veuillez choisir un type de participation";
            document.getElementById("participation").classList.add("invalid");
            isValid = false;
        } else {
            document.getElementById("participation").classList.add("valid");
        }

        // Vérification pays
        if (pays === "") {
            document.getElementById("paysError").textContent = "Veuillez sélectionner votre pays";
            document.getElementById("pays").classList.add("invalid");
            isValid = false;
        } else {
            document.getElementById("pays").classList.add("valid");
        }

        // Vérification message — minimum 20 caractères
        if (message === "") {
            document.getElementById("messageError").textContent = "Veuillez écrire un message";
            document.getElementById("message").classList.add("invalid");
            isValid = false;
        } else if (message.length < 20) {
            document.getElementById("messageError").textContent = "Le message doit contenir au moins 20 caractères";
            document.getElementById("message").classList.add("invalid");
            isValid = false;
        } else {
            document.getElementById("message").classList.add("valid");
        }

        // Si tout est valide — succès
        if (isValid) {
            contactForm.reset();

            // Retirer toutes les classes valid
            document.querySelectorAll(".form-group input, .form-group select, .form-group textarea").forEach(el => {
                el.classList.remove("valid");
            });

            const successMsg = document.getElementById("successMessage");
            successMsg.classList.add("show");

            // Cacher après 5 secondes
            setTimeout(() => {
                successMsg.classList.remove("show");
            }, 5000);
        }
    });
}