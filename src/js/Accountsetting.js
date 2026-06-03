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
// قسم: المعلومات الشخصية
// دالة التحميل التلقائي عند فتح الصفحة
document.addEventListener('DOMContentLoaded', function() {
    const savedFirst = localStorage.getItem('user_first_name');
    const savedLast = localStorage.getItem('user_last_name');

    if (savedFirst && savedLast) {
        // تحديث واجهة العرض
        document.getElementById('viewFirstName').innerText = savedFirst;
        document.getElementById('viewLastName').innerText = savedLast;
        
        // تحديث قيم المدخلات لتكون جاهزة
        document.getElementById('inputFirstName').value = savedFirst;
        document.getElementById('inputLastName').value = savedLast;
        
        // تحديث الهيدر العلوي إن وجد
        const headerName = document.getElementById('headerUserName');
        if (headerName) headerName.innerText = savedFirst + " " + savedLast;
    }
});

// دالة التبديل بين العرض والتعديل
function toggleEdit(section) {
    const displayDiv = document.getElementById(section + 'Display');
    const editDiv = document.getElementById(section + 'Edit');
    const editIcon = document.getElementById(section + 'EditIcon');

    if (displayDiv.classList.contains('hidden')) {
        displayDiv.classList.remove('hidden');
        editDiv.classList.add('hidden');
        if (editIcon) editIcon.style.display = 'block';
    } else {
        displayDiv.classList.add('hidden');
        editDiv.classList.remove('hidden');
        if (editIcon) editIcon.style.display = 'none';
        
        // تعبئة الحقول بالقيم الحالية عند البدء بالتعديل
        document.getElementById('inputFirstName').value = document.getElementById('viewFirstName').innerText;
        document.getElementById('inputLastName').value = document.getElementById('viewLastName').innerText;
    }
}

// دالة الحفظ الفعلي
function saveEdit(section) {
    if (section === 'name') {
        const fName = document.getElementById('inputFirstName').value;
        const lName = document.getElementById('inputLastName').value;

        if (fName.trim() === "" || lName.trim() === "") {
            alert("يرجى إدخال الاسم كاملاً");
            return;
        }

        // 1. الحفظ في المتصفح
        localStorage.setItem('user_first_name', fName);
        localStorage.setItem('user_last_name', lName);

        // 2. تحديث نصوص العرض فوراً
        document.getElementById('viewFirstName').innerText = fName;
        document.getElementById('viewLastName').innerText = lName;

        // 3. تحديث الهيدر
        const headerName = document.getElementById('headerUserName');
        if (headerName) headerName.innerText = fName + " " + lName;

        // 4. العودة لوضع العرض
        toggleEdit('name');
        
        console.log("✅ تمت عملية الحفظ بنجاح في Local Storage");
    }
}

// قسم البريد الإلكتروني
/**
 * 1. التحميل التلقائي عند فتح الصفحة
 */
document.addEventListener('DOMContentLoaded', function() {
    const savedUserEmail = localStorage.getItem('user_email');
    const viewEmailElement = document.getElementById('viewEmail');
    
    if (savedUserEmail && viewEmailElement) {
        viewEmailElement.innerText = savedUserEmail;
    }
});

/**
 * 2. دالة التبديل المستقلة (Email Only)
 */
function toggleEditEmail() {
    const displayDiv = document.getElementById('emailDisplay');
    const editDiv = document.getElementById('emailEdit');

    if (!displayDiv || !editDiv) return;

    if (displayDiv.classList.contains('hidden')) {
        displayDiv.classList.remove('hidden');
        editDiv.classList.add('hidden');
    } else {
        displayDiv.classList.add('hidden');
        editDiv.classList.remove('hidden');
        
        const currentEmail = document.getElementById('viewEmail').innerText;
        const currentDisplayField = document.getElementById('currentEmailDisplay');
        if (currentDisplayField) {
            currentDisplayField.value = currentEmail;
        }

        const inputField = document.getElementById('inputEmail');
        if (inputField) {
            inputField.value = "";
            setTimeout(() => inputField.focus(), 100);
        }
    }
}

/**
 * 3. دالة الحفظ المستقلة مع SweetAlert
 */
