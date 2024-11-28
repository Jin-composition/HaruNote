import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTab } from "./TabContext";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Admin.css";

const Admin = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { activeTab, setActiveTab } = useTab();
  const [title, setTitle] = useState("");
  const [diaryEntries, setDiaryEntries] = useState([]);

  const filteredEntries = diaryEntries.filter((entry) =>
    entry.title.toLowerCase().includes(title.toLowerCase())
  );

  const [userList, setUserList] = useState([
    { id: 1, username: "진하영", email: "wls@gmail.com" },
    { id: 2, username: "류지예", email: "ryu@naver.com" },
    { id: 3, username: "박은지", email: "park@gmail.com" },
    { id: 4, username: "백현빈", email: "hyeon@daum.com" },
    { id: 5, username: "조경호", email: "cho@naver.com" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/user/pages`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDiaryEntries(response.data);
      } catch (err) {
        alert("블로그를 가져오는 데 실패했습니다.");
      }
    };

    fetchData();
  }, []);

  console.log("filteredEntries ", filteredEntries);

  return (
    <div className="admin">
      {/* 탭 영역 */}
      <div className="tab-header">
        <button
          className={`tab-button ${activeTab === "Account" ? "active" : ""}`}
          onClick={() => setActiveTab("Account")}
        >
          Account
        </button>
        <button
          className={`tab-button ${activeTab === "Blog" ? "active" : ""}`}
          onClick={() => setActiveTab("Blog")}
        >
          Blog
        </button>
      </div>

      {/* 조건부 렌더링 */}
      {activeTab === "Account" && (
        <>
          <div className="list-container">
            <h2>사용자 계정 목록</h2>
            <table className="list-table">
              <tbody>
                {userList.map((el, i) => (
                  <tr className="list-item" key={el.id}>
                    <td className="icon-column">{i + 1}.</td>
                    <td className="title-column">{el.username}</td>
                    <td className="title-column email-cell">
                      {el.email}
                      <button
                        className="delete-button"
                        onClick={() => {
                          setUserList((prev) =>
                            prev.filter((user) => user.id !== el.id)
                          );
                        }}
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeTab === "Blog" && (
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
                <Link
                  key={entry.id}
                  // to={`/diary/${entry.owner_id}/${
                  //   entry.created_at.split("T")[0]
                  // }/${entry.id}`}
                  state={{
                    entryTitle: entry.title,
                    id: entry.id,
                    entryOwner: entry.owner_id,
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <div className="blog-entry">
                    <h3 className="entry-title1">{entry.title}</h3>
                    <h3 className="entry-date">
                      {entry.created_at.split("T")[0]}
                    </h3>
                  </div>
                </Link>
              ))
            ) : (
              <p>검색 결과가 없습니다.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
