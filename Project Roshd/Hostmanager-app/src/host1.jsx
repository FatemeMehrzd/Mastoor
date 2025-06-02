import "./host1.css";
import React, { useState, useEffect } from "react";
import homeIcon from "./assets/home.png";
import hostIcon from "./assets/Host.png";
import settingIcon from "./assets/setting.png";
import rokhdadIcon from "./assets/rokhdad.png";
import searchIcon from "./assets/search.png";
import exitIcon from "./assets/exit.png";
import notificationsIcon from "./assets/notifications.png";

function ChartBox({
  title,
  percent,
  valueText,
  circleClass,
  numberId,
  circleId,
}) {
  return (
    <div className="chart-box">
      <div className="chart-box__title">
        <h4 className="chart-box__title-h4">{title}</h4>
      </div>
      <div className="chart-box__round-chart">
        <div className="outer">
          <div className="inner">
            <div id={numberId}>{percent}%</div>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="7em"
          height="7em"
        >
          <defs>
            <linearGradient id="GradientColor">
              <stop offset="0%" stopColor="#DA22FF" />
              <stop offset="100%" stopColor="#9733EE" />
            </linearGradient>
          </defs>
          <circle
            className={circleClass}
            cx="57"
            cy="57"
            r="46"
            strokeLinecap="round"
            id={circleId}
          />
        </svg>
      </div>
      <p className="chart-box__values-text">{valueText}</p>
    </div>
  );
}

function ServiceBox({
  boxId,
  renewId,
  cancelId,
  customerName,
  serviceDate,
  duration,
  domain,
  website,
  ip,
  ramUsage,
  ramTotal,
  trafficUsage,
  trafficTotal,
  daysRemaining,
  totalDays,
}) {
  return (
    <div className={`box${boxId}`} id={`box${boxId}`}>
      <div className="box__right">
        <div className="box__right__box">
          <input
            type="text"
            className="box__right__input"
            placeholder="نام مشتری:"
            value={customerName || ""}
            readOnly
          />
        </div>
        <div className="box__right__box">
          <input
            type="text"
            className="box__right__input"
            placeholder="دامنه:"
            value={domain || ""}
            readOnly
          />
        </div>
        <div className="box__right__box">
          <input
            type="text"
            className="box__right__input"
            placeholder="وب سایت:"
            value={website || ""}
            readOnly
          />
        </div>
        <div className="box__right__box">
          <input
            type="text"
            className="box__right__input"
            placeholder="تاریخ ثبت سرویس:"
            value={serviceDate || ""}
            readOnly
          />
        </div>
        <div className="box__right__box">
          <input
            type="text"
            className="box__right__input"
            placeholder="مدت زمان هاست:"
            value={duration || ""}
            readOnly
          />
        </div>
        <div className="box__right__box">
          <input
            type="text"
            className="box__right__input"
            placeholder="آدرس IP:"
            value={ip || ""}
            readOnly
          />
        </div>
      </div>
      <div className="box__center">
        <div className="box__center__box">
          <button id={renewId}> تمدید سرویس</button>
        </div>
        <div className="box__center__box">
          <button id={cancelId}>لغو سرویس</button>
        </div>
      </div>
      <div className="box__left">
        <ChartBox
          title="حجم مصرفی"
          percent={
            trafficUsage && trafficTotal
              ? Math.round((trafficUsage / trafficTotal) * 100)
              : 0
          }
          valueText={
            trafficUsage && trafficTotal
              ? `${trafficUsage}GB/${trafficTotal}GB`
              : "0GB/0GB"
          }
          circleClass="circle1"
          numberId="number-1"
          circleId="circle-1"
        />
        <ChartBox
          title="وضعیت رم"
          percent={
            ramUsage && ramTotal ? Math.round((ramUsage / ramTotal) * 100) : 0
          }
          valueText={
            ramUsage && ramTotal ? `${ramUsage}GB/${ramTotal}GB` : "0GB/0GB"
          }
          circleClass="circle2"
          numberId="number-2"
          circleId="circle-2"
        />
        <ChartBox
          title="روز باقیمانده"
          percent={
            daysRemaining && totalDays
              ? Math.round((daysRemaining / totalDays) * 100)
              : 0
          }
          valueText={
            daysRemaining && totalDays
              ? `${daysRemaining}روز/${totalDays}روز`
              : "0روز/0روز"
          }
          circleClass="circle3"
          numberId="number-3"
          circleId="circle-3"
        />
      </div>
    </div>
  );
}

