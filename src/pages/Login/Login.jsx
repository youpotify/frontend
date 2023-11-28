import React from "react";
import "./Login.scss";

export default function Login() {
  return (
    <div className="container">
      <div className="login-box">
        <img src="youpotify_cheeky.png" alt="google logo" />
        <div>
          <h2>로그인</h2>
        </div>
        <form className="input">
          <div>
            <fieldset>
              <legend>Email or Phone</legend>
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
          <span id="signup">계정 만들기</span>
          <span id="login">로그인</span>
        </div>
      </div>
    </div>
  );
}
