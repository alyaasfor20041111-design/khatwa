// هذا الكود يضيف تأثير تمييز للعنصر النشط في القائمة الجانبية بناءً على الصفحة الحالية

document.addEventListener("DOMContentLoaded", () => {
  // 1. احصل على اسم الصفحة الحالية من الرابط
  const currentFileName = window.location.pathname.split("/").pop();

  // 2. ابحث عن جميع عناصر القائمة
  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach((item) => {
    const itemHref = item.getAttribute("href");

    // 3. قارن الرابط الحالي مع href الخاص بالعنصر
    if (
      currentFileName === itemHref ||
      (currentFileName === "" && itemHref === "dashboard.html")
    ) {
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

// متغيرات الحالة العالمية (Global State)
let currentTabId = "apply-status";
let currentFilterValue = "الكل";

// بيانات تجريبية موسعة مع صور حقيقية وعناصر إضافية لكل تاب
const activityData = {
  "apply-status": [
    {
      id: 1,
      company: "ديل للتكنولوجيا",
      role: "مهندس بنية تحتية",
      status: "مقبول",
      date: "2026-04-30",
      img: "https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=400",
      statusClasses: "border-button/30 text-button bg-button/5",
      timeline: true,
    },
    {
      id: 2,
      company: "بيبسيكو",
      role: "مدير سلسلة الإمداد",
      status: "مرفوض",
      date: "2026-04-28",
      img: "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=400",
      statusClasses: "border-red-200 text-red-500 bg-red-50",
      timeline: true,
    },
    {
      id: 3,
      company: "مجموعة بي إم دبليو",
      role: "مهندس أنظمة ذاتية القيادة",
      status: "مقابلة",
      date: "2026-04-29",
      img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400",
      statusClasses: "border-blue-200 text-blue-500 bg-blue-50",
      timeline: true,
    },
    {
      id: 7,
      company: "أبل",
      role: "مطور تطبيقات iOS",
      status: "قيد المراجعة",
      date: "2026-04-27",
      img: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400",
      statusClasses: "border-orange-200 text-orange-500 bg-orange-50",
      timeline: false,
    },
    {
      id: 8,
      company: "نتفليكس",
      role: "مهندس برمجيات فيديو",
      status: "مقبول",
      date: "2026-04-24",
      img: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400",
      statusClasses: "border-button/30 text-button bg-button/5",
      timeline: true,
    },
    { 
      id: 60, 
      company: 'أدوبي', 
      role: 'مصمم واجهات مستخدم UX/UI', 
      status: 'مقابلة', 
      date: '2026-05-10', 
      img: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400', 
      statusClasses: 'border-blue-200 text-blue-500 bg-blue-50', 
      timeline: true 
    },
    { 
      id: 61, 
      company: 'سبيس إكس', 
      role: 'مهندس برمجيات طيران', 
      status: 'قيد المراجعة', 
      date: '2026-05-12', 
      img: 'https://images.pexels.com/photos/586030/pexels-photo-586030.jpeg?auto=compress&cs=tinysrgb&w=400', 
      statusClasses: 'border-orange-200 text-orange-500 bg-orange-50', 
      timeline: false 
    },
    { 
      id: 62, 
      company: 'سامسونج', 
      role: 'مهندس تطوير أجهزة ذكية', 
      status: 'مقبول', 
      date: '2026-05-14', 
      img: 'https://images.pexels.com/photos/4065906/pexels-photo-4065906.jpeg?auto=compress&cs=tinysrgb&w=400', 
      statusClasses: 'border-button/30 text-button bg-button/5', 
      timeline: true 
    },
    { 
      id: 63, 
      company: 'أوراكل', 
      role: 'مدير قواعد بيانات (DBA)', 
      status: 'مرفوض', 
      date: '2026-05-15', 
      img: 'https://images.pexels.com/photos/2881224/pexels-photo-2881224.jpeg?auto=compress&cs=tinysrgb&w=400', 
      statusClasses: 'border-red-200 text-red-500 bg-red-50', 
      timeline: true 
    },
    { 
      id: 64, 
      company: 'فورد', 
      role: 'مهندس ميكانيكا محركات', 
      status: 'مقبول', 
      date: '2026-05-16', 
      img: 'https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?auto=compress&cs=tinysrgb&w=400', 
      statusClasses: 'border-button/30 text-button bg-button/5', 
      timeline: true 
    }
  ],
  "offered-job": [
    {
      id: 4,
      company: "جوجل",
      role: "مهندس خوارزميات بحث",
      status: "عرض نشط",
      date: "2026-04-25",
      img: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400", // صورة تقنية تعبر عن بيئة جوجل
      statusClasses: "border-purple-200 text-purple-500 bg-purple-50",
      timeline: false,
    },
    {
      id: 12,
      company: "سبوتيفاي",
      role: "مهندس معالجة صوتيات",
      status: "عرض نشط",
      date: "2026-04-22",
      img: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400", // شعار أو رمز موسيقي تقني
      statusClasses: "border-purple-200 text-purple-500 bg-purple-50",
      timeline: false,
    },
    {
      id: 20,
      company: "أمازون",
      role: "مهندس حلول سحابية AWS",
      status: "عرض نشط",
      date: "2026-04-21",
      img: "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=400",
      statusClasses: "border-purple-200 text-purple-500 bg-purple-50",
      timeline: false,
    },
    {
      id: 30,
      company: "إنفيديا (NVIDIA)",
      role: "مهندس تعلم عميق (Deep Learning)",
      status: "عرض نشط",
      date: "2026-05-01",
      img: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400", // معالجات وذكاء اصطناعي
      statusClasses: "border-purple-200 text-purple-500 bg-purple-50",
      timeline: false,
    },
    {
      id: 32,
      company: "أدوبي (Adobe)",
      role: "مصمم تجربة مستخدم (UX Designer)",
      status: "عرض نشط",
      date: "2026-05-03",
      img: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400", // واجهات وتصميم رقمي
      statusClasses: "border-purple-200 text-purple-500 bg-purple-50",
      timeline: false,
    },
    {
      id: 33,
      company: "تيك توك",
      role: "مهندس نظم توزيع محتوى (CDN)",
      status: "عرض نشط",
      date: "2026-05-04",
      img: "https://images.pexels.com/photos/5077039/pexels-photo-5077039.jpeg?auto=compress&cs=tinysrgb&w=400", // تقنيات فيديو وتواصل
      statusClasses: "border-purple-200 text-purple-500 bg-purple-50",
      timeline: false,
    },



  ],
  "saved-job": [
    {
      id: 5,
      company: "أرامكو",
      role: "مهندس بترول وكيمياء",
      status: "محفوظة",
      date: "2026-04-20",
      // صورة مصفاة بترول احترافية
      img: "https://images.pexels.com/photos/257700/pexels-photo-257700.jpeg?auto=compress&cs=tinysrgb&w=400",
      statusClasses: "border-gray-200 text-gray-500 bg-gray-50",
      timeline: false,
    },
    {
      id: 13,
      company:" كراود سترايك",
      role: "مهندس أمن سيبراني",
      status: "محفوظة",
      date: "2026-04-19",
      // صورة تعبر عن الأمن الرقمي والقفل الإلكتروني
      img: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400",
      statusClasses: "border-gray-200 text-gray-500 bg-gray-50",
      timeline: false,
    },
    {
      id: 14,
      company: "أوبر",
      role: "محلل بيانات لوجستية",
      status: "محفوظة",
      date: "2026-04-18",
      // صورة خريطة لوجستية ذكية
      img: "https://images.pexels.com/photos/1051073/pexels-photo-1051073.jpeg?auto=compress&cs=tinysrgb&w=400",
      statusClasses: "border-gray-200 text-gray-500 bg-gray-50",
      timeline: false,
    },
    {
      id: 21,
      company: "ميتا",
      role: "مهندس واقع افتراضي",
      status: "محفوظة",
      date: "2026-04-17",
      // صورة نظارة واقع افتراضي وتقنية VR
      img: "https://images.pexels.com/photos/3761154/pexels-photo-3761154.jpeg?auto=compress&cs=tinysrgb&w=400",
      statusClasses: "border-gray-200 text-gray-500 bg-gray-50",
      timeline: false,
    },
    {
      id: 21,
      company: "ميتا",
      role: "مهندس واقع افتراضي",
      status: "محفوظة",
      date: "2026-04-17",
      img: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=400",
      statusClasses: "border-gray-200 text-gray-500 bg-gray-50",
      timeline: false,
    },
    {
      id: 25,
      company: "نيوم",
      role: "مهندس طاقة متجددة",
      status: "محفوظة",
      date: "2026-05-01",
      img: "https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=400", // صور ألواح طاقة شمسية
      statusClasses: "border-gray-200 text-gray-500 bg-gray-50",
      timeline: false,
    },
    {
      id: 26,
      company: "تسلا",
      role: "مهندس تصنيع روبوتات",
      status: "محفوظة",
      date: "2026-05-03",
      img: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=400", // ذراع روبوتية صناعية
      statusClasses: "border-gray-200 text-gray-500 bg-gray-50",
      timeline: false,
    },
    {
      id: 27,
      company: "مايكروسوفت",
      role: "مطور ذكاء اصطناعي (AI)",
      status: "محفوظة",
      date: "2026-05-05",
      img: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=400", // رموز برمجية وشبكة عصبية
      statusClasses: "border-gray-200 text-gray-500 bg-gray-50",
      timeline: false,
    },
    {
      id: 28,
      company: "طيران الإمارات",
      role: "محلل بيانات الطيران",
      status: "محفوظة",
      date: "2026-05-06",
      img: "https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=400", // طائرة حديثة/محرك
      statusClasses: "border-gray-200 text-gray-500 bg-gray-50",
      timeline: false,
    },
  ],
  "followed-company": [
    {
      id: 6,
      company: "مايكروسوفت",
      role: "تطوير البرمجيات",
      status: "متابع",
      date: "2026-04-15",
      img: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=400",
      statusClasses: "border-blue-200 text-blue-600 bg-blue-50",
      timeline: false,
    },
    {
      id: 15,
      company: "أدوبي",
      role: "أدوات التصميم الرقمي",
      status: "متابع",
      date: "2026-04-10",
      img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400",
      statusClasses: "border-blue-200 text-blue-600 bg-blue-50",
      timeline: false,
    },
    {
      id: 22,
      company: "تسلا",
      role: "تصنيع السيارات الكهربائية",
      status: "متابع",
      date: "2026-04-05",
      img: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400",
      statusClasses: "border-blue-200 text-blue-600 bg-blue-50",
      timeline: false,
    },
    {
      id: 23,
      company: "سبيس إكس",
      role: "استكشاف الفضاء والصواريخ",
      status: "متابع",
      date: "2026-04-01",
      img: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=400",
      statusClasses: "border-blue-200 text-blue-600 bg-blue-50",
      timeline: false,
    },
  ],
};

// 1. وظيفة تبديل التبويبات (Tabs)
function switchTab(tabId) {
  currentTabId = tabId;
  currentFilterValue = "الكل";

  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active-tab");
    btn.classList.add("inactive-tab", "text-gray-400");
  });

  const activeBtn = document.getElementById("tab-" + tabId);
  if (activeBtn) {
    activeBtn.classList.add("active-tab");
    activeBtn.classList.remove("inactive-tab", "text-gray-400");
  }

  const filterBar = document.getElementById("filter-bar");
  if (filterBar) {
    filterBar.style.display = tabId === "apply-status" ? "flex" : "none";
  }

  renderCards();
}

// 2. وظيفة الفلترة (Filter)
function filterCards(status, btnElement) {
  currentFilterValue = status;
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.replace("bg-button", "bg-white");
    btn.classList.replace("text-white", "text-gray-500");
    btn.classList.add("border", "border-gray-100");
  });

  btnElement.classList.replace("bg-white", "bg-button");
  btnElement.classList.replace("text-gray-500", "text-white");
  btnElement.classList.remove("border", "border-gray-100");

  renderCards();
}

// 3. وظيفة الترتيب (Sort)
function sortCards(order) {
  const data = activityData[currentTabId];
  if (data) {
    data.sort((a, b) => {
      return order === "newest"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date);
    });
    renderCards();
  }
}