function saveEditEmail() {
    const emailInput = document.getElementById('inputEmail');
    const viewEmailElement = document.getElementById('viewEmail');

    if (!emailInput || !viewEmailElement) return;

    const emailValue = emailInput.value.trim();

    // فحص صحة البريد الإلكتروني
    if (emailValue === "" || !emailValue.includes('@')) {
        Swal.fire({
            icon: 'error',
            title: 'بريد غير صالح',
            text: 'يرجى إدخال عنوان بريد إلكتروني صحيح يحتوي على @',
            confirmButtonColor: '#14b8a6', // Teal
            customClass: { popup: 'rounded-2xl' }
        });
        return;
    }

    // حفظ في التخزين المحلي وتحديث الواجهة
    localStorage.setItem('user_email', emailValue);
    viewEmailElement.innerText = emailValue;

    // إغلاق وضع التعديل
    toggleEditEmail();

    // إظهار نجاح العملية باستخدام Toast (تنبيه صغير)
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });

    Toast.fire({
        icon: 'success',
        title: 'تم تحديث البريد الإلكتروني بنجاح'
    });
}
// قسم الأمان (كلمة المرور)
/**
 * دالة التبديل الخاصة بقسم الأمان
 */
function toggleSecurityEdit() {
    const displayDiv = document.getElementById('securityDisplay');
    const editDiv = document.getElementById('securityEdit');

    if (!displayDiv || !editDiv) return;

    if (displayDiv.classList.contains('hidden')) {
        displayDiv.classList.remove('hidden');
        editDiv.classList.add('hidden');
    } else {
        displayDiv.classList.add('hidden');
        editDiv.classList.remove('hidden');

        const oldPassField = document.getElementById('oldPasswordInput');
        const newPassField = document.getElementById('newPasswordInput');
        
        if (oldPassField && newPassField) {
            oldPassField.value = "";
            newPassField.value = "";
            setTimeout(() => oldPassField.focus(), 100);
        }
    }
}

/**
 * دالة الحفظ مع التحقق المتقدم (8 أحرف + عدم التطابق)
 */
function saveSecurityEdit() {
    const oldPass = document.getElementById('oldPasswordInput').value;
    const newPass = document.getElementById('newPasswordInput').value;

    // 1. التحقق من الحقول الفارغة
    if (oldPass.trim() === "" || newPass.trim() === "") {
        Swal.fire({
            icon: 'error',
            title: 'حقول فارغة',
            text: 'يرجى إدخال كلمة المرور القديمة والجديدة للمتابعة',
            confirmButtonText: 'حسناً',
            confirmButtonColor: '#14b8a6', // لون الـ Teal الخاص بك
            customClass: { popup: 'rounded-2xl' }
        });
        return;
    }

    // 2. التحقق من طول كلمة المرور (8 أحرف كحد أدنى)
    if (newPass.length < 8) {
        Swal.fire({
            icon: 'warning',
            title: 'كلمة مرور قصيرة',
            text: 'للأمان، يجب أن تكون كلمة المرور الجديدة 8 أحرف على الأقل',
            confirmButtonText: 'تعديل',
            confirmButtonColor: '#14b8a6',
            customClass: { popup: 'rounded-2xl' }
        });
        return;
    }

    // 3. التحقق من عدم مطابقة الكلمة الجديدة للقديمة
    if (oldPass === newPass) {
        Swal.fire({
            icon: 'info',
            title: 'تنبيه الأمان',
            text: 'كلمة المرور الجديدة مطابقة للقديمة، يرجى اختيار كلمة مختلفة تماماً',
            confirmButtonText: 'فهمت',
            confirmButtonColor: '#14b8a6',
            customClass: { popup: 'rounded-2xl' }
        });
        return;
    }

    // محاكاة النجاح في حال اجتياز جميع الشروط
    Swal.fire({
        icon: 'success',
        title: 'تم التحديث!',
        text: 'تم تغيير كلمة المرور بنجاح',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        customClass: { popup: 'rounded-2xl' }
    });

    console.log("🔐 Password updated successfully");
    toggleSecurityEdit();
}


// section: الإشعارات
/**
 * هذا الكود يعمل بشكل منفصل تماماً عن أقسام الاسم والبريد.
 * يقوم بحفظ تفضيلات الإشعارات فور تغييرها.
 */

