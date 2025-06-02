import React, { useState, useRef, useEffect } from "react";
import "./tools6.css";
import * as XLSX from "xlsx";

const initialRows = [
  { id: 1, user: "example.com", date: "هاست 1", ip: "domain1.com" },
  { id: 2, user: "example.net", date: "هاست 2", ip: "domain2.com" },
  { id: 3, user: "example.org", date: "هاست 3", ip: "domain3.com" },
  { id: 4, user: "example.info", date: "هاست 4", ip: "domain4.com" },
  { id: 5, user: "example.biz", date: "هاست 5", ip: "domain5.com" },
  { id: 6, user: "example.co.uk", date: "هاست 6", ip: "domain6.com" },
  { id: 7, user: "example.us", date: "هاست 7", ip: "domain7.com" },
  { id: 8, user: "example.eu", date: "هاست 8", ip: "domain8.com" },
  { id: 9, user: "example.asia", date: "هاست 9", ip: "domain9.com" },
  { id: 10, user: "example.me", date: "هاست 10", ip: "domain10.com" },
];

export default function Tools6() {
  // Sidebar
  const [sidebarMini, setSidebarMini] = useState(false);
  // Search
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  // Exit modal
  const [exitModalOpen, setExitModalOpen] = useState(false);
  // Notification
  const [notifOpen, setNotifOpen] = useState(false);
  // Rokhdad submenu
  const [rokhdadOpen, setRokhdadOpen] = useState(false);
  // Dropdowns
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownnOpen, setDropdownnOpen] = useState(false);
  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  // Table
  const [rows, setRows] = useState(initialRows);
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  // Tree
  const [treeOpen, setTreeOpen] = useState({
    main: false,
    docs: false,
    images: false,
  });

  // Sidebar hover logic
  const handleSidebarEnter = () => setSidebarMini(false);
  const handleSidebarLeave = () => setSidebarMini(true);

  // Search
  const handleSearchIconClick = () => setSearchActive((a) => !a);
  const handleSearchChange = (e) => setSearchValue(e.target.value);
  const handleSearch = (e) => {
    e.preventDefault();
    // You can implement search logic here
  };

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

  // Rokhdad submenu
  const handleRokhdadClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setRokhdadOpen((o) => !o);
  };

  // Dropdown
  const handleDropdownClick = (e) => {
    e.stopPropagation();
    setDropdownOpen((o) => !o);
  };
  const handleDropdownnClick = (e) => {
    e.stopPropagation();
    setDropdownnOpen((o) => !o);
  };

  // Modal
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // Tree
  const handleTreeToggle = (key) => {
    setTreeOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Export to Excel
  const exportTableToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "data.xlsx");
  };

  // Pagination
  const handlePageClick = (page) => setCurrentPage(page);
  const handleNextPage = () => setCurrentPage((p) => Math.min(p + 1, 4));
  const handleRefresh = () => window.location.reload();

  // Close dropdowns and notifications on outside click
  useEffect(() => {
    const handleClick = () => {
      setDropdownOpen(false);
      setDropdownnOpen(false);
      setNotifOpen(false);
      setRokhdadOpen(false);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

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
          style={{ display: rokhdadOpen ? "block" : "none" }}
          onClick={(e) => e.stopPropagation()}
        >
          <a href="#" className="submenu-item" data-type="خطاها">
            <span className="circle"></span> خطاها
          </a>
          <a href="#" className="submenu-item" data-type="ترافیک سیستم">
            <span className="circle"></span> ترافیک سیستم
          </a>
          <a href="#" className="submenu-item" data-type="امنیتی">
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
              <form id="form" onSubmit={handleSearch}>
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
                <div
                  id="notification-popup"
                  className={`notification-modal${notifOpen ? " active" : ""}`}
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
              <div className="dropdownn">
                <button
                  className="dropbtnn"
                  type="button"
                  onClick={handleDropdownnClick}
                >
                  <span className="arrow"></span>
                  کلیک کنید
                </button>
                <div
                  className="dropdownn-content"
                  id="dropdownnMenu"
                  style={{ display: dropdownnOpen ? "block" : "none" }}
                  onClick={(e) => e.stopPropagation()}
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
              <input type="file" id="upload--btn" style={{ display: "none" }} />
              <button className="left-area__2nd__Rbox__button2">
                <img
                  src="/Create.png"
                  alt="ثبت کاربر جدید"
                  className="left-area__2nd__Rbox__button__img2"
                />
                ثبت کاربر جدید
              </button>
              <div className="dropdown">
                <button
                  className="dropbtn"
                  type="button"
                  onClick={handleDropdownClick}
                >
                  <span className="arrow">▼</span>
                  <div className="separator"></div>
                  در هر صفحه
                </button>
                <div
                  className="dropdown-content"
                  id="dropdownMenu"
                  style={{ display: dropdownOpen ? "block" : "none" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    یک مورد
                  </a>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    ده مورد
                  </a>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    پانزده مورد
                  </a>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    بیست مورد
                  </a>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    بیست و پنج مورد
                  </a>
                </div>
              </div>
            </div>
            <div className="left-area__2nd__Lbox">
              <div className="search-box">
                <input
                  type="text"
                  id="search-input"
                  placeholder="جستجو کن...."
                  value={searchValue}
                  onChange={handleSearchChange}
                />
                <button id="search-btn" onClick={handleSearch}>
                  <img src="/Search (2).png" alt="جستجو" />
                </button>
              </div>
              <button
                className="left-area__2nd__Lbox__button"
                onClick={exportTableToExcel}
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
            <div className="left-area__3rd--head">نمایش اطلاعات</div>
            <div className="table-container">
              <table id="table">
                <thead>
                  <tr className="oneline">
                    <th>شماره</th>
                    <th>کاربر ثبت کننده</th>
                    <th>تایخ ثبت</th>
                    <th>آیپی</th>
                    <th>فایل ها</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.user}</td>
                      <td>{row.date}</td>
                      <td>{row.ip}</td>
                      <td>
                        <button className="table-button" onClick={openModal}>
                          <img src="/edit2.png" alt="ویرایش" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {modalOpen && (
              <div
                id="hostModal"
                className="modall"
                style={{ display: "block" }}
              >
                <div className="modal-content">
                  <div className="modal-content__header">
                    <h2 className="modal-content__header-text">فایل ها</h2>
                    <span title="بستن">
                      <span className="close" onClick={closeModal}>
                        &times;
                      </span>
                    </span>
                  </div>
                  <div className="modal-content__body">
                    <ul className="tree">
                      <li>
                        <span
                          className={`caret${
                            treeOpen.main ? " caret-down" : ""
                          }`}
                          onClick={() => handleTreeToggle("main")}
                        >
                          📁 فولدر اصلی
                        </span>
                        <ul
                          className={`nested${treeOpen.main ? " active" : ""}`}
                        >
                          <li>
                            <span
                              className={`caret${
                                treeOpen.docs ? " caret-down" : ""
                              }`}
                              onClick={() => handleTreeToggle("docs")}
                            >
                              📁 اسناد
                            </span>
                            <ul
                              className={`nested${
                                treeOpen.docs ? " active" : ""
                              }`}
                            >
                              <li>📄 گزارش.pdf</li>
                              <li>📄 قرارداد.docx</li>
                            </ul>
                          </li>
                          <li>
                            <span
                              className={`caret${
                                treeOpen.images ? " caret-down" : ""
                              }`}
                              onClick={() => handleTreeToggle("images")}
                            >
                              📁 تصاویر
                            </span>
                            <ul
                              className={`nested${
                                treeOpen.images ? " active" : ""
                              }`}
                            >
                              <li>🖼️ photo1.jpg</li>
                              <li>🖼️ photo2.png</li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="footer">
                    <button className="footer__button">حذف</button>
                    <button className="footer__button">تایید</button>
                  </div>
                </div>
              </div>
            )}
            <div className="b4th" id="pagination">
              <div className="items-per-page">
                <span title="تازه سازی">
                  <span className="refresh-icon" onClick={handleRefresh}>
                    ↻
                  </span>
                </span>
                <span className="items-count">100 مورد</span>
              </div>
              <div className="pagination-container">
                {[1, 2, 3, 4].map((page) => (
                  <button
                    key={page}
                    className={`pagination-button${
                      currentPage === page ? " active" : ""
                    }`}
                    onClick={() => handlePageClick(page)}
                  >
                    {page}
                  </button>
                ))}
                <button className="pagination-button" onClick={handleNextPage}>
                  بعدی &gt;&gt;
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
