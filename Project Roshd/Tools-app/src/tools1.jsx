import React, { useState, useRef } from "react";
import "./tools1.css";
import * as XLSX from "xlsx";

const Tools1 = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [searchActive, setSearchActive] = useState(false);
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [rokhdadSubmenuOpen, setRokhdadSubmenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [checkedRows, setCheckedRows] = useState(Array(14).fill(false));
  const sidebarRef = useRef(null);
  const dropdownRef = useRef(null);

  // Add edit state
  const [editingRow, setEditingRow] = useState(null);
  const [editFormData, setEditFormData] = useState({
    range: "",
    type: "",
    port: "",
  });

  // Sidebar hover handlers
  const handleSidebarMouseEnter = () => {
    setSidebarCollapsed(false);
  };

  const handleSidebarMouseLeave = () => {
    setSidebarCollapsed(true);
  };

  // Search box
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

  // Notifications
  const handleNotificationToggle = (e) => {
    e.stopPropagation();
    setNotificationOpen((prev) => !prev);
  };
  React.useEffect(() => {
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
    console.log(`زیرمنوی ${type} انتخاب شد.`);
    setRokhdadSubmenuOpen(false);
  };

  // Dropdown
  const handleDropdownToggle = (e) => {
    e.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };
  React.useEffect(() => {
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

  // Table checkboxes
  const handleCheckboxChange = (idx) => {
    setCheckedRows((prev) => {
      const arr = [...prev];
      arr[idx] = !arr[idx];
      return arr;
    });
  };

  // Modify table data state to read from localStorage
  const [tableData, setTableData] = useState(() => {
    const savedData = localStorage.getItem("tableData");
    return savedData ? JSON.parse(savedData) : [];
  });

  // Update table rows based on tableData
  const tableRows = tableData.map((row, index) => ({
    id: index + 1,
    name: row.name,
    range: row.range,
    type: row.type,
    port: row.port,
  }));

  const handleExcelExport = () => {
    try {
      // Create worksheet
      const worksheet = XLSX.utils.json_to_sheet(tableData);

      // Set column widths
      const columnWidths = [
        { wch: 10 }, // name
        { wch: 20 }, // range
        { wch: 15 }, // type
        { wch: 10 }, // port
      ];
      worksheet["!cols"] = columnWidths;

      // Create workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "IP List");

      // Generate Excel file
      XLSX.writeFile(workbook, "IP_List_Export.xlsx");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      alert("خطا در خروجی گرفتن فایل اکسل");
    }
  };

  // Add delete handler
  const handleDelete = () => {
    // Get indices of checked rows
    const indicesToDelete = checkedRows
      .map((checked, index) => (checked ? index : -1))
      .filter((index) => index !== -1);

    if (indicesToDelete.length === 0) {
      // Show notification if no rows are selected
      alert("لطفا حداقل یک مورد را انتخاب کنید");
      return;
    }

    // Filter out the selected rows
    const newTableData = tableData.filter(
      (_, index) => !indicesToDelete.includes(index)
    );

    // Update localStorage
    localStorage.setItem("tableData", JSON.stringify(newTableData));

    // Update state
    setTableData(newTableData);

    // Reset checkboxes
    setCheckedRows(Array(14).fill(false));
  };

  // Handle edit button click
  const handleEdit = () => {
    // Get indices of checked rows
    const indicesToEdit = checkedRows
      .map((checked, index) => (checked ? index : -1))
      .filter((index) => index !== -1);

    if (indicesToEdit.length === 0) {
      alert("لطفا یک مورد را برای ویرایش انتخاب کنید");
      return;
    }

    if (indicesToEdit.length > 1) {
      alert("لطفا فقط یک مورد را برای ویرایش انتخاب کنید");
      return;
    }

    const rowToEdit = tableData[indicesToEdit[0]];
    setEditingRow(indicesToEdit[0]);
    setEditFormData({
      range: rowToEdit.range,
      type: rowToEdit.type,
      port: rowToEdit.port,
    });
  };

  // Handle edit form input changes
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle edit form submission
  const handleEditSubmit = () => {
    // Validate form fields
    if (!editFormData.range || !editFormData.type || !editFormData.port) {
      alert("لطفا تمام فیلدها را پر کنید");
      return;
    }

    // Validate IP format
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3} - (\d{1,3}\.){3}\d{1,3}$/;
    if (!ipRegex.test(editFormData.range)) {
      alert(
        "لطفا فرمت IP را به درستی وارد کنید (مثال: 192.168.1.1 - 192.168.1.10)"
      );
      return;
    }

    // Validate port number
    const port = parseInt(editFormData.port);
    if (isNaN(port) || port < 1 || port > 65535) {
      alert("لطفا یک پورت معتبر وارد کنید (1-65535)");
      return;
    }

    // Update the row in tableData
    const newTableData = [...tableData];
    newTableData[editingRow] = {
      ...newTableData[editingRow],
      range: editFormData.range,
      type: editFormData.type,
      port: editFormData.port,
    };

    // Update localStorage
    localStorage.setItem("tableData", JSON.stringify(newTableData));

    // Update state
    setTableData(newTableData);

    // Reset edit state
    setEditingRow(null);
    setEditFormData({
      range: "",
      type: "",
      port: "",
    });

    // Reset checkboxes
    setCheckedRows(Array(14).fill(false));
  };

  // Handle edit cancel
  const handleEditCancel = () => {
    setEditingRow(null);
    setEditFormData({
      range: "",
      type: "",
      port: "",
    });
    setCheckedRows(Array(14).fill(false));
  };

  return (
    <div className="Main">
      {/* تست نمایش عکس. اگر این عکس را نمی‌بینید، نام فایل یا مسیر public را چک کنید. */}
      <div style={{ margin: "10px 0" }}>
        <img style={{ width: 40, border: "2px solid red" }} />
        {/* اگر عکس بالا نمایش داده نشد، در DevTools مسیر عکس را بررسی کنید */}
      </div>
      <div
        id="mySidebar"
        className={`sidebar ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}
        onMouseEnter={handleSidebarMouseEnter}
        onMouseLeave={handleSidebarMouseLeave}
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
            <div className="left-area__2nd__Rbox">
              <button className="left-area__2nd__Rbox__button1">
                <img
                  src="/Create.png"
                  alt="افزودن آیپی"
                  className="left-area__2nd__Rbox__button__img1"
                />
                افزودن آیپی
              </button>
              <button
                className="left-area__2nd__Rbox__button"
                onClick={handleEdit}
              >
                <img
                  src="/Edit.png"
                  alt="ویرایش"
                  className="left-area__2nd__Rbox__button__img"
                />
                ویرایش
              </button>
              <button
                className="left-area__2nd__Rbox__button"
                onClick={handleDelete}
              >
                <img
                  src="/Delete.png"
                  alt="حذف کردن"
                  className="left-area__2nd__Rbox__button__img"
                />
                حذف کردن
              </button>
            </div>
            <div className="left-area__2nd__Lbox">
              <div className="search-box">
                <input
                  type="text"
                  id="search-input"
                  placeholder="جستجو کن...."
                />
                <button id="search-btn">
                  <img src="/Search (2).png" alt="جستجو" />
                </button>
              </div>
              <button
                className="left-area__2nd__Lbox__button"
                onClick={handleExcelExport}
              >
                <img
                  src="/Output.png"
                  alt="خروجی"
                  className="left-area__2nd__Lbox__button__img"
                />
                خروجی
              </button>
            </div>
          </div>
          <div className="left-area__3rd">
            <div className="table-container">
              <table id="table">
                <thead>
                  <tr className="oneline">
                    <th>نام</th>
                    <th>محدوده آیپی فعلی</th>
                    <th>نوع</th>
                    <th>پورت</th>
                    <th>انتخاب</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row, idx) => (
                    <tr key={row.id}>
                      <td>{row.name}</td>
                      <td>{row.range}</td>
                      <td>{row.type}</td>
                      <td>{row.port}</td>
                      <td>
                        <label className="checkbox">
                          <input
                            type="checkbox"
                            checked={checkedRows[idx]}
                            onChange={() => handleCheckboxChange(idx)}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      {/* Edit Modal */}
      {editingRow !== null && (
        <div className="modal" style={{ display: "flex" }}>
          <div id="modal-content" style={{ width: "400px" }}>
            <h3 style={{ fontFamily: "dana", marginBottom: "20px" }}>
              ویرایش اطلاعات
            </h3>
            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  fontFamily: "dana",
                  display: "block",
                  marginBottom: "5px",
                }}
              >
                محدوده آیپی:
              </label>
              <input
                type="text"
                name="range"
                value={editFormData.range}
                onChange={handleEditInputChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  fontFamily: "dana",
                  display: "block",
                  marginBottom: "5px",
                }}
              >
                نوع:
              </label>
              <input
                type="text"
                name="type"
                value={editFormData.type}
                onChange={handleEditInputChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  fontFamily: "dana",
                  display: "block",
                  marginBottom: "5px",
                }}
              >
                پورت:
              </label>
              <input
                type="number"
                name="port"
                value={editFormData.port}
                onChange={handleEditInputChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleEditSubmit}
                style={{
                  backgroundColor: "#9351cc",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontFamily: "dana",
                }}
              >
                ذخیره
              </button>
              <button
                onClick={handleEditCancel}
                style={{
                  backgroundColor: "#e0e0e0",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontFamily: "dana",
                }}
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tools1;
