import React, { useState, useEffect } from "react";
import "./tools3.css";
import * as XLSX from "xlsx";

const initialTableData = [
  {
    ip: "92.188.123.08",
    blockTime: "1402.06.25\n16:29:01",
    expire: "برای همیشه",
    location: "آلمان",
    user: "ادمین",
  },
  {
    ip: "90.123.123.08",
    blockTime: "1402.06.25\n16:29:01",
    expire: "برای همیشه",
    location: "امارات",
    user: "ادمین",
  },
  {
    ip: "92.188.123.08",
    blockTime: "1402.06.25\n16:29:01",
    expire: "برای همیشه",
    location: "ایران",
    user: "ادمین",
  },
  {
    ip: "92.18.12.28",
    blockTime: "1402.06.25\n16:29:01",
    expire: "برای همیشه",
    location: "روسیه",
    user: "ادمین",
  },
  {
    ip: "93.185.12.18",
    blockTime: "1402.06.25\n16:29:01",
    expire: "برای همیشه",
    location: "کانادا",
    user: "ادمین",
  },
  {
    ip: "92.180.123.08",
    blockTime: "1402.06.25\n16:29:01",
    expire: "برای همیشه",
    location: "آمریکا",
    user: "ادمین",
  },
];

const Tools3 = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [showRokhdadSubmenu, setShowRokhdadSubmenu] = useState(false);
  const [showDropdownn, setShowDropdownn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [tableData] = useState(initialTableData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [popupList] = useState(["", "", "", "", "", "", ""]);
  const [expireType, setExpireType] = useState("forever");
  const [expireDays, setExpireDays] = useState("");
  const [checkboxValue, setCheckboxValue] = useState(false);

  // Prevent page scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Sidebar hover logic
  const handleSidebarMouseEnter = () => {
    setIsSidebarExpanded(true);
  };

  const handleSidebarMouseLeave = () => {
    setIsSidebarExpanded(false);
  };

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

  // Dropdownn (قوانین)
  const handleDropdownnToggle = (e) => {
    e.stopPropagation();
    setShowDropdownn((prev) => !prev);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".dropdownn") &&
        !event.target.closest(".dropbtnn")
      ) {
        setShowDropdownn(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Dropdown (ایجاد کردن)
  const handleDropdownToggle = (e) => {
    e.stopPropagation();
    setShowDropdown((prev) => !prev);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".dropdown") &&
        !event.target.closest(".dropbtn")
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Popup
  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  // Pagination
  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const paginatedData = tableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handlePageChange = (page) => setCurrentPage(page);
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handleRefresh = () => {
    // Refresh logic here (e.g., fetch data)
    alert("اطلاعات به‌روزرسانی شد!");
  };

  // Excel export
  const exportTableToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      tableData.map((row) => ({
        "آدرس آیپی های مسدود شده": row.ip,
        "زمان مسدود شده": row.blockTime,
        "زمان انقضا": row.expire,
        مکان: row.location,
        کاربر: row.user,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "table.xlsx");
  };

  // Popup form handlers
  const handleExpireTypeChange = (e) => setExpireType(e.target.value);
  const handleExpireDaysChange = (e) => setExpireDays(e.target.value);
  const handleCheckboxChange = (e) => setCheckboxValue(e.target.checked);

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
                <div className="dropdownn">
                  <button className="dropbtnn" onClick={handleDropdownnToggle}>
                    <span className="arrow"></span>
                    کلیک کنید
                  </button>
                  {showDropdownn && (
                    <div
                      className="dropdownn-content"
                      id="dropdownnMenu"
                      style={{ display: "block" }}
                    >
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
            <section className="black-list">
              <div className="header">
                <h3 className="header-text">لیست سیاه</h3>
              </div>
              <div className="second">
                <div className="second--Rbox">
                  <div className="dropdown">
                    <button className="dropbtn" onClick={handleDropdownToggle}>
                      ایجاد کردن
                      <div className="separator"></div>
                      <span className="arrow">▼</span>
                    </button>
                    {showDropdown && (
                      <div
                        className="dropdown-content"
                        id="dropdownMenu"
                        style={{ display: "block" }}
                      >
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            openPopup();
                          }}
                        >
                          ایجاد آدرس جدید
                        </a>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            openPopup();
                          }}
                        >
                          اضافه کردن آیپی
                        </a>
                      </div>
                    )}
                  </div>
                  <div
                    id="popup"
                    className="popup"
                    style={{ display: showPopup ? "block" : "none" }}
                  >
                    <div className="popup-content">
                      <div className="modal-content__header">
                        <h2 className="modal-content__header-text">
                          اضافه کردن لیست آدرس آیپی
                        </h2>
                        <div className="modal-content__header-button">
                          <span title="بسته شدن پنجره">
                            <span className="close" onClick={closePopup}>
                              &times;
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="popup-content__2nd">
                        <h2 className="expired-date">زمان انقضا</h2>
                        <div className="popup-content__2nd__input">
                          <label>
                            <input
                              type="radio"
                              name="expire"
                              value="forever"
                              checked={expireType === "forever"}
                              onChange={handleExpireTypeChange}
                            />{" "}
                            برای همیشه
                          </label>
                        </div>
                        <div className="popup-content__2nd__input">
                          <label>
                            <input
                              type="radio"
                              name="expire"
                              value="days"
                              checked={expireType === "days"}
                              onChange={handleExpireTypeChange}
                            />{" "}
                            رفع انسداد (روزها)
                          </label>
                          <input
                            type="text"
                            placeholder="مدت زمان رفع انسداد"
                            value={expireDays}
                            onChange={handleExpireDaysChange}
                            disabled={expireType !== "days"}
                          />
                        </div>
                        <div className="popup-content__check-box ">
                          <label>
                            <input
                              type="checkbox"
                              checked={checkboxValue}
                              onChange={handleCheckboxChange}
                            />
                            آدرس آیپی موجود را در لیست ،مسدود و لیست مجاز را باز
                            نویسی کنید.
                          </label>
                        </div>
                      </div>
                      <div className="popup-content__3rd">
                        <h3 className="popup-content__3rd__text">فایل:</h3>
                        <div className="popup-content__3rd__button">
                          <div className="popup-wrapper">
                            <div className="popup-content__3rd__button">
                              <input
                                type="file"
                                className="browse-input"
                                id="upload--btn"
                              />
                              <label
                                htmlFor="upload--btn"
                                className="upload-label"
                              >
                                ایجاد فایل
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="popup-content__4th">
                        <h3 className="popup-content__4th__text">
                          آدرس آیپی‌های مسدود شده
                        </h3>
                        <div className="popup-list">
                          <ul>
                            {popupList.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="popup-content__5th">
                        <span title="بسته شدن">
                          <button onClick={closePopup}>بستن</button>
                        </span>
                        <span title="تایید کردن">
                          <button onClick={closePopup}>تایید</button>
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="second--Rbox___Lbutton">گزارش گیری</button>
                </div>
                <div className="second--Lbox">
                  <button
                    className="second--Lbox__button"
                    onClick={exportTableToExcel}
                  >
                    <img src="/output1.png" alt="" />
                    خروجی
                  </button>
                </div>
              </div>
              <div className="table" id="table">
                <div className="table-container">
                  <table>
                    <thead>
                      <tr className="oneline">
                        <th>آدرس آیپی های مسدود شده</th>
                        <th>زمان مسدود شده</th>
                        <th>زمان انقضا</th>
                        <th>مکان</th>
                        <th>کاربر</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.map((row, idx) => (
                        <tr key={idx}>
                          <td>{row.ip}</td>
                          <td>
                            {row.blockTime.split("\n").map((line, i) => (
                              <div key={i}>{line}</div>
                            ))}
                          </td>
                          <td>{row.expire}</td>
                          <td>{row.location}</td>
                          <td>{row.user}</td>
                          <td>
                            <span title="تایید کردن">
                              <button
                                style={{ background: "none", border: "none" }}
                              >
                                <img src="/Ok.png" alt="" />
                              </button>
                            </span>
                            <span title="حذف کردن">
                              <button
                                style={{ background: "none", border: "none" }}
                              >
                                <img src="/trash.png" alt="" />
                              </button>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="b4th" id="pagination">
                <div className="items-per-page">
                  <span title="تازه سازی">
                    <span className="refresh-icon" onClick={handleRefresh}>
                      ↻
                    </span>
                  </span>
                  <span className="items-count">{tableData.length} مورد</span>
                </div>
                <div className="pagination-container">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      className={`pagination-button${
                        currentPage === i + 1 ? " active" : ""
                      }`}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                  {currentPage < totalPages && (
                    <button
                      className="pagination-button"
                      onClick={handleNextPage}
                    >
                      بعدی &gt;&gt;
                    </button>
                  )}
                </div>
                <button className="b4th-button">
                  <h3>بستن</h3>
                </button>
              </div>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Tools3;
