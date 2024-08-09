import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  const toLogin = () => {
    navigate("/login");
  };

  // useEffect(() => {
  //   axios.get("/users/login").then((response) => console.log(response.data));
  // }, []);
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
      <button onClick={toLogin}>로그인</button>
    </div>
  );
}

export default LandingPage;
