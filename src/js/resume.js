
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


// دالة عرض السيرة الذاتية
function showViewAlert() {
    Swal.fire({
        title: 'عرض السيرة الذاتية',
        text: 'سيتم فتح ملف السيرة الذاتية في نافذة جديدة',
        icon: 'info',
        iconColor: '#14D1B1',
        confirmButtonText: 'موافق',
        confirmButtonColor: '#14D1B1',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // هنا تضع رابط ملف السيرة الذاتية الخاص بك
            // window.open('path/to/your/cv.pdf', '_blank');
        }
    });
}

// دالة تحميل ملف PDF
function showDownloadAlert() {
    Swal.fire({
        title: 'تحميل السيرة الذاتية',
        text: 'هل تريد البدء في تحميل ملف الـ PDF؟',
        icon: 'question',
        iconColor: '#14D1B1',
        showCancelButton: true,
        confirmButtonText: 'نعم، تحميل الآن',
        cancelButtonText: 'إلغاء',
        confirmButtonColor: '#14D1B1',
        cancelButtonColor: '#f3f4f6',
    }).then((result) => {
        if (result.isConfirmed) {
            // كود التحميل الفعلي
            Swal.fire({
                title: 'تم البدء!',
                text: 'يتم الآن تحضير الملف للتحميل',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
                confirmButtonColor: '#14D1B1',
            });

            // رابط التحميل
            // window.location.href = 'path/to/your/cv.pdf';
        }
    });
}



// 1. استدعاء العناصر
const imgDisplay = document.getElementById("profileDisplay");
const placeholderIcon =
    document.getElementById("placeholderIcon");

// 2. عند تحميل الصفحة: التحقق من التخزين المحلي
window.onload = function () {
    const savedImage = localStorage.getItem("userProfileImage");

    if (savedImage) {
        // إذا وجدت صورة محفوظة، نعرضها ونخفي الأيقونة
        imgDisplay.src = savedImage;
        imgDisplay.classList.remove("hidden");
        placeholderIcon.classList.add("hidden");
    } else {
        // إذا لم توجد، نتأكد من إظهار الأيقونة وإخفاء إطار الصورة
        imgDisplay.classList.add("hidden");
        placeholderIcon.classList.remove("hidden");
    }
};

// 3. دالة المعاينة، الاستبدال، والحفظ
function previewImage(input) {
    let file = input.files[0];
    if (!file) return;

    let reader = new FileReader();

    reader.onload = function (e) {
        let base64Image = e.target.result;

        // تحديث العرض: إظهار الصورة وإخفاء الأيقونة
        imgDisplay.src = base64Image;
        imgDisplay.classList.remove("hidden");
        placeholderIcon.classList.add("hidden");

        // حفظ الصورة الجديدة (الاستبدال يتم تلقائياً لأننا نستخدم نفس المفتاح)
        localStorage.setItem("userProfileImage", base64Image);

        // تنبيه النجاح
        if (typeof Swal !== "undefined") {
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "تم تحديث الصورة بنجاح",
                showConfirmButton: false,
                timer: 2000,
                iconColor: "#14D1B1",
            });
        }
    };

    reader.readAsDataURL(file);
}
// --- 1. إدارة صورة الملف الشخصي ---

// تنفيذ الكود عند تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', () => {
    initPersonalSection();
});

function initPersonalSection() {
    const savedData = JSON.parse(localStorage.getItem('user_personal_info'));
    if (savedData) {
        renderPersonalData(savedData);
        switchPersonalState('display');
    } else {
        switchPersonalState('empty');
    }
}

function switchPersonalState(state) {
    const elements = {
        empty: document.getElementById('personalEmptyState'),
        edit: document.getElementById('personalEditState'),
        display: document.getElementById('personalDisplayState'),
        icon: document.getElementById('personalEditIcon')
    };

    Object.values(elements).forEach(el => el.classList.add('hidden'));

    if (state === 'empty') elements.empty.classList.remove('hidden');
    else if (state === 'edit') elements.edit.classList.remove('hidden');
    else if (state === 'display') {
        elements.display.classList.remove('hidden');
        elements.icon.classList.remove('hidden');
    }
}

function enablePersonalEdit() {
    const savedData = JSON.parse(localStorage.getItem('user_personal_info'));
    if (savedData) {
        document.getElementById('editFirstName').value = savedData.firstName;
        document.getElementById('editLastName').value = savedData.lastName;
        document.getElementById('editEmail').value = savedData.email;
        document.getElementById('editMobile').value = savedData.mobile;
        document.getElementById('editBirthYear').value = savedData.birthYear;
        document.getElementById('editCity').value = savedData.city;
        document.querySelector(`input[name="marital"][value="${savedData.marital}"]`).checked = true;
        document.querySelector(`input[name="gender"][value="${savedData.gender}"]`).checked = true;
    }
    switchPersonalState('edit');
}

function cancelPersonalEdit() {
    const savedData = localStorage.getItem('user_personal_info');
    switchPersonalState(savedData ? 'display' : 'empty');
}

