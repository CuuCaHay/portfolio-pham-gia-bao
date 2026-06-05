const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((element) => observer.observe(element));

const themeToggle = document.getElementById("themeToggle");
const THEME_KEY = "portfolio-theme";

const applyTheme = (theme) => {
  if (!themeToggle) return;

  if (theme === "light") {
    document.body.classList.add("light");
    themeToggle.textContent = "☀️";
  } else {
    document.body.classList.remove("light");
    themeToggle.textContent = "🌙";
  }
};

const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme) {
  applyTheme(savedTheme);
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light");
    const currentTheme = isLight ? "light" : "dark";
    localStorage.setItem(THEME_KEY, currentTheme);
    applyTheme(currentTheme);
  });
}

const closeAllProjectRolePanels = () => {
  document.querySelectorAll(".project-card--role-open").forEach((card) => {
    card.classList.remove("project-card--role-open");
    const btn = card.querySelector(".project-title");
    if (btn) btn.setAttribute("aria-expanded", "false");
  });
};

document.querySelectorAll(".project-title").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const card = btn.closest(".project-card");
    if (!card) return;
    const wasOpen = card.classList.contains("project-card--role-open");
    closeAllProjectRolePanels();
    if (!wasOpen) {
      card.classList.add("project-card--role-open");
      btn.setAttribute("aria-expanded", "true");
    }
  });
});

document.addEventListener("click", (e) => {
  if (e.target.closest(".project-card")) return;
  closeAllProjectRolePanels();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeAllProjectRolePanels();
});
