import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.scss";

export default function Signup() {
  const navigate = useNavigate();
  const [isUsable, setIsUsable] = useState(false);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {});

  function NavigateToLogin() {
    navigate("/login");
  }

  function checkEmail() {
    const apiURL = "localhost:8080/users/check-email-duplication";
    const response = axios.post(apiURL, { email });
    if (response.statusCode == 200) {
      setIsUsable(true);
    }
  }

  return (
    <div className="signup">
      <div className="signup-box">
        <img src="youpotify.png" alt="google logo" />
        <div>
          <h2>회원가입</h2>
        </div>
        <div className="form">
          <fieldset>
            <legend>이메일</legend>
            <div>
              <input id="email" placeholder="이메일" />
              <button id="check-email-btn">중복 확인</button>
            </div>
          </fieldset>
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
        </div>
        <div className="btn-box">
          <button id="login" onClick={NavigateToLogin}>
            로그인 화면
          </button>
          <button id="signup">가입 완료</button>
        </div>
      </div>
    </div>
  );
}
