import React, { useState } from "react";
import "./Blog.css";

const Blog = () => {
  const [title, setTitle] = useState("");

  const [diaryEntries, setDiaryEntries] = useState([
    { id: 1, title: "뚜벅이 경주 여행 기록" },
    { id: 2, title: "OO전자 (1차 면접) 취준 일기" },
    { id: 3, title: "휴가 계획" },
    { id: 4, title: "크리스마스 이브" },
  ]);

  const filteredEntries = diaryEntries.filter((entry) =>
    entry.title.toLowerCase().includes(title.toLowerCase())
  );

  return (
    <>
      <div className="tab-h">
        <div className="tab">HARU BLOG</div>
      </div>
      <div className="blog-container">
        <div className="search-section">
          <input
            type="text"
            className="search-input"
            placeholder="검색어를 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <hr />
        <div className="search-results">
          {filteredEntries.length > 0 ? (
            filteredEntries.map((entry) => (
              <div key={entry.id} className="blog-entry">
                <h3>{entry.title}</h3>
              </div>
            ))
          ) : (
            <p>검색 결과가 없습니다.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;
