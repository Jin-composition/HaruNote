import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Calendar.css";

const Calendar = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("calendar"); // 탭 상태 추가

  const [diaryEntries /*setDiaryEntries*/] = useState([
    { id: 1, title: "뚜벅이 경주 여행 기록", date: "2024-11-01" },
    { id: 2, title: "OO전자 (1차 면접) 취준 일기", date: "2024-11-14" },
    { id: 3, title: "휴가 계획", date: "2024-11-28" },
    { id: 4, title: "크리스마스 이브", date: "2024-12-24" },
    { id: 5, title: "장한평 방문", date: "2024-11-01" },
  ]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(
        prevDate.getFullYear(),
        prevDate.getMonth() - 1,
        1
      );
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(
        prevDate.getFullYear(),
        prevDate.getMonth() + 1,
        1
      );
      return newDate;
    });
  };

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let nextDate = "";

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Array(31)
      .fill(null)
      .map((_, i) => new Date(year, month, i + 1))
      .filter((date) => date.getMonth() === month);
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = daysInMonth[0].getDay();
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const prevMonthDays = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0
  ).getDate();

  const totalCells = Math.ceil((firstDayOfMonth + daysInMonth.length) / 7) * 7;

  return (
    <div className="table-calendar">
      {/* 탭 영역 */}
      <div className="tab-header">
        <button
          className={`tab-button ${activeTab === "calendar" ? "active" : ""}`}
          onClick={() => setActiveTab("calendar")}
        >
          Calendar
        </button>
        <button
          className={`tab-button ${activeTab === "list" ? "active" : ""}`}
          onClick={() => setActiveTab("list")}
        >
          List
        </button>
      </div>

      {/* 조건부 렌더링 */}
      {activeTab === "calendar" && (
        <>
          <div className="calendar-header">
            <h2>
              {currentDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </h2>
            <div className="button-group">
              <button onClick={handlePrevMonth}>&lt;</button>
              <button onClick={handleNextMonth}>&gt;</button>
            </div>
          </div>
          <table className="calendar-table">
            <thead>
              <tr>
                {daysOfWeek.map((day) => (
                  <th key={day}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array(Math.ceil(totalCells / 7))
                .fill(null)
                .map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {Array(7)
                      .fill(null)
                      .map((_, colIndex) => {
                        const cellIndex = rowIndex * 7 + colIndex;

                        let date = cellIndex - firstDayOfMonth + 1;

                        // =============================================================
                        const currentMonth = currentDate.getMonth() + 1; // 현재 월
                        const currentYear = currentDate.getFullYear(); // 현재 연도

                        // 현재 달의 날짜를 계산
                        const prevMonthDate = new Date(
                          currentYear,
                          currentMonth - 1,
                          1
                        );

                        // 이전 달 1일
                        const prevMonth = prevMonthDate.getMonth();

                        const nextMonthDate = new Date(
                          currentYear,
                          currentMonth + 1,
                          1
                        );

                        // 다음 달 1일
                        const nextMonth =
                          nextMonthDate.getMonth() === 0
                            ? 12
                            : nextMonthDate.getMonth();

                        console.log("nextMonth ", nextMonth);
                        const lastDayOfCurrentMonth = new Date(
                          currentYear,
                          currentMonth,
                          0
                        ).getDate();

                        let isCurrentMonth = true;
                        let isPrevMonth = true;
                        let isNextMonth = true;

                        // console.log(
                        //   "...... ",
                        //   isNextMonth,
                        //   date,
                        //   lastDayOfCurrentMonth
                        // );
                        if (date <= 0 && month > prevMonth) {
                          console.log("이전달");
                          isCurrentMonth = false;
                          isNextMonth = false;
                        } else if (date > lastDayOfCurrentMonth) {
                          console.log("다음달");
                          isCurrentMonth = false;
                          isPrevMonth = false;
                        } else if (month === currentMonth) {
                          console.log("현재");
                          isPrevMonth = false;
                          isNextMonth = false;
                        }

                        // =============================================================

                        let prevDate = date;
                        // console.log("prevDate ", prevDate);

                        if (date < 0) {
                          date = prevMonthDays + date;
                        }

                        if (date > lastDayOfMonth) {
                          nextDate = date;
                          date = date - lastDayOfMonth;
                        }

                        if (date === 0) {
                          date = prevMonthDays;
                        }

                        const formattedMatchDate = new Date(
                          currentDate.getFullYear(),
                          currentDate.getMonth(),
                          date
                        );

                        // 하루를 더하기
                        formattedMatchDate.setDate(
                          formattedMatchDate.getDate() + 1
                        );

                        // diaryEntries에서 현재 날짜에 해당하는 항목 찾기
                        const entry = diaryEntries.find(
                          (item) => item.date === formattedMatchDate
                        );

                        return (
                          <td
                            key={colIndex}
                            className={`${
                              prevDate > 0 && nextDate < lastDayOfMonth
                                ? "date"
                                : "date faded"
                            } ${
                              colIndex === 0 || colIndex === 6 ? "weekend" : ""
                            }`}
                            data-date={date}
                          >
                            <button
                              className="cell-button"
                              onClick={() => {
                                navigate(
                                  `/diary/${
                                    isCurrentMonth
                                      ? `${year}-${
                                          month < 10 ? `0${month}` : month
                                        }-${date < 10 ? `0${date}` : date}`
                                      : isPrevMonth
                                      ? `${
                                          month === 1
                                            ? `${year - 1}-12-${
                                                date < 10 ? `0${date}` : date
                                              }`
                                            : `${year}-${
                                                month - 1 < 10
                                                  ? `0${month - 1}`
                                                  : month - 1
                                              }-${
                                                date < 10 ? `0${date}` : date
                                              }`
                                        }`
                                      : isNextMonth
                                      ? `${
                                          month === 12
                                            ? `${year + 1}-01-${
                                                date < 10 ? `0${date}` : date
                                              }`
                                            : `${year}-${
                                                month + 1 < 10
                                                  ? `0${month + 1}`
                                                  : month + 1
                                              }-${
                                                date < 10 ? `0${date}` : date
                                              }`
                                        }`
                                      : ""
                                  }`
                                ); // 이동할 경로
                              }}
                            >
                              +
                            </button>
                            {entry && (
                              <p className="entry-title">{entry.title}</p>
                            )}
                          </td>
                        );
                      })}
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}

      {activeTab === "list" && (
        <div className="list-container">
          <h2>나의 일기장 목록</h2>
          <table className="list-table">
            <tbody>
              <tr className="list-item">
                <td className="icon-column">
                  <i className="file-icon"></i>
                </td>
                <td className="title-column">뚜벅이 경주 여행 기록</td>
                <td className="date-column">2024.11.23</td>
              </tr>
              <tr>
                <td className="icon-column">
                  <i className="file-icon"></i>
                </td>
                <td className="title-column">OO전자 (1차 면접) 취준 일기</td>
                <td className="date-column">2024.09.14</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Calendar;
