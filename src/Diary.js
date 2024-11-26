import React, { useState } from "react";
import "./Diary.css";

const Diary = () => {
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
      isPublic,
    };

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    // try {
    //   const jsonResponse = await fetch("http://harunote.com/diary", {
    //     method: "POST",
    //     headers,
    //     body: JSON.stringify(payload),
    //   });

    //   const jsonResult = await jsonResponse.json();
    //   console.log("Text Data Upload Success:", jsonResult);

    //   if (imageFile) {
    //     const formData = new FormData();
    //     formData.append("image", imageFile);

    //     const imageResponse = await fetch("http://harunote.com/diary/image", {
    //       method: "POST",
    //       body: formData,
    //     });

    //     const imageResult = await imageResponse.json();
    //     console.log("Image Upload Success:", imageResult);
    //   }

    //   alert("일기가 저장되었습니다.");
    // } catch (error) {
    //   console.error("Upload Failed:", error);
    //   alert("일기가 저장되지 않았습니다.");
    // }

    console.log(payload, imageFile);
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
      <div className="button-container">
        <button className="submit-button" onClick={handleSubmit}>
          저장
        </button>
      </div>
    </div>
  );
};

export default Diary;
