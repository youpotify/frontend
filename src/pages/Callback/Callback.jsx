import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SERVER_URL = "http://localhost:8000";

export default function Callback() {
  const navigate = useNavigate();

  const [text, setText] = useState("Connect to Spotify");
  const [clientID, setClientID] = useState("");
  const [authCode, setAuthCode] = useState(null);

  useEffect(() => {
    const url = window.location.href;
    const code = new URL(url).searchParams.get("code");
    if (code) {
      setAuthCode(code);
    }
    console.log(`code : ${code}`);
    console.log(`authCode : ${authCode}`);
  }, [authCode]);

  const connectToSpotify = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/spotify/oauths/pkce`, {
        params: {
          text,
        },
      });

      console.log(response.data.authorizationURLWithParams);
      window.location.href = response.data.authorizationURLWithParams;
    } catch (error) {
      console.error(error);
    }
  };

  const getTokens = async () => {
    console.log(authCode);
    if (authCode) {
      try {
        const response = await axios.post(
          `${SERVER_URL}/api/spotify/oauth/tokens`,
          {
            authCode,
          }
        );

        const data = response.data;
        console.log(data);

        // if (data) navigate("/");
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (authCode) {
      getTokens();
    }
  }, [authCode]);

  return (
    <SpotifyConnectionBtn>
      <button onClick={connectToSpotify}>{text}</button>
      <input
        placeholder="enter your Spotify User ID here"
        value={clientID}
        onChange={(e) => setClientID(e.target.value)}
      />
    </SpotifyConnectionBtn>
  );
}

const SpotifyConnectionBtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  button {
    background-color: lightblue;
    border: none;
    border-radius: 20px;
    height: 50px;
    font-size: 30px;

    cursor: pointer;
    transition: background-color 0.3s;
    // &:hover {
    // background-color: skyblue;
    // }

    &:active {
      background-color: deepskyblue;
    }
  }
`;
