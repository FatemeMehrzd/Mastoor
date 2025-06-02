import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./host.css";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

function Host() {
  // State برای کنترل سایدبار و مودال‌ها و اعلان‌ها
  const [sidebarMini, setSidebarMini] = useState(true);
  const [searchActive, setSearchActive] = useState(false);
  const [exitModal, setExitModal] = useState(false);
  const [notificationActive, setNotificationActive] = useState(false);
  const [hostModal, setHostModal] = useState(false);
  const [hostModall, setHostModall] = useState(false);
  const [editHost, setEditHost] = useState(false);
  const [rokhdadOpen, setRokhdadOpen] = useState(false);

  // State for new host modal inputs
  const [siteName, setSiteName] = useState("");
  const [domain, setDomain] = useState("");
  const [ram, setRam] = useState("");
  const [cpu, setCpu] = useState("");
  const [traffic, setTraffic] = useState("");
  const [hostType, setHostType] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [serviceDate, setServiceDate] = useState(null);
  const [duration, setDuration] = useState("");

  // Add new state for hosts list
  const [hostsList, setHostsList] = useState([]);

  // توابع کنترل سایدبار
  const toggleSidebar = () => {
    setSidebarMini((prev) => !prev);
  };

  // توابع کنترل مودال‌ها و اعلان‌ها
  const openModal = () => setHostModal(true);
  const closeModal = () => setHostModal(false);
  const openModall = () => setHostModall(true);
  const closeModall = () => setHostModall(false);
  const openModalll = () => setEditHost(true);
  const closeModalll = () => setEditHost(false);

  // کنترل مودال خروج
  const handleExit = () => setExitModal(true);
  const handleConfirmExit = () => {
    window.location.href = "https://";
  };
  const handleCancelExit = () => {
    setExitModal(false);
  };

  // کنترل اعلان
  const handleNotification = (e) => {
    e.stopPropagation();
    setNotificationActive((prev) => !prev);
  };

  // بستن اعلان با کلیک بیرون
  React.useEffect(() => {
    if (notificationActive) {
      const close = () => setNotificationActive(false);
      document.addEventListener("click", close);
      return () => document.removeEventListener("click", close);
    }
  }, [notificationActive]);

  // مسیر آیکون‌ها (در public یا src/assets)
  const icon = (name) => window.location.origin + "/" + name;

  // Add save function
  const handleSave = () => {
    if (
      !siteName ||
      !domain ||
      !hostType ||
      !traffic ||
      !customerName ||
      !serviceDate ||
      !duration
    ) {
      alert("لطفا تمام فیلدهای ضروری را پر کنید");
      return;
    }

    // Generate random IP
    const generateIP = () => {
      return `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(
        Math.random() * 255
      )}`;
    };

    // Calculate days remaining based on duration
    const calculateDays = (duration) => {
      const today = new Date();
      let endDate;
      switch (duration) {
        case "1month":
          endDate = new Date(today.setMonth(today.getMonth() + 1));
          break;
        case "3month":
          endDate = new Date(today.setMonth(today.getMonth() + 3));
          break;
        case "1year":
          endDate = new Date(today.setFullYear(today.getFullYear() + 1));
          break;
        default:
          endDate = new Date(today.setMonth(today.getMonth() + 1));
      }
      return Math.ceil((endDate - new Date()) / (1000 * 60 * 60 * 24));
    };

    const totalDays =
      duration === "1month" ? 30 : duration === "3month" ? 90 : 365;
    const daysRemaining = calculateDays(duration);

    // Create new host object with actual values
    const newHost = {
      id: hostsList.length + 1,
      siteName,
      domain,
      hostType,
      traffic: `${traffic} GB`,
      customerName,
      serviceDate: serviceDate.format("YYYY/MM/DD"),
      duration:
        duration === "1month"
          ? "1 ماهه"
          : duration === "3month"
          ? "3 ماهه"
          : "1 ساله",
      website: `https://${domain}`,
      ip: generateIP(),
      ramUsage: 0, // Start with 0 usage
      ramTotal: parseInt(ram) || 0,
      trafficUsage: 0, // Start with 0 usage
      trafficTotal: parseInt(traffic) || 0,
      daysRemaining,
      totalDays,
    };

    console.log("Saving new host:", newHost);

    // Update hosts list for table
    const updatedHostsList = [...hostsList, newHost];
    setHostsList(updatedHostsList);

    // Save to localStorage for host1.jsx
    const existingServices = JSON.parse(
      localStorage.getItem("services") || "[]"
    );
    console.log("Existing services:", existingServices);

    const updatedServices = [...existingServices, newHost];
    console.log("Updated services:", updatedServices);

    localStorage.setItem("services", JSON.stringify(updatedServices));

    // Trigger storage event for other tabs
    window.dispatchEvent(new Event("storage"));

    // Reset form
    setSiteName("");
    setDomain("");
    setRam("");
    setCpu("");
    setTraffic("");
    setHostType("");
    setCustomerName("");
    setServiceDate(null);
    setDuration("");

    // Close modal
    closeModal();

    // Show success message
    alert("هاست جدید با موفقیت ایجاد شد");
  };

  // Load hosts from localStorage on component mount
  React.useEffect(() => {
    const savedHosts = localStorage.getItem("hostsList");
    if (savedHosts) {
      setHostsList(JSON.parse(savedHosts));
    }
  }, []);

  return (
    <div className="Main">
      <div
        id="mySidebar"
        className="sidebar"
        onMouseOver={toggleSidebar}
        onMouseOut={toggleSidebar}
        style={{ width: sidebarMini ? "66px" : "200px" }}
      >
        <a href="#">
          <span title="خانه">
            <div className="icon1">
              <img
                src={icon("home.png")}
                alt="خانه"
                className="material-icons"
              />
            </div>
          </span>
          <span className="icon-text">خانه</span>
        </a>
        <br />
        <a href="#">
          <span title="مدیریت هاست">
            <div className="icon1">
              <img
                src={icon("Host.png")}
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
                src={icon("setting.png")}
                alt="ابزارها"
                className="material-icons"
              />
            </div>
          </span>
          <span className="icon-text">ابزار ها</span>
        </a>
        <br />
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setRokhdadOpen((v) => !v);
          }}
        >
          <span title="رخدادها">
            <div className="icon1">
              <img
                src={icon("rokhdad.png")}
                alt="رخدادها"
                className="material-icons"
              />
            </div>
          </span>
          <span className="icon-text">رخداد ها</span>
        </a>
        {rokhdadOpen && (
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
      <div id="main" style={{ marginRight: sidebarMini ? "66px" : "200px" }}>
        {/* محتویات اصلی */}
      </div>
      <div className="right5"></div>
      <div className="right6"></div>
      <div className="left">
        <div className="b1">
          <div className="b11">
            <span title="جستجو کردن">
              <div
                className="b111"
                onClick={() => setSearchActive((prev) => !prev)}
              >
                <img src={icon("search.png")} alt="جستجو" />
              </div>
            </span>
            <div className={`b112${searchActive ? " active" : ""}`}>
              {" "}
              {/* جستجو */}
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
            <div className="b121" onClick={handleExit}>
              <span title="خروج">
                <img src={icon("exit.png")} alt="خروج" />
              </span>
            </div>
            {exitModal && (
              <div className="modalll" style={{ display: "flex" }}>
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
            <div className="b122" onClick={handleNotification}>
              <span title="اعلان ها">
                <img src={icon("notifications.png")} alt="اعلان ها" />
                <div
                  id="notification-popup"
                  className={`notification-modal${
                    notificationActive ? " active" : ""
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
        <div className="b2">
          <div className="table-container">
            <table>
              <thead>
                <tr className="oneline">
                  <th>شماره</th>
                  <th>وب سایت ها</th>
                  <th>هاست</th>
                  <th>دامنه</th>
                  <th>ترافیک</th>
                </tr>
              </thead>
              <tbody>
                {hostsList.map((host, idx) => (
                  <tr key={host.id}>
                    <td>{idx + 1}</td>
                    <td>{host.siteName}</td>
                    <td>{host.hostType}</td>
                    <td>{host.domain}</td>
                    <td>{host.traffic}</td>
                  </tr>
                ))}
                {[...Array(Math.max(0, 14 - hostsList.length))].map(
                  (_, idx) => (
                    <tr key={`empty-${idx}`}>
                      <td>{hostsList.length + idx + 1}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="b3">
          <div className="b31">
            ایجاد هاست جدید
            <div className="b311">برای ایجاد هاست جدید کلیک کنید</div>
            <button type="button" className="b31__button" onClick={openModal}>
              <span className="b31__button-text">
                <strong>کلیک کنید</strong>
              </span>
            </button>
            {hostModal && (
              <div
                id="hostModal"
                className="modal"
                style={{ display: "block" }}
              >
                <div className="modal-content">
                  <div className="modal-content__header">
                    <h2 className="modal-content__header-text">
                      ایجاد هاست جدید
                    </h2>
                    <div className="modal-content__header-button">
                      <span title="بسته شدن پنجره">
                        <span className="close" onClick={closeModal}>
                          &times;
                        </span>
                      </span>
                    </div>
                  </div>
                  {/* New grid layout for inputs */}
                  <div className="modal-inputs-grid">
                    <div className="input-box">
                      <input
                        type="text"
                        placeholder="اسم سایت"
                        value={siteName}
                        onChange={(e) => setSiteName(e.target.value)}
                      />
                    </div>
                    <div className="input-box">
                      <input
                        type="text"
                        placeholder="دامنه"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                      />
                    </div>
                    <div className="input-box">
                      <input
                        type="number"
                        placeholder="مقدار RAM (GB)"
                        value={ram}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (
                            val === "" ||
                            (!isNaN(val) && val >= 1 && val <= 32)
                          ) {
                            setRam(val);
                          }
                        }}
                        onBlur={(e) => {
                          const val = parseInt(e.target.value);
                          if (val < 1) setRam(1);
                          if (val > 32) setRam(32);
                        }}
                        min="1"
                        max="32"
                      />
                    </div>
                    <div className="input-box">
                      <input
                        type="number"
                        placeholder="مقدار CPU (GB)"
                        value={cpu}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (
                            val === "" ||
                            (!isNaN(val) && val >= 2 && val <= 64)
                          ) {
                            setCpu(val);
                          }
                        }}
                        onBlur={(e) => {
                          const val = parseInt(e.target.value);
                          if (val < 2) setCpu(2);
                          if (val > 64) setCpu(64);
                        }}
                        min="2"
                        max="64"
                      />
                    </div>
                    <div className="input-box">
                      <input
                        type="number"
                        placeholder="حجم ترافیک (GB)"
                        value={traffic}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (
                            val === "" ||
                            (!isNaN(val) && val >= 50 && val <= 5000)
                          ) {
                            setTraffic(val);
                          }
                        }}
                        onBlur={(e) => {
                          const val = parseInt(e.target.value);
                          if (val < 50) setTraffic(50);
                          if (val > 5000) setTraffic(5000);
                        }}
                        min="50"
                        max="5000"
                      />
                    </div>
                    <div className="input-box select-box">
                      <select
                        value={hostType}
                        onChange={(e) => setHostType(e.target.value)}
                      >
                        <option value="">هاست</option>
                        {/* Add host options here */}
                        <option value="shared">Linux</option>
                        <option value="vps">Windows</option>
                      </select>
                    </div>
                    <div className="input-box">
                      <input
                        type="text"
                        placeholder="نام مشتری"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                      />
                    </div>
                    <div className="input-box">
                      <DatePicker
                        calendar={persian}
                        locale={persian_fa}
                        value={serviceDate}
                        onChange={setServiceDate}
                        placeholder="تاریخ ثبت سرویس"
                      />
                    </div>
                    <div className="input-box select-box">
                      <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                      >
                        <option value="">مدت زمان هاست</option>
                        {/* Add duration options here */}
                        <option value="1month">1 ماهه</option>
                        <option value="3month">3 ماهه</option>
                        <option value="1year">1 ساله</option>
                      </select>
                    </div>
                  </div>

                  <div className="box4th">
                    <button id="confirmButton" onClick={handleSave}>
                      ذخیره سازی
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="b31">
            ویرایش هاست
            <div className="b311">برای ویرایش از این قسمت اقدام کنید</div>
            <button type="button" className="b31__button" onClick={openModall}>
              <span className="b31__button-text">
                <strong>کلیک کنید</strong>
              </span>
            </button>
            {hostModall && (
              <div
                id="hostModall"
                className="modall"
                style={{ display: "block" }}
              >
                <div className="modall-header">هاست خود را انتخاب کنید</div>
                <div className="modall-body">
                  <ol className="host-list">
                    {[...Array(6)].map((_, idx) => (
                      <li key={idx} onClick={openModalll}></li>
                    ))}
                  </ol>
                </div>
                <div className="modall-footer">
                  <span title="بستن">
                    <span className="close-btn" onClick={closeModall}>
                      ✖
                    </span>
                  </span>
                </div>
                {editHost && (
                  <div
                    className="edit-host"
                    id="edit-host"
                    style={{ display: "block" }}
                  >
                    <div className="edit-host__header">
                      <h2 className="modal-content__header-text">
                        ویرایش هاست
                      </h2>
                      <div className="modal-content__header-button">
                        <span title="بسته شدن پنجره">
                          <span className="close" onClick={closeModalll}>
                            &times;
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="ram-increase">
                      <h3 className="ram-increase__text">افزایش رم</h3>
                      <div className="ram-increase__box">
                        {["9GB_Ram", "7GB_Ram", "5GB_Ram", "3GB_Ram"].map(
                          (ram) => (
                            <div className="ram-increase__bix" key={ram}>
                              <div className="bix1">{ram}</div>
                              <div className="bix11">
                                <button className="ram-increase__button">
                                  فعالسازی
                                </button>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div className="traffic-usage">
                      <h3 className="traffic-usage__text">ترافیک مصرفی</h3>
                      <div className="traffic-usage__box">
                        <button className="traffic-usage__button">
                          برای تمدید ترافیک مصرفی کلیک کنید
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="b31">
            وضعیت هاست ها
            <div className="b311">برای وضعیت هاست خود کلیک کنید</div>
            <a href="host1">
              <button type="button" className="b31__button">
                <span className="b31__button-text">
                  <strong>کلیک کنید</strong>
                </span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Host;
