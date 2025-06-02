import React, { useState, useRef, useEffect } from "react";
import "./tools2.css";

const Tools2 = () => {
  // Sidebar state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  // Search box
  const [searchActive, setSearchActive] = useState(false);
  // Exit modal
  const [exitModalOpen, setExitModalOpen] = useState(false);
  // Notification
  const [notificationOpen, setNotificationOpen] = useState(false);
  // Rokhdad submenu
  const [rokhdadSubmenuOpen, setRokhdadSubmenuOpen] = useState(false);
  // Dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Add new state for form fields
  const [formData, setFormData] = useState({
    ipRange1: "",
    ipRange2: "",
    restrictionType: "",
    port: "",
  });

  // Add notification state
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  // Sidebar hover handlers
  const handleSidebarMouseEnter = () => setSidebarCollapsed(false);
  const handleSidebarMouseLeave = () => setSidebarCollapsed(true);

  // Search
  const handleSearchToggle = () => setSearchActive((prev) => !prev);

  // Exit modal
  const handleExitClick = () => setExitModalOpen(true);
  const handleExitConfirm = () => {
    window.location.href = "https://";
  };
  const handleExitCancel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setExitModalOpen(false);
  };

  // Close modal when clicking outside
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

  // Notification
  const handleNotificationToggle = (e) => {
    e.stopPropagation();
    setNotificationOpen((prev) => !prev);
  };
  useEffect(() => {
    if (notificationOpen) {
      const close = () => setNotificationOpen(false);
      document.addEventListener("click", close);
      return () => document.removeEventListener("click", close);
    }
  }, [notificationOpen]);

  // Rokhdad submenu
  const handleRokhdadClick = (e) => {
    e.preventDefault();
    setRokhdadSubmenuOpen((prev) => !prev);
  };
  const handleSubmenuItemClick = (type) => {
    // نمایش محتوای هر زیرمنو
    setRokhdadSubmenuOpen(false);
  };

  // Dropdown
  const handleDropdownToggle = (e) => {
    e.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };
  useEffect(() => {
    if (dropdownOpen) {
      const close = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setDropdownOpen(false);
        }
      };
      document.addEventListener("click", close);
      return () => document.removeEventListener("click", close);
    }
  }, [dropdownOpen]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to show notification
  const showNotificationMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  // Handle form submission
  const handleSubmit = () => {
    // Validate form fields
    if (
      !formData.ipRange1 ||
      !formData.ipRange2 ||
      !formData.restrictionType ||
      !formData.port
    ) {
      showNotificationMessage("لطفا تمام فیلدها را پر کنید");
      return;
    }

    // Validate IP format (basic validation)
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipRegex.test(formData.ipRange1) || !ipRegex.test(formData.ipRange2)) {
      showNotificationMessage(
        "لطفا فرمت IP را به درستی وارد کنید (مثال: 192.168.1.1)"
      );
      return;
    }

    // Validate port number
    const port = parseInt(formData.port);
    if (isNaN(port) || port < 1 || port > 65535) {
      showNotificationMessage("لطفا یک پورت معتبر وارد کنید (1-65535)");
      return;
    }

    // Get the table data from localStorage or pass it through props
    const tableData = JSON.parse(localStorage.getItem("tableData") || "[]");

    // Add new row with form data
    const newRow = {
      name: (tableData.length + 1).toString(),
      range: `${formData.ipRange1} - ${formData.ipRange2}`,
      type: formData.restrictionType,
      port: formData.port,
    };

    // Update table data
    const updatedData = [...tableData, newRow];
    localStorage.setItem("tableData", JSON.stringify(updatedData));

    // Show success notification
    showNotificationMessage("اطلاعات با موفقیت ثبت شد");

    // Clear form
    setFormData({
      ipRange1: "",
      ipRange2: "",
      restrictionType: "",
      port: "",
    });

    // Redirect to tools1 page after a short delay
    setTimeout(() => {
      window.location.href = "/tools1";
    }, 1000);
  };

  return (
    <div className="Main">
      <div
        id="mySidebar"
        className={`sidebar${sidebarCollapsed ? " sidebar-collapsed" : ""}`}
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
            href="#"
            className="submenu-item"
            data-type="خطاها"
            onClick={() => handleSubmenuItemClick("خطاها")}
          >
            <span className="circle"></span> خطاها
          </a>
          <a
            href="#"
            className="submenu-item"
            data-type="ترافیک سیستم"
            onClick={() => handleSubmenuItemClick("ترافیک سیستم")}
          >
            <span className="circle"></span> ترافیک سیستم
          </a>
          <a
            href="#"
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
              </span>
            </div>
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
              </div>
            </div>
          </div>
          <div className="left-area__2nd">
            <div className="left-area__2nd__part1">
              <div className="left-area__2nd__part11">
                <h3 className="left-area__2nd__part11__text">اسم آیپی</h3>
                <div className="left-area__2nd__part11__box">
                  <input
                    type="text"
                    className="box__right__input"
                    placeholder="هاست"
                  />
                </div>
              </div>
              <div className="left-area__2nd__part12">
                <button className="left-area__2nd__part11__button">
                  <a href="ss41.html">انصراف</a>
                </button>
                <button
                  className="left-area__2nd__part11__button"
                  onClick={handleSubmit}
                >
                  تایید
                </button>
              </div>
            </div>
            <div className="left-area__2nd__part2">
              <div className="left-area__2nd__part21">
                <h3 className="left-area__2nd__part21__text">یادداشت</h3>
                <div className="left-area__2nd__part21__box">
                  <input
                    type="text"
                    className="box__right__input"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <div className="left-area__2nd__part3">
              <h3 className="left-area__2nd__part3__text">نوع محدودیت</h3>
              <div className="left-area__2nd__part3__box">
                <input
                  type="text"
                  className="box__right__input"
                  placeholder=""
                  name="restrictionType"
                  value={formData.restrictionType}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="left-area__2nd__part4">
              <h3 className="left-area__2nd__part4__text">پورت</h3>
              <div className="left-area__2nd__part4__box">
                <input
                  type="number"
                  className="box__right__input"
                  placeholder=""
                  name="port"
                  value={formData.port}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="left-area__2nd__part5">
              <h3 className="left-area__2nd__part5__text">محدوده آیپی خارجی</h3>
              <div className="left-area__2nd__part5__box">
                <input
                  type="text"
                  className="box__right__input"
                  placeholder=""
                  name="ipRange1"
                  value={formData.ipRange1}
                  onChange={handleInputChange}
                />
              </div>
              <div className="left-area__2nd__part5__box">
                <input
                  type="text"
                  className="box__right__input"
                  placeholder=""
                  name="ipRange2"
                  value={formData.ipRange2}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Add notification component */}
      {showNotification && (
        <div
          className="notification-modal active"
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 1000,
            backgroundColor: "#9351cc",
            borderRadius: "10px",
            padding: "15px 25px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div className="notification-content">
            <p
              style={{
                fontFamily: "dana",
                color: "white",
                margin: 0,
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              {notificationMessage}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tools2;
