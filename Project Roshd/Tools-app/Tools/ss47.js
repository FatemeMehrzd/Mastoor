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
const rokhdadLink = document.getElementById("rokhdad-link");
const rokhdadSubmenu = document.getElementById("rokhdad-submenu");
const submenuItems = document.querySelectorAll(".submenu-item");

rokhdadLink.addEventListener("click", (event) => {
  event.preventDefault(); // جلوگیری از رفتن به لینک
  rokhdadSubmenu.style.display =
    rokhdadSubmenu.style.display === "block" ? "none" : "block";
});

submenuItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    const type = event.target.dataset.type;
    console.log(`زیرمنوی ${type} انتخاب شد.`);
    // اینجا می‌توانید کد مربوط به نمایش محتوای هر زیرمنو را اضافه کنید.
  });
});
const sidebar = document.getElementById("sidebar");
const closeSidebarButton = document.getElementById("close-sidebar-button");

closeSidebarButton.addEventListener("click", () => {
  sidebar.classList.toggle("sidebar-collapsed");
});
function toggleDropdown() {
  var menu = document.getElementById("dropdownMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}
function openModal() {
  document.getElementById("hostModal").style.display = "block";
}

function closemodal() {
  document.getElementById("hostModal").style.display = "none";
}
function showConfirmBox() {
  document.getElementById("confirmBox").style.display = "block";
}

function confirmDelete() {
  // اجرای عملیات حذف اینجا انجام میشه
  console.log("قانون حذف شد");

  // بستن همه پنجره‌ها
  document.getElementById("confirmBox").style.display = "none";
  // document.getElementById("hostModal").style.display = "none";اگر خواستیم حتی hostModal هم بسته شود
}

function cancelDelete() {
  // فقط بستن پنجره‌ها
  document.getElementById("confirmBox").style.display = "none";
  // document.getElementById("hostModal").style.display = "none";اگر خواستیم حتی hostModal هم بسته شود
}
function approveLaw() {
  document.getElementById("approvalPopup").style.display = "block";
}

function closePopup() {
  closeAll(); // اگر "خیر" رو زد
}

function confirmApproval() {
  //alert("قانون با موفقیت تایید شد!");
  closeAll(); // اگر "بله" رو زد
}

function closeInfo() {
  closeAll(); // اگر "لغو" رو زد
}

function closeAll() {
  document.getElementById("approvalPopup").style.display = "none"; // پنجره تأیید
  document.getElementById("infoCard").style.display = "none"; // پنجره اطلاعات
  document.getElementById("hostModal").style.display = "none"; // پنجره اصلی (modall قدیم)
}
function exportTableToExcel(tableID, filename = "data.xlsx") {
  const table = document.getElementById(tableID);
  const workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
  XLSX.writeFile(workbook, filename);
}
