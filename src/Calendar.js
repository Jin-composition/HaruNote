import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Calendar.css";

const Calendar = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("calendar");

  const [diaryEntries /*setDiaryEntries*/] = useState([
    { id: 1, title: "뚜벅이 경주 여행 기록", date: "2024-11-01" },
    { id: 2, title: "OO전자 (1차 면접) 취준 일기", date: "2024-11-14" },
    { id: 3, title: "휴가 계획", date: "2024-11-28" },
    { id: 4, title: "크리스마스 이브", date: "2024-12-24" },
    { id: 5, title: "장한평 방문", date: "2024-11-01" },
    { id: 6, title: "나이키매장", date: "2024-11-01" },
  ]);

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

  // 날짜 형식화 함수
  const formatDate = (year, month, day) => {
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    return `${year}-${formattedMonth}-${formattedDay}`;
  };

  // URL 생성 함수
  const getDiaryURL = (isCurrent, isPrev, isNext, year, month, date) => {
    if (isCurrent) {
      return formatDate(year, month, date);
    } else if (isPrev) {
      const prevMonth = month === 1 ? 12 : month - 1;
      const prevYear = month === 1 ? year - 1 : year;
      return formatDate(prevYear, prevMonth, date);
    } else if (isNext) {
      const nextMonth = month === 12 ? 1 : month + 1;
      const nextYear = month === 12 ? year + 1 : year;
      return formatDate(nextYear, nextMonth, date);
    }
    return "";
  };

  // CSS 클래스 계산 함수
  const getClassName = (isCurrent, isPrev, isNext, colIndex) => {
    const baseClass = isCurrent ? "date" : "date faded";
    const weekendClass = colIndex === 0 || colIndex === 6 ? "weekend" : "";
    return `${baseClass} ${weekendClass}`;
  };

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

                        // 날짜 정보 계산
                        const currentMonth = currentDate.getMonth() + 1;
                        const currentYear = currentDate.getFullYear();
                        const lastDayOfCurrentMonth = new Date(
                          currentYear,
                          currentMonth,
                          0
                        ).getDate();

                        // 달 상태 판별
                        const isCurrentMonth =
                          date > 0 && date <= lastDayOfCurrentMonth;
                        const isPrevMonth = date <= 0;
                        const isNextMonth = date > lastDayOfCurrentMonth;

                        // 날짜 보정
                        if (isPrevMonth) {
                          date += new Date(
                            currentYear,
                            currentMonth - 1,
                            0
                          ).getDate();
                        } else if (isNextMonth) {
                          date -= lastDayOfCurrentMonth;
                        }

                        const diaryURL = getDiaryURL(
                          isCurrentMonth,
                          isPrevMonth,
                          isNextMonth,
                          currentYear,
                          currentMonth,
                          date
                        );

                        // diaryEntries에서 항목 찾기
                        const entries = diaryEntries.filter(
                          (item) => item.date === diaryURL
                        );

                        return (
                          <td
                            key={colIndex}
                            className={getClassName(
                              isCurrentMonth,
                              isPrevMonth,
                              isNextMonth,
                              colIndex
                            )}
                            data-date={date}
                          >
                            <button
                              className="cell-button"
                              onClick={() => navigate(`/diary/${diaryURL}`)}
                            >
                              +
                            </button>
                            <div className="entry-container">
                              {entries.length > 0 &&
                                entries.map((entry) => (
                                  <p key={entry.id} className="entry-title">
                                    {entry.title}
                                  </p>
                                ))}
                            </div>
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