function Host1() {
  // Sidebar state
  const [isHovered, setIsHovered] = useState(false);
  // Search box state
  const [searchActive, setSearchActive] = useState(false);
  // Exit modal state
  const [exitModal, setExitModal] = useState(false);
  // Notification modal state
  const [notifActive, setNotifActive] = useState(false);
  // Renew/Cancel modal state
  const [renewModal, setRenewModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [rokhdadOpen, setRokhdadOpen] = useState(false);

  // Add state for service data
  const [services, setServices] = useState(() => {
    const savedServices = localStorage.getItem("services");
    console.log("Loading services from localStorage:", savedServices);
    return savedServices ? JSON.parse(savedServices) : [];
  });

  // Update services when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const savedServices = localStorage.getItem("services");
      console.log("Storage changed, new services:", savedServices);
      if (savedServices) {
        setServices(JSON.parse(savedServices));
      }
    };

    // Initial load
    handleStorageChange();

    // Listen for changes
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Debug log when services change
  useEffect(() => {
    console.log("Current services state:", services);
  }, [services]);

  // Sidebar hover handlers
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Search box toggle
  const handleSearch = () => setSearchActive((a) => !a);

  // Notification toggle
  const handleNotif = (e) => {
    e.stopPropagation();
    setNotifActive((n) => !n);
  };
  useEffect(() => {
    const closeNotif = () => setNotifActive(false);
    if (notifActive) {
      document.addEventListener("click", closeNotif);
      return () => document.removeEventListener("click", closeNotif);
    }
  }, [notifActive]);

  // Toggle rokhdad submenu
  const toggleRokhdad = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setRokhdadOpen(!rokhdadOpen);
  };

  // Close rokhdad submenu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const submenu = document.getElementById("rokhdad-submenu");
      const rokhdadLink = document.querySelector(".rokhdad-link");
      if (
        submenu &&
        !submenu.contains(event.target) &&
        !rokhdadLink.contains(event.target)
      ) {
        setRokhdadOpen(false);
      }
    };

    if (rokhdadOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [rokhdadOpen]);

  // Chart animation (simplified for React)
  useEffect(() => {
    // You can use a library for animated charts, or implement with refs and setInterval if needed
  }, []);

  return (
    <div className="Main">
      <div
        id="mySidebar"
        className="sidebar"
        style={{ width: isHovered ? 200 : 66 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <a href="#">
          <span title="خانه">
            <div className="icon1">
              <img src={homeIcon} alt="خانه" className="material-icons" />
            </div>
          </span>
          <span className="icon-text">خانه</span>
        </a>
        <br />
        <a href="#">
          <span title="مدیریت هاست">
            <div className="icon1">
              <img
                src={hostIcon}
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
              <img src={settingIcon} alt="ابزارها" className="material-icons" />
            </div>
          </span>
          <span className="icon-text">ابزار ها</span>
        </a>
        <br />
        <div className="rokhdad-container">
          <a
            href="#"
            className={`rokhdad-link${rokhdadOpen ? " active" : ""}`}
            onClick={toggleRokhdad}
          >
            <span title="رخدادها">
              <div className="icon1">
                <img
                  src={rokhdadIcon}
                  alt="رخدادها"
                  className="material-icons"
                />
              </div>
            </span>
            <span className="icon-text">رخدادها</span>
          </a>
          {rokhdadOpen && (
            <div className="submenu show" id="rokhdad-submenu">
              <a href="ss5.html" className="submenu-item">
                <span className="circle"></span> خطاها
              </a>
              <a href="ss51.html" className="submenu-item">
                <span className="circle"></span> ترافیک سیستم
              </a>
              <a href="ss52.html" className="submenu-item">
                <span className="circle"></span> امنیتی
              </a>
            </div>
          )}
        </div>
      </div>
      <div id="main">
        <div className="left">
          <div className="b1">
            <div className="b11">
              <span title="جستجو کردن">
                <div className="b111" onClick={handleSearch}>
                  <img src={searchIcon} alt="جستجو" />
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
              <div className="b121" onClick={() => setExitModal(true)}>
                <span title="خروج">
                  <img src={exitIcon} alt="خروج" />
                </span>
              </div>
              <div className="b122" onClick={handleNotif}>
                <span title="اعلان ها">
                  <img src={notificationsIcon} alt="اعلان ها" />
                </span>
                <div
                  className={`notification-modal${
                    notifActive ? " active" : ""
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
              </div>
            </div>
          </div>
          <section id="main-box">
            <div className="main-box__header">
              <div className="main-box__header__text">وضعیت هاست ها</div>
            </div>
            <div className="main-box__content">
              {services.map((service, index) => (
                <ServiceBox
                  key={service.id}
                  boxId={index + 1}
                  renewId={`renewService${index + 1}`}
                  cancelId={`cancelService${index + 1}`}
                  customerName={service.customerName}
                  serviceDate={service.serviceDate}
                  duration={service.duration}
                  domain={service.domain}
                  website={service.website}
                  ip={service.ip}
                  ramUsage={service.ramUsage}
                  ramTotal={service.ramTotal}
                  trafficUsage={service.trafficUsage}
                  trafficTotal={service.trafficTotal}
                  daysRemaining={service.daysRemaining}
                  totalDays={service.totalDays}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
      {/* Exit Modal */}
      {exitModal && (
        <div className="modal" style={{ display: "flex" }}>
          <div id="modal-content">
            <p>آیا مطمئن هستید که می‌خواهید خارج شوید؟</p>
            <button
              id="confirm-exit"
              onClick={() => {
                window.location.href = "https://";
              }}
            >
              بله
            </button>
            <button id="cancel-exit" onClick={() => setExitModal(false)}>
              خیر
            </button>
          </div>
        </div>
      )}
      {/* Renew Modal */}
      {renewModal && (
        <div className="modal" style={{ display: "flex" }}>
          <div id="modal-content">
            <p>آیا از تمدید سرویس اطمینان دارید؟</p>
            <button id="confirm-renew" onClick={() => setRenewModal(false)}>
              بله
            </button>
            <button id="cancel-renew" onClick={() => setRenewModal(false)}>
              خیر
            </button>
          </div>
        </div>
      )}
      {/* Cancel Modal */}
      {cancelModal && (
        <div className="modal" style={{ display: "flex" }}>
          <div id="modal-content">
            <p>آیا از لغو سرویس اطمینان دارید؟</p>
            <button id="confirm-cancel" onClick={() => setCancelModal(false)}>
              بله
            </button>
            <button id="cancel-cancel" onClick={() => setCancelModal(false)}>
              خیر
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Host1;