function savePersonalData() {
    const data = {
        firstName: document.getElementById('editFirstName').value.trim(),
        lastName: document.getElementById('editLastName').value.trim(),
        email: document.getElementById('editEmail').value.trim(),
        mobile: document.getElementById('editMobile').value.trim(),
        birthYear: document.getElementById('editBirthYear').value.trim(),
        city: document.getElementById('editCity').value.trim(),
        marital: document.querySelector('input[name="marital"]:checked').value,
        gender: document.querySelector('input[name="gender"]:checked').value
    };

    // التحقق: هل جميع الحقول مملوءة؟
    const isComplete = Object.values(data).every(value => value !== "");

    if (isComplete) {
        localStorage.setItem('user_personal_info', JSON.stringify(data));
        renderPersonalData(data);
        switchPersonalState('display');

        Swal.fire({
            title: 'تم الحفظ!',
            text: 'تم تحديث معلوماتك الشخصية بنجاح',
            icon: 'success',
            confirmButtonText: 'حسناً',
            confirmButtonColor: '#14D1B1',
            customClass: { popup: 'rounded-xl', confirmButton: 'rounded-lg text-xs px-5 py-2' }
        });
    } else {
        // تنبيه SweetAlert عند نقص البيانات
        Swal.fire({
            title: 'تنبيه',
            text: 'يرجى إكمال كتابة كامل المعلومات الشخصية قبل الحفظ',
            icon: 'warning',
            confirmButtonText: 'مفهوم',
            confirmButtonColor: '#14D1B1',
            customClass: { popup: 'rounded-xl', confirmButton: 'rounded-lg text-xs px-5 py-2' }
        });
    }
}

function renderPersonalData(data) {
    document.getElementById('viewFirstName').innerText = data.firstName;
    document.getElementById('viewLastName').innerText = data.lastName;
    document.getElementById('viewEmail').innerText = data.email;
    document.getElementById('viewMobile').innerText = data.mobile;
    document.getElementById('viewBirthYear').innerText = data.birthYear;
    document.getElementById('viewCity').innerText = data.city;
    document.getElementById('viewMarital').innerText = data.marital;
    document.getElementById('viewGender').innerText = data.gender;
}
// تشغيل المنطق فور تحميل الصفحة
// BIO SECTION
document.addEventListener('DOMContentLoaded', () => {
    initBioSection();
});

function initBioSection() {
    const savedBio = localStorage.getItem('user_bio_content');

    if (savedBio && savedBio.trim() !== "") {
        // إذا وجدنا بيانات محفوظة
        document.getElementById('displayText').innerText = savedBio;
        document.getElementById('bioInput').value = savedBio;
        switchState('display');
    } else {
        // إذا لم توجد بيانات
        switchState('empty');
    }
}

// وظيفة ذكية للتبديل بين الحالات الثلاث
function switchState(state) {
    const empty = document.getElementById('emptyState');
    const edit = document.getElementById('editState');
    const display = document.getElementById('displayState');
    const editIcon = document.getElementById('editIcon');

    // إخفاء الجميع أولاً
    [empty, edit, display, editIcon].forEach(el => el.classList.add('hidden'));

    // إظهار الحالة المطلوبة فقط
    if (state === 'empty') {
        empty.classList.remove('hidden');
    } else if (state === 'edit') {
        edit.classList.remove('hidden');
        document.getElementById('bioInput').focus();
    } else if (state === 'display') {
        display.classList.remove('hidden');
        editIcon.classList.remove('hidden');
    }
}

function enableBioEdit() {
    switchState('edit');
    updateCharCount(document.getElementById('bioInput'));
}

function cancelEdit() {
    const savedBio = localStorage.getItem('user_bio_content');
    if (savedBio) switchState('display');
    else switchState('empty');
}

function saveBio() {
    const bioText = document.getElementById('bioInput').value.trim();

    if (bioText !== "") {
        // الحفظ في LocalStorage
        localStorage.setItem('user_bio_content', bioText);
        document.getElementById('displayText').innerText = bioText;
        switchState('display');

        // تنبيه نجاح بسيط (اختياري)
        console.log("تم حفظ النبذة بنجاح");
    } else {
        // إذا قام المستخدم بمسح كل شيء
        localStorage.removeItem('user_bio_content');
        switchState('empty');
    }
}

function updateCharCount(textarea) {
    document.getElementById('charCount').innerText = textarea.value.length;
}







// --- إدارة قسم المهارات المهنية (Tagify + LocalStorage) ---
// SKILLS SECTION

let currentSkills = [];

// معالجة ضغط Enter للإضافة
function handleSkillEnter(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addSkillTag();
    }
}

// إضافة المهارة للقائمة المؤقتة
function addSkillTag() {
    const input = document.getElementById('skillInput');
    let skill = input.value.trim();

    if (skill && !currentSkills.includes(skill)) {
        currentSkills.push(skill);
        input.value = '';
        renderSkillsPreview();
    }
}

// حذف مهارة أثناء التعديل
function removeSkill(index) {
    currentSkills.splice(index, 1);
    renderSkillsPreview();
}

