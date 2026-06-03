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



    // التأكد من أن الكود يعمل بعد تحميل الصفحة
    document.addEventListener("DOMContentLoaded", function() {
        const ctx = document.getElementById('applyStatusChartFinal').getContext('2d');
        
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['قيد المراجعة', 'مقبول', 'مرفوض'],
                datasets: [{
                    data: [8, 4, 3],
                    backgroundColor: [
                        '#2D534C', // الأخضر الغامق [قيد المراجعة]
                        '#14D1B1', // الفيروزي المتوسط [مقبول]
                        '#21EAC8'  // الفيروزي الفاتح [مرفوض]
                    ],
                    borderWidth: 2,
                    borderColor: '#ffffff', // إضافة فاصل أبيض بسيط لزيادة الجمالية
                    hoverOffset: 8
                }]
            },
            options: {
                cutout: '75%', // سمك الدائرة كما في الصورة
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    animateRotate: true,
                    duration: 2000
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        rtl: true,
                        backgroundColor: '#2D534C',
                        titleAlign: 'right',
                        bodyAlign: 'right',
                        padding: 10
                    }
                }
            }
        });
    });




const chartCanvas = document.getElementById('jobStatisticsChart');
    const ctx = chartCanvas.getContext('2d');
    let myChart;

    const dataConfig = {
        week: {
            labels: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
            views: [800, 1900, 2400, 2100, 4100, 3800, 5000],
            applied: [600, 1400, 1600, 1900, 3200, 4500, 4900],
            date: 'عرض إحصائيات التوظيف لـ 19-25 يوليو'
        },
        month: {
            labels: ['الأسبوع 1', 'الأسبوع 2', 'الأسبوع 3', 'الأسبوع 4'],
            views: [5000, 8500, 7000, 12000],
            applied: [4000, 7000, 11000, 9000],
            date: 'إحصائيات شهر يوليو 2025'
        },
        year: {
            labels: ['2021', '2022', '2023', '2024', '2025'],
            views: [40000, 70000, 65000, 95000, 110000],
            applied: [30000, 55000, 60000, 80000, 105000],
            date: 'إحصائيات السنوات الأخيرة'
        }
    };

    function initChart(type = 'week') {
        const config = dataConfig[type];
        
        if (myChart) {
            myChart.destroy();
        }

        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: config.labels,
                datasets: [
                    {
                        label: 'مشاهدات الوظيفة',
                        data: config.views,
                        borderColor: '#2D534C', // اللون الداكن
                        backgroundColor: '#2D534C', // لضمان الظهور في التول تيب
                        tension: 0.4,
                        borderWidth: 3,
                        pointRadius: 0,
                        pointHoverRadius: 6,
                        pointHoverBackgroundColor: '#2D534C',
                        pointHoverBorderColor: '#fff',
                        pointHoverBorderWidth: 2,
                        fill: false
                    },
                    {
                        label: 'الوظائف المتقدم لها',
                        data: config.applied,
                        borderColor: '#21EAC8', // اللون الفيروزي
                        backgroundColor: '#21EAC8',
                        tension: 0.4,
                        borderWidth: 3,
                        pointRadius: 0,
                        pointHoverRadius: 6,
                        pointHoverBackgroundColor: '#21EAC8',
                        pointHoverBorderColor: '#fff',
                        pointHoverBorderWidth: 2,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        rtl: true,
                        backgroundColor: '#fff',
                        titleColor: '#1f2937',
                        bodyColor: '#4b5563',
                        borderColor: '#f3f4f6',
                        borderWidth: 1,
                        padding: 12,
                        usePointStyle: true
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { color: '#9ca3af', font: { size: 11, weight: 'bold' } }
                    },
                    y: {
                        position: 'right', // ليتناسب مع RTL
                        grid: { borderDash: [5, 5], color: '#f3f4f6' },
                        ticks: { 
                            color: '#9ca3af', 
                            font: { size: 10, weight: 'bold' },
                            callback: function(value) {
                                return value >= 1000 ? (value/1000) + 'k' : value;
                            }
                        }
                    }
                }
            }
        });
    }

    function updateChart(timeline) {
    initChart(timeline);
    document.getElementById('chart-date').innerText = dataConfig[timeline].date;

    // تحديث حالة الأزرار
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('bg-[#21EAC8]', 'text-white', 'shadow-sm', 'font-bold');
        // أضفنا كلاس الوضع الليلي للنص الرمادي هنا
        btn.classList.add('text-gray-400', 'dark:text-[#DEEDEB]/40'); 
    });

    const activeBtn = document.getElementById('btn-' + timeline);
    activeBtn.classList.add('bg-[#21EAC8]', 'text-white', 'shadow-sm', 'font-bold');
    // أضفنا حذف كلاس الوضع الليلي للنص الرمادي هنا ليكون النص أبيض
    activeBtn.classList.remove('text-gray-400', 'dark:text-[#DEEDEB]/40'); 
}

    // التشغيل الأولي
    window.onload = function() {
        initChart('week');
    };