
//login page 
function handleLogin() {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-password').value;

    // فحص بسيط للحقول
    if (email === "" || pass === "") {
        Swal.fire({
            title: 'تنبيه!',
            text: 'يرجى إدخال البريد الإلكتروني وكلمة المرور',
            icon: 'warning',
            confirmButtonColor: '#14D1B1',
            confirmButtonText: 'حسناً'
        });
    } else {
        // إظهار تنبيه النجاح
        Swal.fire({
            title: 'تم تسجيل الدخول بنجاح',
            text: 'مرحباً بك مجدداً في خطوة',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000, // سيختفي بعد ثانيتين
            timerProgressBar: true,
            customClass: {
                popup: 'rounded-2xl font-primary'
            }
        }).then(() => {
            // الانتقال للصفحة الرئيسية بعد انتهاء التنبيه
            window.location.href = 'index.html'; 
        });
    }
}

// signup page
// Logic for the multi-step form (4 steps) in the registration process
function changeStep(step) {
  // إخفاء كافة الأقسام
  document.querySelectorAll('.step-section').forEach(sec => sec.classList.add('hidden'));
  
  // إظهار القسم المطلوب
  const targetStep = document.getElementById('step-content-' + step);
  if (targetStep) targetStep.classList.remove('hidden');

  // تحديث شريط التقدم (الـ 4 مستطيلات)
  const dots = document.querySelectorAll('#stepper-bar .step-dot');
  dots.forEach((dot, index) => {
    if (index < step) {
      dot.classList.remove('bg-gray-100');
      dot.classList.add('bg-button');
    } else {
      dot.classList.remove('bg-button');
      dot.classList.add('bg-gray-100');
    }
  });

  // التحكم في ظهور الفوتر (جوجل / تسجيل دخول)
  const footer = document.getElementById('footer-elements');
  if (footer) {
      if (step > 1) footer.classList.add('hidden');
      else footer.classList.remove('hidden');
  }
}
//logic for file upload in the registration form (step 3)    
// وظيفة بسيطة لإظهار اسم الملف للمستخدم بعد اختياره لضمان عدم حدوث خطأ أو ارتباك
function updateFileName() {
    const input = document.getElementById("file-upload-input");
    const status = document.getElementById("file-status");
    if (input.files && input.files[0]) {
     status.innerText = "تم اختيار: " + input.files[0].name;
     status.classList.add("text-button"); // تغيير اللون لتأكيد النجاح
    }
}
//logic for finishing the registration process (after step 4)
function finishRegistration() {
    Swal.fire({
        title: 'تم بنجاح!',
        text: 'لقد تم حفظ بياناتك بنجاح، يرجى تفعيل الحساب عبر الكود المرسل لبريدك.',
        icon: 'success',
        confirmButtonText: 'تفعيل الحساب', // نص الزر ليناسب الخطوة التالية
        confirmButtonColor: '#14D1B1',
        rtl: true,
        allowOutsideClick: false // يمنع إغلاق الرسالة بالضغط خارجها لضمان التحويل
    }).then((result) => {
        if (result.isConfirmed) {
            // الانتقال لصفحة التحقق المستقلة
            window.location.href = 'verify.html';
        }
    });
}

// verify page
function showSuccessAlert() {
    Swal.fire({
        title: 'تم التأكيد بنجاح!',
        text: 'تم تفعيل حسابك، سيتم توجيهك للصفحة الرئيسية الآن',
        icon: 'success',
        confirmButtonText: 'حسناً',
        confirmButtonColor: '#14D1B1', // لون مشروعك الأساسي
        customClass: {
            popup: 'rounded-2xl font-primary',
            title: 'text-primaryHeading',
            confirmButton: 'rounded-xl px-10'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = 'index.html';
        }
    });
}
// forgot password page
function handleDynamicLink() {
    const emailInput = document.getElementById('email-input');
    const email = emailInput.value;

    // نمط بسيط للتحقق من صحة البريد الإلكتروني (Regex)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && emailPattern.test(email)) {
        // تمرير البريد للرسالة
        document.getElementById('display-email').innerText = email;
        
        // التبديل بين الأقسام
        document.getElementById('request-content').classList.add('hidden');
        document.getElementById('success-content').classList.remove('hidden');
    } else if (!email) {
        // تنبيه في حال كان الحقل فارغاً تماماً
        Swal.fire({
            title: 'حقل فارغ!',
            text: 'يرجى كتابة البريد الإلكتروني أولاً لتتمكن من استعادة حسابك.',
            icon: 'warning',
            confirmButtonText: 'حسناً',
            confirmButtonColor: '#14D1B1', // لون مشروعك
            customClass: {
                popup: 'rounded-2xl font-primary',
                confirmButton: 'rounded-xl px-8'
            }
        });
    } else {
        // تنبيه في حال كان البريد المكتوب غير صحيح (صيغته خاطئة)
        Swal.fire({
            title: 'بريد غير صالح!',
            text: 'يرجى إدخال بريد إلكتروني حقيقي (مثال: example@gmail.com).',
            icon: 'error',
            confirmButtonText: 'محاولة أخرى',
            confirmButtonColor: '#f43f5e', // لون أحمر للتنبيه
            customClass: {
                popup: 'rounded-2xl font-primary',
                confirmButton: 'rounded-xl px-8'
            }
        });
    }
}


// new password page
function handlePasswordReset() {
    const pass = document.getElementById('new-password').value;
    const confirmPass = document.getElementById('confirm-password').value;

    if (pass === "" || confirmPass === "") {
        Swal.fire({
            title: 'حقول فارغة',
            text: 'يرجى إدخال كلمة المرور الجديدة وتأكيدها',
            icon: 'warning',
            confirmButtonText: 'حسناً',
            confirmButtonColor: '#14D1B1'
        });
    } else if (pass !== confirmPass) {
        Swal.fire({
            title: 'خطأ في التطابق',
            text: 'كلمتا المرور غير متطابقتين، يرجى التأكد منهما',
            icon: 'error',
            confirmButtonText: 'محاولة أخرى',
            confirmButtonColor: '#f43f5e'
        });
    } else {
        Swal.fire({
            title: 'تم التغيير بنجاح!',
            text: 'يمكنك الآن استخدام كلمة المرور الجديدة لتسجيل الدخول',
            icon: 'success',
            confirmButtonText: 'الانتقال لتسجيل الدخول',
            confirmButtonColor: '#14D1B1'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = './login.html';
            }
        });
    }
}
