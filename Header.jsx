import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <h1>Weblog</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/editor">New Post</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
}

export default Header;
