import React, { useState } from "react";
import signup from "./assets/signup.png";
import "./Signup.css";

const Signup = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // 에러 상태 추가
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const [successMessage, setSuccessMessage] = useState(null); // 성공 메시지 상태

  const handleSignup = async () => {
    if (!username || !email || !password) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    setError(null); // 기존 에러 초기화
    setLoading(true); // 요청 중 로딩 상태로 설정
    setSuccessMessage(null); // 기존 성공 메시지 초기화

    try {
      const response = await fetch("http://localhost:8000/user/Signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("회원가입 성공!"); // 성공 메시지 출력
        setName("");
        setEmail("");
        setPassword("");
      } else {
        alert(data.detail || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("서버와 연결할 수 없습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };

  return (
    <div>
      <main className="main-container">
        <img src={signup} className="signup-img" alt="description" />
        <div className="container">
          {error && <div className="error-message">{error}</div>}
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}

          <input
            type="text"
            placeholder="Name"
            value={username}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
          <input
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
          <div className="passwordContainer">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="passwordInput"
            />

            <button
              type="button"
              onClick={handleSignup}
              className="signinButton"
              disabled={loading} // 로딩 중에는 버튼 비활성화
            >
              {loading ? "가입 중..." : "Sign up"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;
