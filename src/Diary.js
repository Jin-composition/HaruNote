import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import "./Diary.css";

const Diary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { date } = useParams();
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");
  const is_admin = localStorage.getItem("is_admin");

  const { entryTitle, id, entryOwner } = location.state || {};

  const [isPublic, setIsPublic] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const toggleVisibility = () => {
    setIsPublic(!isPublic);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file); // 실제 파일 객체 저장
    }
  };

  const handleSubmit = async () => {
    if (!title) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!content) {
      alert("내용을 입력해주세요.");
      return;
    }

    const payload = {
      title,
      content,
      public: isPublic,
      scheduled_at: date,
    };

    try {
      if (id) {
        // 수정: 기존 일기 데이터를 업데이트
        const updateResponse = await axios.put(
          `http://localhost:8000/user/pages/${id}`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (updateResponse.status === 200) {
          alert("일기가 수정되었습니다.");
          navigate("/calendar");
        }
      } else {
        // 텍스트 데이터 업로드
        const textResponse = await axios.post(
          "http://localhost:8000/user/pages",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (textResponse.status === 200) {
          alert("일기가 저장되었습니다.");
          navigate("/calendar");
        }
      }
      // 이미지 파일이 있는 경우 이미지 업로드
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        const imageResponse = await axios.post(
          "http://localhost:8000/user/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`, // 필요한 경우 인증 토큰 추가
            },
          }
        );

        console.log("이미지가 저장되었습니다. ", imageResponse.data);
      }
    } catch (error) {
      console.error("Upload Failed:", error);
      alert("일기가 저장되지 않았습니다.");
    }
  };

  useEffect(() => {
    if (!entryTitle) {
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/user/pages/?title=${entryTitle}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.length > 0) {
          const entry = response.data[0]; // 하나의 일기만 있는 경우
          setTitle(entry.title);
          setContent(entry.content);
          setIsPublic(entry.public);
          setImage(entry.imageUrl || null); // 이미지가 있다면 이미지 URL 설정
        }
      } catch (err) {
        alert("일기 데이터를 가져오는 데 실패했습니다.");
      }
    };

    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/user/pages/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("일기를 삭제하였습니다.");
        if (is_admin === "true") {
          navigate("/admin");
        } else {
          navigate("/calendar");
        }
      }
    } catch (err) {
      alert("일기를 삭제하는데 실패했습니다.");
    }
  };

  return (
    <div className="diary-container">
      <div className="title-section">
        <input
          type="text"
          className="title-input"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="toggle-switch" onClick={toggleVisibility}>
          <div className={`toggle ${isPublic ? "on" : ""}`}>
            <div className="toggle-button">
              <span className="toggle-text">
                {isPublic ? "Public" : "Private"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="content-section">
        <div className="image-upload">
          {image ? (
            <img src={image} alt="Uploaded" className="uploaded-image" />
          ) : (
            <label className="image-placeholder">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              +
            </label>
          )}
        </div>
        <textarea
          className="content-input"
          placeholder="오늘은 어땠나요?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      {is_admin === "true" ? (
        <div className="button-container">
          <button className="cancel-button" onClick={handleDelete}>
            삭제
          </button>
          <button
            style={{ marginLeft: "10px" }}
            className="cancel-button"
            onClick={() => navigate(-1)}
          >
            취소
          </button>
        </div>
      ) : entryOwner === undefined ? (
        <div className="button-container">
          <button className="submit-button" onClick={handleSubmit}>
            저장
          </button>
          <button
            style={{ marginLeft: "10px" }}
            className="cancel-button"
            onClick={() => navigate(-1)}
          >
            취소
          </button>
        </div>
      ) : entryOwner == user_id ? (
        <div className="button-container">
          <button className="submit-button" onClick={handleSubmit}>
            {id ? "수정" : "저장"}
          </button>
          {id ? (
            <button
              style={{ marginLeft: "10px" }}
              className="cancel-button"
              onClick={handleDelete}
            >
              삭제
            </button>
          ) : (
            ""
          )}
          <button
            style={{ marginLeft: "10px" }}
            className="cancel-button"
            onClick={() => navigate(-1)}
          >
            취소
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Diary;
