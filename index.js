/**
 * main.js
 * ─────────────────────────────────────────────────────────
 * Lógica principal do portfólio:
 *  - Scroll reveal suave (Intersection Observer)
 *  - Navbar com efeito ao scroll
 *  - Efeito typewriter no hero
 *  - Menu mobile
 *  - Animação de skills
 *  - Formulário de contato
 * ─────────────────────────────────────────────────────────
 */

document.addEventListener("DOMContentLoaded", () => {
    initScrollReveal();
    initNavbar();
    initTypewriter();
    initMobileMenu();
    initFilterButtons();
    initContactForm();
    initSkillBars();
    initSmoothScroll();
    initActiveNavLink();
  
    // Renderiza os projetos via projects.js
    if (window.ProjectCards) {
      window.ProjectCards.renderProjects("projects-grid");
    }
  });
  
  // ─── SCROLL REVEAL ───────────────────────────────────────
  function initScrollReveal() {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".scroll-reveal").forEach((el) =>
        el.classList.add("visible")
      );
      return;
    }
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay =
              parseInt(entry.target.style.getPropertyValue("--delay")) || 0;
            setTimeout(() => entry.target.classList.add("visible"), delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
  
    // Observa todos os elementos de reveal (exceto cards — gerenciados em projects.js)
    document
      .querySelectorAll(".scroll-reveal:not(.project-card)")
      .forEach((el) => observer.observe(el));
  }
  
  // ─── NAVBAR ──────────────────────────────────────────────
  function initNavbar() {
    const nav = document.querySelector(".navbar");
    if (!nav) return;
  
    let lastScroll = 0;
  
    window.addEventListener(
      "scroll",
      () => {
        const current = window.scrollY;
  
        // Fundo sólido após 60px
        nav.classList.toggle("scrolled", current > 60);
  
        // Esconde nav ao descer rápido, mostra ao subir
        if (current > lastScroll + 10 && current > 200) {
          nav.classList.add("hidden");
        } else if (current < lastScroll - 5) {
          nav.classList.remove("hidden");
        }
        lastScroll = current;
      },
      { passive: true }
    );
  }
  
  // ─── TYPEWRITER ──────────────────────────────────────────
  function initTypewriter() {
    const el = document.querySelector(".typewriter-text");
    if (!el) return;
  
    const words = [
      "Full Stack Developer",
      "Back-end Engineer",
      "Front-end Craftsman",
      "API Architect",
      "Problem Solver",
    ];
  
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let paused = false;
  
    function tick() {
      if (paused) return;
  
      const word = words[wordIndex];
  
      if (deleting) {
        charIndex--;
        el.textContent = word.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(tick, 400);
          return;
        }
        setTimeout(tick, 40);
      } else {
        charIndex++;
        el.textContent = word.slice(0, charIndex);
        if (charIndex === word.length) {
          paused = true;
          setTimeout(() => {
            paused = false;
            deleting = true;
            tick();
          }, 1800);
          return;
        }
        setTimeout(tick, 80);
      }
    }
  
    setTimeout(tick, 800);
  }
  
  // ─── MENU MOBILE ─────────────────────────────────────────
  function initMobileMenu() {
    const toggle = document.querySelector(".nav-toggle");
    const menu = document.querySelector(".nav-links");
    if (!toggle || !menu) return;
  
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
      toggle.classList.toggle("active", open);
      document.body.classList.toggle("menu-open", open);
    });
  
    // Fecha ao clicar em link
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("open");
        toggle.classList.remove("active");
        document.body.classList.remove("menu-open");
      });
    });
  
    // Fecha ao clicar fora
    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove("open");
        toggle.classList.remove("active");
        document.body.classList.remove("menu-open");
      }
    });
  }
  
  // ─── BOTÕES DE FILTRO ────────────────────────────────────
  function initFilterButtons() {
    const container = document.querySelector(".filter-buttons");
    if (!container) return;
  
    container.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      const filter = btn.dataset.filter || "all";
      if (window.ProjectCards) window.ProjectCards.filterProjects(filter);
    });
  }
  
  // ─── SKILL BARS ──────────────────────────────────────────
  function initSkillBars() {
    const bars = document.querySelectorAll(".skill-fill");
    if (!bars.length) return;
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const level = bar.dataset.level || "0";
            // Pequeno delay para suavidade
            setTimeout(() => {
              bar.style.width = level + "%";
            }, 150);
            observer.unobserve(bar);
          }
        });
      },
      { threshold: 0.3 }
    );
  
    bars.forEach((bar) => observer.observe(bar));
  }
  
  // ─── SMOOTH SCROLL ───────────────────────────────────────
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const target = document.querySelector(anchor.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
  
        const navH = document.querySelector(".navbar")?.offsetHeight || 70;
        const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
  
        window.scrollTo({ top, behavior: "smooth" });
      });
    });
  }
  
  // ─── ACTIVE NAV LINK ─────────────────────────────────────
  function initActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");
    if (!sections.length || !navLinks.length) return;
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              link.classList.toggle(
                "active",
                link.getAttribute("href") === "#" + entry.target.id
              );
            });
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
  
    sections.forEach((s) => observer.observe(s));
  }
  
  // ─── FORMULÁRIO DE CONTATO ───────────────────────────────
  function initContactForm() {
    const form = document.querySelector(".contact-form");
    if (!form) return;
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = form.querySelector(".btn-submit");
      const name = form.querySelector("#name")?.value.trim();
      const email = form.querySelector("#email")?.value.trim();
      const msg = form.querySelector("#message")?.value.trim();
  
      if (!name || !email || !msg) {
        showToast("Preencha todos os campos.", "error");
        return;
      }
  
      btn.disabled = true;
      btn.textContent = "Enviando…";
  
      // Simulação de envio — substitua pela sua integração real
      await new Promise((r) => setTimeout(r, 1200));
  
      btn.textContent = "Mensagem enviada ✓";
      btn.classList.add("sent");
      form.reset();
      showToast("Mensagem enviada com sucesso!", "success");
  
      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = "Enviar Mensagem";
        btn.classList.remove("sent");
      }, 4000);
    });
  }
  
  // ─── TOAST ───────────────────────────────────────────────
  function showToast(message, type = "success") {
    const existing = document.querySelector(".toast");
    if (existing) existing.remove();
  
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
  
    requestAnimationFrame(() => toast.classList.add("show"));
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }