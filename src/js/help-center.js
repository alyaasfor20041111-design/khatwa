/**
 * Help center interactions:
 * - Audience tabs (all / employee / employer)
 * - Search filtering for cards and FAQs
 * - "اقرأ المزيد" opens a dialog (no scroll to FAQ)
 */
(function () {
  const menuToggle = document.querySelector("[data-hc-menu-toggle]");
  const menuPanel = document.getElementById("hc-navbar-mobile");
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

  const searchInput = document.getElementById("help-search");
  const cards = Array.from(document.querySelectorAll("#help-cards article"));
  const faqItems = Array.from(document.querySelectorAll("details[data-audience]"));
  const faqTabs = Array.from(document.querySelectorAll("[data-faq-tab]"));
  const readMoreButtons = Array.from(document.querySelectorAll("[data-help-read-more]"));
  const dialog = document.getElementById("help-article-dialog");
  const dialogTitle = document.getElementById("help-dialog-title");
  const dialogBody = document.getElementById("help-dialog-body");

  if (!searchInput || !cards.length) return;

  let activeAudience = "all";

  function normalize(s) {
    return (s || "").toLowerCase().trim();
  }

  function setTabActiveStyles(activeBtn) {
    faqTabs.forEach((btn) => {
      const isActive = btn === activeBtn;
      btn.classList.toggle("bg-[var(--color-button)]", isActive);
      btn.classList.toggle("text-[var(--color-button-title)]", isActive);
      btn.classList.toggle("font-semibold", isActive);

      // inactive
      btn.classList.toggle("bg-white", !isActive);
      btn.classList.toggle("border", !isActive);
      btn.classList.toggle("border-gray-200", !isActive);
    });
  }

  function filterCards() {
    const q = normalize(searchInput.value);
    cards.forEach((card) => {
      const audience = card.getAttribute("data-audience") || "all";
      const audienceMatch =
        activeAudience === "all" || audience === "all" || audience === activeAudience;
      const textMatch = !q || normalize(card.textContent).includes(q);
      const visible = audienceMatch && textMatch;
      card.classList.toggle("hidden", !visible);
    });
  }

  function filterFaq() {
    const q = normalize(searchInput.value);
    faqItems.forEach((item) => {
      const audience = item.getAttribute("data-audience") || "all";
      const audienceMatch =
        activeAudience === "all" || audience === "all" || audience === activeAudience;
      const textMatch = !q || normalize(item.textContent).includes(q);
      const visible = audienceMatch && textMatch;
      item.classList.toggle("hidden", !visible);
      if (!visible) item.removeAttribute("open");
    });
  }

  function apply() {
    filterCards();
    filterFaq();
  }

  faqTabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeAudience = btn.getAttribute("data-faq-tab") || "all";
      setTabActiveStyles(btn);
      apply();
    });
  });

  searchInput.addEventListener("input", () => {
    apply();
  });

  const initialTab = faqTabs.find((b) => (b.getAttribute("data-faq-tab") || "") === "all") || faqTabs[0];
  if (initialTab) setTabActiveStyles(initialTab);
  apply();

  function openHelpDialog(card) {
    if (!dialog || !dialogTitle || !dialogBody || !card) return;
    const h3 = card.querySelector("h3");
    const expanded = card.querySelector("[data-help-expanded]");
    dialogTitle.textContent = h3 ? h3.textContent.trim() : "";
    if (expanded) {
      dialogBody.innerHTML = expanded.innerHTML;
    } else {
      const p = card.querySelector(".min-w-0 > p");
      dialogBody.innerHTML = "";
      if (p) {
        const wrap = document.createElement("p");
        wrap.textContent = p.textContent.trim();
        dialogBody.appendChild(wrap);
      }
    }
    dialog.classList.remove("hidden");
    dialog.classList.add("flex");
    dialog.setAttribute("aria-hidden", "false");
    document.body.classList.add("overflow-hidden");
  }

  function closeHelpDialog() {
    if (!dialog) return;
    dialog.classList.add("hidden");
    dialog.classList.remove("flex");
    dialog.setAttribute("aria-hidden", "true");
    document.body.classList.remove("overflow-hidden");
  }

  readMoreButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest("article");
      openHelpDialog(card);
    });
  });

  dialog?.querySelectorAll("[data-help-dialog-dismiss]").forEach((el) => {
    el.addEventListener("click", closeHelpDialog);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && dialog && !dialog.classList.contains("hidden")) closeHelpDialog();
  });
})();
