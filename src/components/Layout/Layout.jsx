import React from "react";
import "./Layout.scss";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Header className="header" />
      <div>
        <Sidebar className="sidebar" />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
