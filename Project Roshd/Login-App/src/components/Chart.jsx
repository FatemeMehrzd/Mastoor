import React, { useEffect, useRef } from "react";

const Chart = () => {
  const chartRef = useRef(null);

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

  return <canvas ref={chartRef}></canvas>;
};

export default Chart;
