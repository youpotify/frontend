import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SERVER_URL = process.env.REACT_APP_API_URL;

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
      const response = await axios.get(
        `${SERVER_URL}/api/oauths/spotify/pkce`,
        {
          params: {
            text: clientId,
          },
        }
      );

      window.location.href = response.data.redirect_uri;
    } catch (error) {
      console.error(error);
    }
  };

  const getTokens = async () => {
    if (authCode) {
      console.log(authCode);
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/oauths/spotify/tokens`,
          {
            params: {
              text: authCode,
            },
          }
        );

        const data = response.data;
        localStorage.setItem("accessToken", data.tokens.access_token);
        localStorage.setItem("refreshToken", data.tokens.refresh_token);

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
    <div className="spotify-connection-btn">
      <button onClick={connectToSpotify}>{text}</button>
      <input
        placeholder="enter your Spotify User ID here"
        value={clientId}
        onChange={(e) => setclientId(e.target.value)}
      />
    </div>
  );
}
