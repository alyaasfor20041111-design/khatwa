/**
 * نموذج نشر وظيفة: وسوم، عداد، مسودة/نشر، إشعارات ورسائل
 * تحديث: متوافق بالكامل مع صفحة job-search وتنسيقات الهوية البصرية لمنصة خطوة
 */
// هذا الكود يضيف تأثير تمييز للعنصر النشط في القائمة الجانبية بناءً على الصفحة الحالية

document.addEventListener("DOMContentLoaded", () => {
    // 1. احصل على اسم الصفحة الحالية من الرابط
    const currentFileName = window.location.pathname.split("/").pop();
    
    // 2. ابحث عن جميع عناصر القائمة
    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach(item => {
        const itemHref = item.getAttribute("href");

        // 3. قارن الرابط الحالي مع href الخاص بالعنصر
        if (currentFileName === itemHref || (currentFileName === "" && itemHref === "dashboard.html")) {
            
            // تطبيق لون الخلفية الخاص بك (شفاف قليلاً) وحدود
            item.style.backgroundColor = "rgba(33, 234, 200, 0.1)"; // لونك #21EAC8 بظهور 10%
            item.style.border = "1px solid #14D1B1";
            
            // جعل النص عريضاً وتغيير لونه
          
          

            // تلوين الأيقونة بلونك المختار #21EAC8
            const iconBox = item.querySelector(".icon-box");
            iconBox.style.color = "#21EAC8";
            
            // إزالة تأثير الهوفر الافتراضي لأنه أصبح نشطاً
            item.classList.remove("hover:bg-gray-50");
        }
    });
});
(function () {
  const DRAFT_KEY = "khattwa-post-job-draft";
  const PUBLISHED_KEY = "khattwa-published-jobs";

  const NOTIFICATIONS = [
    { id: 1, title: "تم استلام إعلانك", body: "سيتم مراجعة الوظيفة خلال 24 ساعة.", time: "منذ ساعتين" },
    { id: 2, title: "تذكير", body: "أكمل بيانات الراتب لزيادة الطلبات.", time: "أمس" },
    { id: 3, title: "تحديث المنصة", body: "يمكنك الآن تصفية المرشحين حسب الخبرة.", time: "منذ 3 أيام" },
    { id: 4, title: "طلب جديد", body: "مرشح قدّم على إعلانك.", time: "منذ أسبوع" },
    { id: 5, title: "الدعم الفني", body: "تم الرد على تذكرتك رقم 1024.", time: "منذ أسبوعين" },
    { id: 6, title: "تقرير أسبوعي", body: "عرض ملخص أداء إعلاناتك.", time: "منذ شهر" },
  ];

  const MESSAGES = [
    { id: 1, from: "سارة المالكي", preview: "هل يمكن العمل عن بُعد بالكامل؟", time: "10:30" },
    { id: 2, from: "فريق خطوة", preview: "نصائح لتحسين وصف الوظيفة.", time: "أمس" },
    { id: 3, from: "محمد العتيبي", preview: "أرسلت السيرة الذاتية عبر المنصة.", time: "الإثنين" },
    { id: 4, from: "نورة", preview: "شكرًا على الرد السريع.", time: "الأسبوع الماضي" },
    { id: 5, from: "دعم أصحاب العمل", preview: "تم تفعيل باقة الظهور المميز.", time: "١٠/٤" },
    { id: 6, from: "خالد", preview: "هل يوجد اختبار تقني؟", time: "٩/٤" },
  ];

  let badgeState = { sidebarNotif: 6, sidebarMsg: 6, header: 3 };

  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function syncCheckboxTags(groupName, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const checked = document.querySelectorAll(`input[name="${groupName}"]:checked`);
    container.innerHTML = "";
    checked.forEach((input) => {
      const label = input.closest("label")?.querySelector("span")?.textContent?.trim() || input.value;
      const tag = document.createElement("span");
      tag.className =
        "inline-flex items-center gap-1 rounded-full border border-card dark:border-border-dark bg-input dark:bg-card-dark px-3 py-1 text-xs md:text-sm font-bold text-primaryHeading dark:text-button transition-colors";
      tag.innerHTML = `${escapeHtml(label)}<button type="button" class="tag-remove mr-1 rounded-full p-0.5 hover:bg-card dark:hover:bg-input-dark" data-uncheck="${input.id}" aria-label="إزالة">×</button>`;
      container.appendChild(tag);
    });
  }

  function initCheckboxGroups() {
    document.addEventListener("change", (e) => {
      const t = e.target;
      if (!(t instanceof HTMLInputElement) || t.type !== "checkbox") return;
      if (!t.hasAttribute("data-tag-container")) return;
      const cid = t.getAttribute("data-tag-container");
      if (cid) syncCheckboxTags(t.name, cid);
    });

    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".tag-remove");
      if (!btn) return;
      const id = btn.getAttribute("data-uncheck");
      const inp = id ? document.getElementById(id) : null;
      if (inp && inp.type === "checkbox") {
        inp.checked = false;
        inp.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });

    const syncedKeys = new Set();
    document.querySelectorAll('input[type="checkbox"][data-tag-container]').forEach((input) => {
      const cid = input.getAttribute("data-tag-container");
      const key = `${input.name}|${cid}`;
      if (syncedKeys.has(key)) return;
      syncedKeys.add(key);
      syncCheckboxTags(input.name, cid);
    });
  }

  function initSalaryTag() {
    const displayCb = document.getElementById("salary-display");
    const amountEl = document.getElementById("salary-amount");
    const container = document.getElementById("tags-salary");
    if (!container) return function () {};

    function refresh() {
      container.innerHTML = "";
      if (displayCb?.checked) {
        const t = document.createElement("span");
        t.className =
          "inline-flex items-center gap-1 rounded-full border border-card dark:border-border-dark bg-input dark:bg-card-dark px-3 py-1 text-xs md:text-sm font-bold text-primaryHeading dark:text-button";
        t.textContent = "عرض الراتب في بطاقة الوظيفة";
        container.appendChild(t);
      }
      const v = amountEl?.value?.trim();
      if (v) {
        const t = document.createElement("span");
        t.className =
          "inline-flex items-center gap-1 rounded-full border border-card dark:border-border-dark bg-input dark:bg-card-dark px-3 py-1 text-xs md:text-sm font-bold text-primaryHeading dark:text-button";
        t.textContent = `${v} ر.س`;
        container.appendChild(t);
      }
    }
    displayCb?.addEventListener("change", refresh);
    amountEl?.addEventListener("input", refresh);
    refresh();
    return refresh;
  }

  function initLocationTags() {
    const country = document.getElementById("loc-country");
    const city = document.getElementById("loc-city");
    const container = document.getElementById("tags-location");
    if (!container || !country || !city) return function () {};

    function refresh() {
      container.innerHTML = "";
      const c = city.value.trim();
      const co = country.value.trim();
      if (c || co) {
        const t = document.createElement("span");
        t.className =
          "inline-flex items-center gap-1 rounded-full border border-card dark:border-border-dark bg-input dark:bg-card-dark px-3 py-1 text-xs md:text-sm font-bold text-primaryHeading dark:text-button";
        t.textContent = co && c ? `${c} / ${co}` : c || co;
        container.appendChild(t);
      }
    }
    country.addEventListener("change", refresh);
    country.addEventListener("input", refresh);
    city.addEventListener("input", refresh);
    city.addEventListener("change", refresh);
    refresh();
    return refresh;
  }

  function initEducationTags() {
    const study = document.getElementById("field-study");
    const edu = document.getElementById("field-education");
    const container = document.getElementById("tags-education");
    if (!container || !study || !edu) return function () {};

    function refresh() {
      container.innerHTML = "";
      const a = study.value.trim();
      const b = edu.value.trim();
      [a, b].filter(Boolean).forEach((val) => {
        const t = document.createElement("span");
        t.className =
          "inline-flex items-center gap-1 rounded-full border border-card dark:border-border-dark bg-input dark:bg-card-dark px-3 py-1 text-xs md:text-sm font-bold text-primaryHeading dark:text-button";
        t.textContent = val;
        container.appendChild(t);
      });
    }
    study.addEventListener("input", refresh);
    edu.addEventListener("input", refresh);
    refresh();
    return refresh;
  }

  function initAgeGenderTags() {
    const minEl = document.getElementById("age-min");
    const maxEl = document.getElementById("age-max");
    const container = document.getElementById("tags-conditions");
    if (!container) return function () {};

    function refreshAge() {
      container.querySelectorAll(".dynamic-age").forEach((n) => n.remove());
      const min = minEl?.value?.trim();
      const max = maxEl?.value?.trim();
      if (min) {
        const t = document.createElement("span");
        t.className =
          "dynamic-age inline-flex items-center gap-1 rounded-full border border-card dark:border-border-dark bg-input dark:bg-card-dark px-3 py-1 text-xs md:text-sm font-bold text-primaryHeading dark:text-button";
        t.textContent = `من عمر ${min}`;
        container.appendChild(t);
      }
      if (max) {
        const t = document.createElement("span");
        t.className =
          "dynamic-age inline-flex items-center gap-1 rounded-full border border-card dark:border-border-dark bg-input dark:bg-card-dark px-3 py-1 text-xs md:text-sm font-bold text-primaryHeading dark:text-button";
        t.textContent = `حتى عمر ${max}`;
        container.appendChild(t);
      }
    }
    minEl?.addEventListener("input", refreshAge);
    maxEl?.addEventListener("input", refreshAge);

    function refreshGender() {
      container.querySelectorAll(".dynamic-gender").forEach((n) => n.remove());
      const checked = document.querySelector('input[name="gender"]:checked');
      if (checked) {
        const label = checked.closest("label")?.querySelector("span")?.textContent?.trim();
        const t = document.createElement("span");
        t.className =
          "dynamic-gender inline-flex items-center gap-1 rounded-full border border-card dark:border-border-dark bg-input dark:bg-card-dark px-3 py-1 text-xs md:text-sm font-bold text-primaryHeading dark:text-button";
        t.textContent = label || "";
        container.appendChild(t);
      }
    }
    document.querySelectorAll('input[name="gender"]').forEach((inp) => inp.addEventListener("change", refreshGender));

    function refresh() {
      refreshAge();
      refreshGender();
    }
    refresh();
    return refresh;
  }

  function initExperienceTags() {
    const container = document.getElementById("tags-experience");
    if (!container) return function () {};

    function sync() {
      container.innerHTML = "";
      const inp = document.querySelector('input[name="experience"]:checked');
      if (!inp) return;
      const label = inp.closest("label")?.querySelector("span")?.textContent?.trim() || "";
      const tag = document.createElement("span");
      tag.className =
        "inline-flex items-center gap-1 rounded-full border border-card dark:border-border-dark bg-input dark:bg-card-dark px-3 py-1 text-xs md:text-sm font-bold text-primaryHeading dark:text-button";
      tag.textContent = label;
      container.appendChild(tag);
    }

    document.querySelectorAll('input[name="experience"]').forEach((inp) => inp.addEventListener("change", sync));
    sync();
    return sync;
  }

  function initTextareaCounter() {
    const ta = document.getElementById("job-description");
    const countEl = document.getElementById("desc-count");
    const max = 512;
    if (!ta || !countEl) return function () {};

    function update() {
      const n = ta.value.length;
      countEl.textContent = `${n}/${max}`;
      if (n > max) ta.value = ta.value.slice(0, max);
    }
    ta.addEventListener("input", update);
    update();
    return update;
  }

  function getFormData() {
    return {
      jobTitle: document.getElementById("field-job-title")?.value ?? "",
      jobCategory: document.getElementById("field-job-category")?.value ?? "",
      sector: document.getElementById("field-sector")?.value ?? "",
      orgLevel: document.getElementById("field-org-level")?.value ?? "",
      employment: [...document.querySelectorAll('input[name="employment"]:checked')].map((i) => i.id),
      locCountry: document.getElementById("loc-country")?.value ?? "",
      locCity: document.getElementById("loc-city")?.value ?? "",
      salaryAmount: document.getElementById("salary-amount")?.value ?? "",
      salaryDisplay: document.getElementById("salary-display")?.checked ?? false,
      benefits: [...document.querySelectorAll('input[name="benefits"]:checked')].map((i) => i.id),
      ageMin: document.getElementById("age-min")?.value ?? "",
      ageMax: document.getElementById("age-max")?.value ?? "",
      gender: document.querySelector('input[name="gender"]:checked')?.value ?? "",
      experience: document.querySelector('input[name="experience"]:checked')?.id ?? "",
      completion: [...document.querySelectorAll('input[name="completion"]:checked')].map((i) => i.id),
      fieldStudy: document.getElementById("field-study")?.value ?? "",
      fieldEducation: document.getElementById("field-education")?.value ?? "",
      jobDescription: document.getElementById("job-description")?.value ?? "",
    };
  }

  function applyFormData(data) {
    if (!data || typeof data !== "object") return;
    const setVal = (id, v) => {
      const el = document.getElementById(id);
      if (el && "value" in el) el.value = v ?? "";
    };
    setVal("field-job-title", data.jobTitle);
    setVal("field-job-category", data.jobCategory);
    setVal("field-sector", data.sector);
    setVal("field-org-level", data.orgLevel);
    setVal("loc-country", data.locCountry);
    setVal("loc-city", data.locCity);
    setVal("salary-amount", data.salaryAmount);
    setVal("field-study", data.fieldStudy);
    setVal("field-education", data.fieldEducation);
    const salDis = document.getElementById("salary-display");
    if (salDis) salDis.checked = !!data.salaryDisplay;
    setVal("age-min", data.ageMin);
    setVal("age-max", data.ageMax);
    const ta = document.getElementById("job-description");
    if (ta) ta.value = data.jobDescription ?? "";

    document.querySelectorAll('input[name="employment"]').forEach((i) => {
      i.checked = Array.isArray(data.employment) && data.employment.includes(i.id);
    });
    document.querySelectorAll('input[name="benefits"]').forEach((i) => {
      i.checked = Array.isArray(data.benefits) && data.benefits.includes(i.id);
    });
    document.querySelectorAll('input[name="experience"]').forEach((i) => {
      const exp = data.experience;
      const ok = typeof exp === "string" ? exp === i.id : Array.isArray(exp) && exp.includes(i.id);
      i.checked = !!ok;
    });
    document.querySelectorAll('input[name="completion"]').forEach((i) => {
      i.checked = Array.isArray(data.completion) && data.completion.includes(i.id);
    });
    if (data.gender) {
      document.querySelectorAll('input[name="gender"]').forEach((r) => {
        r.checked = r.value === data.gender;
      });
    }
  }

  function toast(message, type) {
    const root = document.getElementById("toast-root");
    if (!root) return;
    const el = document.createElement("div");
    
    let border = "border-card dark:border-border-dark bg-surface dark:bg-surface-dark text-primaryHeading dark:text-dark-heading";
    if (type === "success") {
      border = "border-emerald-200 dark:border-emerald-800/30 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-400";
    } else if (type === "error") {
      border = "border-red-200 dark:border-red-800/30 bg-red-50 dark:bg-red-950/20 text-red-900 dark:text-red-400";
    } else if (type === "info") {
      border = "border-button/20 dark:border-button/40 bg-input dark:bg-card-dark text-primaryHeading dark:text-button";
    }

    el.className = `pointer-events-auto rounded-xl border px-4 py-3 text-sm font-bold shadow-lg transition-all duration-300 ${border}`;
    el.setAttribute("role", "status");
    el.textContent = message;
    root.appendChild(el);
    const t = window.setTimeout(() => {
      el.classList.add("opacity-0", "-translate-y-2");
      window.setTimeout(() => el.remove(), 300);
    }, 4200);
    el.addEventListener("click", () => {
      window.clearTimeout(t);
      el.remove();
    });
  }

  function updateBadges() {
    const bSn = document.getElementById("badge-sidebar-notif");
    const bSm = document.getElementById("badge-sidebar-msg");
    const bH = document.getElementById("badge-header-notif");
    const setBadge = (el, n) => {
      if (!el) return;
      if (n <= 0) {
        el.classList.add("hidden");
        el.textContent = "0";
      } else {
        el.classList.remove("hidden");
        el.textContent = String(n);
      }
    };
    setBadge(bSn, badgeState.sidebarNotif);
    setBadge(bSm, badgeState.sidebarMsg);
    setBadge(bH, badgeState.header);
  }

  function renderNotifications() {
    const list = document.getElementById("notifications-list");
    if (!list) return;
    list.innerHTML = NOTIFICATIONS.map(
      (n) => `
      <div class="mb-2 rounded-xl border border-card dark:border-border-dark bg-input/50 dark:bg-card-dark p-3 transition-colors">
        <div class="flex items-start justify-between gap-2">
          <p class="font-bold text-primaryHeading dark:text-dark-heading text-sm">${escapeHtml(n.title)}</p>
          <span class="shrink-0 text-xs text-text-muted dark:text-text-muted-dark">${escapeHtml(n.time)}</span>
        </div>
        <p class="mt-1 text-xs md:text-sm text-text-muted dark:text-text-muted-dark">${escapeHtml(n.body)}</p>
      </div>`
    ).join("");
  }

  function renderMessages() {
    const list = document.getElementById("messages-list");
    if (!list) return;
    list.innerHTML = MESSAGES.map(
      (m) => `
      <button type="button" class="mb-2 flex w-full rounded-xl border border-card dark:border-border-dark bg-white dark:bg-input-dark p-3 text-right shadow-sm transition hover:bg-input dark:hover:bg-card-dark">
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-button/10 text-sm font-black text-button-hover dark:text-button">${escapeHtml(m.from.charAt(0))}</div>
        <div class="mr-3 min-w-0 flex-1">
          <div class="flex items-center justify-between gap-2">
            <span class="font-bold text-primaryHeading dark:text-dark-heading text-sm">${escapeHtml(m.from)}</span>
            <span class="text-xs text-text-muted dark:text-text-muted-dark">${escapeHtml(m.time)}</span>
          </div>
          <p class="mt-0.5 truncate text-xs md:text-sm text-text-muted dark:text-text-muted-dark">${escapeHtml(m.preview)}</p>
        </div>
      </button>`
    ).join("");
  }

  function renderSettings() {
    const root = document.getElementById("settings-content");
    if (!root) return;
    root.innerHTML = `
      <div class="space-y-5">
        <div class="rounded-2xl border border-card dark:border-border-dark bg-input/50 dark:bg-card-dark p-4">
          <p class="text-xs font-bold text-text-muted dark:text-text-muted-dark">الملف الشخصي</p>
          <div class="mt-3 flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white dark:bg-input-dark ring-1 ring-card dark:ring-border-dark">
              <span class="text-sm font-black text-primaryHeading dark:text-button">ف</span>
            </div>
            <div class="min-w-0">
              <p class="font-bold text-primaryHeading dark:text-dark-heading text-sm">فاطمة</p>
              <p class="text-xs text-text-muted dark:text-text-muted-dark">fatima@example.com</p>
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <label class="block">
            <span class="mb-1.5 block text-xs font-bold text-primaryHeading dark:text-dark-heading">الاسم</span>
            <input id="settings-name" type="text" value="فاطمة" class="w-full rounded-xl border border-card dark:border-border-dark bg-white dark:bg-input-dark px-3 py-2.5 text-sm text-primaryHeading dark:text-dark-heading outline-none focus:ring-2 focus:ring-button/30" />
          </label>
          <label class="block">
            <span class="mb-1.5 block text-xs font-bold text-primaryHeading dark:text-dark-heading">البريد الإلكتروني</span>
            <input id="settings-email" type="email" value="fatima@example.com" class="w-full rounded-xl border border-card dark:border-border-dark bg-white dark:bg-input-dark px-3 py-2.5 text-sm text-primaryHeading dark:text-dark-heading outline-none focus:ring-2 focus:ring-button/30" />
          </label>
          <label class="flex items-center justify-between gap-3 rounded-xl border border-card dark:border-border-dark bg-white dark:bg-input-dark px-3 py-3 cursor-pointer">
            <span class="text-sm font-bold text-primaryHeading dark:text-dark-heading">تلقي إشعارات البريد</span>
            <input id="settings-email-notif" type="checkbox" class="h-4 w-4 rounded border-card accent-button text-button focus:ring-button focus:ring-offset-0" checked />
          </label>
        </div>

        <div class="flex items-center gap-2 pt-2">
          <button type="button" id="settings-save" class="inline-flex flex-1 items-center justify-center rounded-xl bg-primaryHeading dark:bg-button px-4 py-2.5 text-sm font-bold text-white dark:text-button-text-dark hover:scale-[1.02] active:scale-95 transition-all shadow-md">حفظ الإعدادات</button>
          <button type="button" id="settings-logout" class="inline-flex items-center justify-center rounded-xl border border-red-200 dark:border-red-900/40 bg-white dark:bg-input-dark px-4 py-2.5 text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 active:scale-95 transition-all">تسجيل الخروج</button>
        </div>
      </div>
    `;

    document.getElementById("settings-save")?.addEventListener("click", () => {
      toast("تم حفظ الإعدادات بنجاح.", "success");
    });
    document.getElementById("settings-logout")?.addEventListener("click", () => {
      toast("تم تسجيل الخروج بنجاح.", "info");
      window.location.href = "./index.html";
    });
  }

  let refreshAllDerived = function () {};

  function openDrawer(which) {
    const overlay = document.getElementById("drawer-overlay");
    const drawerNotif = document.getElementById("drawer-notifications");
    const drawerMsg = document.getElementById("drawer-messages");
    const drawerSettings = document.getElementById("drawer-settings");
    if (!overlay || !drawerNotif || !drawerMsg || !drawerSettings) return;

    overlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    if (which === "notif") {
      badgeState.sidebarNotif = 0;
      badgeState.header = 0;
      updateBadges();
      drawerMsg.classList.add("translate-x-full");
      drawerMsg.setAttribute("aria-hidden", "true");
      drawerSettings.classList.add("translate-x-full");
      drawerSettings.setAttribute("aria-hidden", "true");
      drawerNotif.classList.remove("translate-x-full");
      drawerNotif.setAttribute("aria-hidden", "false");
      renderNotifications();
    } else if (which === "msg") {
      badgeState.sidebarMsg = 0;
      updateBadges();
      drawerNotif.classList.add("translate-x-full");
      drawerNotif.setAttribute("aria-hidden", "true");
      drawerSettings.classList.add("translate-x-full");
      drawerSettings.setAttribute("aria-hidden", "true");
      drawerMsg.classList.remove("translate-x-full");
      drawerMsg.setAttribute("aria-hidden", "false");
      renderMessages();
    } else {
      drawerNotif.classList.add("translate-x-full");
      drawerMsg.classList.add("translate-x-full");
      drawerNotif.setAttribute("aria-hidden", "true");
      drawerMsg.setAttribute("aria-hidden", "true");
      drawerSettings.classList.remove("translate-x-full");
      drawerSettings.setAttribute("aria-hidden", "false");
      renderSettings();
    }
  }

  function closeDrawers() {
    const overlay = document.getElementById("drawer-overlay");
    const drawerNotif = document.getElementById("drawer-notifications");
    const drawerMsg = document.getElementById("drawer-messages");
    const drawerSettings = document.getElementById("drawer-settings");
    overlay?.classList.add("hidden");
    drawerNotif?.classList.add("translate-x-full");
    drawerMsg?.classList.add("translate-x-full");
    drawerSettings?.classList.add("translate-x-full");
    drawerNotif?.setAttribute("aria-hidden", "true");
    drawerMsg?.setAttribute("aria-hidden", "true");
    drawerSettings?.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function validatePublish() {
    const title = document.getElementById("field-job-title")?.value?.trim();
    const desc = document.getElementById("job-description")?.value?.trim();
    const employmentCount = document.querySelectorAll('input[name="employment"]:checked').length;
    const experienceChecked = document.querySelector('input[name="experience"]:checked');
    if (!title) {
      toast("أدخل المسمى الوظيفي.", "error");
      document.getElementById("field-job-title")?.focus();
      return false;
    }
    if (!employmentCount) {
      toast("اختر نوع التوظيف: خيار واحد على الأقل.", "error");
      document.getElementById("emp-ft")?.focus();
      return false;
    }
    if (!experienceChecked) {
      toast("اختر الخبرة المطلوبة.", "error");
      document.getElementById("ex-1")?.focus();
      return false;
    }
    if (!desc || desc.length < 20) {
      toast("الوصف التفصيلي مطلوب (20 حرفًا على الأقل).", "error");
      document.getElementById("job-description")?.focus();
      return false;
    }
    return true;
  }

  function saveDraft() {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(getFormData()));
      toast("تم حفظ المسودة بنجاح على هذا الجهاز.", "success");
    } catch {
      toast("تعذّر الحفظ. تحقق من مساحة التخزين.", "error");
    }
  }

  function nextNumericJobId() {
    let max = 18;
    try {
      const prev = JSON.parse(localStorage.getItem(PUBLISHED_KEY) || "[]");
      for (const p of prev) {
        if (typeof p.numericId === "number" && p.numericId > max) max = p.numericId;
      }
    } catch {
      /* ignore */
    }
    return max + 1;
  }

  function publishJob() {
    if (!validatePublish()) return;
    const payload = {
      ...getFormData(),
      publishedAt: Date.now(),
      id: crypto.randomUUID?.() || String(Date.now()),
      numericId: nextNumericJobId(),
    };
    try {
      const prev = JSON.parse(localStorage.getItem(PUBLISHED_KEY) || "[]");
      const list = Array.isArray(prev) ? prev : [];
      list.push(payload);
      localStorage.setItem(PUBLISHED_KEY, JSON.stringify(list));
      localStorage.removeItem(DRAFT_KEY);
      toast("تم نشر الوظيفة بنجاح. جاري الانتقال للقائمة…", "success");
      window.setTimeout(() => {
        // التوجيه الصحيح لاسم الصفحة الجديد job-search
        window.location.href = "./job-search.html#jobs-grid";
      }, 650);
    } catch {
      toast("تعذّر حفظ النشر محليًا.", "error");
    }
  }

  function resetForm() {
    const title = document.getElementById("field-job-title");
    const sector = document.getElementById("field-sector");
    const cat = document.getElementById("field-job-category");
    const org = document.getElementById("field-org-level");
    if (title) title.value = "";
    if (sector) sector.value = "";
    if (cat && cat.options.length) cat.selectedIndex = 0;
    if (org && org.options.length) org.selectedIndex = 0;

    document.getElementById("loc-country") && (document.getElementById("loc-country").value = "");
    document.getElementById("loc-city") && (document.getElementById("loc-city").value = "");
    const sal = document.getElementById("salary-amount");
    const salD = document.getElementById("salary-display");
    if (sal) sal.value = "";
    if (salD) salD.checked = false;

    const study = document.getElementById("field-study");
    const edu = document.getElementById("field-education");
    if (study) study.value = "";
    if (edu) edu.value = "";

    document.getElementById("age-min") && (document.getElementById("age-min").value = "18");
    document.getElementById("age-max") && (document.getElementById("age-max").value = "");
    document.getElementById("job-description") && (document.getElementById("job-description").value = "");

    document.querySelectorAll('input[name="employment"]').forEach((i) => {
      i.checked = false;
    });

    document.querySelectorAll('input[name="benefits"]').forEach((i) => {
      i.checked = false;
    });

    document.querySelectorAll('input[name="experience"]').forEach((i) => {
      i.checked = false;
    });
    const ex1 = document.getElementById("ex-1");
    if (ex1) ex1.checked = true;

    document.querySelectorAll('input[name="completion"]').forEach((i) => {
      i.checked = false;
    });
    const crDis = document.getElementById("cr-dis");
    if (crDis) crDis.checked = true;

    document.querySelectorAll('input[name="gender"]').forEach((r) => {
      r.checked = r.value === "a";
    });

    refreshAllDerived();
  }

  function loadDraft() {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return;
    try {
      applyFormData(JSON.parse(raw));
      refreshAllDerived();
    } catch {
      /* ignore */
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const refreshSalary = initSalaryTag();
    const refreshLocation = initLocationTags();
    const refreshEducation = initEducationTags();
    const refreshConditions = initAgeGenderTags();
    const refreshExperienceTags = initExperienceTags();
    const updateCounter = initTextareaCounter();
    initCheckboxGroups();

    refreshAllDerived = function () {
      document.querySelectorAll('input[type="checkbox"][data-tag-container]').forEach((input) => {
        syncCheckboxTags(input.name, input.getAttribute("data-tag-container"));
      });
      refreshSalary();
      refreshLocation();
      refreshEducation();
      refreshConditions();
      refreshExperienceTags();
      updateCounter();
    };

    loadDraft();
    updateBadges();

    document.getElementById("btn-save")?.addEventListener("click", () => publishJob());

    document.getElementById("nav-open-notifications")?.addEventListener("click", () => openDrawer("notif"));
    document.getElementById("btn-header-notif")?.addEventListener("click", () => openDrawer("notif"));
    document.getElementById("nav-open-messages")?.addEventListener("click", () => openDrawer("msg"));
    document.getElementById("nav-open-settings")?.addEventListener("click", () => openDrawer("settings"));
    document.getElementById("btn-header-profile")?.addEventListener("click", () => openDrawer("settings"));

    document.getElementById("close-drawer-notif")?.addEventListener("click", closeDrawers);
    document.getElementById("close-drawer-msg")?.addEventListener("click", closeDrawers);
    document.getElementById("close-drawer-settings")?.addEventListener("click", closeDrawers);
    document.getElementById("drawer-overlay")?.addEventListener("click", closeDrawers);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeDrawers();
    });

    document.getElementById("btn-new-ad")?.addEventListener("click", () => {
      if (!window.confirm("بدء وظيفة جديدة؟ سيتم مسح الحقول الحالية.")) return;
      resetForm();
      localStorage.removeItem(DRAFT_KEY);
      toast("يمكنك الآن ملء نموذج وظيفة جديدة.", "info");
    });
  });
})();