// تبديل الحالات (عرض/تعديل/فراغ)
function switchSkillsState(state) {
    const states = {
        empty: document.getElementById('skillsEmptyState'),
        edit: document.getElementById('skillsEditState'),
        display: document.getElementById('skillsDisplayState'),
        icon: document.getElementById('skillsEditIcon')
    };
    Object.values(states).forEach(el => el && el.classList.add('hidden'));

    if (state === 'empty') states.empty.classList.remove('hidden');
    else if (state === 'edit') states.edit.classList.remove('hidden');
    else if (state === 'display') {
        states.display.classList.remove('hidden');
        states.icon.classList.remove('hidden');
    }
}

// تفعيل وضع التعديل
function enableSkillsEdit() {
    const saved = JSON.parse(localStorage.getItem('user_skills')) || [];
    currentLinks = [...saved]; // التأكد من جلب البيانات القديمة
    currentSkills = [...saved];
    renderSkillsPreview();
    switchSkillsState('edit');
}

// معاينة المهارات (داخل التعديل) بنفس شكل الصور المرفقة
function renderSkillsPreview() {
    const container = document.getElementById('skillsListPreview');
    container.innerHTML = currentSkills.map((skill, i) => `
        <div class="flex flex-row-reverse items-center gap-2 bg-white dark:bg-[#1A3D36] border border-gray-100 dark:border-[#2D534C] px-4 py-2 rounded-xl shadow-sm transition-colors">
            <span class="text-xs font-bold text-primaryHeading dark:text-[#DEEDEB]">${skill}</span>
            <i class="fa-solid fa-xmark text-[10px] text-gray-300 dark:text-[#DEEDEB]/30 cursor-pointer hover:text-red-500 mr-1" onclick="removeSkill(${i})"></i>
        </div>
    `).join('');
}

// حفظ المهارات نهائياً
function saveSkills() {
    if (currentSkills.length > 0) {
        localStorage.setItem('user_skills', JSON.stringify(currentSkills));
        renderFinalSkills();
        switchSkillsState('display');
    } else {
        localStorage.removeItem('user_skills');
        switchSkillsState('empty');
    }
}

// عرض المهارات في الحالة النهائية (Display Mode)
function renderFinalSkills() {
    const container = document.getElementById('skillsDisplayState');
    const saved = JSON.parse(localStorage.getItem('user_skills')) || [];
    container.innerHTML = saved.map(skill => `
        <div class="bg-gray-100/50 border border-gray-100 px-4 py-2 rounded-xl">
            <span class="text-xs font-bold text-gray-500">${skill}</span>
        </div>
    `).join('');
}

function cancelSkillsEdit() {
    const saved = localStorage.getItem('user_skills');
    switchSkillsState(saved ? 'display' : 'empty');
}

// التحميل الأولي
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('user_skills')) {
        renderFinalSkills();
        switchSkillsState('display');
    }
});
//EXPERIENCE SECTION

document.addEventListener('DOMContentLoaded', () => {
    initExperienceSection();
});

function initExperienceSection() {
    const savedExp = JSON.parse(localStorage.getItem('user_experience_data'));

    if (savedExp) {
        renderExperience(savedExp);
        switchExpState('display');
    } else {
        switchExpState('empty');
    }
}

function switchExpState(state) {
    const states = {
        empty: document.getElementById('expEmptyState'),
        edit: document.getElementById('expEditState'),
        display: document.getElementById('expDisplayState'),
        icon: document.getElementById('expEditIcon')
    };

    Object.values(states).forEach(el => el.classList.add('hidden'));

    if (state === 'empty') states.empty.classList.remove('hidden');
    else if (state === 'edit') states.edit.classList.remove('hidden');
    else if (state === 'display') {
        states.display.classList.remove('hidden');
        states.icon.classList.remove('hidden');
    }
}

function enableExpEdit() {
    switchExpState('edit');
}

function cancelExpEdit() {
    const savedExp = localStorage.getItem('user_experience_data');
    switchExpState(savedExp ? 'display' : 'empty');
}

function saveExperience() {
    const expData = {
        title: document.getElementById('jobTitle').value.trim(),
        company: document.getElementById('companyName').value.trim(),
        start: document.getElementById('startDate').value,
        end: document.getElementById('endDate').value,
        desc: document.getElementById('expDesc').value.trim()
    };

    if (expData.title && expData.company) {
        localStorage.setItem('user_experience_data', JSON.stringify(expData));
        renderExperience(expData);
        switchExpState('display');

        // تنبيه نجاح الحفظ بتصميم متناسق
        Swal.fire({
            title: 'تم الحفظ!',
            text: 'تم تحديث خبراتك العملية بنجاح',
            icon: 'success',
            confirmButtonText: 'حسناً',
            confirmButtonColor: '#14D1B1', // ضعي هنا لون الـ button الخاص بمشروعك
            customClass: {
                popup: 'rounded-xl',
                confirmButton: 'rounded-lg text-xs px-5 py-2'
            }
        });

    } else {
        // تنبيه الخطأ في حال كانت الحقول فارغة
        Swal.fire({
            title: 'تنبيه',
            text: 'يرجى ملء المسمى الوظيفي واسم الشركة على الأقل',
            icon: 'warning',
            confirmButtonText: 'مفهوم',
            confirmButtonColor: '#14D1B1', // نفس لون مشروعك
            customClass: {
                popup: 'rounded-xl',
                confirmButton: 'rounded-lg text-xs px-5 py-2'
            }
        });
    }
}

