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

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const notificationItems = document.querySelectorAll('.notification-item');
    const countText = document.getElementById('notif-count');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // 1. تغيير تنسيق الأزرار (إزالة النشط من الكل وإضافته للمضغوط)
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-button', 'shadow-sm');
                btn.classList.add('bg-input', 'border-gray-100');
            });
            button.classList.add('bg-button', 'shadow-sm');
            button.classList.remove('bg-input', 'border-gray-100');

            // 2. تصفية العناصر مع تأثير اختفاء وظهور (Fade)
            let visibleCount = 0;
            notificationItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'flex';
                    item.classList.add('animate-fade-in');
                    visibleCount++;
                } else {
                    item.style.display = 'none';
                    item.classList.remove('animate-fade-in');
                }
            });

            // 3. تحديث الرقم العلوي اختيارياً
            countText.innerText = `${visibleCount} تنبيهات`;
        });
    });
});

