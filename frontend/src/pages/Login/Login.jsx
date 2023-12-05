import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function NavigateToSignup() {
    navigate("/signup");
  }

  function Login() {
    // const apiURL = "localhost:8080/users/login";
    // const response = axios.post(apiURL, { email, password });
    // if (response.statusCode == 200) {
    //   navigate('/');
    // }
  }

  return (
    <div className="container">
      <div className="login-box">
        <img src="youpotify.png" alt="google logo" />
        <div>
          <h2>로그인</h2>
        </div>
        <form className="form">
          <div>
            <fieldset>
              <legend>이메일</legend>
              <div>
                <input
                  id="email"
                  placeholder="이메일"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </fieldset>
          </div>
          <fieldset>
            <legend>비밀번호 입력</legend>
            <div>
              <input
                id="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </fieldset>
        </form>
        <div className="btn-box">
          <button id="signup" onClick={NavigateToSignup}>
            계정 만들기
          </button>
          <button id="login" onClick={Login}>
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}
