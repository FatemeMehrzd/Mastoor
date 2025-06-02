import React, { useState, useEffect } from "react";
import "./tools75.css";
import * as XLSX from "xlsx";

const Tools75 = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [showRokhdadSubmenu, setShowRokhdadSubmenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Prevent page scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Sidebar hover logic
  const handleSidebarMouseEnter = () => setIsSidebarExpanded(true);
  const handleSidebarMouseLeave = () => setIsSidebarExpanded(false);

  // Search box
  const handleSearchClick = () => setSearchActive((prev) => !prev);

  // Exit modal
  const handleExitClick = () => setShowExitModal(true);
  const handleConfirmExit = () => (window.location.href = "https://");
  const handleCancelExit = () => setShowExitModal(false);

  // Notification popup
  const handleNotificationClick = (e) => {
    e.stopPropagation();
    setShowNotificationPopup((prev) => !prev);
  };
  useEffect(() => {
    const closePopup = () => setShowNotificationPopup(false);
    document.addEventListener("click", closePopup);
    return () => document.removeEventListener("click", closePopup);
  }, []);

  // Rokhdad submenu
  const handleRokhdadClick = (e) => {
    e.preventDefault();
    setShowRokhdadSubmenu((prev) => !prev);
  };

  // Dropdown
  const handleDropdownToggle = () => setShowDropdown((prev) => !prev);

  // Table export
  const exportTableToExcel = (tableID, filename = "data.xlsx") => {
    const table = document.getElementById(tableID);
    const workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
    XLSX.writeFile(workbook, filename);
  };

  return (
    <div className="Main">
      <div
        id="mySidebar"
        className={`sidebar${isSidebarExpanded ? " expanded" : " collapsed"}`}
        onMouseEnter={handleSidebarMouseEnter}
        onMouseLeave={handleSidebarMouseLeave}
      >
        <a href="#">
          <span title="خانه">
            <div className="icon1">
              <img src="/home.png" alt="خانه" className="material-icons" />
            </div>
          </span>
          <span className="icon-text">خانه</span>
        </a>
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
        {showRokhdadSubmenu && (
          <div className="submenu" id="rokhdad-submenu">
            <a href="ss5.html" className="submenu-item" data-type="خطاها">
              <span className="circle"></span> خطاها
            </a>
            <a
              href="ss51.html"
              className="submenu-item"
              data-type="ترافیک سیستم"
            >
              <span className="circle"></span> ترافیک سیستم
            </a>
            <a href="ss52.html" className="submenu-item" data-type="امنیتی">
              <span className="circle"></span> امنیتی
            </a>
          </div>
        )}
      </div>
      <div id="main" className={isSidebarExpanded ? "expanded" : "collapsed"}>
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
                <form id="form">
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
                </span>
                {showExitModal && (
                  <div
                    id="exit-modal"
                    className="modal"
                    style={{ display: "flex" }}
                  >
                    <div id="modal-content">
                      <p>آیا مطمئن هستید که می‌خواهید خارج شوید؟</p>
                      <button id="confirm-exit" onClick={handleConfirmExit}>
                        بله
                      </button>
                      <button id="cancel-exit" onClick={handleCancelExit}>
                        خیر
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="b122" onClick={handleNotificationClick}>
                <span title="اعلان ها">
                  <img src="/notifications.png" alt="اعلان ها" />
                </span>
                {showNotificationPopup && (
                  <div
                    id="notification-popup"
                    className="notification-modal active"
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
                )}
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
                <div className="dropdown">
                  <button className="dropbtn" onClick={handleDropdownToggle}>
                    <span className="arrow"></span>
                    کلیک کنید
                  </button>
                  {showDropdown && (
                    <div className="dropdown-content" id="dropdownMenu">
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        لیست قوانین
                      </a>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        قوانین در حال اجرا
                      </a>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        ایجاد قوانین جدید
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="left-area-2nd">
              <div className="exit__button">
                <button
                  className="exit__buttonn"
                  onClick={() => exportTableToExcel("table")}
                >
                  گزارش
                  <img src="/output1.png" alt="گزارش" />
                </button>
              </div>
              <div className="table-container">
                <table id="table">
                  <thead>
                    <tr className="oneline">
                      <th>شماره</th>
                      <th>نام قانون</th>
                      <th>نوع</th>
                      <th>توضیحات</th>
                      <th>وضعیت</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(14)].map((_, index) => (
                      <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <img
                            src="/true.png"
                            className="table__image"
                            alt="وضعیت"
                          />
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
    </div>
  );
};

export default Tools75;
