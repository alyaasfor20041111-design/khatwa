(() => {
  const menuToggle = document.querySelector("[data-cp-menu-toggle]");
  const menuPanel = document.getElementById("cp-navbar-mobile");
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

  const tabButtons = Array.from(document.querySelectorAll(".cp-tab[data-tab]"));
  const sectionFor = {
    about: document.getElementById("cp-about"),
    people: document.getElementById("cp-people"),
    overview: document.getElementById("cp-overview"),
    jobs: document.getElementById("cp-jobs"),
  };

  if (!tabButtons.length) return;

  function activate(tabId) {
    tabButtons.forEach((b) => {
      const active = (b.getAttribute("data-tab") || "") === tabId;
      b.classList.toggle("border-[#3df2d1]", active);
      b.classList.toggle("text-[#3df2d1]", active);
      b.classList.toggle("border-transparent", !active);
      b.classList.toggle("text-slate-500", !active);
    });
  }

  function scrollToTab(tabId) {
    const el = sectionFor[tabId];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    activate(tabId);
  }

  tabButtons.forEach((b) => {
    b.addEventListener("click", () => scrollToTab(b.getAttribute("data-tab") || "about"));
  });

  activate("about");

  const hash = (location.hash || "").replace(/^#/, "");
  if (hash === "cp-jobs" || hash === "jobs") {
    requestAnimationFrame(() => scrollToTab("jobs"));
  }

  const tabBySectionId = {
    "cp-about": "about",
    "cp-people": "people",
    "cp-overview": "overview",
    "cp-jobs": "jobs",
  };

  const observed = Object.values(sectionFor).filter(Boolean);
  if (observed.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];
        if (!visible?.target?.id) return;
        const tabId = tabBySectionId[visible.target.id];
        if (tabId) activate(tabId);
      },
      { rootMargin: "-12% 0px -55% 0px", threshold: [0, 0.15, 0.35] }
    );
    observed.forEach((el) => observer.observe(el));
  }
})();

(() => {
  const shareBtn = document.getElementById("cp-share-btn");
  if (!shareBtn) return;

  async function copyLink(url) {
    try {
      await navigator.clipboard.writeText(url);
      window.alert("تم نسخ رابط الصفحة. يمكنك لصقه ومشاركته.");
    } catch {
      window.prompt("انسخ الرابط يدوياً:", url);
    }
  }

  shareBtn.addEventListener("click", async () => {
    const url = window.location.href;
    const titleEl = document.querySelector("#section-company h1");
    const companyName = (titleEl && titleEl.textContent.trim()) || "شركة الريادة الرقمية";
    const text = `شاهد صفحة «${companyName}» على منصة خطوة`;

    if (navigator.share) {
      try {
        await navigator.share({ title: `${companyName} | خطوة`, text, url });
        return;
      } catch (err) {
        if (err && err.name === "AbortError") return;
      }
    }

    await copyLink(url);
  });
})();
