// Parallax SAFE : seulement l'image de la section visible
const parallaxSections = document.querySelectorAll("section");

const parallaxObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        const section = entry.target;
        const img = section.querySelector("figure img");
        if (!img) return;

        if (entry.isIntersecting) {
            section.classList.add("parallax-on");
        } else {
            section.classList.remove("parallax-on");
            img.style.transform = "translateY(0px) scale(1)"; // reset propre
        }
    });
}, { threshold: 0.35 });

parallaxSections.forEach((s) => parallaxObserver.observe(s));

window.addEventListener("scroll", () => {
    const active = document.querySelector("section.parallax-on");
    if (!active) return;

    const img = active.querySelector("figure img");
    if (!img) return;

    const rect = active.getBoundingClientRect();
    const vh = window.innerHeight;

    // valeur entre -1 et 1 environ
    const t = (rect.top / vh);

    // parallax très léger + petit zoom
    const translate = t * -18; // augmente à -28 si tu veux plus visible
    const scale = 1.03;

    img.style.transform = `translateY(${translate}px) scale(${scale})`;
}, { passive: true });
