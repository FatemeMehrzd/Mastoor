import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Rokhdad.css";
import * as XLSX from "xlsx";

interface TableRow {
  id: number;
  day: string;
  time: string;
  severity: string;
  description: string;
}

const Security: React.FC = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [tableData, setTableData] = useState<TableRow[]>([]);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
  };

  const toggleExitModal = () => {
    setShowExitModal(!showExitModal);
  };

  const toggleNotifications = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowNotifications(!showNotifications);
  };

  const toggleSubmenu = () => {
    setShowSubmenu(!showSubmenu);
  };

  const handleConfirmExit = () => {
    window.location.href = "https://";
  };

  const handleCancelExit = () => {
    setShowExitModal(false);
    window.location.href = "";
  };

  const exportTableToExcel = (tableId: string) => {
    const table = document.getElementById(tableId);
    const wb = XLSX.utils.table_to_book(table);
    XLSX.writeFile(wb, "table.xlsx");
  };

  // Function to generate random data for the table
  const generateRandomData = () => {
    const severities = ["کم", "متوسط", "زیاد", "بحرانی"];
    const descriptions = [
      "تلاش برای دسترسی غیرمجاز",
      "حمله DDoS شناسایی شد",
      "فایل مشکوک شناسایی شد",
      "تلاش برای نفوذ به سیستم",
    ];
    const currentDate = new Date();

    return Array.from({ length: 14 }, (_, index) => ({
      id: index + 1,
      day: currentDate.toLocaleDateString("fa-IR"),
      time: currentDate.toLocaleTimeString("fa-IR"),
      severity: severities[Math.floor(Math.random() * severities.length)],
      description:
        descriptions[Math.floor(Math.random() * descriptions.length)],
    }));
  };

  // Function to refresh table data
  const refreshTableData = () => {
    const newData = generateRandomData();
    setTableData(newData);
  };

  // Initial data load
  useEffect(() => {
    refreshTableData();
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setShowNotifications(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="Main">
      <div
        id="mySidebar"
        className="sidebar"
        style={{ width: isSidebarExpanded ? "200px" : "66px" }}
        onMouseEnter={() => setIsSidebarExpanded(true)}
        onMouseLeave={() => setIsSidebarExpanded(false)}
      >
        <Link to="#">
          <span title="خانه">
            <div className="icon1">
              <img src="/rokhdad/home.png" alt="" className="material-icons" />
            </div>
          </span>
          <span className="icon-text">خانه</span>
        </Link>
        <br />
        <Link to="#">
          <span title="مدیریت هاست">
            <div className="icon1">
              <img src="/rokhdad/Host.png" alt="" className="material-icons" />
            </div>
          </span>
          <span className="icon-text">مدیریت هاست</span>
        </Link>
        <br />
        <Link to="#">
          <span title="ابزارها">
            <div className="icon1">
              <img
                src="/rokhdad/setting.png"
                alt=""
                className="material-icons"
              />
            </div>
          </span>
          <span className="icon-text">ابزار ها</span>
        </Link>
        <br />
        <Link to="#" id="rokhdad-link" onClick={toggleSubmenu}>
          <span title="رخدادها">
            <div className="icon1">
              <img
                src="/rokhdad/rokhdad.png"
                alt=""
                className="material-icons"
              />
            </div>
          </span>
          <span className="icon-text">رخدادها</span>
        </Link>
        <div
          className="submenu"
          id="rokhdad-submenu"
          style={{ display: showSubmenu ? "block" : "none" }}
        >
          <Link to="/" className="submenu-item" data-type="خطاها">
            <span className="circle"></span> خطاها
          </Link>
          <Link to="/traffic" className="submenu-item" data-type="ترافیک سیستم">
            <span className="circle"></span> ترافیک سیستم
          </Link>
          <a href="#" className="submenu-item" data-type="امنیتی">
            <span className="circle"></span> امنیت
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
              <div className="b111" onClick={toggleSearch}>
                <img src="/rokhdad/search.png" alt="" />
              </div>
            </span>
            <div className={`b112 ${isSearchActive ? "active" : ""}`}>
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
            <div className="b121">
              <span title="خروج">
                <img src="/rokhdad/exit.png" alt="" onClick={toggleExitModal} />
                <div
                  id="exit-modal"
                  className="modal"
                  style={{ display: showExitModal ? "flex" : "none" }}
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
              </span>
            </div>
            <div className="b122">
              <span title="اعلان ها">
                <img
                  src="/rokhdad/notifications.png"
                  alt=""
                  onClick={toggleNotifications}
                />
                <div
                  id="notification-popup"
                  className={`notification-modal ${
                    showNotifications ? "active" : ""
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

        <div className="b2">
          <div className="b21">
            <span title="تازه سازی">
              <button className="b2-button" onClick={refreshTableData}>
                <img
                  src="/rokhdad/Refresh.png"
                  alt=""
                  className="b2-button__icon2"
                />
                تازه سازی
              </button>
            </span>
          </div>
          <div className="b22">
            <span title="بازگشت">
              <button className="b2-button">
                <img
                  src="/rokhdad/Back.png"
                  alt=""
                  className="b2-button__icon3"
                />
                بازگشت
              </button>
            </span>
            <span title="خروجی">
              <button
                className="b2-button"
                onClick={() => exportTableToExcel("table")}
              >
                <img
                  src="/rokhdad/Output.png"
                  alt=""
                  className="b2-button__icon4"
                />
                خروجی
              </button>
            </span>
          </div>
        </div>

        <div className="b3">
          <div className="table-container">
            <table id="table">
              <thead>
                <tr className="oneline">
                  <th>شماره</th>
                  <th>روز</th>
                  <th>زمان</th>
                  <th>شدت</th>
                  <th>توضیحات</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.day}</td>
                    <td>{row.time}</td>
                    <td>{row.severity}</td>
                    <td>{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
