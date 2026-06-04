(() => {
  const listEl = document.getElementById("wp-list");
  const pagerEl = document.getElementById("wp-pagination");
  const tagsEl = document.getElementById("wp-tags");
  const resetBtn = document.getElementById("wp-reset");
  const searchEl = document.getElementById("wp-search");
  const searchBtn = document.getElementById("wp-search-btn");
  const locationEl = document.getElementById("wp-location");
  const sortBtns = Array.from(document.querySelectorAll("[data-sort]"));
  const filterInputs = Array.from(document.querySelectorAll("input[type='checkbox'][data-filter]"));
  const menuToggle = document.querySelector("[data-wp-menu-toggle]");
  const menuPanel = document.getElementById("wp-navbar-mobile");

  if (menuToggle && menuPanel) {
    menuToggle.addEventListener("click", () => {
      menuPanel.classList.toggle("hidden");
      const open = !menuPanel.classList.contains("hidden");
      menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menuPanel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuPanel.classList.add("hidden");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (!listEl || !pagerEl) return;

  /** شعبية ومشاهدات ونجاح توظيف (بيانات تجريبية للترتيب) */
  const DATA = [
    { id: "1", name: "شركة الريادة الرقمية", desc: "شريك على خطوة يركّز على بيئة عمل مرنة وتقنيات حديثة، مع تقييمات قوية في الثقافة والقيم والشفافية.", rating: 4.6, popularity: 88, views: 12400, hireSuccess: 82, tags: ["الثقافة والقيم"], size: "201-1000", gender: "ذكر", workplace: "الثقافة والقيم", country: "السعودية" },
    { id: "2", name: "مؤسسة أفق البيانات", desc: "خدمات تقنية للشركات الناشئة والمتوسطة، بيئة هجينة وفرص نمو واضحة ضمن فريق تقني متكامل.", rating: 4.5, popularity: 76, views: 9800, hireSuccess: 79, tags: ["فرص وظيفية"], size: "51-200", gender: "أنثى", workplace: "فرص وظيفية", country: "السعودية" },
    { id: "3", name: "شركة نبض للمنتجات الرقمية", desc: "منتجات رقمية في التجارة والتوظيف، ثقافة تعتمد البيانات والنتائج مع توازن معقول للفريق.", rating: 4.7, popularity: 91, views: 15200, hireSuccess: 85, tags: ["توازن العمل والحياة"], size: "11-50", gender: "يفضّل عدم التحديد", workplace: "توازن العمل والحياة", country: "الإمارات" },
    { id: "4", name: "مجموعة سديم للاستشارات", desc: "استشارات إدارية وتطوير تنظيمي، إدارة عليا قريبة من الموظفين ومسارات تطوير مهني واضحة.", rating: 4.4, popularity: 72, views: 6100, hireSuccess: 88, tags: ["الإدارة العليا"], size: "201-1000", gender: "ذكر", workplace: "الإدارة العليا", country: "مصر" },
    { id: "5", name: "شركة خطوة للتقنيات الرقمية", desc: "حلول توظيف ذكية ومنتجات عربية تدعم الباحثين عن العمل وأصحاب الشركات.", rating: 4.8, popularity: 95, views: 18900, hireSuccess: 92, tags: ["الثقافة والقيم"], size: "51-200", gender: "أنثى", workplace: "الثقافة والقيم", country: "السعودية" },
    { id: "6", name: "مكتب حدائق المعرفة", desc: "تدريب وتحول رقمي للجهات الحكومية والخاصة، فرص تعاون متنوعة وبيئة تعلّم مستمر.", rating: 4.3, popularity: 65, views: 4200, hireSuccess: 74, tags: ["فرص وظيفية"], size: "1-10", gender: "ذكر", workplace: "فرص وظيفية", country: "الأردن" },
    { id: "7", name: "شركة لؤلؤة الخليج للتجارة", desc: "تجارة إلكترونية وخدمات لوجستية، فريق يعمل بضغط موسمي مع سياسات واضحة للدوام والإجازات.", rating: 4.2, popularity: 70, views: 11200, hireSuccess: 71, tags: ["توازن العمل والحياة"], size: "11-50", gender: "يفضّل عدم التحديد", workplace: "توازن العمل والحياة", country: "الإمارات" },
    { id: "8", name: "مجموعة رؤى للإعلام", desc: "إنتاج محتوى عربي للعلامات التجارية، إدارة تحريرية داعمة ومساحة لابتكار الأفكار.", rating: 4.5, popularity: 80, views: 13400, hireSuccess: 77, tags: ["الإدارة العليا"], size: "201-1000", gender: "أنثى", workplace: "الإدارة العليا", country: "مصر" },
    { id: "9", name: "شركة أطلس للهندسة", desc: "مشاريع بنية تحتية وتصميم، ثقافة ميدانية مع احترام خبرة المهندسين والسلامة المهنية.", rating: 4.4, popularity: 74, views: 8900, hireSuccess: 81, tags: ["الثقافة والقيم"], size: "51-200", gender: "ذكر", workplace: "الثقافة والقيم", country: "السعودية" },
    { id: "10", name: "مركز إنماء للتقنية", desc: "حاضنة أعمال وشركات ناشئة، شبكة علاقات واسعة وفرص توظيف في مراحل النمو المبكرة.", rating: 4.6, popularity: 84, views: 7600, hireSuccess: 90, tags: ["فرص وظيفية"], size: "11-50", gender: "أنثى", workplace: "فرص وظيفية", country: "الأردن" },
    { id: "11", name: "شركة وثاق للبرمجيات", desc: "تطوير تطبيقات مؤسسات وواجهات ويب، فريق جودة ودعم فني يعمل بأسلوب رشيق.", rating: 4.5, popularity: 78, views: 10500, hireSuccess: 80, tags: ["الثقافة والقيم"], size: "11-50", gender: "ذكر", workplace: "الثقافة والقيم", country: "السعودية" },
    { id: "12", name: "مختبر بروق للابتكار", desc: "تجارب مستخدم ومنتجات رشيقة، شراكات مع جامعات وورش تصميم دورية.", rating: 4.4, popularity: 69, views: 5300, hireSuccess: 76, tags: ["توازن العمل والحياة"], size: "1-10", gender: "أنثى", workplace: "توازن العمل والحياة", country: "الإمارات" },
    { id: "13", name: "شركة درب الموردين", desc: "منصة توريد B2B وشبكة لوجستية تربط المصانع بالتجار في الخليج.", rating: 4.3, popularity: 73, views: 9200, hireSuccess: 78, tags: ["فرص وظيفية"], size: "51-200", gender: "يفضّل عدم التحديد", workplace: "فرص وظيفية", country: "السعودية" },
    { id: "14", name: "مجموعة فيفاء للطاقة", desc: "حلول طاقة متجددة وصيانة محطات، تركيز على السلامة والتدريب الميداني.", rating: 4.5, popularity: 81, views: 7100, hireSuccess: 83, tags: ["الإدارة العليا"], size: "201-1000", gender: "ذكر", workplace: "الإدارة العليا", country: "مصر" },
    { id: "15", name: "استوديو حرف للتصميم", desc: "هوية بصرية وتجربة مستخدم للعلامات العربية، فريق صغير مرن.", rating: 4.6, popularity: 86, views: 14100, hireSuccess: 86, tags: ["الثقافة والقيم"], size: "1-10", gender: "أنثى", workplace: "الثقافة والقيم", country: "الأردن" },
    { id: "16", name: "شركة مسار التعلّم", desc: "منصة تدريب عن بُعد وشهادات مهنية للقطاعين الحكومي والخاص.", rating: 4.4, popularity: 75, views: 8800, hireSuccess: 79, tags: ["فرص وظيفية"], size: "51-200", gender: "ذكر", workplace: "فرص وظيفية", country: "الإمارات" },
    { id: "17", name: "شركة أفق السحاب", desc: "بنية تحتية سحابية وأتمتة تشغيل للشركات المتوسطة في المنطقة.", rating: 4.7, popularity: 89, views: 16200, hireSuccess: 87, tags: ["فرص وظيفية"], size: "51-200", gender: "أنثى", workplace: "فرص وظيفية", country: "السعودية" },
    { id: "18", name: "مجموعة مدى الصحة", desc: "حلول صحية رقمية وتكامل مع أنظمة المستشفيات، التزام بالخصوصية.", rating: 4.5, popularity: 77, views: 9900, hireSuccess: 84, tags: ["توازن العمل والحياة"], size: "201-1000", gender: "يفضّل عدم التحديد", workplace: "توازن العمل والحياة", country: "الإمارات" },
    { id: "19", name: "شركة زيتونة للأغذية", desc: "تعبئة وتوزيع منتجات غذائية مع شهادات جودة وتوريد للتجزئة.", rating: 4.2, popularity: 71, views: 6800, hireSuccess: 73, tags: ["الثقافة والقيم"], size: "11-50", gender: "ذكر", workplace: "الثقافة والقيم", country: "مصر" },
    { id: "20", name: "مكتب نوافذ العقار", desc: "استشارات عقارية وتقييم أصول، فرق ميدانية في المدن الرئيسية.", rating: 4.3, popularity: 68, views: 5400, hireSuccess: 75, tags: ["الإدارة العليا"], size: "1-10", gender: "أنثى", workplace: "الإدارة العليا", country: "الأردن" },
    { id: "21", name: "شركة تموّج للإعلان", desc: "حملات رقمية وإنتاج مرئي للعلامات المحلية والإقليمية.", rating: 4.5, popularity: 82, views: 11800, hireSuccess: 80, tags: ["فرص وظيفية"], size: "11-50", gender: "ذكر", workplace: "فرص وظيفية", country: "السعودية" },
    { id: "22", name: "مركز ياقوت للمهارات", desc: "ورش مهارات ناعمة ولغات للفرق الإدارية والتقنية.", rating: 4.4, popularity: 74, views: 8200, hireSuccess: 82, tags: ["توازن العمل والحياة"], size: "1-10", gender: "أنثى", workplace: "توازن العمل والحياة", country: "مصر" },
    { id: "23", name: "شركة جسر اللوجستيات", desc: "تخزين بارد وشحن بين الموانئ الخليجية مع تتبّع لحظي.", rating: 4.3, popularity: 79, views: 10100, hireSuccess: 77, tags: ["فرص وظيفية"], size: "51-200", gender: "يفضّل عدم التحديد", workplace: "فرص وظيفية", country: "الإمارات" },
    { id: "24", name: "مجموعة ضياء للاستثمار", desc: "استثمار في شركات ناشئة تقنية وتوجيه استراتيجي للمجالس.", rating: 4.6, popularity: 83, views: 7200, hireSuccess: 91, tags: ["الإدارة العليا"], size: "11-50", gender: "ذكر", workplace: "الإدارة العليا", country: "السعودية" },
  ];

  const state = {
    page: 1,
    /* ثلاث بطاقات لكل صفحة */
    perPage: 3,
    sort: "popular",
    q: "",
    location: "",
    filters: {
      workplace: new Set(),
      gender: new Set(),
      size: new Set(),
    },
  };

  /** @param {HTMLButtonElement} btn @param {boolean} active */
function setSortButtonVisual(btn, active) {
  // تفعيل الحالة (يبقى كما هو)
  btn.classList.toggle("bg-[var(--color-button)]", active);
  btn.classList.toggle("text-[var(--color-button-title)]", active);
  btn.classList.toggle("border-transparent", active);
  
  // حالة عدم التفعيل
  btn.classList.toggle("bg-transparent", !active);
  btn.classList.toggle("border", !active);
  btn.classList.toggle("border-gray-200", !active);
  btn.classList.toggle("dark:border-border-dark", !active);
  btn.classList.toggle("text-slate-600", !active);
  btn.classList.toggle("dark:text-text-muted-dark", !active);
  
  // تحديث لون الـ Hover ليكون متناسقاً
  // في الوضع الفاتح: hover:bg-slate-100 أو var(--color-input)
  // في الوضع الداكن: hover:bg-white/5 (أبيض شفاف 5%) يعطي تباين خفيف جداً وأنيق
  btn.classList.toggle("hover:bg-slate-100", !active);
  btn.classList.toggle("dark:hover:bg-white/5", !active); 
}

  function stars(r) {
    return `<span class="inline-flex items-center gap-1 text-sm font-bold tabular-nums text-amber-700" dir="ltr"><span class="text-amber-500" aria-hidden="true">★</span>${r.toFixed(1)}</span>`;
  }

  /** أرقام تجريبية مشابهة لبطاقات Joblin (وظائف / مراجعات / رواتب) */
  function cardStats(item) {
    const jobs = Math.max(4, Math.round(Number(item.popularity) / 3));
    const reviewsK = (Number(item.views) / 1000).toFixed(1);
    const salK = (Number(item.hireSuccess) * 0.38).toFixed(1);
    return { jobs, reviewsK, salK };
  }

  /** شعارات SVG مميّزة لكل شركة (12 نمط يتكرر حسب المعرف) */
  function companyLogo(item) {
    const uid = String(item.id);
    const idx = (Number(uid) - 1) % 12;
    const gid = `wpg-${uid}`;
    const w = "fill=\"#fff\" fill-opacity=\"0.92\"";
    const shapes = [
      `<path ${w} d="M12 28h5v8h-5zm10.5-8h5v16h-5zm10 5h5v11h-5"/>`,
      `<path ${w} d="M24 14c-6 0-10 5-10 11s4 11 10 11 10-5 10-11-4-11-10-11zm0 6a5 5 0 0 1 5 5 5 5 0 0 1-10 0 5 5 0 0 1 5-5z"/>`,
      `<path ${w} d="M12 26c4-8 8-8 12 0s8 8 12 0c2-4 4-4 6 0v6H12v-6z"/>`,
      `<path ${w} d="M14 30V18h4v12h-4zm8-6V18h4v12h-4zm8 4V18h4v12h-4"/>`,
      `<path ${w} d="M24 12l3 8 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1 3-8z"/>`,
      `<path ${w} d="M24 10l9 5v10l-9 5-9-5V15l9-5zm0 4.5L18 18v6l6 3.3 6-3.3v-6l-6-3.5z"/>`,
      `<path ${w} d="M24 14l-8 14h16L24 14zm0 5.2L27.8 26h-7.6L24 19.2z"/>`,
      `<path ${w} d="M26 12h-4l-2 10h8l-2-10zm-1 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>`,
      `<path ${w} d="M16 34V16h4v18h-4zm6-8V16h4v10h-4zm6-5V16h4v15h-4"/>`,
      `<path ${w} d="M18 24c0-4 2.5-6 6-6s6 2 6 6-2.5 7-6 7-6-3-6-7zm6-9a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"/>`,
      `<path ${w} d="M24 12l8 12-8 12-8-12 8-12z"/>`,
      `<path ${w} d="M24 13l2.2 6.2 6.6.5-5 4.4 1.5 6.4L24 23.5l-5.3 3.2 1.5-6.4-5-4.4 6.6-.5L24 13z"/>`,
    ];
    return `
      <svg class="h-14 w-14 shrink-0 rounded-2xl shadow-sm ring-1 ring-slate-900/10" width="56" height="56" viewBox="0 0 48 48" aria-hidden="true">
        <defs>
          <linearGradient id="${gid}" x1="8" y1="4" x2="40" y2="44" gradientUnits="userSpaceOnUse">
            <stop stop-color="#5eead4"/>
            <stop offset="0.45" stop-color="#44EDD1"/>
            <stop offset="1" stop-color="#1e4d47"/>
          </linearGradient>
        </defs>
        <rect width="48" height="48" rx="12" fill="url(#${gid})"/>
        ${shapes[idx]}
      </svg>
    `;
  }

  function renderRow(item) {
    const { jobs, reviewsK, salK } = cardStats(item);
    
    // بناء التاجات (Pills) المتوافقة تماماً مع ألوان نظام خطوة
    const pills = (item.tags || []).slice(0, 2).map((t) =>
        `<span class="inline-flex max-w-full items-center truncate rounded-full border border-card dark:border-border-dark bg-input dark:bg-input-dark/60 px-2.5 py-0.5 text-xs font-semibold text-text-muted dark:text-text-muted-dark">${t}</span>`
    ).join("");

    return `
      <a href="./company-profile.html" dir="rtl" lang="ar"
        class="wp-company-card group flex items-stretch gap-3 rounded-2xl border border-card dark:border-border-dark bg-surface dark:bg-surface-dark p-4 text-right shadow-[0_1px_3px_rgba(15,23,42,0.06)] dark:shadow-none transition duration-300 hover:border-[var(--color-button)]/45 dark:hover:border-[var(--color-button)]/60 hover:shadow-md sm:gap-4 sm:p-5">
        
        <div class="shrink-0 self-start pt-0.5">${companyLogo(item)}</div>
        
        <div class="flex min-w-0 w-0 flex-1 flex-col items-stretch">
          <h3 class="text-lg font-bold leading-snug text-primaryHeading dark:text-dark-heading transition group-hover:text-[var(--color-button-title)] line-clamp-2">${item.name}</h3>
          <p class="mt-1 text-xs font-medium text-text-muted dark:text-text-muted-dark">${item.country}</p>
          
          <div class="mt-2 flex flex-wrap items-center justify-start gap-2">
            <span class="shrink-0 rounded-lg bg-amber-50 dark:bg-amber-500/10 px-2.5 py-1.5 ring-1 ring-amber-100 dark:ring-amber-500/20 text-amber-700 dark:text-amber-400" dir="ltr">${stars(item.rating)}</span>
            ${pills}
          </div>
          
          <p class="mt-2 w-full text-sm leading-7 text-text-muted dark:text-text-muted-dark line-clamp-2 text-pretty">${item.desc}</p>
          
          <div class="mt-auto pt-3">
            <div class="flex flex-wrap items-center justify-start gap-x-4 gap-y-1 border-t border-input dark:border-border-dark/60 pt-3 text-[11px] text-text-muted dark:text-text-muted-dark sm:gap-x-6 sm:text-xs">
              <span class="inline-flex items-baseline gap-1"><span class="font-bold tabular-nums text-primaryHeading dark:text-dark-heading" dir="ltr">${jobs}</span><span>وظيفة تقريبًا</span></span>
              <span class="inline-flex items-baseline gap-1"><span class="font-bold tabular-nums text-primaryHeading dark:text-dark-heading" dir="ltr">${reviewsK}</span><span>ألف مراجعة</span></span>
              <span class="inline-flex items-baseline gap-1"><span class="font-bold tabular-nums text-primaryHeading dark:text-dark-heading" dir="ltr">${salK}</span><span>ألف راتب</span></span>
            </div>
          </div>
        </div>
        
        <span class="flex h-10 w-10 shrink-0 items-center justify-center self-center rounded-full border border-card dark:border-border-dark bg-input dark:bg-input-dark/40 text-text-muted dark:text-text-muted-dark transition duration-300 group-hover:border-[var(--color-button)]/35 group-hover:bg-[var(--color-input)] dark:group-hover:bg-input-dark group-hover:text-[var(--color-button-title)]" aria-hidden="true">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
        </span>
      </a>
    `;
}

  function selectedTags() {
    const tags = [];
    Object.entries(state.filters).forEach(([k, set]) => {
      set.forEach((v) => tags.push({ key: k, value: v }));
    });
    return tags;
  }

  function renderTags() {
    if (!tagsEl) return;
    const tags = selectedTags();
    tagsEl.innerHTML = tags.map((t) => `
      <button type="button" data-tag="${t.key}::${t.value}"
        class="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-[var(--color-button)]/30 hover:bg-[var(--color-input)]">
        <span>${t.value}</span>
        <span class="text-slate-400" aria-hidden="true">×</span>
      </button>
    `).join("");
  }

  function applySort(items) {
    const mode = state.sort || "popular";
    const copy = items.slice();
    const num = (v) => (typeof v === "number" && !Number.isNaN(v) ? v : 0);

    if (mode === "views") {
      copy.sort((a, b) => num(b.views) - num(a.views));
    } else if (mode === "top") {
      copy.sort((a, b) => num(b.rating) - num(a.rating) || num(b.popularity) - num(a.popularity));
    } else if (mode === "success") {
      copy.sort((a, b) => num(b.hireSuccess) - num(a.hireSuccess));
    } else {
      /* popular */
      copy.sort((a, b) => num(b.popularity) - num(a.popularity) || num(b.views) - num(a.views));
    }
    return copy;
  }

  function applyFilters(items) {
    const q = (state.q || "").toLowerCase().trim();
    const loc = (state.location || "").trim();
    return items.filter((it) => {
      const qOk = !q || (it.name + " " + it.desc).toLowerCase().includes(q);
      const locOk = !loc || it.country === loc;
      const workplaceOk = state.filters.workplace.size === 0 || state.filters.workplace.has(it.workplace);
      const genderOk = state.filters.gender.size === 0 || state.filters.gender.has(it.gender);
      const sizeOk = state.filters.size.size === 0 || state.filters.size.has(it.size);
      return qOk && locOk && workplaceOk && genderOk && sizeOk;
    });
  }

  function renderPagination(total) {
    const pages = Math.max(1, Math.ceil(total / state.perPage));
    const current = Math.min(state.page, pages);
    state.page = current;

    const btn = (label, page, active = false, disabled = false) => `
      <button type="button" data-page="${page}" ${disabled ? "disabled" : ""}
        class="h-8 min-w-8 rounded-lg border px-3 text-xs font-semibold transition ${active ? "border-[var(--color-button)] bg-[var(--color-button)] text-[var(--color-button-title)] shadow-sm hover:bg-[var(--color-button-hover)]" : "border-gray-200 bg-white text-slate-700 hover:bg-[var(--color-input)]"} disabled:cursor-not-allowed disabled:opacity-50">
        ${label}
      </button>
    `;

    let html = "";
    html += btn("‹", String(Math.max(1, current - 1)), false, current === 1);

    const windowStart = Math.max(1, current - 1);
    const windowEnd = Math.min(pages, current + 2);
    for (let p = windowStart; p <= windowEnd; p++) {
      html += btn(String(p), String(p), p === current);
    }

    html += btn("›", String(Math.min(pages, current + 1)), false, current === pages);
    pagerEl.innerHTML = html;
  }

  function render() {
    const items = applySort(applyFilters(DATA));
    const start = (state.page - 1) * state.perPage;
    const pageItems = items.slice(start, start + state.perPage);
    listEl.innerHTML = pageItems.length
      ? pageItems.map(renderRow).join("")
      : `<p class="rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center text-sm text-slate-600">لا توجد شركات مطابقة. جرّب تعديل البحث أو الفلاتر.</p>`;
    renderPagination(items.length);
    renderTags();
  }

  pagerEl.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-page]");
    if (!btn) return;
    state.page = Number(btn.getAttribute("data-page") || "1") || 1;
    render();
  });

  tagsEl?.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-tag]");
    if (!btn) return;
    const raw = btn.getAttribute("data-tag") || "";
    const [key, value] = raw.split("::");
    if (key && value && state.filters[key]) {
      state.filters[key].delete(value);
      filterInputs.forEach((i) => {
        if (i.getAttribute("data-filter") === key && i.value === value) i.checked = false;
      });
      state.page = 1;
      render();
    }
  });

  function syncFromInputs() {
    Object.keys(state.filters).forEach((k) => state.filters[k].clear());
    filterInputs.forEach((input) => {
      if (input.checked) state.filters[input.getAttribute("data-filter")]?.add(input.value);
    });
    state.page = 1;
    render();
  }

  filterInputs.forEach((input) => input.addEventListener("change", syncFromInputs));

  resetBtn?.addEventListener("click", () => {
    filterInputs.forEach((i) => (i.checked = false));
    state.q = "";
    if (searchEl) searchEl.value = "";
    if (locationEl) locationEl.value = "";
    state.sort = "popular";
    sortBtns.forEach((btn) => {
      setSortButtonVisual(btn, (btn.getAttribute("data-sort") || "") === "popular");
    });
    syncFromInputs();
  });

  sortBtns.forEach((b) =>
    b.addEventListener("click", () => {
      state.sort = b.getAttribute("data-sort") || "popular";
      state.page = 1;
      sortBtns.forEach((x) => setSortButtonVisual(x, x === b));
      render();
    })
  );

  function doSearch() {
    state.q = searchEl?.value || "";
    state.location = locationEl?.value || "";
    state.page = 1;
    render();
  }

  searchEl?.addEventListener("input", () => {
    state.q = searchEl.value;
    state.page = 1;
    render();
  });
  searchBtn?.addEventListener("click", doSearch);
  locationEl?.addEventListener("change", doSearch);

  sortBtns.forEach((x) => setSortButtonVisual(x, (x.getAttribute("data-sort") || "") === state.sort));
  render();
})();