function renderExperience(data) {
    document.getElementById('displayJobTitle').innerText = data.title;
    document.getElementById('displayCompanyInfo').innerText = `${data.company} _ من ${data.start || '...'} إلى ${data.end || 'الآن'}`;
    document.getElementById('displayExpDesc').innerText = data.desc;

    // تعبئة الحقول في واجهة التعديل أيضاً
    document.getElementById('jobTitle').value = data.title;
    document.getElementById('companyName').value = data.company;
    document.getElementById('startDate').value = data.start;
    document.getElementById('endDate').value = data.end;
    document.getElementById('expDesc').value = data.desc;
}

//EDUCATION SECTION
document.addEventListener('DOMContentLoaded', () => {
    initEduSection();
});

function initEduSection() {
    const savedEdu = JSON.parse(localStorage.getItem('user_edu_data'));
    if (savedEdu) {
        renderEducation(savedEdu);
        switchEduState('display');
    } else {
        switchEduState('empty');
    }
}

function switchEduState(state) {
    const states = {
        empty: document.getElementById('eduEmptyState'),
        edit: document.getElementById('eduEditState'),
        display: document.getElementById('eduDisplayState'),
        icon: document.getElementById('eduEditIcon')
    };

    Object.values(states).forEach(el => el.classList.add('hidden'));

    if (state === 'empty') states.empty.classList.remove('hidden');
    else if (state === 'edit') states.edit.classList.remove('hidden');
    else if (state === 'display') {
        states.display.classList.remove('hidden');
        states.icon.classList.remove('hidden');
    }
}

function enableEduEdit() {
    switchEduState('edit');
}

function cancelEduEdit() {
    const savedEdu = localStorage.getItem('user_edu_data');
    switchEduState(savedEdu ? 'display' : 'empty');
}

function saveEducation() {
    const degreeRadio = document.querySelector('input[name="degree"]:checked');
    const eduData = {
        field: document.getElementById('eduField').value.trim(),
        uni: document.getElementById('eduUni').value.trim(),
        degree: degreeRadio ? degreeRadio.value : 'بكالوريوس',
        start: document.getElementById('eduStart').value,
        end: document.getElementById('eduEnd').value
    };

    if (eduData.field && eduData.uni) {
        localStorage.setItem('user_edu_data', JSON.stringify(eduData));
        renderEducation(eduData);
        switchEduState('display');

        Swal.fire({
            title: 'تم الحفظ!',
            text: 'تم تحديث مؤهلاتك العلمية بنجاح',
            icon: 'success',
            confirmButtonText: 'حسناً',
            confirmButtonColor: '#14D1B1', // لون الزر في مشروعك
            customClass: { popup: 'rounded-xl', confirmButton: 'rounded-lg text-xs px-5 py-2' }
        });
    } else {
        Swal.fire({
            title: 'تنبيه',
            text: 'يرجى ملء الحقول المطلوبة (الجامعة والتخصص)',
            icon: 'warning',
            confirmButtonText: 'مفهوم',
            confirmButtonColor: '#14D1B1'
        });
    }
}

function renderEducation(data) {
    document.getElementById('displayEduField').innerText = `${data.degree} في ${data.field}`;
    document.getElementById('displayEduInfo').innerText = `${data.uni} _ من ${data.start || '...'} إلى ${data.end || 'الآن'}`;

    // ربط القيم بحقول التعديل لضمان بقائها عند فتح وضع التعديل
    document.getElementById('eduField').value = data.field;
    document.getElementById('eduUni').value = data.uni;
    document.getElementById('eduStart').value = data.start;
    document.getElementById('eduEnd').value = data.end;
}

//links section

let currentLinks = [];

// 1. معالجة الضغط على Enter للإضافة السريعة
function handleLinkEnter(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addLinkTag();
    }
}

// 2. دالة تحديد الأيقونة واللون (دعم شامل للعديد من المنصات)
function getLinkIcon(url) {
    const u = url.toLowerCase();
    // التواصل الاجتماعي
    if (u.includes('instagram')) return { icon: 'fa-instagram', color: 'text-pink-500' };
    if (u.includes('facebook') || u.includes('fb.com')) return { icon: 'fa-facebook', color: 'text-blue-700' };
    if (u.includes('linkedin')) return { icon: 'fa-linkedin', color: 'text-blue-600' };
    if (u.includes('twitter') || u.includes('x.com')) return { icon: 'fa-x-twitter', color: 'text-black' };
    if (u.includes('tiktok')) return { icon: 'fa-tiktok', color: 'text-black' };

    // تقني وتخزين
    if (u.includes('github')) return { icon: 'fa-github', color: 'text-gray-800' };
    if (u.includes('drive.google')) return { icon: 'fa-google-drive', color: 'text-yellow-500' };
    if (u.includes('figma')) return { icon: 'fa-figma', color: 'text-purple-500' };
    if (u.includes('behance')) return { icon: 'fa-behance', color: 'text-blue-500' };
    if (u.includes('dribbble')) return { icon: 'fa-dribbble', color: 'text-pink-400' };

    // مراسلة ومحتوى
    if (u.includes('youtube') || u.includes('youtu.be')) return { icon: 'fa-youtube', color: 'text-red-600' };
    if (u.includes('whatsapp') || u.includes('wa.me')) return { icon: 'fa-whatsapp', color: 'text-green-500' };
    if (u.includes('telegram') || u.includes('t.me')) return { icon: 'fa-telegram', color: 'text-blue-400' };

    return { icon: 'fa-link', color: 'text-button' }; // افتراضي
}

