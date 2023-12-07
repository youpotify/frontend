import React from "react";
import "./Signup.scss";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  function NavigateToLogin() {
    navigate("/login");
  }

  return (
    <div className="container">
      <div className="login-box">
        <img src="youpotify.png" alt="google logo" />
        <div>
          <h2>회원가입</h2>
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
              <input id="password" placeholder="비밀번호" type="password" />
            </div>
          </fieldset>
          <fieldset>
            <legend>비밀번호 확인</legend>
            <div>
              <input
                id="password"
                placeholder="비밀번호 확인"
                type="password"
              />
            </div>
          </fieldset>
        </form>
        <div className="btn-box">
          <button id="signup" onClick={NavigateToLogin}>
            로그인 화면
          </button>
          <button id="login">가입 완료</button>
        </div>
      </div>
    </div>
  );
}
