import React, { useState, useRef } from "react";
import "./tools.css";

const Tools = () => {
  const [sidebarMini, setSidebarMini] = useState(true);
  const [searchActive, setSearchActive] = useState(false);
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [rokhdadSubmenuOpen, setRokhdadSubmenuOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleSidebarOpen = () => setSidebarMini(false);
  const handleSidebarClose = () => setSidebarMini(true);

  const handleSearchToggle = () => {
    setSearchActive((prev) => !prev);
  };

  const handleExitClick = () => {
    setExitModalOpen(true);
  };

  const handleExitConfirm = () => {
    console.log("User confirmed exit");
    setExitModalOpen(false);
  };

  const handleExitCancel = () => {
    setExitModalOpen(false);
  };

  const handleNotificationToggle = (e) => {
    e.stopPropagation();
    setNotificationOpen((prev) => !prev);
  };

  const handleRokhdadClick = (e) => {
    e.preventDefault();
    setRokhdadSubmenuOpen((prev) => !prev);
  };

  const handleSubmenuItemClick = (type) => {
    // You can add logic for submenu item click here
    console.log(`زیرمنوی ${type} انتخاب شد.`);
    setRokhdadSubmenuOpen(false);
  };

  React.useEffect(() => {
    if (notificationOpen) {
      const close = () => setNotificationOpen(false);
      document.addEventListener("click", close);
      return () => document.removeEventListener("click", close);
    }
  }, [notificationOpen]);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (exitModalOpen && event.target.className === "modal") {
        setExitModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [exitModalOpen]);

  return (
    <div className="Main">
      <div
        id="mySidebar"
        className={`sidebar${sidebarMini ? " sidebar-collapsed" : ""}`}
        onMouseEnter={handleSidebarOpen}
        onMouseLeave={handleSidebarClose}
        ref={sidebarRef}
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
          style={{ display: rokhdadSubmenuOpen ? "block" : "none" }}
        >
          <a
            href="ss5.html"
            className="submenu-item"
            data-type="خطاها"
            onClick={() => handleSubmenuItemClick("خطاها")}
          >
            <span className="circle"></span> خطاها
          </a>
          <a
            href="ss51.html"
            className="submenu-item"
            data-type="ترافیک سیستم"
            onClick={() => handleSubmenuItemClick("ترافیک سیستم")}
          >
            <span className="circle"></span> ترافیک سیستم
          </a>
          <a
            href="ss52.html"
            className="submenu-item"
            data-type="امنیتی"
            onClick={() => handleSubmenuItemClick("امنیتی")}
          >
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
              <div className="b111" onClick={handleSearchToggle}>
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
            </div>
            {exitModalOpen && (
              <div className="modal" style={{ display: "flex" }}>
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
            <div className="b122" onClick={handleNotificationToggle}>
              <span title="اعلان ها">
                <img src="/notifications.png" alt="اعلان ها" />
                <div
                  id="notification-popup"
                  className={`notification-modal${
                    notificationOpen ? " active" : ""
                  }`}
                  onClick={(e) => e.stopPropagation()}
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
          <div className="left-area__box">
            <h3 className="left-area__text">محدودیت IP</h3>
            <button className="left-area__button">کلیک کنید</button>
          </div>
          <div className="left-area__box">
            <h3 className="left-area__text">مشاهده لیست سیاه</h3>
            <button className="left-area__button">کلیک کنید</button>
          </div>
          <div className="left-area__box">
            <h3 className="left-area__text">محدودیت لینک ها</h3>
            <button className="left-area__button">کلیک کنید</button>
          </div>
          <div className="left-area__box">
            <h3 className="left-area__text">مدیریت دسترسی</h3>
            <button className="left-area__button">کلیک کنید</button>
          </div>
          <div className="left-area__box">
            <h3 className="left-area__text">مدیریت فایل ها</h3>
            <button className="left-area__button">کلیک کنید</button>
          </div>
          <div className="left-area__box">
            <h3 className="left-area__text">قوانین</h3>
            <button className="left-area__button">کلیک کنید</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Tools;
