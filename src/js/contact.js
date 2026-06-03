/**
 * Contact page: header notifications/messages drawers
 * Uses same drawer markup conventions as post-job page.
 */
(function () {
  const NOTIFICATIONS = [
    { id: 1, title: "تم استلام رسالتك", body: "سيرد فريق الدعم خلال وقت قصير.", time: "الآن" },
    { id: 2, title: "تحديث", body: "تمت إضافة صفحة التواصل للموقع.", time: "اليوم" },
    { id: 3, title: "تنبيه أمني", body: "لا تشارك كلمة المرور مع أي شخص.", time: "أمس" },
  ];

  const MESSAGES = [
    { id: 1, from: "فريق خطوة", preview: "مرحبًا! كيف يمكننا مساعدتك؟", time: "10:30" },
    { id: 2, from: "الدعم الفني", preview: "تم فتح تذكرتك بنجاح.", time: "أمس" },
    { id: 3, from: "إدارة المحتوى", preview: "شكرًا لملاحظاتك على الصفحة.", time: "الاثنين" },
    { id: 4, from: "سارة", preview: "هل لديكم فرص تدريب صيفي؟", time: "الأسبوع الماضي" },
    { id: 5, from: "محمد", preview: "هل يمكن تعديل بيانات الحساب؟", time: "١٠/٤" },
    { id: 6, from: "نورة", preview: "وصلني ردكم، شكرًا.", time: "٩/٤" },
  ];

  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  const overlay = document.getElementById("drawer-overlay");
  const drawerNotif = document.getElementById("drawer-notifications");
  const drawerMsg = document.getElementById("drawer-messages");
  const btnNotif = document.getElementById("btn-header-notif");
  const btnMsg = document.getElementById("btn-header-messages");
  const closeNotif = document.getElementById("close-drawer-notif");
  const closeMsg = document.getElementById("close-drawer-msg");
  const notifList = document.getElementById("notifications-list");
  const msgList = document.getElementById("messages-list");
  const badgeNotif = document.getElementById("badge-header-notif");
  const badgeMsg = document.getElementById("badge-header-msg");

  if (!overlay || !drawerNotif || !drawerMsg || !notifList || !msgList) return;

  function setOverlay(open) {
    if (open) overlay.classList.remove("hidden");
    else overlay.classList.add("hidden");
  }

  function closeAll() {
    drawerNotif.classList.add("translate-x-full");
    drawerMsg.classList.add("translate-x-full");
    setOverlay(false);
    drawerNotif.setAttribute("aria-hidden", "true");
    drawerMsg.setAttribute("aria-hidden", "true");
  }

  function openDrawer(which) {
    closeAll();
    setOverlay(true);
    if (which === "notif") {
      drawerNotif.classList.remove("translate-x-full");
      drawerNotif.setAttribute("aria-hidden", "false");
      if (badgeNotif) badgeNotif.textContent = "0";
    } else {
      drawerMsg.classList.remove("translate-x-full");
      drawerMsg.setAttribute("aria-hidden", "false");
      if (badgeMsg) badgeMsg.textContent = "0";
    }
  }

  function renderNotifications() {
    notifList.innerHTML = NOTIFICATIONS.map((n) => {
      return `
        <div class="mb-2 rounded-xl border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-950">
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="font-semibold text-gray-900 dark:text-white">${escapeHtml(n.title)}</p>
              <p class="mt-1 text-xs text-gray-600 dark:text-gray-400">${escapeHtml(n.body)}</p>
            </div>
            <span class="shrink-0 text-xs text-gray-400 dark:text-gray-500">${escapeHtml(n.time)}</span>
          </div>
        </div>
      `;
    }).join("");
  }

  function renderMessages() {
    msgList.innerHTML = MESSAGES.map((m) => {
      return `
        <button type="button" class="mb-2 w-full rounded-xl border border-gray-200 bg-white p-3 text-right hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-900">
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <p class="truncate font-semibold text-gray-900 dark:text-white">${escapeHtml(m.from)}</p>
              <p class="mt-1 truncate text-xs text-gray-600 dark:text-gray-400">${escapeHtml(m.preview)}</p>
            </div>
            <span class="shrink-0 text-xs text-gray-400 dark:text-gray-500">${escapeHtml(m.time)}</span>
          </div>
        </button>
      `;
    }).join("");
  }

  renderNotifications();
  renderMessages();

  btnNotif?.addEventListener("click", () => openDrawer("notif"));
  btnMsg?.addEventListener("click", () => openDrawer("msg"));
  closeNotif?.addEventListener("click", closeAll);
  closeMsg?.addEventListener("click", closeAll);
  overlay.addEventListener("click", closeAll);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll();
  });
})();

