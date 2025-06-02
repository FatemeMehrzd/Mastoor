import React, { useState, useRef, useEffect } from "react";
import "./tools5.css";
// For Excel export
import * as XLSX from "xlsx";

const initialRows = Array.from({ length: 14 }, (_, i) => ({
  id: i + 1,
  name: "",
  ip: "",
  creator: "",
}));

export default function Tools5() {
  // Sidebar state
  const [sidebarMini, setSidebarMini] = useState(false);
  // Search box
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  // Exit modal
  const [exitModalOpen, setExitModalOpen] = useState(false);
  // Notification
  const [notifOpen, setNotifOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  // Rokhdad submenu
  const [rokhdadOpen, setRokhdadOpen] = useState(false);
  // Dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // Admin modal
  const [adminModal, setAdminModal] = useState(false);
  // Table
  const [rows, setRows] = useState(() => {
    const savedRows = localStorage.getItem("adminTableData");
    return savedRows ? JSON.parse(savedRows) : initialRows;
  });
  // Admin form
  const [adminForm, setAdminForm] = useState({
    username: "",
    name: "",
    lastname: "",
    password: "",
    phone: "",
  });
  const tableRef = useRef();

  // Save rows to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("adminTableData", JSON.stringify(rows));
  }, [rows]);

  // Sidebar hover logic
  const handleSidebarEnter = () => setSidebarMini(false);
  const handleSidebarLeave = () => setSidebarMini(true);

  // Search
  const handleSearchIconClick = () => setSearchActive((a) => !a);
  const handleSearchChange = (e) => setSearchValue(e.target.value);

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

  // Notification
  const handleNotifClick = (e) => {
    e.stopPropagation();
    setNotifOpen((o) => !o);
  };

  // Dropdown
  const handleDropdownClick = (e) => {
    e.stopPropagation();
    setDropdownOpen((o) => !o);
  };

  // Admin modal
  const handleAdminModalOpen = () => setAdminModal(true);
  const handleAdminModalClose = () => {
    setAdminModal(false);
    setAdminForm({
      username: "",
      name: "",
      lastname: "",
      password: "",
      phone: "",
    });
  };

  const handleAdminFormChange = (e) => {
    setAdminForm({ ...adminForm, [e.target.id]: e.target.value });
  };

  const handleAdminFormSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    if (
      !adminForm.username ||
      !adminForm.name ||
      !adminForm.lastname ||
      !adminForm.password ||
      !adminForm.phone
    ) {
      setNotificationMessage("لطفاً تمام فیلدها را پر کنید");
      setNotifOpen(true);
      return;
    }

    try {
      // Get IP address
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      const ip = data.ip;

      // Create new admin row with ID starting from 1
      const newRow = {
        id: rows.length === 0 ? 1 : Math.max(...rows.map((row) => row.id)) + 1,
        name: `${adminForm.name} ${adminForm.lastname}`,
        ip: ip,
        creator: "ادمین",
      };

      // Update rows
      const newRows = [...rows, newRow];
      setRows(newRows);

      // Save to localStorage
      localStorage.setItem("adminTableData", JSON.stringify(newRows));

      // Close modal and reset form
      handleAdminModalClose();

      // Show success notification
      setNotificationMessage("ادمین با موفقیت اضافه شد");
      setNotifOpen(true);

      // Redirect to tools45 page after a short delay
      setTimeout(() => {
        window.location.href = "/tools45";
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
      setNotificationMessage("خطا در دریافت آدرس IP");
      setNotifOpen(true);
    }
  };

  // Table delete
  const handleDeleteRow = (id) => {
    const newRows = rows.filter((row) => row.id !== id);
    // Reorder IDs after deletion
    const reorderedRows = newRows.map((row, index) => ({
      ...row,
      id: index + 1,
    }));
    setRows(reorderedRows);
    localStorage.setItem("adminTableData", JSON.stringify(reorderedRows));
    setNotificationMessage("ادمین با موفقیت حذف شد");
    setNotifOpen(true);
  };

  // Initialize rows from localStorage on component mount
  useEffect(() => {
    const savedRows = localStorage.getItem("adminTableData");
    if (savedRows) {
      const parsedRows = JSON.parse(savedRows);
      // Ensure IDs start from 1
      const rowsWithCorrectIds = parsedRows.map((row, index) => ({
        ...row,
        id: index + 1,
      }));
      setRows(rowsWithCorrectIds);
      localStorage.setItem(
        "adminTableData",
        JSON.stringify(rowsWithCorrectIds)
      );
    }
  }, []);

  // Excel export
  const exportTableToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "data.xlsx");
  };

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleClick = () => {
      if (dropdownOpen) setDropdownOpen(false);
      if (notifOpen) setNotifOpen(false);
      if (rokhdadOpen) setRokhdadOpen(false);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [dropdownOpen, notifOpen, rokhdadOpen]);

  return (
    <div className="Main">
      <div
        id="mySidebar"
        className="sidebar"
        style={{ width: sidebarMini ? 66 : 200 }}
        onMouseEnter={handleSidebarEnter}
        onMouseLeave={handleSidebarLeave}
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
        <a
          href="#"
          id="rokhdad-link"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setRokhdadOpen((o) => !o);
          }}
        >
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
          style={{ display: rokhdadOpen ? "block" : "none" }}
          onClick={(e) => e.stopPropagation()}
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
              <div className="b111" onClick={handleSearchIconClick}>
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
                  value={searchValue}
                  onChange={handleSearchChange}
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
            <div className="b122" onClick={handleNotifClick}>
              <span title="اعلان ها">
                <img src="/notifications.png" alt="اعلان ها" />
                {notifOpen && (
                  <div
                    className="notification-modal active"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="notification-content">
                      <h3>اعلان</h3>
                      <p>{notificationMessage}</p>
                    </div>
                  </div>
                )}
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
              <div className="dropdownn">
                <button
                  className="dropbtnn"
                  type="button"
                  onClick={handleDropdownClick}
                >
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
            <div className="left-area__2nd__Rbox">
              <button
                className="left-area__2nd__Rbox__button"
                onClick={handleAdminModalOpen}
              >
                <img
                  src="/person.png"
                  alt="ایجاد ادمین"
                  className="left-area__2nd__Rbox__button__img1"
                />
                ایجاد ادمین
              </button>
              {adminModal && (
                <div
                  id="hostModal"
                  className="modal"
                  style={{ display: "block" }}
                >
                  <div className="modal-content">
                    <div className="modal-content__header">
                      <h2 className="modal-content__header-text">
                        اطلاعات ادمین
                      </h2>
                      <span title="بستن">
                        <span className="close" onClick={handleAdminModalClose}>
                          &times;
                        </span>
                      </span>
                    </div>
                    <form
                      className="form-container"
                      onSubmit={handleAdminFormSubmit}
                    >
                      <div className="form-row">
                        <label htmlFor="username">نام کاربری:</label>
                        <input
                          type="text"
                          id="username"
                          value={adminForm.username}
                          onChange={handleAdminFormChange}
                          required
                        />
                      </div>
                      <div className="form-row">
                        <label htmlFor="name">نام:</label>
                        <input
                          type="text"
                          id="name"
                          value={adminForm.name}
                          onChange={handleAdminFormChange}
                          required
                        />
                      </div>
                      <div className="form-row">
                        <label htmlFor="lastname">نام خانوادگی:</label>
                        <input
                          type="text"
                          id="lastname"
                          value={adminForm.lastname}
                          onChange={handleAdminFormChange}
                          required
                        />
                      </div>
                      <div className="form-row">
                        <label htmlFor="password">رمز عبور:</label>
                        <input
                          type="password"
                          id="password"
                          value={adminForm.password}
                          onChange={handleAdminFormChange}
                          required
                        />
                      </div>
                      <div className="form-row">
                        <label htmlFor="phone">شماره همراه:</label>
                        <input
                          type="tel"
                          id="phone"
                          value={adminForm.phone}
                          onChange={handleAdminFormChange}
                          required
                        />
                      </div>
                      <div className="modal-buttons">
                        <button type="submit">تایید</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
            <div className="left-area__2nd__Lbox">
              <button
                className="left-area__2nd__Lbox__button"
                onClick={exportTableToExcel}
              >
                <img
                  src="/output1.png"
                  alt="خروجی"
                  className="left-area__2nd__Lbox__button__img"
                />
                خروجی
              </button>
            </div>
          </div>
          <div className="left-area__3rd">
            <div className="table-container">
              <table id="table" ref={tableRef}>
                <thead>
                  <tr className="oneline">
                    <th>شماره</th>
                    <th>نام نام خانوادگی</th>
                    <th>آدرس آیپی</th>
                    <th>ایجاد کننده</th>
                    <th>حذف</th>
                  </tr>
                </thead>
                <tbody>
                  {rows &&
                    rows.map((row) => (
                      <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.name}</td>
                        <td>{row.ip}</td>
                        <td>{row.creator}</td>
                        <td>
                          <button
                            className="deletee"
                            onClick={() => handleDeleteRow(row.id)}
                          >
                            <img src="/trash.png" alt="حذف" />
                          </button>
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
  );
}
