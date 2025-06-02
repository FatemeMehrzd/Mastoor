import React, { useState, useEffect } from "react";
import "./Rokhdad.css";
import homeIcon from "/rokhdad/home.png";
import hostIcon from "/rokhdad/Host.png";
import settingIcon from "/rokhdad/setting.png";
import rokhdadIcon from "/rokhdad/rokhdad.png";
import searchIcon from "/rokhdad/search.png";
import exitIcon from "/rokhdad/exit.png";
import notificationIcon from "/rokhdad/notifications.png";
import refreshIcon from "/rokhdad/Refresh.png";
import backIcon from "/rokhdad/Back.png";
import outputIcon from "/rokhdad/Output.png";
import * as XLSX from "xlsx";

const Rokhdad = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [tableData, setTableData] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
  };

  const toggleExitModal = () => {
    setIsExitModalOpen(!isExitModalOpen);
  };

  const toggleNotification = (e) => {
    e.stopPropagation();
    setIsNotificationOpen(!isNotificationOpen);
  };

  const toggleSubmenu = (e) => {
    e.preventDefault();
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  const handleConfirmExit = () => {
    window.location.href = "https://";
  };

  const handleCancelExit = () => {
    setIsExitModalOpen(false);
    window.location.href = "";
  };

  const exportTableToExcel = (tableId, filename = "data.xlsx") => {
    const table = document.getElementById(tableId);
    const workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
    XLSX.writeFile(workbook, filename);
  };

  // Function to generate random data for the table
  const generateRandomData = () => {
    const types = ["خطای سیستم", "خطای امنیتی", "خطای شبکه"];
    const addresses = ["192.168.1.1", "10.0.0.1", "172.16.0.1"];
    const currentDate = new Date();

    return Array.from({ length: 14 }, (_, index) => ({
      id: index + 1,
      day: currentDate.toLocaleDateString("fa-IR"),
      time: currentDate.toLocaleTimeString("fa-IR"),
      type: types[Math.floor(Math.random() * types.length)],
      address: addresses[Math.floor(Math.random() * addresses.length)],
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
      setIsNotificationOpen(false);
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
        style={{ width: isSidebarOpen ? "200px" : "66px" }}
        onMouseEnter={toggleSidebar}
        onMouseLeave={toggleSidebar}
      >
        <a href="#">
          <span title="خانه">
            <div className="icon1">
              <img src={homeIcon} alt="" className="material-icons" />
            </div>
          </span>
          <span className="icon-text">خانه</span>
        </a>
        <br />
        <a href="#">
          <span title="مدیریت هاست">
            <div className="icon1">
              <img src={hostIcon} alt="" className="material-icons" />
            </div>
          </span>
          <span className="icon-text">مدیریت هاست</span>
        </a>
        <br />
        <a href="#">
          <span title="ابزارها">
            <div className="icon1">
              <img src={settingIcon} alt="" className="material-icons" />
            </div>
          </span>
          <span className="icon-text">ابزار ها</span>
        </a>
        <br />
        <a href="#" id="rokhdad-link" onClick={toggleSubmenu}>
          <span title="رخدادها">
            <div className="icon1">
              <img src={rokhdadIcon} alt="" className="material-icons" />
            </div>
          </span>
          <span className="icon-text">رخدادها</span>
        </a>
        <div
          className="submenu"
          id="rokhdad-submenu"
          style={{ display: isSubmenuOpen ? "block" : "none" }}
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
      <div
        id="main"
        style={{ marginRight: isSidebarOpen ? "200px" : "66px" }}
      ></div>
      <div className="right5"></div>
      <div className="right6"></div>
      <div className="left">
        <div className="b1">
          <div className="b11">
            <span title="جستجو کردن">
              <div className="b111" onClick={toggleSearch}>
                <img src={searchIcon} alt="" />
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
                <img src={exitIcon} alt="" onClick={toggleExitModal} />
                <div
                  id="exit-modal"
                  className="modal"
                  style={{ display: isExitModalOpen ? "flex" : "none" }}
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
                  src={notificationIcon}
                  alt=""
                  onClick={toggleNotification}
                />
                <div
                  id="notification-popup"
                  className={`notification-modal ${
                    isNotificationOpen ? "active" : ""
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
                <img src={refreshIcon} alt="" className="b2-button__icon2" />
                تازه سازی
              </button>
            </span>
          </div>
          <div className="b22">
            <span title="بازگشت">
              <button className="b2-button">
                <img src={backIcon} alt="" className="b2-button__icon3" />
                بازگشت
              </button>
            </span>
            <span title="خروجی">
              <button
                className="b2-button"
                onClick={() => exportTableToExcel("table")}
              >
                <img src={outputIcon} alt="" className="b2-button__icon4" />
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
                  <th>نوع</th>
                  <th>آدرس</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.day}</td>
                    <td>{row.time}</td>
                    <td>{row.type}</td>
                    <td>{row.address}</td>
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

export default Rokhdad;