// 3. استخراج اسم الموقع بشكل جميل
function getDomainName(url) {
    try {
        if (url.includes('drive.google')) return "Google Drive";
        let domain = new URL(url).hostname.replace('www.', '').split('.')[0];
        return domain.charAt(0).toUpperCase() + domain.slice(1);
    } catch { return "رابط"; }
}

// 4. إضافة الرابط للقائمة المؤقتة
function addLinkTag() {
    const input = document.getElementById('linkInput');
    let url = input.value.trim();

    if (url) {
        if (!url.startsWith('http')) url = 'https://' + url;
        if (!currentLinks.includes(url)) {
            currentLinks.push(url);
            input.value = '';
            renderLinksPreview();
        }
    }
}

// 5. عرض المعاينة (وضع التعديل)
function renderLinksPreview() {
    const container = document.getElementById('linksListPreview');
    container.innerHTML = currentLinks.map((url, i) => {
        const info = getLinkIcon(url);
        const name = getDomainName(url);
        return `
            <div class="flex flex-row-reverse items-center gap-2 bg-gray-50 border border-gray-100 px-3 py-2 rounded-xl">
                <i class="fa-brands ${info.icon} ${info.color} text-sm"></i>
                <span class="text-xs font-bold text-primaryHeading">${name}</span>
                <i class="fa-solid fa-xmark text-[10px] text-gray-300 cursor-pointer hover:text-red-500 mr-1" onclick="removeLink(${i})"></i>
            </div>
        `;
    }).join('');
}

// 6. حفظ الروابط نهائياً
function saveLinks() {
    if (currentLinks.length > 0) {
        localStorage.setItem('user_links', JSON.stringify(currentLinks));
        renderFinalLinks();
        switchLinksState('display');
    } else {
        localStorage.removeItem('user_links');
        switchLinksState('empty');
    }
}

// 7. عرض الروابط النهائية (وضع العرض)
function renderFinalLinks() {
    const container = document.getElementById('linksContainer');
    const saved = JSON.parse(localStorage.getItem('user_links')) || [];
    container.innerHTML = saved.map(url => {
        const info = getLinkIcon(url);
        const name = getDomainName(url);
        return `
            <a href="${url}" target="_blank" class="flex flex-row-reverse items-center gap-2 bg-white border border-gray-100 px-4 py-2 rounded-xl hover:shadow-md transition-all group">
                <i class="fa-brands ${info.icon} ${info.color} text-sm"></i>
                <span class="text-xs font-bold text-gray-500 group-hover:text-button">${name}</span>
            </a>
        `;
    }).join('');
}

// 8. وظائف التحكم في الحالة (فتح/إغلاق التعديل)
function switchLinksState(state) {
    const states = {
        empty: document.getElementById('linksEmptyState'),
        edit: document.getElementById('linksEditState'),
        display: document.getElementById('linksDisplayState'),
        icon: document.getElementById('linksEditIcon')
    };
    Object.values(states).forEach(el => el && el.classList.add('hidden'));

    if (state === 'empty') states.empty.classList.remove('hidden');
    else if (state === 'edit') states.edit.classList.remove('hidden');
    else if (state === 'display') {
        states.display.classList.remove('hidden');
        states.icon.classList.remove('hidden');
    }
}

function enableLinksEdit() {
    const saved = JSON.parse(localStorage.getItem('user_links')) || [];
    currentLinks = [...saved];
    renderLinksPreview();
    switchLinksState('edit');
}

function removeLink(index) {
    currentLinks.splice(index, 1);
    renderLinksPreview();
}

function cancelLinksEdit() {
    const saved = localStorage.getItem('user_links');
    switchLinksState(saved ? 'display' : 'empty');
}

// تشغيل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('user_links')) {
        renderFinalLinks();
        switchLinksState('display');
    }
});

// language section

let currentLangs = [];

// 1. معالجة الضغط على Enter للإضافة
function handleLangEnter(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // منع إرسال النموذج إذا وجد
        addLangTag();
        // إعادة التركيز على حقل "اسم اللغة" لإضافة لغة أخرى بسرعة
        document.getElementById('langNameInput').focus();
    }
}

