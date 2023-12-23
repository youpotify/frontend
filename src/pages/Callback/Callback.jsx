import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SERVER_URL = "http://localhost:8000";

export default function Callback() {
  const navigate = useNavigate();

  const [text, setText] = useState("Connect to Spotify");
  const [clientId, setclientId] = useState("");
  const [authCode, setAuthCode] = useState(null);

  useEffect(() => {
    const url = window.location.href;
    const code = new URL(url).searchParams.get("code");
    if (code) {
      setAuthCode(code);
    }
  }, [authCode]);

  const connectToSpotify = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/spotify/oauths/pkce`, {
        params: {
          text: clientId,
        },
      });

      window.location.href = response.data.redirect_uri;
    } catch (error) {
      console.error(error);
    }
  };

  const getTokens = async () => {
    if (authCode) {
      try {
        const response = await axios.get(
          `${SERVER_URL}/spotify/oauths/tokens`,
          {
            params: {
              text: authCode,
            },
          }
        );

        const data = response.data;

        if (data) {
          alert("oauth 성공!");
          navigate("/");
        }
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
        value={clientId}
        onChange={(e) => setclientId(e.target.value)}
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
