import React, { useState, useRef } from "react";
import "./tools4.css";

const Tools4 = () => {
  // Sidebar state
  const [sidebarMini, setSidebarMini] = useState(true);
  // Search box state
  const [searchActive, setSearchActive] = useState(false);
  // Exit modal state
  const [exitModalOpen, setExitModalOpen] = useState(false);
  // Notification popup state
  const [notificationActive, setNotificationActive] = useState(false);
  // رخداد زیرمنو
  const [rokhdadSubmenu, setRokhdadSubmenu] = useState(false);
  // Dropdown قوانین
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // محدودیت نوع
  const [expireType, setExpireType] = useState("مجاز");
  // دامنه و یادداشت
  const [domain, setDomain] = useState("");
  const [note, setNote] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

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
  const handleExitClick = () => setExitModalOpen(true);
  const handleExitConfirm = () => {
    window.location.href = "https://";
  };
  const handleExitCancel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setExitModalOpen(false);
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

  // نوع محدودیت
  const handleExpireType = (type) => {
    setExpireType(type);
  };

  // Add notification component
  const Notification = ({ message, onClose }) => (
    <div
      className="notification"
      style={{ display: message ? "block" : "none" }}
    >
      <div className="notification-content">
        <p>{message}</p>
        <button onClick={onClose}>×</button>
      </div>
    </div>
  );

  // Handle form submission
  const handleSubmit = () => {
    if (!domain || !note) {
      setNotificationMessage("لطفا تمام فیلدها را پر کنید");
      setShowNotification(true);
      return;
    }

    // Get existing data from localStorage
    const tableData = JSON.parse(
      localStorage.getItem("domainTableData") || "[]"
    );

    // Add new row
    const newRow = {
      id: Date.now(),
      domain: domain,
      type: expireType,
      note: note,
      checked: false,
    };

    // Update localStorage
    const updatedData = [...tableData, newRow];
    localStorage.setItem("domainTableData", JSON.stringify(updatedData));

    // Reset form
    setDomain("");
    setNote("");
    setExpireType("مجاز");
    setNotificationMessage("اطلاعات با موفقیت ثبت شد");
    setShowNotification(true);

    // Redirect to tools45 page after a short delay
    setTimeout(() => {
      window.location.href = "/tools45";
    }, 1000);
  };

  // Handle cancel
  const handleCancel = () => {
    setDomain("");
    setNote("");
    setExpireType("مجاز");
    window.location.href = "/tools45";
  };

  return (
    <div className="Main">
      <div
        id="mySidebar"
        className="sidebar"
        style={{ width: sidebarMini ? "66px" : "200px" }}
        onMouseEnter={() => setSidebarMini(false)}
        onMouseLeave={() => setSidebarMini(true)}
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
                {exitModalOpen && (
                  <div
                    className="modal"
                    style={{ display: "flex" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div
                      id="modal-content"
                      onClick={(e) => e.stopPropagation()}
                    >
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
            <div className="left-area__2nd__part1">
              <div className="left-area__2nd__part11">
                <h3 className="left-area__2nd__part11__text">آدرس دامنه</h3>
                <div className="left-area__2nd__part11__box">
                  <input
                    type="text"
                    id="customerName"
                    className="box__right__input"
                    placeholder="دامنه"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="left-area__2nd__part2">
              <div className="left-area__2nd__part21">
                <h3 className="left-area__2nd__part21__text">یادداشت</h3>
                <div className="left-area__2nd__part21__box">
                  <input
                    type="text"
                    id="customerNote"
                    className="box__right__input"
                    placeholder=""
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="left-area__2nd__part3">
              <h3 className="left-area__2nd__part3__text">نوع محدودیت</h3>
              <div className="left-area__2nd__part3__box">
                <label className="checkbox-label">
                  <input
                    type="radio"
                    name="expire"
                    checked={expireType === "مجاز"}
                    className="custom-checkbox"
                    onChange={() => handleExpireType("مجاز")}
                  />
                  <span className="checkbox-text">مجاز</span>
                </label>
              </div>
              <div className="left-area__2nd__part3__box">
                <label className="checkbox-label">
                  <input
                    type="radio"
                    name="expire"
                    checked={expireType === "غیر مجاز"}
                    className="custom-checkbox"
                    onChange={() => handleExpireType("غیر مجاز")}
                  />
                  <span className="checkbox-text">غیر مجاز</span>
                </label>
              </div>
              <div className="left-area__2nd__part3__box">
                <label className="checkbox-label">
                  <input
                    type="radio"
                    name="expire"
                    checked={expireType === "مشکوک"}
                    className="custom-checkbox"
                    onChange={() => handleExpireType("مشکوک")}
                  />
                  <span className="checkbox-text">مشکوک</span>
                </label>
              </div>
            </div>
            <div className="left-area__2nd__part4">
              <button
                className="left-area__2nd__part4__button"
                onClick={handleCancel}
              >
                انصراف
              </button>
              <button
                className="left-area__2nd__part4__button"
                onClick={handleSubmit}
              >
                تایید
              </button>
            </div>
          </div>
          <Notification
            message={notificationMessage}
            onClose={() => setShowNotification(false)}
          />
        </section>
      </div>
    </div>
  );
};

export default Tools4;
