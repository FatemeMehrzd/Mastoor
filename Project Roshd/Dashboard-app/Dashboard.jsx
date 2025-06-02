import React, { useRef, useEffect, useState } from "react";
import "./Dashboard.css";
import * as XLSX from "xlsx";
import Chart from "./Chart";

const Dashboard = () => {
  // جستجو
  const [searchActive, setSearchActive] = useState(false);
  // مودال خروج
  const [exitModal, setExitModal] = useState(false);
  // مودال اعلان
  const [notifActive, setNotifActive] = useState(false);
  // سایدبار
  const [mini, setMini] = useState(false);
  // زیرمنوی رخداد
  const [rokhdadOpen, setRokhdadOpen] = useState(false);
  // مودال فیلتر
  const [filterModal, setFilterModal] = useState(false);
  // جدول و مرتب‌سازی
  const initialRows = [
    [1, "", "25.06.1395", "22:00", "فعال"],
    [2, "", "25.06.1370", "04:30", "فعال"],
    [3, "", "25.06.1350", "23:05", "غیر فعال"],
    [4, "", "25.06.1360", "18:10", "فعال"],
    [5, "", "", "13:03", "غیر فعال"],
    [6, "", "", "", ""],
    [7, "", "", "", ""],
    [8, "", "", "", ""],
  ];
  const [tableRows, setTableRows] = useState(initialRows);
  const [sortDirections, setSortDirections] = useState({
    date: null,
    time: null,
    status: null,
  });
  // چارت
  const chartRef = useRef(null);
  // گردی درصد
  const [percent, setPercent] = useState(75);

  // Add viewport meta tag
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1.0";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  // جستجو
  const handleSearchClick = () => setSearchActive((a) => !a);

  // خروج
  const handleExit = () => setExitModal(true);
  const handleConfirmExit = () => {
    // Add exit logic here
    setExitModal(false);
  };
  const handleCancelExit = () => setExitModal(false);

  // اعلان
  const handleNotifClick = (e) => {
    e.stopPropagation();
    setNotifActive((a) => !a);
  };
  useEffect(() => {
    const closeNotif = () => setNotifActive(false);
    if (notifActive) {
      document.addEventListener("click", closeNotif);
      return () => document.removeEventListener("click", closeNotif);
    }
  }, [notifActive]);

  // سایدبار
  const toggleSidebar = () => setMini((m) => !m);

  // Add resize listener
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setMini(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // رخداد
  const handleRokhdadClick = (e) => {
    e.preventDefault();
    setRokhdadOpen((o) => !o);
  };

  // مرتب‌سازی جدول مطابق ss2.js
  const parsePersianDate = (dateStr) => {
    if (!dateStr) return null;
    const parts = dateStr.split(".");
    return new Date(+parts[2], +parts[1] - 1, +parts[0]);
  };
  const parseTime = (timeStr) => {
    if (!timeStr) return null;
    const parts = timeStr.split(":");
    return new Date(0, 0, 0, +parts[0], +parts[1]);
  };
  const sortTable = (column) => {
    let colIndex;
    switch (column) {
      case "date":
        colIndex = 2;
        break;
      case "time":
        colIndex = 3;
        break;
      case "status":
        colIndex = 4;
        break;
      default:
        return;
    }
    // جهت مرتب‌سازی را تغییر بده
    const prev = sortDirections[column];
    const asc = prev === null ? true : !prev;
    setSortDirections({ date: null, time: null, status: null, [column]: asc });
    // مرتب‌سازی
    const sorted = [...tableRows].sort((a, b) => {
      const valA = a[colIndex] || "";
      const valB = b[colIndex] || "";
      if (column === "date") {
        const aDate = parsePersianDate(valA);
        const bDate = parsePersianDate(valB);
        return asc ? aDate - bDate : bDate - aDate;
      } else if (column === "time") {
        const aTime = parseTime(valA);
        const bTime = parseTime(valB);
        return asc ? aTime - bTime : bTime - aTime;
      } else {
        return asc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
    });
    setTableRows(sorted);
  };
  const resetTable = () => {
    setTableRows(initialRows);
    setSortDirections({ date: null, time: null, status: null });
  };

  // گردی درصد
  useEffect(() => {
    let counter = 0;
    const interval = setInterval(() => {
      if (counter >= 74) {
        clearInterval(interval);
      } else {
        counter++;
        setPercent(counter);
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // چارت Chart.js
  useEffect(() => {
    if (!window.Chart) return;
    const ctx = chartRef.current.getContext("2d");
    const myChart = new window.Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "شنبه",
          "یکشنبه",
          "دوشنبه",
          "سه شنبه",
          "چهارشنبه",
          "پنجشنبه",
          "جمعه",
        ],
        datasets: [
          {
            label: "سری A",
            data: [10, 20, 15, 25, 5, 30, 20],
            fill: "origin",
            backgroundColor: "rgba(128, 0, 128, 0.3)",
            borderColor: "rgba(128, 0, 128, 0.8)",
            tension: 0.4,
          },
          {
            label: "سری B",
            data: [5, 15, 25, 10, 35, 20, 15],
            fill: "origin",
            backgroundColor: "rgba(200, 200, 200, 0.3)",
            borderColor: "rgba(180, 180, 180, 0.8)",
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        stacked: true,
        plugins: {
          title: {
            display: true,
            text: "نمودار فروش محصولات با اندازه سفارشی",
            font: { family: "Dana" },
          },
          tooltip: {
            rtl: true,
            textDirection: "rtl",
            mode: "index",
            intersect: false,
            bodyFont: { family: "Dana" },
            titleFont: { family: "Dana" },
          },
          legend: {
            labels: {
              textAlign: "right",
              font: { family: "Dana" },
            },
          },
        },
        interaction: { mode: "index", intersect: false },
        scales: {
          x: {
            stacked: true,
            ticks: { align: "start", font: { family: "Dana" } },
          },
          y: {
            stacked: true,
            ticks: { font: { family: "Dana" } },
          },
        },
      },
    });
    return () => myChart.destroy();
  }, []);

  // خروجی اکسل مطابق ss2.js
  const exportTableToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(
      tableRows.map((row) => ({
        شماره: row[0],
        "ادرس ایپی": row[1],
        تاریخ: row[2],
        ساعت: row[3],
        وضعیت: row[4],
      }))
    );
    XLSX.utils.book_append_sheet(wb, ws, "گزارش");
    XLSX.writeFile(wb, "گزارش.xlsx");
  };

  // آیکون مرتب‌سازی مطابق ss2.html
  const getSortIcon = (column) => {
    if (sortDirections[column] === null)
      return (
        <img src="/arrows_16020115.png" alt="sort" className="sort-icon" />
      );
    return (
      <img
        src="/arrows_16020115.png"
        alt="sort"
        className={`sort-icon ${sortDirections[column] ? "asc" : "desc"}`}
        style={{
          transform: sortDirections[column] ? "rotate(180deg)" : "rotate(0deg)",
        }}
      />
    );
  };

  // مودال فیلتر
  const handleOpenFilterModal = () => setFilterModal(true);
  const handleCloseFilterModal = () => setFilterModal(false);
  const handleFilterSort = (column) => {
    sortTable(column);
  };
  const handleFilterReset = () => {
    resetTable();
    setFilterModal(false);
  };

  return (
    <div dir="rtl" className="dashboard-container">
      <div className="Main">
        <div
          id="mySidebar"
          className="sidebar"
          style={{ width: mini ? "66px" : "200px" }}
          onMouseOver={toggleSidebar}
          onMouseOut={toggleSidebar}
        >
          <a href="#">
            <span title="خانه">
              <div className="icon1">
                <img
                  src="/src/assets/home.png"
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
                  src="/src/assets/Host.png"
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
                  src="/src/assets/setting.png"
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
                  src="/src/assets/rokhdad.png"
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
          >
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
        </div>

        <div id="main" style={{ marginRight: mini ? "66px" : "200px" }}>
          <div className="left">
            <div className="b1">
              <div className="b11">
                <span title="جستجو کردن">
                  <div className="b111" onClick={handleSearchClick}>
                    <img src="/src/assets/search.png" alt="جستجو" />
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
                <div className="b121" onClick={handleExit}>
                  <span title="خروج">
                    <img src="/src/assets/exit.png" alt="خروج" />
                  </span>
                  {exitModal && (
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
                <div className="b122" onClick={handleNotifClick}>
                  <span title="اعلان ها">
                    <img src="/src/assets/notifications.png" alt="اعلان ها" />
                  </span>
                  <div
                    id="notification-popup"
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

            <div className="b2">
              <div className="b21">
                <div className="b211">وضعیت سیستم</div>
                <div className="b212">
                  <div className="chart-box__round-chart">
                    <div className="outer">
                      <div className="inner">
                        <div id="number-1">{percent}%</div>
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
                        className="circle1"
                        cx="57"
                        cy="57"
                        r="46"
                        strokeLinecap="round"
                        id="circle-1"
                        style={{
                          strokeDashoffset: 290 - (290 * percent) / 100 + "px",
                        }}
                      />
                    </svg>
                  </div>
                </div>
                <div className="b213">
                  <div className="circle22"></div>
                  <div className="b2132">حافظه موقت</div>
                  <div className="circle11"></div>
                  <div className="b2134">پردازنده</div>
                </div>
              </div>
              <div className="b22">
                <Chart />
              </div>
            </div>

            <div className="b3">
              <div className="b31">
                <div className="b311">
                  <p className="pb311">هاست ها</p>
                  <p className="pb312">
                    <a href="#">مشاهده بیشتر...</a>
                  </p>
                </div>
                <div className="b312">...</div>
                <div className="b313">
                  <span title="هاست ها">
                    <img src="/src/assets/Hostt.png" alt="هاست ها" />
                  </span>
                </div>
              </div>
              <div className="b32">
                <div className="b321">
                  <p className="pb321">کاربران</p>
                  <p className="pb322">
                    <a href="#">مشاهده بیشتر...</a>
                  </p>
                </div>
                <div className="b322">...</div>
                <div className="b323">
                  <span title="کاربران">
                    <img src="/src/assets/people.png" alt="کاربران" />
                  </span>
                </div>
              </div>
              <div className="b33">
                <div className="b331">
                  <p className="pb331">وب سایت ها</p>
                  <p className="pb332">
                    <a href="#">مشاهده بیشتر...</a>
                  </p>
                </div>
                <div className="b332">...</div>
                <div className="b333">
                  <span title="وب سایت ها">
                    <img src="/src/assets/world.png" alt="وب سایت ها" />
                  </span>
                </div>
              </div>
            </div>

            <div className="b4">
              <div className="b41">
                <p className="b411">گزارشات:</p>
                <button onClick={exportTableToExcel} className="b412">
                  خروجی
                </button>
                <button
                  type="button"
                  className="b413"
                  onClick={handleOpenFilterModal}
                >
                  فیلتر کردن
                </button>
              </div>
              <div className="b42">
                <div className="b421">
                  <table id="table">
                    <thead>
                      <tr>
                        <th></th>
                        <th>شماره</th>
                        <th>ادرس ایپی</th>
                        <th>تاریخ</th>
                        <th>ساعت</th>
                        <th>وضعیت</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableRows.map((row, idx) => (
                        <tr key={idx}>
                          <td>
                            <label className="checkbox">
                              <input type="checkbox" />
                              <span className="checkmark"></span>
                            </label>
                          </td>
                          <td>{row[0]}</td>
                          <td>{row[1]}</td>
                          <td>{row[2]}</td>
                          <td>{row[3]}</td>
                          <td>{row[4]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {filterModal && (
        <div className="modall" style={{ display: "block", zIndex: 2000 }}>
          <div className="modal-content">
            <div className="modal-content__header">
              <div className="information">
                <h2>فیلتر ها:</h2>
              </div>
              <button className="information1" onClick={handleFilterReset}>
                <h2>حذف فیلتر ها</h2>
              </button>
            </div>
            <div className="filter-container">
              <div
                className="filter-item"
                onClick={() => handleFilterSort("date")}
              >
                تاریخ {getSortIcon("date")}
              </div>
              <div
                className="filter-item"
                onClick={() => handleFilterSort("time")}
              >
                ساعت {getSortIcon("time")}
              </div>
              <div
                className="filter-item"
                onClick={() => handleFilterSort("status")}
              >
                وضعیت {getSortIcon("status")}
              </div>
            </div>
            <div className="footer">
              <button
                className="footer__button"
                onClick={handleCloseFilterModal}
              >
                لغو
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
