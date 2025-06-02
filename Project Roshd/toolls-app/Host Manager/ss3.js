var mini = true;

function toggleSidebar() {
  if (mini) {
    console.log("opening sidebar");
    document.getElementById("mySidebar").style.width = "200px";
    document.getElementById("main").style.marginRight = "200px";
    mini = false;
  } else {
    console.log("closing sidebar");
    document.getElementById("mySidebar").style.width = "66px";
    document.getElementById("main").style.marginRight = "66px";
    mini = true;
  }
}
const searchIcon = document.querySelector(".b111");
const searchBox = document.querySelector(".b112");

searchIcon.addEventListener("click", () => {
  searchBox.classList.toggle("active");
});

document.addEventListener("DOMContentLoaded", () => {
  const exitButton = document.querySelector(".b121"); // دکمه خروج
  const modal = document.getElementById("exit-modal"); // مودال
  const confirmExit = document.getElementById("confirm-exit"); // دکمه تایید خروج
  const cancelExit = document.getElementById("cancel-exit"); // دکمه لغو خروج

  // نمایش مودال
  exitButton.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  // تایید خروج
  confirmExit.addEventListener("click", () => {
    window.location.href = "https://"; // لینک صفحه‌ای که کاربر به آن هدایت می‌شود
  });

  // لغو خروج
  cancelExit.addEventListener("click", () => {
    modal.style.display = "none";
    window.location.href = ""; // لینک صفحه ای که کاربر به آن هدایت می شود
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const notificationButton = document.querySelector(".b122"); // دکمه اعلان
  const notificationPopup = document.getElementById("notification-popup"); // پاپ‌آپ اعلان‌ها

  // نمایش یا مخفی کردن پنجره پاپ‌آپ هنگام کلیک
  notificationButton.addEventListener("click", (e) => {
    e.stopPropagation(); // جلوگیری از بسته شدن با کلیک روی دکمه
    notificationPopup.classList.toggle("active");
  });

  // بستن پنجره پاپ‌آپ با کلیک خارج از آن
  document.addEventListener("click", () => {
    notificationPopup.classList.remove("active");
  });

  // جلوگیری از بسته شدن پنجره هنگام کلیک داخل آن
  notificationPopup.addEventListener("click", (e) => {
    e.stopPropagation();
  });
});
function openModal() {
  document.getElementById("hostModal").style.display = "block";
}
function closeModal() {
  document.getElementById("hostModal").style.display = "none";
}
const confirmButton = document.getElementById("confirmButton");

// اضافه کردن رویداد کلیک
confirmButton.addEventListener("click", function () {
  // انتقال به صفحه اصلی
  window.location.href = "ss3.html"; // آدرس صفحه اصلی خود را اینجا قرار دهید
});
function openModall() {
  document.getElementById("hostModall").style.display = "block";
}
function closeModall() {
  document.getElementById("hostModall").style.display = "none";
}
function openModalll() {
  document.getElementById("edit-host").style.display = "block";
}
function closeModalll() {
  document.getElementById("edit-host").style.display = "none";
}
