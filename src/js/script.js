// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark')
}

var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
}

var themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function () {

    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }

        // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }

});






function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const icon = document.getElementById('toggleIcon');

    // تبديل حالة القائمة (إخفاء/إظهار)
    sidebar.classList.toggle('translate-x-full');

    // تعديل المساحة للمحتوى الرئيسي وتغيير شكل السهم
    if (sidebar.classList.contains('translate-x-full')) {
        mainContent.classList.remove('sm:mr-64');
        mainContent.classList.add('sm:mr-0');
        icon.classList.replace('fa-chevron-right', 'fa-chevron-left');
    } else {
        mainContent.classList.add('sm:mr-64');
        mainContent.classList.remove('sm:mr-0');
        icon.classList.replace('fa-chevron-left', 'fa-chevron-right');
    }
}


const headerMenuBtn = document.getElementById('mobile-menu-button');
const headerCloseBtn = document.getElementById('close-sidebar');
const headerSidebar = document.getElementById('mobile-sidebar');
const headerOverlay = document.getElementById('sidebar-overlay');

function toggleMobileNavSidebar() {
    headerSidebar.classList.toggle('translate-x-full');
    headerOverlay.classList.toggle('opacity-0');
    headerOverlay.classList.toggle('pointer-events-none');
    document.body.style.overflow = headerSidebar.classList.contains('translate-x-full') ? 'auto' : 'hidden';
}

headerMenuBtn.addEventListener('click', toggleMobileNavSidebar);
headerCloseBtn.addEventListener('click', toggleMobileNavSidebar);
headerOverlay.addEventListener('click', toggleMobileNavSidebar);




document.addEventListener("DOMContentLoaded", () => {
    // 1. معرفة اسم الصفحة الحالية المفتوحة في المتصفح
    const currentPath = window.location.pathname.split("/").pop() || "index.html";

    // 2. تحديد جميع الروابط في القائمة العلوية والجانبية
    const menuLinks = document.querySelectorAll('nav ul a, aside ul a');

    menuLinks.forEach(link => {
      // الحصول على اسم الملف من الرابط نفسه
      const linkPath = link.getAttribute('href').split("/").pop();

      // 3. مقارنة: إذا كان الرابط يطابق الصفحة المفتوحة حالياً
      if (currentPath === linkPath || (currentPath === "" && linkPath === "index.html")) {
        
        if (link.closest('aside')) {
          // شكل الزر النشط في قائمة الجوال (خلفية خفيفة + لون نص مميز)
          link.className = "flex items-center gap-3 p-3 rounded-lg bg-button/10 text-button font-bold transition-all";
        } else {
          // شكل الزر النشط في القائمة العلوية للشاشات الكبيرة
          link.className = "px-6 py-2 text-button font-bold text-sm transition-all";
        }
        
      } else {
        // 4. إذا كان الرابط لصفحة أخرى، نتركه بشكله الطبيعي (غير نشط)
        if (link.closest('aside')) {
          link.className = "flex items-center gap-3 p-3 rounded-lg text-primaryHeading dark:text-white/80 hover:bg-input dark:hover:bg-white/5 transition-all font-bold";
        } else {
          link.className = "px-6 py-2 text-primaryHeading dark:text-white/90 hover:text-button font-bold text-sm transition-all";
        }
      }
    });
  });