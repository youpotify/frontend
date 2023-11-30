import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

export default function Login() {
  const navigate = useNavigate();

  function NavigateToSignup() {
    navigate("/signup");
  }

  return (
    <div className="container">
      <div className="login-box">
        <img src="youpotify_cheeky.png" alt="google logo" />
        <div>
          <h2>로그인</h2>
        </div>
        <form className="form">
          <div>
            <fieldset>
              <legend>이메일</legend>
              <div>
                <input id="email" placeholder="이메일" />
              </div>
            </fieldset>
          </div>
          <fieldset>
            <legend>비밀번호 입력</legend>
            <div>
              <input id="password" placeholder="비밀번호" />
            </div>
          </fieldset>
        </form>
        <div className="btn-box">
          <button id="signup" onClick={NavigateToSignup}>
            계정 만들기
          </button>
          <button id="login">로그인</button>
        </div>
      </div>
    </div>
  );
}