// 4. وظيفة الرندرة الأساسية (Render) - تم تحديثها لاستخدام الصور
function renderCards() {
  const container = document.getElementById("cards-container");
  let data = activityData[currentTabId] || [];

  if (currentFilterValue !== "الكل") {
    data = data.filter((item) => item.status === currentFilterValue);
  }

  if (data.length === 0) {
    container.innerHTML = `<div class="text-center py-10 text-gray-400 font-bold">لا توجد بيانات متاحة حالياً</div>`;
    return;
  }

  container.innerHTML = data
    .map(
      (item) => `
        <div class="bg-white border border-gray-100 rounded-xl overflow-hidden transition-all group">
            <div onclick="toggleAccordion('card-${item.id}')" class="p-5 flex items-center justify-between cursor-pointer">
                <div class="flex items-center gap-5">
                    <div class="w-16 h-16 bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                        <img src="${item.img}" class="w-full h-full object-cover group-hover:scale-110 transition-all duration-300" alt="${item.company}">
                    </div>
                    <div class="flex flex-col gap-1">
                        <span class="text-[11px] text-gray-400 font-bold uppercase tracking-wider">${item.company}</span>
                        <h4 class="text-base font-bold text-gray-800">${item.role}</h4>
                        <div class="mt-1">
                            <span class="px-3 py-1 rounded-lg text-[10px] font-bold border ${item.statusClasses}">${item.status}</span>
                        </div>
                    </div>
                </div>
                <div class="text-gray-300 group-hover:text-gray-500 transition-transform duration-300" id="arrow-card-${item.id}">
                    <i class="fa-solid fa-chevron-down text-sm"></i>
                </div>
            </div>

            ${
              item.timeline
                ? `
            <div id="content-card-${item.id}" class="hidden border-t border-gray-50 bg-input p-5 space-y-3">
                <div class="flex items-center gap-4">
                    <i class="fa-regular fa-circle-check text-gray-300 text-sm"></i>
                    <div class="flex-1 flex items-center justify-between bg-white p-3 rounded-xl border-r-4 border-r-button ">
                        <span class="text-xs font-bold text-gray-700">تمت المقابلة التقنية</span>
                        <span class="text-[10px] text-gray-400">منذ 3 أيام</span>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <i class="fa-solid fa-circle-check text-button text-sm"></i>
                    <div class="flex-1 flex flex-col gap-1 bg-white p-3 rounded-xl border-r-4 border-r-green-500 ">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-bold text-gray-800">تم القبول النهائي</span>
                            <span class="text-[10px] text-gray-400">الآن</span>
                        </div>
                        <p class="text-[10px] text-gray-500">تم قبول طلبك بنجاح، فريقنا سيتواصل معك.</p>
                    </div>
                </div>
            </div>`
                : ""
            }
        </div>
    `,
    )
    .join("");
}

