const WHATSAPP_URL =
  "https://wa.me/55SEUNUMERO?text=Ol%C3%A1,%20quero%20automatizar%20minha%20empresa";
const INSTAGRAM_URL = "https://www.instagram.com/ai.ativa/";

const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const whatsappLinks = document.querySelectorAll("[data-whatsapp]");
const instagramLinks = document.querySelectorAll(
  '[data-instagram], a[href*="instagram.com"]'
);
const revealItems = document.querySelectorAll(".reveal");

const getStoredTheme = () => {
  try {
    return localStorage.getItem("ativa-theme");
  } catch {
    return null;
  }
};

const storeTheme = (theme) => {
  try {
    localStorage.setItem("ativa-theme", theme);
  } catch {
    // Theme still changes for the current session when storage is unavailable.
  }
};

const systemPrefersDark = () =>
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

const applyTheme = (theme, shouldPersist = false) => {
  const nextTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = nextTheme;
  themeToggle.setAttribute("aria-pressed", String(nextTheme === "dark"));
  themeToggle.setAttribute(
    "aria-label",
    nextTheme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"
  );
  themeColorMeta.setAttribute("content", nextTheme === "dark" ? "#07111f" : "#0759ff");

  if (shouldPersist) {
    storeTheme(nextTheme);
  }
};

applyTheme(document.documentElement.dataset.theme || getStoredTheme() || (systemPrefersDark() ? "dark" : "light"));

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme;
  applyTheme(currentTheme === "dark" ? "light" : "dark", true);
});

if (window.matchMedia) {
  const themeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  themeQuery.addEventListener("change", (event) => {
    if (!getStoredTheme()) {
      applyTheme(event.matches ? "dark" : "light");
    }
  });
}

whatsappLinks.forEach((link) => {
  link.setAttribute("href", WHATSAPP_URL);
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noreferrer");
});

instagramLinks.forEach((link) => {
  link.setAttribute("href", INSTAGRAM_URL);
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noreferrer");
});

const closeMenu = () => {
  navMenu.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
};

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener(
  "scroll",
  () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  },
  { passive: true }
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -60px 0px",
    }
  );

  const revealVisibleItems = () => {
    revealItems.forEach((item) => {
      if (item.classList.contains("is-visible")) {
        return;
      }

      const rect = item.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;

      if (isInView) {
        item.classList.add("is-visible");
        observer.unobserve(item);
      }
    });
  };

  revealItems.forEach((item) => observer.observe(item));
  requestAnimationFrame(revealVisibleItems);
  window.addEventListener("pageshow", revealVisibleItems);
  window.addEventListener("hashchange", () => requestAnimationFrame(revealVisibleItems));
  window.addEventListener("scroll", revealVisibleItems, { passive: true });
  setTimeout(revealVisibleItems, 140);
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});
