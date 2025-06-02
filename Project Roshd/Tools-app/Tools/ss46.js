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
// عملکرد جستجو
document.getElementById("search-btn").addEventListener("click", function () {
  let searchValue = document.getElementById("search-input").value.toLowerCase();
  console.log("نتیجه جستجو برای:", searchValue);
});
let currentPage = 1;

function openPage(pageNumber) {
  // حذف کلاس active از دکمه‌های قبلی
  let buttons = document.querySelectorAll(".pagination-button");
  buttons.forEach((button) => button.classList.remove("active"));

  // افزودن کلاس active به دکمه انتخاب شده
  let selectedButton = document.querySelector();
  selectedButton.classList.add("active");

  // باز کردن صفحه جدید (مانند قبل)
  let newWindow = window.open("", "_blank");
  let content = document.documentElement.outerHTML;
  newWindow.document.open();
  newWindow.document.write(content);
  newWindow.document.close();
}

function openPage(pageNumber) {
  document.querySelectorAll(".pagination-button").forEach((button) => {
    button.classList.remove("active");
  });

  document
    .querySelectorAll(".pagination-button")
    [pageNumber - 1].classList.add("active");
}

function nextPage() {
  let currentPage = document.querySelector(".pagination-button.active");
  if (currentPage && currentPage.nextElementSibling) {
    let nextButton = currentPage.nextElementSibling;
    if (nextButton.classList.contains("pagination-button")) {
      openPage(parseInt(nextButton.textContent));
    }
  }
}

function refreshData() {
  location.reload();
}
function toggleDropdownn() {
  var menu = document.getElementById("dropdownnMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

document.addEventListener("click", function (event) {
  var button = document.querySelector(".dropbtnn");
  var menu = document.getElementById("dropdownnMenu");
  if (!button.contains(event.target) && !menu.contains(event.target)) {
    menu.style.display = "none";
  }
});
function openModal() {
  document.getElementById("hostModal").style.display = "block";
}

function openModal() {
  document.getElementById("hostModal").style.display = "block";
}
function openModal() {
  document.getElementById("hostModal").style.display = "block";
}

function closeModal() {
  document.getElementById("hostModal").style.display = "none";
}
function exportTableToExcel(tableID, filename = "data.xlsx") {
  const table = document.getElementById(tableID);
  const workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
  XLSX.writeFile(workbook, filename);
}
function closeModal() {
  document.getElementById("hostModal").style.display = "none";
}

// اطمینان از اجرای اسکریپت بعد از لود کامل DOM
document.addEventListener("DOMContentLoaded", function () {
  const carets = document.querySelectorAll(".tree .caret");
  carets.forEach((caret) => {
    caret.addEventListener("click", function () {
      const nestedList = this.nextElementSibling;
      if (nestedList && nestedList.classList.contains("nested")) {
        nestedList.classList.toggle("active");
        this.classList.toggle("caret-down");
      }
    });
  });
});
