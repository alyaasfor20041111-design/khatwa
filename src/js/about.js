function scrollToSection(sectionId) {
    // 1. التمرير السلس للقسم
    const element = document.getElementById(sectionId);
    element.scrollIntoView({ behavior: 'smooth' });

    // 2. تحديث شكل الأزرار (Active State)
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('bg-button', 'text-white', 'shadow-lg', 'shadow-button/20');
        btn.classList.add('text-primaryHeading', 'opacity-60');
    });

    const activeBtn = document.getElementById('btn-' + sectionId);
    activeBtn.classList.add('bg-button', 'text-white', 'shadow-lg', 'shadow-button/20');
    activeBtn.classList.remove('opacity-60');
}

// اختياري: تحديث حالة الزر تلقائياً عند السكول اليدوي
window.addEventListener('scroll', () => {
    const sections = ['about', 'who', 'why', 'says', 'team'];
    let current = '';

    sections.forEach(section => {
        const element = document.getElementById(section);
        const rect = element.getBoundingClientRect();
        if (rect.top <= 150) {
            current = section;
        }
    });

    if (current) {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('bg-button', 'text-white', 'shadow-lg', 'shadow-button/20');
            btn.classList.add('text-primaryHeading', 'opacity-60');
        });
        const activeBtn = document.getElementById('btn-' + current);
        activeBtn.classList.add('bg-button', 'text-white', 'shadow-lg', 'shadow-button/20');
        activeBtn.classList.remove('opacity-60');
    }
});
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    // إخفاء جميع الشرائح
    slides.forEach((slide, i) => {
        slide.classList.add('opacity-0', 'pointer-events-none');
        slide.classList.remove('opacity-100');
        dots[i].classList.replace('bg-primaryHeading', 'bg-border');
    });

    // إظهار الشريحة المختارة
    slides[index].classList.remove('opacity-0', 'pointer-events-none');
    slides[index].classList.add('opacity-100');
    dots[index].classList.replace('bg-border', 'bg-primaryHeading');

    currentSlide = index;
}

// التنقل التلقائي كل 5 ثوانٍ
setInterval(() => {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
}, 5000);




const reviews = [
    { name: "أحمد منصور", role: "مدير مشاريع", text: "منصة خطوة اختصرت عليّ الكثير من الوقت في البحث عن الكفاءات المطلوبة لمشاريعنا.", img: "https://t4.ftcdn.net/jpg/04/31/64/75/360_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg" },
    { name: "ليلى حسن", role: "مطور Full-stack", text: "تجربة المستخدم في الموقع رائعة جداً، والاهتمام بالتفاصيل البرمجية واضح في كل زاوية.", img: "https://img.magnific.com/free-photo/beautiful-woman-cafe_273609-12690.jpg?semt=ais_hybrid&w=740&q=80" },
    { name: "سارة الأحمد", role: "مصممة واجهات", text: "هذه المنصة جعلت تجربتي سلسة وممتعة للغاية. جودة الخدمة فاقت كل توقعاتي!", img: "https://img.freepik.com/free-photo/close-up-young-caucasian-natural-blond-with-light-make-up-happy-perfect-smile-touching-face-look-front-stands-against-white-wall_176420-39352.jpg?semt=ais_hybrid&w=740&q=80" },
    { name: "خالد العتيبي", role: "مهندس برمجيات", text: "أفضل ما في خطوة هو الدقة في اختيار الوظائف التي تناسب مهاراتي وتطلعاتي المستقبيلة.", img: "https://www.shutterstock.com/image-photo/handsome-latin-hispanic-investor-specialist-600nw-2717142879.jpg" },
    { name: "عمر فاروق", role: "مسؤول تسويق رقمي", text: "بفضل خطوة، تمكنت من العثور على فرص عمل تتناسب تماماً مع خبراتي في هذا المجال.", img: "https://img.freepik.com/premium-photo/portrait-handsome-young-man_53876-38137.jpg" }, 
  { name: "نورة القحطاني", role: "مديرة موارد بشرية", text: "منصة احترافية بكل المقاييس، سهّلت علينا الوصول إلى مواهب متميزة وتوفير وقت التوظيف.", img: "https://t3.ftcdn.net/jpg/06/01/50/96/360_F_601509638_jDwIDvlnryPRhXPsBeW1nXv90pdlbykC.jpg" }

   
];

let currentIdx = 2; // سارة في المنتصف

function renderSlider() {
    const track = document.getElementById('avatar-track');
    track.innerHTML = '';

    reviews.forEach((item, i) => {
        const div = document.createElement('div');
        let diff = i - currentIdx;
        let cls = 'avatar-node';

        if (diff === 0) cls += ' node-active';
        else {
            cls += ' node-side';
            if (diff === -1) cls += ' node-L1';
            else if (diff === -2) cls += ' node-L2';
            else if (diff === 1) cls += ' node-R1';
            else if (diff === 2) cls += ' node-R2';
            else cls += ' opacity-0 pointer-events-none';
        }

        div.className = cls;
        div.onclick = () => { currentIdx = i; renderSlider(); };
        div.innerHTML = `<img src="${item.img}" alt="customer">`;
        track.appendChild(div);
    });

    // تحريك النص
    const wrap = document.getElementById('testimonial-wrap');
    wrap.style.opacity = '0';

    setTimeout(() => {
        document.getElementById('t-text').innerText = `"${reviews[currentIdx].text}"`;
        document.getElementById('t-name').innerText = reviews[currentIdx].name;
        document.getElementById('t-role').innerText = reviews[currentIdx].role;
        wrap.style.opacity = '1';
    }, 400);
}

function moveNext() { currentIdx = (currentIdx + 1) % reviews.length; renderSlider(); }
function movePrev() { currentIdx = (currentIdx - 1 + reviews.length) % reviews.length; renderSlider(); }

renderSlider();