// 2. إضافة اللغة للقائمة المؤقتة
function addLangTag() {
    const nameInput = document.getElementById('langNameInput');
    const levelInput = document.getElementById('langLevelInput');

    const name = nameInput.value.trim();
    const level = levelInput.value.trim() || 'مبتدئ'; // افتراضي إذا لم يكتب المستوى

    if (name) {
        // منع التكرار (مقارنة النصوص دون اعتبار للفراغات)
        const isExist = currentLangs.some(l => l.name.toLowerCase() === name.toLowerCase());
        if (!isExist) {
            currentLangs.push({ name, level });
            nameInput.value = '';
            levelInput.value = '';
            renderLangPreview();
        }
    }
}

// 3. عرض المعاينة أثناء التعديل (تصميم البطاقات الصغيرة مع X)
function renderLangPreview() {
    const container = document.getElementById('langListPreview');
    container.innerHTML = currentLangs.map((lang, i) => `
        <div class="flex flex-row-reverse items-center gap-2 bg-gray-50 border border-gray-100 px-3 py-2 rounded-xl">
            <span class="text-xs font-bold text-primaryHeading">${lang.name}/${lang.level}</span>
            <i class="fa-solid fa-xmark text-[10px] text-gray-300 cursor-pointer hover:text-red-500 mr-1" 
               onclick="removeLang(${i})"></i>
        </div>
    `).join('');
}

// 4. حفظ اللغات في localStorage
function saveLanguages() {
    if (currentLangs.length > 0) {
        localStorage.setItem('user_languages', JSON.stringify(currentLangs));
        renderFinalLangs();
        switchLangState('display');
    } else {
        localStorage.removeItem('user_languages');
        switchLangState('empty');
    }
}

// 5. عرض اللغات النهائية (وضع العرض فقط)
function renderFinalLangs() {
    const container = document.getElementById('langContainer');
    const saved = JSON.parse(localStorage.getItem('user_languages')) || [];
    container.innerHTML = saved.map(lang => `
        <div class="bg-white border border-gray-100 px-4 py-2 rounded-xl hover:shadow-sm transition-all">
            <span class="text-xs font-bold text-gray-500">${lang.name}/${lang.level}</span>
        </div>
    `).join('');
}

// 6. التحكم في تبديل الحالات (Empty, Edit, Display)
function switchLangState(state) {
    const states = {
        empty: document.getElementById('langEmptyState'),
        edit: document.getElementById('langEditState'),
        display: document.getElementById('langDisplayState'),
        icon: document.getElementById('langEditIcon')
    };

    Object.values(states).forEach(el => el && el.classList.add('hidden'));

    if (state === 'empty') {
        states.empty.classList.remove('hidden');
    } else if (state === 'edit') {
        states.edit.classList.remove('hidden');
    } else if (state === 'display') {
        states.display.classList.remove('hidden');
        states.icon.classList.remove('hidden');
    }
}

function enableLangEdit() {
    const saved = JSON.parse(localStorage.getItem('user_languages')) || [];
    currentLangs = [...saved];
    renderLangPreview();
    switchLangState('edit');
}

function removeLang(index) {
    currentLangs.splice(index, 1);
    renderLangPreview();
}

function cancelLangEdit() {
    const saved = localStorage.getItem('user_languages');
    switchLangState(saved ? 'display' : 'empty');
}

// التشغيل عند تحميل الصفحة لاستعادة البيانات
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('user_languages')) {
        renderFinalLangs();
        switchLangState('display');
    }
});

// 
let jobCategories = [];

// 1. معالجة الـ Enter لإضافة الفئة والراتب
function handlePrefEnter(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addJobCategoryTag();
    }
}

function addJobCategoryTag() {
    const catInput = document.getElementById('jobCategory');
    const salInput = document.getElementById('minSalary');
    const cat = catInput.value.trim();
    const sal = salInput.value.trim();

    if (cat) {
        const fullTag = sal ? `${cat}/${sal}` : cat;
        if (!jobCategories.includes(fullTag)) {
            jobCategories.push(fullTag);
            catInput.value = '';
            salInput.value = '';
            renderJobTags();
        }
    }
}

// 2. عرض بطاقات الفئة والراتب في وضع التعديل
function renderJobTags() {
    const container = document.getElementById('jobTagsPreview');
    container.innerHTML = jobCategories.map((tag, i) => `
        <div class="flex items-center gap-2 bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-lg">
            <span class="text-xs font-bold text-primaryHeading">${tag}</span>
            <i class="fa-solid fa-xmark text-[10px] text-gray-400 cursor-pointer hover:text-red-500" onclick="removeJobTag(${i})"></i>
        </div>
    `).join('');
}

function removeJobTag(i) {
    jobCategories.splice(i, 1);
    renderJobTags();
}

// 3. حفظ البيانات بالكامل
function saveJobPrefs() {
    // جمع الخيارات المختارة من Checkboxes
    const contracts = Array.from(document.querySelectorAll('input[name="contract"]:checked')).map(el => el.value);
    const seniority = Array.from(document.querySelectorAll('input[name="seniority"]:checked')).map(el => el.value);

    const fullData = {
        categories: jobCategories,
        contracts: contracts,
        seniority: seniority
    };

    if (jobCategories.length > 0 || contracts.length > 0 || seniority.length > 0) {
        localStorage.setItem('user_job_prefs', JSON.stringify(fullData));
        renderFinalJobPrefs();
        switchJobState('display');
    } else {
        localStorage.removeItem('user_job_prefs');
        switchJobState('empty');
    }
}

