
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

setInterval(updateCountdown, 1000);
updateCountdown();
