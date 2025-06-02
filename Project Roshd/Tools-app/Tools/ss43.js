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
  document.getElementById("dropdownMenu").classList.toggle("show");
  document.getElementById("arrow").classList.toggle("rotate");
}
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var arrow = document.getElementById("arrow");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
        arrow.classList.remove("rotate");
      }
    }
  }
};
let currentPage = 1;

function openPage(pageNumber) {
  // حذف کلاس active از دکمه‌های قبلی
  let buttons = document.querySelectorAll(".pagination-button");
  buttons.forEach((button) => button.classList.remove("active"));

  // افزودن کلاس active به دکمه انتخاب شده
  let selectedButton = document.querySelector(
    `.pagination-button:nth-child(${pageNumber})`
  );
  selectedButton.classList.add("active");

  // باز کردن صفحه جدید (مانند قبل)
  let newWindow = window.open("", "_blank");
  let content = document.documentElement.outerHTML;
  newWindow.document.open();
  newWindow.document.write(content);
  newWindow.document.close();
}

function nextPage() {
  currentPage += 4; // افزایش شماره صفحه به اندازه 4
  updatePaginationButtons();
}

function updatePaginationButtons() {
  let buttons = document.querySelectorAll(".pagination-button");
  for (let i = 0; i < 4; i++) {
    buttons[i].textContent = currentPage + i;
    buttons[i].onclick = function () {
      openPage(currentPage + i);
    };
  }
  // حذف کلاس active از دکمه‌های قبلی
  buttons.forEach((button) => button.classList.remove("active"));

  // افزودن کلاس active به دکمه انتخاب شده
  let selectedButton = document.querySelector(
    `.pagination-button:nth-child(1)`
  );
  selectedButton.classList.add("active");
}

function refreshData() {
  // اینجا می‌توانید کد مربوط به به‌روزرسانی اطلاعات را قرار دهید
  // مثلاً بارگذاری مجدد داده‌ها از سرور
  alert("اطلاعات به‌روزرسانی شد!");
}
function toggleDropdown() {
  var menu = document.getElementById("dropdownMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function openPopup() {
  document.getElementById("popup").style.display = "block";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
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
function exportTableToExcel(tableID, filename = "data.xlsx") {
  const table = document.getElementById(tableID);
  const workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
  XLSX.writeFile(workbook, filename);
}