// 4. عرض البيانات النهائية في وضع العرض
function renderFinalJobPrefs() {
    const container = document.getElementById('prefFinalContainer');
    const data = JSON.parse(localStorage.getItem('user_job_prefs')) || { categories: [], contracts: [], seniority: [] };

    // دمج كل القيم في شكل بطاقات
    const allItems = [...data.categories, ...data.contracts, ...data.seniority];

    container.innerHTML = allItems.map(item => `
        <div class="bg-gray-100 border border-gray-100 px-4 py-2 rounded-xl">
            <span class="text-xs font-bold text-gray-500">${item}</span>
        </div>
    `).join('');
}

// 5. التحكم في التبديل بين الحالات
function switchJobState(state) {
    const ids = { empty: 'prefEmptyState', edit: 'prefEditState', display: 'prefDisplayState', icon: 'prefEditIcon' };
    Object.values(ids).forEach(id => document.getElementById(id).classList.add('hidden'));

    if (state === 'empty') document.getElementById(ids.empty).classList.remove('hidden');
    else if (state === 'edit') document.getElementById(ids.edit).classList.remove('hidden');
    else if (state === 'display') {
        document.getElementById(ids.display).classList.remove('hidden');
        document.getElementById(ids.icon).classList.remove('hidden');
    }
}

function enablePrefEdit() {
    const data = JSON.parse(localStorage.getItem('user_job_prefs')) || { categories: [], contracts: [], seniority: [] };
    jobCategories = [...data.categories];

    // إعادة تعيين الـ Checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(el => {
        el.checked = data.contracts.includes(el.value) || data.seniority.includes(el.value);
    });

    renderJobTags();
    switchJobState('edit');
}

function cancelPrefEdit() {
    const saved = localStorage.getItem('user_job_prefs');
    switchJobState(saved ? 'display' : 'empty');
}

// التحميل عند تشغيل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('user_job_prefs')) {
        renderFinalJobPrefs();
        switchJobState('display');
    }
});

//


let selectedBenefits = [];

// مزامنة الخيارات المختارة من الـ Checkboxes مع المصفوفة
function syncBenefits() {
    const checkboxes = document.querySelectorAll('input[name="benefitOpt"]:checked');
    const checkedValues = Array.from(checkboxes).map(cb => cb.value);

    // الاحتفاظ بالقيم اليدوية (التي ليست في القائمة الجاهزة) وإضافة المختارة
    const manualValues = selectedBenefits.filter(val =>
        !["فرصة ترقية", "مواصلات", "ساعات عمل مرنة", "تأمين"].includes(val)
    );

    selectedBenefits = [...new Set([...checkedValues, ...manualValues])];
    renderBenefitPreview();
}

function handleBenefitEnter(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const input = document.getElementById('benefitInput');
        const val = input.value.trim();
        if (val && !selectedBenefits.includes(val)) {
            selectedBenefits.push(val);
            input.value = '';
            renderBenefitPreview();
        }
    }
}

function renderBenefitPreview() {
    const container = document.getElementById('benefitListPreview');
    container.innerHTML = selectedBenefits.map((item, i) => `
        <div class="flex flex-row-reverse items-center gap-2 bg-gray-50 border border-gray-100 px-3 py-2 rounded-xl">
            <span class="text-xs font-bold text-primaryHeading">${item}</span>
            <i class="fa-solid fa-xmark text-[10px] text-gray-300 cursor-pointer hover:text-red-500 mr-1" onclick="removeBenefitTag('${item}')"></i>
        </div>
    `).join('');
}

function removeBenefitTag(value) {
    selectedBenefits = selectedBenefits.filter(item => item !== value);

    // إلغاء تحديد الـ Checkbox إذا كان العنصر المحذوف منه
    const cb = document.querySelector(`input[name="benefitOpt"][value="${value}"]`);
    if (cb) cb.checked = false;

    renderBenefitPreview();
}

function saveBenefits() {
    if (selectedBenefits.length > 0) {
        localStorage.setItem('user_benefits', JSON.stringify(selectedBenefits));
        renderFinalBenefits();
        switchBenefitState('display');
    } else {
        localStorage.removeItem('user_benefits');
        switchBenefitState('empty');
    }
}

function renderFinalBenefits() {
    const container = document.getElementById('benefitContainer');
    const saved = JSON.parse(localStorage.getItem('user_benefits')) || [];
    container.innerHTML = saved.map(item => `
        <div class="bg-white border border-gray-100 px-4 py-2 rounded-xl hover:shadow-sm transition-all group">
            <span class="text-xs font-bold text-gray-500 group-hover:text-button">${item}</span>
        </div>
    `).join('');
}

function switchBenefitState(state) {
    const ids = { empty: 'benefitEmptyState', edit: 'benefitEditState', display: 'benefitDisplayState', icon: 'benefitEditIcon' };
    Object.values(ids).forEach(id => document.getElementById(id)?.classList.add('hidden'));

    if (state === 'empty') document.getElementById(ids.empty).classList.remove('hidden');
    else if (state === 'edit') document.getElementById(ids.edit).classList.remove('hidden');
    else if (state === 'display') {
        document.getElementById(ids.display).classList.remove('hidden');
        document.getElementById(ids.icon).classList.remove('hidden');
    }
}

