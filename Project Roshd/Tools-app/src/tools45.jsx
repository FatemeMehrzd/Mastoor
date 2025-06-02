import React, { useState, useRef } from "react";
import "./tools45.css";
import * as XLSX from "xlsx";

const Tools45 = () => {
  // Sidebar state
  const [sidebarMini, setSidebarMini] = useState(true);
  // Search box state
  const [searchActive, setSearchActive] = useState(false);
  // Exit modal state
  const [exitModal, setExitModal] = useState(false);
  // Notification popup state
  const [notificationActive, setNotificationActive] = useState(false);
  // رخداد زیرمنو
  const [rokhdadSubmenu, setRokhdadSubmenu] = useState(false);
  // Dropdown قوانین
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // جستجو جدول
  const [tableSearch, setTableSearch] = useState("");
  // داده جدول (نمونه اولیه)
  const [tableData, setTableData] = useState([
    { id: 1, domain: "", type: "", checked: false },
    { id: 2, domain: "", type: "", checked: false },
    { id: 3, domain: "", type: "", checked: false },
    { id: 4, domain: "", type: "", checked: false },
    { id: 5, domain: "", type: "", checked: false },
    { id: 6, domain: "", type: "", checked: false },
    { id: 7, domain: "", type: "", checked: false },
    { id: 8, domain: "", type: "", checked: false },
    { id: 9, domain: "", type: "", checked: false },
    { id: 10, domain: "", type: "", checked: false },
    { id: 11, domain: "", type: "", checked: false },
    { id: 12, domain: "", type: "", checked: false },
    { id: 13, domain: "", type: "", checked: false },
    { id: 14, domain: "", type: "", checked: false },
  ]);

  // برای بستن dropdown با کلیک بیرون
  const dropdownRef = useRef(null);
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // بستن notification با کلیک بیرون
  const notificationRef = useRef(null);
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationActive(false);
      }
    };
    if (notificationActive) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationActive]);

  // رخداد زیرمنو toggle
  const handleRokhdadClick = (e) => {
    e.preventDefault();
    setRokhdadSubmenu((prev) => !prev);
  };

  // جستجو toggle
  const handleSearchClick = () => {
    setSearchActive((prev) => !prev);
  };

  // خروج modal
  const handleExitClick = () => {
    setExitModal(true);
  };
  const handleExitConfirm = () => {
    setExitModal(false);
    window.location.href = "https://";
  };
  const handleExitCancel = () => {
    setExitModal(false);
  };

  // اعلان ها
  const handleNotificationClick = (e) => {
    e.stopPropagation();
    setNotificationActive((prev) => !prev);
  };

  // قوانین dropdown
  const handleDropdownToggle = (e) => {
    e.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };

  // سایدبار
  const handleSidebarEnter = () => setSidebarMini(false);
  const handleSidebarLeave = () => setSidebarMini(true);

  // جستجو جدول
  const handleTableSearch = (e) => {
    setTableSearch(e.target.value);
  };

  // فیلتر داده جدول بر اساس جستجو
  const filteredTableData = tableData.filter((row) =>
    row.domain.includes(tableSearch)
  );

  // تغییر وضعیت چک‌باکس جدول
  const handleCheckboxChange = (id) => {
    setTableData((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, checked: !row.checked } : row
      )
    );
  };

  // خروجی اکسل
  const exportTableToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredTableData.map((row) => ({
        ردیف: row.id,
        دامنه: row.domain,
        نوع: row.type,
        انتخاب: row.checked ? "✔" : "",
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "data.xlsx");
  };

  return (
    <div className="Main">
      <div
        id="mySidebar"
        className="sidebar"
        style={{ width: sidebarMini ? "66px" : "200px" }}
        onMouseEnter={handleSidebarEnter}
        onMouseLeave={handleSidebarLeave}
      >
        <a href="#">
          <span title="خانه">
            <div className="icon1">
              <img src="/home.png" alt="خانه" className="material-icons" />
            </div>
          </span>
          <span className="icon-text">خانه</span>
        </a>
        <br />
        <a href="#">
          <span title="مدیریت هاست">
            <div className="icon1">
              <img
                src="/Host.png"
                alt="مدیریت هاست"
                className="material-icons"
              />
            </div>
          </span>
          <span className="icon-text">مدیریت هاست</span>
        </a>
        <br />
        <a href="#">
          <span title="ابزارها">
            <div className="icon1">
              <img
                src="/setting.png"
                alt="ابزارها"
                className="material-icons"
              />
            </div>
          </span>
          <span className="icon-text">ابزار ها</span>
        </a>
        <br />
        <a href="#" id="rokhdad-link" onClick={handleRokhdadClick}>
          <span title="رخدادها">
            <div className="icon1">
              <img
                src="/rokhdad.png"
                alt="رخدادها"
                className="material-icons"
              />
            </div>
          </span>
          <span className="icon-text">رخدادها</span>
        </a>
        <div
          className="submenu"
          id="rokhdad-submenu"
          style={{ display: rokhdadSubmenu ? "block" : "none" }}
        >
          <a href="ss5.html" className="submenu-item" data-type="خطاها">
            <span className="circle"></span> خطاها
          </a>
          <a href="ss51.html" className="submenu-item" data-type="ترافیک سیستم">
            <span className="circle"></span> ترافیک سیستم
          </a>
          <a href="ss52.html" className="submenu-item" data-type="امنیتی">
            <span className="circle"></span> امنیتی
          </a>
        </div>
      </div>
      <div id="main"></div>
      <div className="right5"></div>
      <div className="right6"></div>
      <div className="left">
        <div className="b1">
          <div className="b11">
            <span title="جستجو کردن">
              <div className="b111" onClick={handleSearchClick}>
                <img src="/search.png" alt="جستجو" />
              </div>
            </span>
            <div className={`b112${searchActive ? " active" : ""}`}>
              <form id="form" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="search"
                  id="query"
                  name="q"
                  placeholder="جستجو کن...."
                />
              </form>
            </div>
          </div>
          <div className="b12">
            <div className="b121" onClick={handleExitClick}>
              <span title="خروج">
                <img src="/exit.png" alt="خروج" />
                {exitModal && (
                  <div
                    id="exit-modal"
                    className="modal"
                    style={{ display: "flex" }}
                  >
                    <div id="modal-content">
                      <p>آیا مطمئن هستید که می‌خواهید خارج شوید؟</p>
                      <button id="confirm-exit" onClick={handleExitConfirm}>
                        بله
                      </button>
                      <button id="cancel-exit" onClick={handleExitCancel}>
                        خیر
                      </button>
                    </div>
                  </div>
                )}
              </span>
            </div>
            <div
              className="b122"
              onClick={handleNotificationClick}
              ref={notificationRef}
            >
              <span title="اعلان ها">
                <img src="/notifications.png" alt="اعلان ها" />
                <div
                  id="notification-popup"
                  className={`notification-modal${
                    notificationActive ? " active" : ""
                  }`}
                >
                  <div className="notification-content">
                    <h3>اعلان‌ها</h3>
                    <ul id="notifications-list">
                      <li>اعلان شماره ۱</li>
                      <li>هاست شما تغییر کرد</li>
                      <li>اعلان شماره ۳</li>
                    </ul>
                  </div>
                </div>
              </span>
            </div>
          </div>
        </div>
        <section className="left-area">
          <div className="left-area__1st">
            <div className="left-area__1st-box">
              <h3 className="left-area__1st-text">محدودیت IP</h3>
              <div className="left-area__12st">
                <button className="left-area__1st-box__button">
                  کلیک کنید
                </button>
              </div>
            </div>
            <div className="left-area__1st-box">
              <h3 className="left-area__1st-text">مشاهده لیست سیاه</h3>
              <div className="left-area__12st">
                <button className="left-area__1st-box__button">
                  کلیک کنید
                </button>
              </div>
            </div>
            <div className="left-area__1st-box">
              <h3 className="left-area__1st-text">محدودیت لینک ها</h3>
              <div className="left-area__12st">
                <button className="left-area__1st-box__button">
                  کلیک کنید
                </button>
              </div>
            </div>
            <div className="left-area__1st-box">
              <h3 className="left-area__1st-text">مدیریت دسترسی</h3>
              <div className="left-area__12st">
                <button className="left-area__1st-box__button">
                  کلیک کنید
                </button>
              </div>
            </div>
            <div className="left-area__1st-box">
              <h3 className="left-area__1st-text">مدیریت فایل ها</h3>
              <div className="left-area__12st">
                <button className="left-area__1st-box__button">
                  کلیک کنید
                </button>
              </div>
            </div>
            <div className="left-area__1st-box">
              <h3 className="left-area__1st-text">قوانین</h3>
              <div className="dropdownn" ref={dropdownRef}>
                <button className="dropbtnn" onClick={handleDropdownToggle}>
                  <span className="arrow"></span>
                  کلیک کنید
                </button>
                <div
                  className="dropdownn-content"
                  id="dropdownnMenu"
                  style={{ display: dropdownOpen ? "block" : "none" }}
                >
                  <a href="#" onClick={() => alert("لیست قوانین")}>
                    لیست قوانین
                  </a>
                  <a href="#" onClick={() => alert("قوانین در حال اجرا")}>
                    قوانین در حال اجرا
                  </a>
                  <a href="#" onClick={() => alert("ایجاد قوانین جدید")}>
                    ایجاد قوانین جدید
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="left-area__2nd">
            <div className="left-area__2nd__Rbox">
              <button className="left-area__2nd__Rbox__button1">
                <img
                  src="/Create.png"
                  alt="افزودن دامنه"
                  className="left-area__2nd__Rbox__button__img1"
                />
                افزودن دامنه
              </button>
              <button className="left-area__2nd__Rbox__button">
                <img
                  src="/Edit.png"
                  alt="ویرایش"
                  className="left-area__2nd__Rbox__button__img"
                />
                ویرایش
              </button>
              <button className="left-area__2nd__Rbox__button">
                <img
                  src="/Delete.png"
                  alt="حذف کردن"
                  className="left-area__2nd__Rbox__button__img"
                />
                حذف کردن
              </button>
            </div>
            <div className="left-area__2nd__Lbox">
              <div className="search-box">
                <input
                  type="text"
                  id="search-input"
                  placeholder="جستجو کن...."
                  value={tableSearch}
                  onChange={handleTableSearch}
                />
                <button id="search-btn">
                  <img src="/Search (2).png" alt="جستجو" />
                </button>
              </div>
              <button
                className="left-area__2nd__Lbox__button"
                onClick={exportTableToExcel}
              >
                <img
                  src="/Output.png"
                  alt="خروجی"
                  className="left-area__2nd__Lbox__button__img"
                />
                خروجی
              </button>
            </div>
          </div>
          <div className="left-area__3rd">
            <div className="table-container">
              <table id="table">
                <thead>
                  <tr className="oneline">
                    <th>نام</th>
                    <th>محدوده دامنه ها </th>
                    <th>نوع</th>
                    <th>انتخاب</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTableData.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>
                        <a href="#">{row.domain}</a>
                      </td>
                      <td>{row.type}</td>
                      <td>
                        <label className="checkbox">
                          <input
                            type="checkbox"
                            checked={row.checked}
                            onChange={() => handleCheckboxChange(row.id)}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Tools45;