// 5. وظيفة الأكورديون
function toggleAccordion(id) {
  const content = document.getElementById("content-" + id);
  const arrow = document.getElementById("arrow-" + id);
  if (!content) return;

  if (content.classList.contains("hidden")) {
    content.classList.remove("hidden");
    arrow.style.transform = "rotate(180deg)";
  } else {
    content.classList.add("hidden");
    arrow.style.transform = "rotate(0deg)";
  }
}

// التشغيل الافتراضي
document.addEventListener("DOMContentLoaded", () => {
  switchTab("apply-status");
});
// دالة لإظهار التنبيه عند تحميل الصفحة
window.onload = function() {
    const modal = document.getElementById('commentModal');
    // إزالة class hidden وإضافة flex
    modal.classList.remove('hidden');
    modal.classList.add('flex');
};

// دالة لإغلاق التنبيه
function closeModal() {
    const modal = document.getElementById('commentModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

// إغلاق التنبيه عند الضغط خارج الصندوق الأبيض
window.onclick = function(event) {
    const modal = document.getElementById('commentModal');
    if (event.target == modal) {
        closeModal();
    }
}
document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', function() {
        const rating = this.getAttribute('data-value');
        const allStars = document.querySelectorAll('.star');

        allStars.forEach(s => {
            const sValue = parseInt(s.getAttribute('data-value'));
            if (sValue <= parseInt(rating)) {
                // إضافة اللون الأصفر مع النعومة
                s.classList.remove('text-gray-200');
                s.classList.add('text-yellow-400');
                // تأثير نبض خفيف عند النقر
                s.classList.add('scale-110');
                setTimeout(() => s.classList.remove('scale-110'), 200);
            } else {
                // العودة للرمادي
                s.classList.remove('text-yellow-400');
                s.classList.add('text-gray-200');
            }
        });
    });

    // تأثير Hover لإعطاء انطباع بالتفاعل قبل النقر
    star.addEventListener('mouseenter', function() {
        this.classList.add('scale-125', 'text-yellow-200');
    });

    star.addEventListener('mouseleave', function() {
        this.classList.remove('scale-125', 'text-yellow-200');
    });
});
function sendComment() {
    // 1. إغلاق مودال التقييم أولاً
    closeModal();

    // 2. تفعيل رسالة النجاح
    const toast = document.getElementById('successToast');
    
    // إظهار الرسالة بحركة من الأعلى للأسفل مع Fade In
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.remove('opacity-0', '-translate-y-10');
        toast.classList.add('opacity-100', 'translate-y-0');
    }, 10);

    // 3. إخفاء الرسالة تلقائياً بعد 3 ثوانٍ
    setTimeout(() => {
        toast.classList.replace('opacity-100', 'opacity-0');
        toast.classList.replace('translate-y-0', '-translate-y-10');
        
        // إخفاؤها تماماً من الـ DOM بعد انتهاء الحركة
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 500);
    }, 3000);
}

// ملاحظة: تأكد من تغيير onclick في زر "إرسال" داخل المودال ليصبح:
// onclick="sendComment()"