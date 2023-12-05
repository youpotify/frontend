import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.scss";

export default function Signup() {
  const navigate = useNavigate();
  const [isEmailUsable, setIsEmailUsable] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  console.log(password);
  console.log(confirmPassword);

  useEffect(() => {});

  function NavigateToLogin() {
    navigate("/login");
  }

  function CheckEmail() {
    console.log("이메일 중복 확인 구다사이~");
    // const apiURL = "localhost:8080/users/check-email-duplication";
    // const response = axios.post(apiURL, { email });
    // if (response.statusCode == 200) {
    //   setIsEmailUsable(true);
    // }
  }

  function Signup() {
    console.log("회원가입 구다사이~");
    // const apiURL = "localhost:8080/users/signup";
    // const response = axios.post(apiURL, { email, password });
    // if (response.statusCode == 201 && isEmailValid && isPasswordValid) {
    // alert("회원가입 성공");
    //   setPassword('');
    //   setConfirmPassword('');
    // navigate("/login");
    // }
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
              <input
                id="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button id="check-email-btn" onClick={CheckEmail}>
                중복 확인
              </button>
            </div>
          </fieldset>
          {/* <div>경고 문구</div> */}
          <fieldset>
            <legend>비밀번호 입력</legend>
            <div>
              <input
                id="password"
                placeholder="비밀번호"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </fieldset>
          {/* <div>경고 문구</div> */}
          <fieldset>
            <legend>비밀번호 확인</legend>
            <div>
              <input
                id="password"
                placeholder="비밀번호 확인"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </fieldset>
          {/* <div>경고 문구</div> */}
        </div>
        <div className="btn-box">
          <button id="login" onClick={NavigateToLogin}>
            로그인 화면
          </button>
          <button id="signup" onClick={Signup}>
            가입 완료
          </button>
        </div>
      </div>
    </div>
  );
}
