/* ---------- TYPING ANIMATION ---------- */

const typingText = document.getElementById("typing-text");

const words = [
    "Student Developer",
    "Python Programmer",
    "Web Developer",
    "Problem Solver"
];

let wordIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeAnimation() {
    if (!typingText) return;

    const currentWord = words[wordIndex];

    if (deleting) {
        characterIndex--;
    } else {
        characterIndex++;
    }

    typingText.textContent = currentWord.substring(0, characterIndex);

    let delay = deleting ? 45 : 85;

    if (!deleting && characterIndex === currentWord.length) {
        deleting = true;
        delay = 1300;
    } else if (deleting && characterIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 350;
    }

    setTimeout(typeAnimation, delay);
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    typeAnimation();
} else if (typingText) {
    typingText.textContent = "Student Developer";
}


/* ---------- SCROLL REVEAL ANIMATION ---------- */

const revealElements = document.querySelectorAll(
    ".reveal, .section-title, .section-label, " +
    ".section-description, .about-card, .skill-card, " +
    ".project-card, .contact-info, .contact-form"
);

const motionPreference = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

if (
    "IntersectionObserver" in window &&
    !motionPreference.matches
) {
    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.08,
            rootMargin: "0px 0px -30px 0px"
        }
    );

    revealElements.forEach(function (element) {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });
} else {
    // Keep all content visible if animations are unsupported or disabled.
    revealElements.forEach(function (element) {
        element.classList.add("visible");
    });
}


/* ---------- CONTACT FORM VALIDATION ---------- */

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        formStatus.className = "";

        if (!name || !email || !message) {
            formStatus.textContent = "Please fill in all fields.";
            formStatus.classList.add("error");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            formStatus.textContent =
                "Please enter a valid email address.";
            formStatus.classList.add("error");
            return;
        }

        formStatus.textContent =
            "Thank you, " + name +
            "! Your form is valid. Please email me directly to send your message.";

        formStatus.classList.add("success");

        // This form validates input but does not send or store messages.
    });
}


/* ---------- BACK TO TOP BUTTON ---------- */

const backToTopButton = document.getElementById("back-to-top");

if (backToTopButton) {
    window.addEventListener("scroll", function () {
        if (window.scrollY > 400) {
            backToTopButton.classList.add("show");
        } else {
            backToTopButton.classList.remove("show");
        }
    });

    backToTopButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/* ===== EXTRA INTERACTIVE EFFECTS ===== */

// 1. Make the glow follow the mouse on cards
const glowingCards = document.querySelectorAll(
    ".project-card, .skill-card"
);

glowingCards.forEach(function (card) {
    card.addEventListener("pointermove", function (event) {
        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        card.style.setProperty("--mouse-x", x + "px");
        card.style.setProperty("--mouse-y", y + "px");
    });
});

// 2. Give buttons a subtle hover response
const animatedButtons = document.querySelectorAll(".btn");

animatedButtons.forEach(function (button) {
    button.addEventListener("pointerenter", function () {
        button.style.transition =
            "transform 0.25s ease, box-shadow 0.25s ease";
    });

    button.addEventListener("pointerleave", function () {
        button.style.transform = "";
    });
});

/* ===== 3D TILT INTERACTION ===== */

const tiltCards = document.querySelectorAll(
    ".project-card, .skill-card"
);

tiltCards.forEach(function (card) {
    card.addEventListener("pointermove", function (event) {
        // Use the effect only with a real mouse.
        if (event.pointerType !== "mouse") return;

        const rect = card.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        const rotateY = (x - 0.5) * 8;
        const rotateX = (0.5 - y) * 8;

        card.style.transform =
            `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("pointerleave", function () {
        card.style.transform = "";
    });
});

/* ===== SCROLL PROGRESS BAR FUNCTION ===== */

const scrollProgress = document.getElementById("scroll-progress");

function updateScrollProgress() {
    if (!scrollProgress) return;

    const scrollableHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    if (scrollableHeight <= 0) {
        scrollProgress.style.width = "0%";
        return;
    }

    const scrollPercentage =
        (window.scrollY / scrollableHeight) * 100;

    scrollProgress.style.width =
        Math.min(scrollPercentage, 100) + "%";
}

window.addEventListener("scroll", updateScrollProgress, {
    passive: true
});

window.addEventListener("resize", updateScrollProgress);

updateScrollProgress();