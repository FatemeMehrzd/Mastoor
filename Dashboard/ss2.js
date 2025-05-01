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
let numbers = [
  {
    element: document.getElementById("number-1"),
    percentage: 74,
    circle: document.getElementById("circle-1"),
  },
];

numbers.forEach((item) => {
  let counter = 0;
  let strokeLength = 290;
  let strokeOffset = strokeLength - (strokeLength * item.percentage) / 100;

  setInterval(() => {
    if (counter === item.percentage) {
      clearInterval();
    } else {
      counter++;
      item.element.innerHTML = counter + "%";
      item.circle.style.strokeDashoffset = strokeOffset + "px";
    }
  }, 30);
});
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
function exportTableToExcel(tableID, filename = "data.xlsx") {
  const table = document.getElementById(tableID);
  const workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
  XLSX.writeFile(workbook, filename);
}
const sortDirection = {
  date: false,
  time: false,
  status: false,
};

function sortTable(column) {
  const table = document.getElementById("table");
  const rows = Array.from(table.tBodies[0].rows);
  const columnIndex = {
    date: 3, // ستون تاریخ
    time: 4, // ستون ساعت
    status: 5, // ستون وضعیت
  }[column];

  const ascending = !sortDirection[column];
  sortDirection[column] = ascending;

  // ریست آیکون‌ها
  document.querySelectorAll(".filter-item span").forEach((span) => {
    span.textContent = "⬇️";
  });

  document.getElementById("icon-" + column).textContent = ascending
    ? "⬆️"
    : "⬇️";

  // مرتب‌سازی سطرها
  rows.sort((a, b) => {
    let valA = a.cells[columnIndex].textContent.trim();
    let valB = b.cells[columnIndex].textContent.trim();

    if (column === "date") {
      return ascending
        ? new Date(valA) - new Date(valB)
        : new Date(valB) - new Date(valA);
    } else if (column === "time") {
      return ascending ? valA.localeCompare(valB) : valB.localeCompare(valA);
    } else {
      return ascending ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
  });

  // جایگزینی مجدد سطرها در جدول
  rows.forEach((row) => table.tBodies[0].appendChild(row));
}
/////
let sortDirections = {
  date: true,
  time: true,
  status: true,
};

function parsePersianDate(dateStr) {
  if (!dateStr) return null;
  const parts = dateStr.split(".");
  return new Date(+parts[2], +parts[1] - 1, +parts[0]);
}

function parseTime(timeStr) {
  if (!timeStr) return null;
  const parts = timeStr.split(":");
  return new Date(0, 0, 0, +parts[0], +parts[1]);
}

function sortTableByColumn(column) {
  const table = document.getElementById("table");
  const rows = Array.from(table.tBodies[0].rows);
  let colIndex;

  switch (column) {
    case "date":
      colIndex = 3;
      break;
    case "time":
      colIndex = 4;
      break;
    case "status":
      colIndex = 5;
      break;
  }

  const direction = sortDirections[column] ? 1 : -1;
  sortDirections[column] = !sortDirections[column];

  rows.sort((a, b) => {
    const aText = a.cells[colIndex].textContent.trim();
    const bText = b.cells[colIndex].textContent.trim();

    if (column === "date") {
      const aDate = parsePersianDate(aText);
      const bDate = parsePersianDate(bText);
      return direction * ((aDate || 0) - (bDate || 0));
    } else if (column === "time") {
      const aTime = parseTime(aText);
      const bTime = parseTime(bText);
      return direction * ((aTime || 0) - (bTime || 0));
    } else {
      return direction * aText.localeCompare(bText);
    }
  });

  rows.forEach((row) => table.tBodies[0].appendChild(row));
}
let originalRows = [];

window.addEventListener("DOMContentLoaded", () => {
  const rows = Array.from(document.querySelector("#table tbody").rows);
  originalRows = rows.map((row) => row.cloneNode(true));
});

let currentSort = {
  column: null,
  asc: true,
};

function sortTable(column) {
  const table = document.getElementById("table");
  const tbody = table.tBodies[0];
  const rows = Array.from(tbody.rows);

  let colIndex;
  switch (column) {
    case "date":
      colIndex = 3;
      break;
    case "time":
      colIndex = 4;
      break;
    case "status":
      colIndex = 5;
      break;
    default:
      return;
  }

  const isAsc = currentSort.column === column ? !currentSort.asc : true;
  currentSort = { column, asc: isAsc };

  rows.sort((a, b) => {
    const valA = a.cells[colIndex].textContent.trim();
    const valB = b.cells[colIndex].textContent.trim();

    if (column === "time") {
      return compareTime(valA, valB, isAsc);
    } else if (column === "date") {
      return compareDate(valA, valB, isAsc);
    } else {
      return isAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
  });

  tbody.innerHTML = "";
  rows.forEach((row) => tbody.appendChild(row));

  updateSortIcons(column, isAsc);
}

function compareTime(a, b, asc) {
  const [h1, m1] = a.split(":").map(Number);
  const [h2, m2] = b.split(":").map(Number);
  const t1 = h1 * 60 + m1;
  const t2 = h2 * 60 + m2;
  return asc ? t1 - t2 : t2 - t1;
}

function compareDate(a, b, asc) {
  const [d1, m1, y1] = a.split(".").map(Number);
  const [d2, m2, y2] = b.split(".").map(Number);
  const dateA = new Date(y1, m1 - 1, d1);
  const dateB = new Date(y2, m2 - 1, d2);
  return asc ? dateA - dateB : dateB - dateA;
}

function resetTable() {
  const table = document.getElementById("table");
  const tbody = table.tBodies[0];
  tbody.innerHTML = "";
  originalRows.forEach((row) => tbody.appendChild(row.cloneNode(true)));
  currentSort = { column: null, asc: true };
  resetSortIcons();
}

function updateSortIcons(activeColumn, isAsc) {
  const icons = {
    date: document.getElementById("icon-date"),
    time: document.getElementById("icon-time"),
    status: document.getElementById("icon-status"),
  };

  for (const key in icons) {
    icons[key].classList.remove("asc", "desc");
  }

  icons[activeColumn].classList.add(isAsc ? "asc" : "desc");
}

function resetSortIcons() {
  ["icon-date", "icon-time", "icon-status"].forEach((id) => {
    const icon = document.getElementById(id);
    icon.classList.remove("asc", "desc");
  });
}
const ctx = document.getElementById("myChart").getContext("2d");

const myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [
      "شنبه",
      "یکشنبه",
      "دوشنبه",
      "سه شنبه",
      "چهارشنبه",
      "پنجشنبه",
      "جمعه",
    ],
    datasets: [
      {
        label: "سری A",
        data: [10, 20, 15, 25, 5, 30, 20],
        fill: "origin", // fill to bottom of chart
        backgroundColor: "rgba(128, 0, 128, 0.3)", // soft purple
        borderColor: "rgba(128, 0, 128, 0.8)",
        tension: 0.4,
      },
      {
        label: "سری B",
        data: [5, 15, 25, 10, 35, 20, 15],
        fill: "origin",
        backgroundColor: "rgba(200, 200, 200, 0.3)", // soft gray
        borderColor: "rgba(180, 180, 180, 0.8)",
        tension: 0.4,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    stacked: true,
    plugins: {
      title: {
        display: true,
        text: "نمودار فروش محصولات با اندازه سفارشی",
        font: {
          family: "Dana",
        },
      },
      tooltip: {
        rtl: true,
        textDirection: "rtl",
        mode: "index",
        intersect: false,
        bodyFont: {
          family: "Dana",
        },
        titleFont: {
          family: "Dana",
        },
      },
      legend: {
        labels: {
          textAlign: "right",
          font: {
            family: "Dana",
          },
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          align: "start",
          font: {
            family: "Dana",
          },
        },
      },
      y: {
        stacked: true,
        ticks: {
          font: {
            family: "Dana",
          },
        },
      },
    },
  },
});
