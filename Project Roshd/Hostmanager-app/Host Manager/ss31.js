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
let numbers = [
  {
    element: document.getElementById("number-1"),
    percentage: 74,
    circle: document.getElementById("circle-1"),
  },
  {
    element: document.getElementById("number-2"),
    percentage: 50,
    circle: document.getElementById("circle-2"),
  },
  {
    element: document.getElementById("number-3"),
    percentage: 94,
    circle: document.getElementById("circle-3"),
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
function saveData() {
  const name = document.getElementById("customerName").value;
  const website = document.getElementById("website").value;
  const registerDate = document.getElementById("registerDate").value;
  const expiryDate = document.getElementById("expiryDate").value;
  const ipAddress = document.getElementById("ipAddress").value;
}
document.addEventListener("DOMContentLoaded", () => {
  const renewButton = document.getElementById("renewService");
  const cancelButton = document.getElementById("cancelService");
  const renewModal = document.getElementById("renew-modal");
  const cancelModal = document.getElementById("cancel-modal");
  const confirmRenew = document.getElementById("confirm-renew");
  const cancelRenew = document.getElementById("cancel-renew");
  const confirmCancel = document.getElementById("confirm-cancel");
  const cancelCancel = document.getElementById("cancel-cancel");

  renewButton.addEventListener("click", () => {
    renewModal.style.display = "flex";
  });

  cancelButton.addEventListener("click", () => {
    cancelModal.style.display = "flex";
  });

  confirmRenew.addEventListener("click", () => {
    // ... (کدهای تمدید سرویس) ...
    renewModal.style.display = "none";
  });

  cancelRenew.addEventListener("click", () => {
    renewModal.style.display = "none";
  });

  confirmCancel.addEventListener("click", () => {
    // ... (کدهای لغو سرویس) ...
    cancelModal.style.display = "none";
  });

  cancelCancel.addEventListener("click", () => {
    cancelModal.style.display = "none";
  });
});

function saveData() {
  // ... (کدهای ذخیره اطلاعات) ...
}
document.addEventListener("DOMContentLoaded", () => {
  // ... (کدهای قبلی) ...

  // باکس 2
  const renewButton2 = document.getElementById("renewService2");
  const cancelButton2 = document.getElementById("cancelService2");
  renewButton2.addEventListener("click", () => {
    document.getElementById("renew-modal").style.display = "flex";
    // کدهای مربوط به تمدید سرویس در باکس 2
  });
  cancelButton2.addEventListener("click", () => {
    document.getElementById("cancel-modal").style.display = "flex";
    // کدهای مربوط به لغو سرویس در باکس 2
  });

  // باکس 3
  const renewButton3 = document.getElementById("renewService3");
  const cancelButton3 = document.getElementById("cancelService3");
  renewButton3.addEventListener("click", () => {
    document.getElementById("renew-modal").style.display = "flex";
    // کدهای مربوط به تمدید سرویس در باکس 3
  });
  cancelButton3.addEventListener("click", () => {
    document.getElementById("cancel-modal").style.display = "flex";
    // کدهای مربوط به لغو سرویس در باکس 3
  });

  // باکس 4
  const renewButton4 = document.getElementById("renewService4");
  const cancelButton4 = document.getElementById("cancelService4");
  renewButton4.addEventListener("click", () => {
    document.getElementById("renew-modal").style.display = "flex";
    // کدهای مربوط به تمدید سرویس در باکس 4
  });
  cancelButton4.addEventListener("click", () => {
    document.getElementById("cancel-modal").style.display = "flex";
    // کدهای مربوط به لغو سرویس در باکس 4
  });

  // باکس 5
  const renewButton5 = document.getElementById("renewService5");
  const cancelButton5 = document.getElementById("cancelService5");
  renewButton5.addEventListener("click", () => {
    document.getElementById("renew-modal").style.display = "flex";
    // کدهای مربوط به تمدید سرویس در باکس 5
  });
  cancelButton5.addEventListener("click", () => {
    document.getElementById("cancel-modal").style.display = "flex";
    // کدهای مربوط به لغو سرویس در باکس 5
  });

  // ... (کدهای قبلی مربوط به modal) ...
});
$(document).ready(function () {
  $(".persian-date").persianDatepicker({
    format: "YYYY/MM/DD",
    initialValue: false,
    calendar: {
      persian: {
        locale: "fa",
      },
    },
  });
});
