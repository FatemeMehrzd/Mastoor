import React, { useState, useEffect } from "react";
import "./tools7.css";
import * as XLSX from "xlsx";

const Tools7 = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [showRokhdadSubmenu, setShowRokhdadSubmenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showHostModal, setShowHostModal] = useState(false);
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [showApprovalPopup, setShowApprovalPopup] = useState(false);

  const handleSidebarMouseEnter = () => {
    setIsSidebarExpanded(true);
  };

  const handleSidebarMouseLeave = () => {
    setIsSidebarExpanded(false);
  };

  const handleSearchClick = () => {
    setSearchActive(!searchActive);
  };

  const handleExitClick = () => {
    setShowExitModal(true);
  };

  const handleConfirmExit = () => {
    window.location.href = "https://";
  };

  const handleCancelExit = () => {
    setShowExitModal(false);
  };

  const handleNotificationClick = (e) => {
    e.stopPropagation();
    setShowNotificationPopup(!showNotificationPopup);
  };

  const handleRokhdadClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowRokhdadSubmenu(!showRokhdadSubmenu);
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const openModal = () => {
    setShowHostModal(true);
  };

  const closeModal = () => {
    setShowHostModal(false);
  };

  const showConfirmBoxHandler = () => {
    setShowConfirmBox(true);
  };

  const confirmDelete = () => {
    console.log("قانون حذف شد");
    setShowConfirmBox(false);
  };

  const cancelDelete = () => {
    setShowConfirmBox(false);
  };

  const approveLaw = () => {
    setShowApprovalPopup(true);
  };

  const closePopup = () => {
    closeAll();
  };

  const confirmApproval = () => {
    closeAll();
  };

  const closeAll = () => {
    setShowApprovalPopup(false);
    setShowHostModal(false);
  };

  const exportTableToExcel = (tableID, filename = "data.xlsx") => {
    const table = document.getElementById(tableID);
    const workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
    XLSX.writeFile(workbook, filename);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setShowNotificationPopup(false);
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
        className={`sidebar ${isSidebarExpanded ? "expanded" : "collapsed"}`}
        onMouseEnter={handleSidebarMouseEnter}
        onMouseLeave={handleSidebarMouseLeave}
      >
        <a href="#">
          <span title="خانه">
            <div className="icon1">
              <img src="/home.png" alt="" className="material-icons" />
            </div>
          </span>
          <span className="icon-text">خانه</span>
        </a>
        <a href="#">
          <span title="مدیریت هاست">
            <div className="icon1">
              <img src="/Host.png" alt="" className="material-icons" />
            </div>
          </span>
          <span className="icon-text">مدیریت هاست</span>
        </a>
        <a href="#">
          <span title="ابزارها">
            <div className="icon1">
              <img src="/setting.png" alt="" className="material-icons" />
            </div>
          </span>
          <span className="icon-text">ابزار ها</span>
        </a>
        <a href="#" id="rokhdad-link" onClick={handleRokhdadClick}>
          <span title="رخدادها">
            <div className="icon1">
              <img src="/rokhdad.png" alt="" className="material-icons" />
            </div>
          </span>
          <span className="icon-text">رخدادها</span>
        </a>
        {showRokhdadSubmenu && (
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

      <div id="main" className={isSidebarExpanded ? "expanded" : "collapsed"}>
        <div className="right5"></div>
        <div className="right6"></div>
        <div className="left">
          <div className="b1">
            <div className="b11">
              <span title="جستجو کردن">
                <div className="b111" onClick={handleSearchClick}>
                  <img src="/search.png" alt="" />
                </div>
              </span>
              <div className={`b112 ${searchActive ? "active" : ""}`}>
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
                <span title="خروج" onClick={handleExitClick}>
                  <img src="/exit.png" alt="" />
                </span>
                {showExitModal && (
                  <div
                    id="exit-modal"
                    className="modal"
                    style={{ display: "flex" }}
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
                )}
              </div>
              <div className="b122">
                <span title="اعلان ها" onClick={handleNotificationClick}>
                  <img src="/notifications.png" alt="" />
                </span>
                {showNotificationPopup && (
                  <div
                    id="notification-popup"
                    className="notification-modal active"
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
                )}
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
                <div className="dropdown">
                  <button className="dropbtn" onClick={handleDropdownToggle}>
                    <span className="arrow"></span>
                    کلیک کنید
                  </button>
                  {showDropdown && (
                    <div className="dropdown-content" id="dropdownMenu">
                      <a href="#" onClick={openModal}>
                        لیست قوانین
                      </a>
                      <a href="#" onClick={openModal}>
                        قوانین در حال اجرا
                      </a>
                      <a href="#" onClick={openModal}>
                        ایجاد قوانین جدید
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="left-area-2nd">
              <div className="exit__button">
                <button
                  className="exit__buttonn"
                  onClick={() => exportTableToExcel("table")}
                >
                  گزارش
                  <img src="/output1.png" alt="" />
                </button>
              </div>
              <div className="table-container">
                <table id="table">
                  <thead>
                    <tr className="oneline">
                      <th>شماره</th>
                      <th>نام قانون</th>
                      <th>نوع</th>
                      <th>توضیحات</th>
                      <th>اطلاعات بیشتر</th>
                      <th>وضعیت</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(14)].map((_, index) => (
                      <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <button
                            className="table-button info-button"
                            data-id={index + 1}
                            onClick={openModal}
                          >
                            کلیک کنید
                          </button>
                        </td>
                        <td>
                          {index < 6 && (
                            <img
                              src={index % 2 === 0 ? "/true.png" : "/false.png"}
                              className="table__image"
                              alt=""
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {showHostModal && (
                <div
                  id="hostModal"
                  className="modall"
                  style={{ display: "block" }}
                >
                  <div className="modal-content">
                    <div className="modal-content__header">
                      <div className="information">
                        <h2>اطلاعات</h2>
                      </div>
                    </div>
                    <div className="second-area">
                      <div className="second-area-right"></div>
                      <div className="second-area-left">
                        <div className="second-area-left__box">
                          نویسنده قانون:
                        </div>
                        <div className="second-area-left__box">
                          تاریخ نگارش قانون:
                        </div>
                        <div className="second-area-left__box">سطح دسترسی:</div>
                      </div>
                    </div>
                    <div className="footer">
                      <button
                        className="footer__button"
                        onClick={showConfirmBoxHandler}
                      >
                        حذف
                      </button>
                      <button className="footer__button" onClick={approveLaw}>
                        تایید
                      </button>
                      <button className="footer__button" onClick={closeModal}>
                        لغو
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {showConfirmBox && (
                <div
                  id="confirmBox"
                  className="confirm-box"
                  style={{ display: "block" }}
                >
                  <p className="confirm-text">
                    آیا مایل به حذف این قانون هستید؟
                  </p>
                  <div className="confirm-buttons">
                    <button className="confirm-btn" onClick={confirmDelete}>
                      بله
                    </button>
                    <button className="confirm-btn" onClick={cancelDelete}>
                      خیر
                    </button>
                  </div>
                </div>
              )}

              {showApprovalPopup && (
                <div
                  id="approvalPopup"
                  className="approval-popup"
                  style={{ display: "block" }}
                >
                  <p className="popup-text">
                    آیا از تایید این قانون مطمئن هستید؟
                  </p>
                  <div className="popup-buttons">
                    <button className="popup-btn" onClick={confirmApproval}>
                      بله
                    </button>
                    <button className="popup-btn" onClick={closePopup}>
                      خیر
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Tools7;
