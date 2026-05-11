/**
 * projects.js
 * ─────────────────────────────────────────────────────────
 * Geração dinâmica de cards de projeto a partir de dados.
 *
 * Como usar:
 *  1. Adicione seus projetos no array `projectsData` abaixo.
 *  2. Para cada projeto, coloque a imagem em: assets/projects/
 *  3. Os cards são criados automaticamente no grid.
 * ─────────────────────────────────────────────────────────
 */

// ─── 1. SEUS PROJETOS ────────────────────────────────────
// Edite esta lista para adicionar, remover ou atualizar projetos.
const projectsData = [
    {
      id: 1,
      title: "Harry-Potter Project",
      description: "Front-end consumindo API de potterDB",
      image: "assets/projects/projeto_harry_potter.png",
      tags: ["Node.js", "React", "PostgreSQL"],
      liveUrl: "https://franciscowala.github.io/harry-potter-front-api/",
      repoUrl: "https://github.com/FranciscoWala/harry-potter-front-api",
      featured: true,
    },
    {
      id: 2,
      title: "Task Manager API",
      description: "API RESTful com autenticação JWT, documentação Swagger e deploy na nuvem.",
      image: "assets/projects/project2.jpg",
      tags: ["Express", "MongoDB", "Docker"],
      liveUrl: "#",
      repoUrl: "https://github.com/",
      featured: false,
    },
    {
      id: 3,
      title: "Real-time Chat App",
      description: "Aplicação de chat com WebSockets, salas privadas e notificações push.",
      image: "assets/projects/project3.jpg",
      tags: ["Socket.io", "Vue.js", "Redis"],
      liveUrl: "#",
      repoUrl: "https://github.com/",
      featured: false,
    },
    {
      id: 4,
      title: "Dashboard Analytics",
      description: "Painel de métricas em tempo real com gráficos interativos e relatórios.",
      image: "assets/projects/project4.jpg",
      tags: ["D3.js", "Python", "FastAPI"],
      liveUrl: "#",
      repoUrl: "https://github.com/",
      featured: false,
    },
    {
      id: 5,
      title: "Mobile Finance App",
      description: "App de finanças pessoais com categorias, metas e exportação em PDF.",
      image: "assets/projects/project5.jpg",
      tags: ["React Native", "Firebase", "Expo"],
      liveUrl: "#",
      repoUrl: "https://github.com/",
      featured: false,
    },
    {
      id: 6,
      title: "DevOps Pipeline",
      description: "Pipeline de CI/CD completo com testes automatizados e deploy zero-downtime.",
      image: "assets/projects/project6.jpg",
      tags: ["GitHub Actions", "Terraform", "AWS"],
      liveUrl: "#",
      repoUrl: "https://github.com/",
      featured: false,
    },
  ];
  
  // ─── 2. FALLBACK de imagem ───────────────────────────────
  // Gerado via Canvas quando a imagem do projeto não é encontrada.
  function generatePlaceholderImage(title, index) {
    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 380;
    const ctx = canvas.getContext("2d");
  
    const palettes = [
      ["#00e87a", "#00c4b4"],
      ["#00c4b4", "#0080ff"],
      ["#00e87a", "#00ff55"],
      ["#00d4b0", "#00e87a"],
      ["#009688", "#00e87a"],
      ["#00bcd4", "#00e87a"],
    ];
    const [c1, c2] = palettes[index % palettes.length];
  
    const grad = ctx.createLinearGradient(0, 0, 600, 380);
    grad.addColorStop(0, c1 + "33");
    grad.addColorStop(1, c2 + "22");
    ctx.fillStyle = "#0d1a14";
    ctx.fillRect(0, 0, 600, 380);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 600, 380);
  
    // Grid decorativo
    ctx.strokeStyle = c1 + "18";
    ctx.lineWidth = 1;
    for (let x = 0; x < 600; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 380); ctx.stroke();
    }
    for (let y = 0; y < 380; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(600, y); ctx.stroke();
    }
  
    // Círculo decorativo
    ctx.beginPath();
    ctx.arc(480, 80, 120, 0, Math.PI * 2);
    ctx.fillStyle = c1 + "10";
    ctx.fill();
  
    // Ícone central
    ctx.font = "bold 56px 'Courier New'";
    ctx.fillStyle = c1 + "cc";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("{ }", 300, 160);
  
    // Título
    ctx.font = "bold 22px 'Arial'";
    ctx.fillStyle = "#e8f5f0";
    ctx.fillText(title, 300, 240);
  
    // Linha decorativa
    const lineGrad = ctx.createLinearGradient(180, 0, 420, 0);
    lineGrad.addColorStop(0, "transparent");
    lineGrad.addColorStop(0.5, c1);
    lineGrad.addColorStop(1, "transparent");
    ctx.strokeStyle = lineGrad;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(180, 262); ctx.lineTo(420, 262); ctx.stroke();
  
    return canvas.toDataURL("image/png");
  }
  
  // ─── 3. CRIAÇÃO DO CARD ──────────────────────────────────
  /**
   * Cria e retorna um elemento <article> completo para um projeto.
   * @param {Object} project - Objeto com dados do projeto
   * @param {number} index   - Índice para animação escalonada
   * @returns {HTMLElement}
   */
  function createProjectCard(project, index = 0) {
    const card = document.createElement("article");
    card.className = "project-card scroll-reveal" + (project.featured ? " featured" : "");
    card.style.setProperty("--delay", `${index * 80}ms`);
  
    // Tags HTML
    const tagsHTML = project.tags
      .map((tag) => `<span class="tag">${tag}</span>`)
      .join("");
  
    card.innerHTML = `
      <div class="card-image-wrap">
        <img
          class="card-img"
          src="${project.image}"
          alt="${project.title}"
          loading="lazy"
          onerror="this.src='${generatePlaceholderImage(project.title, index)}'"
        />
        <div class="card-overlay">
          <div class="card-actions">
            <a href="${project.liveUrl}" target="_blank" rel="noopener" class="btn-card btn-live" title="Ver ao vivo">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Live
            </a>
            <a href="${project.repoUrl}" target="_blank" rel="noopener" class="btn-card btn-repo" title="Ver repositório">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Código
            </a>
          </div>
        </div>
        ${project.featured ? '<span class="badge-featured">⭐ Destaque</span>' : ""}
      </div>
      <div class="card-body">
        <h3 class="card-title">${project.title}</h3>
        <p class="card-desc">${project.description}</p>
        <div class="card-tags">${tagsHTML}</div>
      </div>
    `;
  
    return card;
  }
  
  // ─── 4. RENDERIZAÇÃO NO GRID ─────────────────────────────
  /**
   * Renderiza todos os projetos no container especificado.
   * @param {string} containerId - ID do elemento grid no HTML
   * @param {Array}  data        - Array de projetos (usa projectsData por padrão)
   */
  function renderProjects(containerId = "projects-grid", data = projectsData) {
    const grid = document.getElementById(containerId);
    if (!grid) {
      console.warn(`[projects.js] Container #${containerId} não encontrado.`);
      return;
    }
  
    grid.innerHTML = "";
  
    data.forEach((project, index) => {
      const card = createProjectCard(project, index);
      grid.appendChild(card);
    });
  
    // Ativa animações após inserção no DOM
    requestAnimationFrame(() => {
      document.querySelectorAll(".project-card.scroll-reveal").forEach((el) => {
        observeElement(el);
      });
    });
  }
  
  // ─── 5. FILTRO POR TAG ───────────────────────────────────
  /**
   * Filtra projetos pela tag selecionada e re-renderiza o grid.
   * @param {string} tag - Tag para filtrar ("all" mostra todos)
   */
  function filterProjects(tag) {
    const filtered =
      tag === "all"
        ? projectsData
        : projectsData.filter((p) => p.tags.includes(tag));
    renderProjects("projects-grid", filtered);
  
    // Atualiza estado visual dos botões de filtro
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.filter === tag);
    });
  }
  
  // ─── 6. INTERSECTION OBSERVER (scroll reveal) ───────────
  function observeElement(el) {
    if (!("IntersectionObserver" in window)) {
      el.classList.add("visible");
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, parseInt(entry.target.style.getPropertyValue("--delay")) || 0);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
  }
  
  // Expõe funções globalmente
  window.ProjectCards = { renderProjects, filterProjects, createProjectCard, data: projectsData };