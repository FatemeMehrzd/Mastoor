import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Rokhdad.css";
import * as XLSX from "xlsx";

const Security: React.FC = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
  };

  const toggleExitModal = () => {
    setShowExitModal(!showExitModal);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleSubmenu = () => {
    setShowSubmenu(!showSubmenu);
  };

  const handleExit = () => {
    // Handle exit logic here
    console.log("Exiting...");
    setShowExitModal(false);
  };

  const exportTableToExcel = (tableId: string) => {
    const table = document.getElementById(tableId);
    const wb = XLSX.utils.table_to_book(table);
    XLSX.writeFile(wb, "table.xlsx");
  };

  return (
    <div className="Main">
      <div
        id="mySidebar"
        className="sidebar"
        onMouseOver={toggleSidebar}
        onMouseOut={toggleSidebar}
      >
        <Link to="#">
          <span title="خانه">
            <div className="icon1">
              <img src="home.png" alt="" className="material-icons" />
            </div>
          </span>
          <span className="icon-text">خانه</span>
        </Link>
        <br />
        <Link to="#">
          <span title="مدیریت هاست">
            <div className="icon1">
              <img src="Host.png" alt="" className="material-icons" />
            </div>
          </span>
          <span className="icon-text">مدیریت هاست</span>
        </Link>
        <br />
        <Link to="#">
          <span title="ابزارها">
            <div className="icon1">
              <img src="setting.png" alt="" className="material-icons" />
            </div>
          </span>
          <span className="icon-text">ابزار ها</span>
        </Link>
        <br />
        <Link to="#" id="rokhdad-link" onClick={toggleSubmenu}>
          <span title="رخدادها">
            <div className="icon1">
              <img src="rokhdad.png" alt="" className="material-icons" />
            </div>
          </span>
          <span className="icon-text">رخدادها</span>
        </Link>
        <div
          className="submenu"
          id="rokhdad-submenu"
          style={{ display: showSubmenu ? "block" : "none" }}
        >
          <Link to="/">
            <i className="fas fa-exclamation-circle"></i> لاگ خطاها
          </Link>
          <Link to="/traffic">
            <i className="fas fa-exchange-alt"></i> ترافیک سیستم
          </Link>
          <a href="#">
            <i className="fas fa-shield-alt"></i> امنیت
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
              <div className="b111">
                <img src="search.png" alt="" />
              </div>
            </span>
            <div className="b112">
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
                <img src="exit.png" alt="" onClick={toggleExitModal} />
              </span>
              {showExitModal && (
                <div id="exit-modal" className="modal">
                  <div id="modal-content">
                    <p>آیا مطمئن هستید که می‌خواهید خارج شوید؟</p>
                    <button id="confirm-exit" onClick={handleExit}>
                      بله
                    </button>
                    <button id="cancel-exit" onClick={toggleExitModal}>
                      خیر
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="b122">
              <span title="اعلان ها">
                <img
                  src="notifications.png"
                  alt=""
                  onClick={toggleNotifications}
                />
              </span>
              {showNotifications && (
                <div id="notification-popup" className="notification-modal">
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

        <div className="b2">
          <div className="b21">
            <span title="تازه سازی">
              <button className="b2-button">
                <img src="Refresh.png" alt="" className="b2-button__icon2" />
                تازه سازی
              </button>
            </span>
          </div>
          <div className="b22">
            <span title="بازگشت">
              <button className="b2-button">
                <img src="Back.png" alt="" className="b2-button__icon3" />
                بازگشت
              </button>
            </span>
            <span title="خروجی">
              <button
                className="b2-button"
                onClick={() => exportTableToExcel("table")}
              >
                <img src="Output.png" alt="" className="b2-button__icon4" />
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
                {Array.from({ length: 14 }, (_, i) => (
                  <tr key={i + 1}>
                    <td>{i + 1}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
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