document.addEventListener('DOMContentLoaded', function() {
    // قائمة بجميع معرفات الإشعارات التي أضفناها
    const notificationIds = ['notifyJobs', 'notifyMessages', 'notifySystem', 'notifyNewsletter'];

    // تحميل الحالة المحفوظة لكل زر تبديل
    notificationIds.forEach(id => {
        const savedStatus = localStorage.getItem(id);
        const checkbox = document.getElementById(id);
        
        if (checkbox && savedStatus !== null) {
            // تحويل النص المحفوظ إلى قيمة منطقية (Boolean)
            checkbox.checked = (savedStatus === 'true');
        }
    });
});

/**
 * دالة حفظ الإعداد فور التغيير
 * @param {string} id - معرف الـ Checkbox الذي تم تغييره
 */
function saveNotificationSetting(id) {
    const checkbox = document.getElementById(id);
    if (checkbox) {
        localStorage.setItem(id, checkbox.checked);
        
        // اختيارياً: إظهار إشعار صغير بالنجاح في الكونسول
        console.log(`🔔 تم تحديث إعداد [${id}] إلى: ${checkbox.checked}`);
    }
}

// section: حذف الحساب
function handleAccountDeletion() {
    Swal.fire({
        title: 'هل أنت متأكد؟',
        text: "لن تتمكن من استعادة بياناتك بعد هذه الخطوة!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444', // لون أحمر متناسق مع Tailwind
        cancelButtonColor: '#9ca3af', // لون رمادي للإلغاء
        confirmButtonText: 'نعم، احذف الحساب',
        cancelButtonText: 'إلغاء',
        reverseButtons: true, // لترتيب الأزرار بشكل صحيح في الواجهة العربية
        customClass: {
            popup: 'rounded-2xl', // تدوير الحواف لتناسب تصميمك
            confirmButton: 'rounded-xl px-6 py-2.5 text-xs font-bold',
            cancelButton: 'rounded-xl px-6 py-2.5 text-xs font-bold'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // تنفيذ الحذف الفعلي
            processDeletion();
        }
    });
}

function processDeletion() {
    // محاكاة عملية الحذف مع إظهار رسالة نجاح "Sweet"
    localStorage.clear();
    
    Swal.fire({
        title: 'تم الحذف!',
        text: 'تم مسح جميع بياناتك بنجاح.',
        icon: 'success',
        confirmButtonColor: '#14b8a6', // لون Teal المفضل لديك
        confirmButtonText: 'حسناً',
        customClass: {
            popup: 'rounded-2xl'
        }
    }).then(() => {
        window.location.href = "login.html";
    });
}

// قسم: إنهاء الجلسات الأخرى
/**
 * دالة إنهاء الجلسات الأخرى باستخدام SweetAlert2
 */
function terminateOtherSessions() {
    Swal.fire({
        title: 'تأكيد تسجيل الخروج؟',
        text: "سيتم إنهاء جميع الجلسات الأخرى باستثناء هذا المتصفح.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444', // Red-500
        cancelButtonColor: '#9ca3af', // Gray-400
        confirmButtonText: 'نعم، قم بإنهاء الجلسات',
        cancelButtonText: 'إلغاء',
        reverseButtons: true,
        customClass: {
            popup: 'rounded-2xl',
            confirmButton: 'rounded-xl px-6 py-2.5 text-xs font-bold',
            cancelButton: 'rounded-xl px-6 py-2.5 text-xs font-bold'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // محاكاة عملية الإنهاء
            performSessionCleanup();
        }
    });
}

function performSessionCleanup() {
    // إظهار مؤشر تحميل بسيط
    Swal.fire({
        title: 'جاري المعالجة...',
        text: 'يتم الآن إنهاء الجلسات النشطة',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        },
        timer: 1500,
        showConfirmButton: false,
        customClass: { popup: 'rounded-2xl' }
    }).then(() => {
        // تنبيه نجاح نهائي
        Swal.fire({
            icon: 'success',
            title: 'تمت العملية',
            text: 'تم إنهاء جميع الجلسات الأخرى بنجاح.',
            confirmButtonColor: '#14b8a6', // Teal
            confirmButtonText: 'ممتاز',
            customClass: { popup: 'rounded-2xl' }
        });
        
        console.log("🔒 All other sessions have been terminated.");
    });
}

class User {
    name = "cloud"
}
const u = new User
console.log(User.name);