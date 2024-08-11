import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  const toLogout = () => {
    axios.get("/users/logout").then((response) => {
      if (response.data.success) {
        navigate("/login");
      } else {
        alert("로그아웃 실패");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h2>시작 페이지</h2>
      <button onClick={toLogout}>로그아웃</button>
    </div>
  );
}

export default LandingPage;