function enableBenefitEdit() {
    const saved = JSON.parse(localStorage.getItem('user_benefits')) || [];
    selectedBenefits = [...saved];

    // تحديد الـ Checkboxes بناءً على البيانات المحفوظة
    document.querySelectorAll('input[name="benefitOpt"]').forEach(cb => {
        cb.checked = selectedBenefits.includes(cb.value);
    });

    renderBenefitPreview();
    switchBenefitState('edit');
}

function cancelBenefitEdit() {
    const saved = localStorage.getItem('user_benefits');
    switchBenefitState(saved ? 'display' : 'empty');
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('user_benefits')) {
        renderFinalBenefits();
        switchBenefitState('display');
    }
});







// الحالات الابتدائية تقرأ من التخزين المحلي
let isFileUploaded = localStorage.getItem('resume_uploaded') === 'true';
let isLinkCopied = localStorage.getItem('link_copied') === 'true';

function updateProgress() {
    let score = 0;
    let tasks = [];

    // 1. فحص الخبرة العلمية (كمثال ثابت حالياً)
    tasks.push({ text: "أضف الخبرة العلمية", points: 30 });

    // 2. فحص حالة الملف من المتغير
    if (isFileUploaded) {
        score += 35;
        showFileDetails(localStorage.getItem('resume_name') || "ملف السيرة الذاتية.pdf");
    } else {
        tasks.push({ text: "ارفع ملف السيرة الذاتية", points: 35 });
        hideFileDetails();
    }

    // 3. فحص المعلومات الشخصية (نقاط ثابتة كمثال)
    score += 35;

    // تحديث الدائرة والنسبة
    const circle = document.getElementById('progressCircle');
    const text = document.getElementById('progressText');
    const circumference = 402;
    const offset = circumference - (score / 100) * circumference;

    if (circle) circle.style.strokeDashoffset = offset;
    if (text) text.innerText = `${score}%`;

    // تحديث قائمة المهام (3 عناصر تحت بعض)
    const container = document.getElementById('checklistContainer');
    const extraTask = { text: "أكمل المسمى الوظيفي", points: 5 };
    const allTasks = [...tasks, extraTask].slice(0, 3);

    if (container) {
        container.innerHTML = allTasks.map(t => `
            <div class="flex items-center gap-2 bg-button/5 p-2 rounded-lg text-[10px] text-button font-bold border border-button/5">
                <span class="bg-button text-white px-1.5 py-0.5 rounded text-[9px]">+${t.points}%</span>
                ${t.text}
            </div>
        `).join('');
    }

    // تفعيل الزر النهائي (شرط الرفع + شرط النسخ)
    const btn = document.getElementById('finalSaveBtn');
    if (isFileUploaded && isLinkCopied) {
        btn.disabled = false;
        btn.classList.remove('bg-gray-300', 'cursor-not-allowed', 'opacity-60');
        btn.classList.add('bg-button', 'hover:scale-[1.02]', 'transition-all', 'shadow-sm', 'shadow-button/20');
    } else {
        btn.disabled = true;
        btn.classList.add('bg-gray-300', 'cursor-not-allowed', 'opacity-60');
        btn.classList.remove('bg-button', 'shadow-sm');
    }
}

// دالة رفع الملف
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        isFileUploaded = true;
        localStorage.setItem('resume_uploaded', 'true');
        localStorage.setItem('resume_name', file.name);

        Swal.fire({
            icon: 'success',
            title: 'تم الرفع!',
            text: 'تم حفظ الملف في متصفحك بنجاح',
            confirmButtonColor: '#14D1B1'
        });
        updateProgress();
    }
}

// دالة نسخ الرابط
function copyResumeLink() {
    const url = document.getElementById('resumeUrl').innerText;
    navigator.clipboard.writeText(url).then(() => {
        isLinkCopied = true;
        localStorage.setItem('link_copied', 'true'); // حفظ حالة النسخ

        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'تم نسخ الرابط',
            showConfirmButton: false,
            timer: 2000
        });
        updateProgress();
    });
}

// دالة الحذف
function removeFile(e) {
    if (e) e.stopPropagation();
    isFileUploaded = false;
    localStorage.removeItem('resume_uploaded');
    localStorage.removeItem('resume_name');
    document.getElementById('resumeInput').value = '';
    updateProgress();
}

// وظائف مساعدة للواجهة
function showFileDetails(name) {
    document.getElementById('uploadPlaceholder').classList.add('hidden');
    document.getElementById('fileInfoDisplay').classList.remove('hidden');
    document.getElementById('fileName').innerText = name;
}

function hideFileDetails() {
    document.getElementById('uploadPlaceholder').classList.remove('hidden');
    document.getElementById('fileInfoDisplay').classList.add('hidden');
}

function handleFinalSubmit() {
    Swal.fire('أحسنت!', 'تم حفظ جميع البيانات بنجاح.', 'success');
}

// التشغيل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', updateProgress);




